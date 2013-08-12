define(function(){
	'use strict';

	var Locations = Toolbox.Base.extend({
		constructor: function(){
			this.reset();
		},
		findClosestLocation: function(locationData, position){
			var matchingLocations = this.findLocations(locationData);

			if(!matchingLocations.length){
				return;
			}
			if(matchingLocations.length === 1){
				return matchingLocations[0];
			}
			return _(matchingLocations).sortBy(function(loc){
					return Math.abs(loc.position.x - position.x) + Math.abs(loc.position.y - position.y);
				})[0];
		},
		findLocations: function(locationData){
			return _(this.locations)
						.chain()
						.filter(function(loc){
							if((locationData.name && locationData.name !== loc.name) ||
							   (locationData.position && !_.isEqual(locationData.position, loc.position)) ||
							   (locationData.type && locationData.type !== loc.type)){
								return false;
							}
							return true;
						})
						.value();
		},
		add: function(locationData){
			var locationId = _.uniqueId(),
				matchingIds = _(locationData).size() ? this.findLocations(locationData) : [];

			if(matchingIds.length){
				return;
			}

			this.locations.push(_(locationData || {}).defaults({
				id: locationId,
				name: '',
				position: {x:0,y:0},
				type: 'landmark'
			}));

			return locationId;
		},
		reset: function(){
			this.locations = [{id:'0',name:'Center of the world',position:{x:0,y:0},type:'landmark'}];
			this.agents = {};
		},
		addAgent: function(agent){
			this.agents[agent.id] = agent;
		},
		removeAgent: function(agent){
			delete this.agents[agent.id];
		},
		findAgent: function(filters){
			return _(this.agents).find(function(agent){
				return _(filters).reduce(function(memo, filter, key){
					if(memo === false){ return false; }
					if(_.isFunction(filter)){
						memo = filter(agent[key]);
					}else{
						memo = agent[key] === filter;
					}
					return memo;
				}, null);
			});
		}
	});

	return new Locations();

});