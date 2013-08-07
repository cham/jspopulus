define([
	'Locations'
],
function(
	Locations
){
	'use strict';

	describe('Locations', function(){

		var locations,
			clock = sinon.useFakeTimers();

		beforeEach(function(){
			locations = Locations;
		});

		afterEach(function(){
			locations.reset();
			clock.restore();
		});

		describe('initialisation', function(){
			it('calls reset on initialisation', function(){
				var resetStub = sinon.stub(locations, 'reset');
				
				locations.constructor();

				expect(resetStub.calledOnce).toEqual(true);
				resetStub.restore();
			});

			it('is a singleton', function(){
				var makeNewError;

				expect(typeof Locations).toEqual('object');
				
				try{
					new Locations();
				}catch(e){
					makeNewError = e;
				}

				expect(makeNewError.toString()).toEqual('object is not a function');
			});
		});

		describe('reset', function(){
			it('sets a locations property, which is an array', function(){
				expect(locations.locations).toBeDefined();
				expect(_.isArray(locations.locations)).toEqual(true);
			});

			it('sets a single entry for the center of the world', function(){
				var firstLocation;

				expect(locations.locations.length).toEqual(1);
			});
		});

		describe('locations are in the correct format (example - center of the world)', function(){
			var firstLocation;

			beforeEach(function(){
				firstLocation = locations.locations[0];
			});

			afterEach(function(){
				firstLocation = undefined;
			});

			it('locations have an id', function(){
				expect(firstLocation.id).toEqual("0");
			});

			it('locations have a position property (x,y object)', function(){
				expect(firstLocation.position).toEqual({x:0,y:0});
			});

			it('locations have a name', function(){
				expect(firstLocation.name).toEqual("Center of the world");
			});

			it('locations have a type', function(){
				expect(firstLocation.type).toEqual("landmark");
			});
		});

		describe('adding locations', function(){
			it('has an add method', function(){
				expect(locations.add).toBeDefined();
				expect(_.isFunction(locations.add)).toEqual(true);
			});

			it('add returns the id of the newly added location', function(){
				var newId = locations.add();
				expect(newId).toEqual('1');
			});

			it('calling add, passing the location data, adds the location to the locations array', function(){
				var locId = locations.add({
					name: 'Burger bar',
					position: {x:3,y:4},
					type: 'food'
				});

				expect(locations.locations.length).toEqual(2);
				expect(locations.locations[1]).toEqual({
					name: 'Burger bar',
					position: {x:3,y:4},
					type: 'food',
					id: locId
				});
			});

			it('type is optional (defaults to landmark)', function(){
				var locId = locations.add({
					name: 'Sweet statue',
					position: {x:10,y:6}
				});

				expect(locations.locations.length).toEqual(2);
				expect(locations.locations[1]).toEqual({
					name: 'Sweet statue',
					position: {x:10,y:6},
					type: 'landmark',
					id: locId
				});
			});

			it('if the location data already exists, no new entry is added', function(){
				var locId = locations.add({
						name: 'Burger bar',
						position: {x:3,y:4},
						type: 'food'
					});

				expect(locations.locations.length).toEqual(2);
				expect(locations.locations[1]).toEqual({
					name: 'Burger bar',
					position: {x:3,y:4},
					type: 'food',
					id: locId
				});

				locations.add({
					name: 'Burger bar',
					position: {x:3,y:4},
					type: 'food'
				});

				expect(locations.locations.length).toEqual(2);
			});

			it('if the location data already exists, add returns undefined', function(){
				var matchingIds;

				locations.add({
					name: 'Burger bar',
					position: {x:3,y:4},
					type: 'food'
				});

				matchingIds = locations.add({
					name: 'Burger bar',
					position: {x:3,y:4},
					type: 'food'
				});

				expect(matchingIds).toEqual(undefined);
			});
		});

		describe('finding locations', function(){
			beforeEach(function(){
				locations.add({
					name: 'Burger bar',
					position: {x:3,y:4},
					type: 'food'
				});
				locations.add({
					name: 'Coffee shop',
					position: {x:3,y:6},
					type: 'food'
				});
				locations.add({
					name: 'Cattery',
					position: {x:5,y:4},
					type: 'landmark'
				});
			});

			it('findLocations returns an array of the locations that match the given type', function(){
				var places = locations.findLocations({type: 'food'});
				expect(places.length).toEqual(2);

				expect(_.isObject(places[0])).toEqual(true);
				expect(_.isObject(places[1])).toEqual(true);
				expect(places[0].name).toEqual('Burger bar');
				expect(places[1].name).toEqual('Coffee shop');
			});

			it('findLocations returns an array of the locations that match the given position', function(){
				var places = locations.findLocations({position: {x:5,y:4}});
				expect(places.length).toEqual(1);

				expect(places[0].name).toEqual('Cattery');
			});

			it('findLocations returns an array of the locations that match the given name', function(){
				var places = locations.findLocations({name: 'Coffee shop'});
				expect(places.length).toEqual(1);

				expect(places[0].name).toEqual('Coffee shop');
			});

			it('findLocations returns an array of the locations that match any combination of the above', function(){
				expect(locations.findLocations({
					type: 'food'
				}).length).toEqual(2);

				expect(locations.findLocations({
					type: 'food',
					position: {x:3,y:6}
				}).length).toEqual(1);

				expect(locations.findLocations({
					type: 'landmark',
					position: {x:3,y:6}
				}).length).toEqual(0);
			});

			it('findLocations returns an empty array if no locations match', function(){
				expect(locations.findLocations({
					position: {x:10,y:10}
				})).toEqual([]);
			});

			it('findClosestLocation returns the closest location to the given position', function(){
				var burgerBarId = locations.findLocations({
						name: 'Burger bar'
					})[0].id;

				expect(locations.findClosestLocation({type: 'food'},{x:2,y:3})).toEqual({
					name: 'Burger bar',
					position: {x:3,y:4},
					type: 'food',
					id: burgerBarId
				});
			});

			it('findClosestLocation returns undefined if no locations match', function(){
				expect(locations.findClosestLocation({
					type: 'entertainment'
				},{x:100,y:100})).toEqual(undefined);
			});
		});

	});
});