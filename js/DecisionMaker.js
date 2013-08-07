define([
	'Locations'
],
function(
	Locations
){

	return Toolbox.Base.extend({
		getJob: function(characterState){
			var location;

			characterState = characterState || {};

			if(characterState.hunger > 250){
				if(characterState.inventory.food>0){
					return {
						type: 'eat:food'
					};
				}
			}

			if(characterState.hunger > 200 && characterState.inventory.food < 2){
				location = Locations.findClosestLocation({type: 'food'}, characterState.position);
				if(location){
					if(_.isEqual(location.position, characterState.position)){
						return {
							type: 'get:food',
							quantity: 10
						};
					}else{
						return {
							type: 'travel:food',
							location: location
						};
					}
				}
			}

			return {
				type: 'idle'
			};
		}
	});

});