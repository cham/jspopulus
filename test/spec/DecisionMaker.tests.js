define([
	'DecisionMaker',
	'Locations'
],
function(
	DecisionMaker,
	Locations
){
	'use strict';

	describe('DecisionMaker', function(){

		var clock = sinon.useFakeTimers();

		afterEach(function(){
			clock.restore();
			Locations.reset();
		});

		describe('getJob', function(){
			describe('hunger', function(){
				beforeEach(function(){
					Locations.add({
						name: 'Burger bar',
						position: {x:5,y:3},
						type: 'food'
					});
					Locations.add({
						name: 'Faraway Bar',
						position: {x:6,y:3},
						type: 'food'
					});
				});

				it('returns travel:food decision type if the characterState has hunger over 200 and is not holding food', function(){
					var job = DecisionMaker.getJob({hunger:201,position:{x:0,y:0}});
					expect(job.type).toEqual('travel:food');
				});

				it('does not return travel:food decision type if the characterState hunger is not over 200', function(){
					var job = DecisionMaker.getJob({hunger:200,position:{x:0,y:0}});
					expect(job.type).not.toEqual('travel:food');
				});

				it('returns the closest food location as the location property of the job', function(){
					var job = DecisionMaker.getJob({hunger:251,position:{x:0,y:0}});
					expect(job.type).toEqual('travel:food');
					expect(job.location.name).toEqual('Burger bar');
				});

				it('returns type idle if there are no known food locations', function(){
					Locations.reset();
					var job = DecisionMaker.getJob({hunger:251,position:{x:0,y:0}});
					expect(job.type).toEqual('idle');
				});
			});

			describe('idle', function(){
				it('returns the idle job type if no other job matches', function(){
					expect(DecisionMaker.getJob()).toEqual({type:'idle'});
				});
			});
		});
	});
});