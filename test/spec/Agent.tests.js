define([
	'Agent'
],
function(Agent){
	'use strict';

	describe('Agent', function(){

		var agent,
			clock = sinon.useFakeTimers();

		beforeEach(function(){
			agent = new Agent();
		});

		afterEach(function(){
			agent = undefined;
			clock.restore();
		});

		describe('initialisation', function(){
			it('is alive', function(){
				expect(agent.alive).toBeDefined();
				expect(agent.alive).toEqual(true);
			});

			it('has a position as x,y coordinates', function(){
				expect(agent.position).toBeDefined();
				expect(agent.position.x).toBeDefined();
				expect(agent.position.y).toBeDefined();
				expect(_.isNumber(agent.position.x)).toEqual(true);
				expect(_.isNumber(agent.position.y)).toEqual(true);
			});

			it('has a numticks property with the starting value of 0', function(){
				expect(agent.numticks).toBeDefined();
				expect(agent.numticks).toEqual(0);
			});

			it('has a health property set at 100', function(){
				expect(agent.health).toBeDefined();
				expect(agent.health).toEqual(100);
			});

			it('has a speed property set at 1', function(){
				expect(agent.speed).toBeDefined();
				expect(agent.speed).toEqual(1);
			});
		});

		describe('death', function(){
			it('has a die method', function(){
				expect(agent.die).toBeDefined();
				expect(_.isFunction(agent.die)).toEqual(true);
			});

			it('has an alive status (default true)', function(){
				expect(agent.alive).toBeDefined();
				expect(agent.alive).toEqual(true);
			});
		});

		describe('position and moving', function(){

			it('has a position property, which contains the x,y coordinates', function(){
				expect(agent.position).toBeDefined();
				expect(agent.position.x).toBeDefined();
				expect(agent.position.y).toBeDefined();
			});

			describe('move', function(){
				it('has a move method', function(){
					expect(agent.move).toBeDefined();
					expect(_.isFunction(agent.move)).toEqual(true);
				});

				it('calling move updates the position of the Agent', function(){
					agent.move({x:2,y:2});
					expect(agent.position).toEqual({x:2,y:2});

					agent.move({x:1,y:2});
					expect(agent.position).toEqual({x:3,y:4});
				});

				it('does not move if the agent is dead', function(){
					agent.die();
					agent.move({x:5,y:5});
					expect(agent.position).toEqual({x:0,y:0});
				});
			});

			describe('moveTowards', function(){
				it('has a moveTowards method', function(){
					expect(agent.moveTowards).toBeDefined();
					expect(_.isFunction(agent.moveTowards)).toEqual(true);
				});

				it('moveTowards calls move, passing the correct direction to move in based on the agent speed', function(){
					var moveStub = sinon.stub(agent, 'move');

					agent.moveTowards({x:10,y:10});

					expect(moveStub.calledOnce).toEqual(true);
					expect(moveStub.args[0][0]).toEqual({x: 1, y: 1});

					moveStub.restore();
				});

				it('increasing the agent speed increases the values of the coordinates sent to move', function(){
					var moveStub = sinon.stub(agent, 'move');

					agent.speed = 3;
					agent.moveTowards({x:10,y:0});

					expect(moveStub.calledOnce).toEqual(true);
					expect(moveStub.args[0][0]).toEqual({x: 3, y: 0});

					moveStub.restore();
				});
			});

		});

		describe('tick', function(){

			it('has a tick method', function(){
				expect(agent.tick).toBeDefined();
				expect(_.isFunction(agent.tick)).toEqual(true);
			});

			it('calling tick increases the numticks counter', function(){
				expect(agent.numticks).toBeDefined();
				expect(agent.numticks).toEqual(0);
				agent.tick();
				expect(agent.numticks).toEqual(1);
			});

			it('does not tick if the agent is dead', function(){
				agent.die();
				agent.tick();
				expect(agent.numticks).toEqual(0);
			});

		});

		describe('health', function(){
			it('has a numeric health property', function(){
				expect(agent.health).toBeDefined();
				expect(_.isNumber(agent.health)).toEqual(true);
			});

			it('hurt() decrements health by the given amount', function(){
				var startingHealth = agent.health;
				agent.hurt(10);
				expect(agent.health).toEqual(startingHealth-10);
			});

			it('hurt() decrements health by 1 if no quantity is passed', function(){
				var startingHealth = agent.health;
				agent.hurt();
				expect(agent.health).toEqual(startingHealth-1);
			});

			it('hurt() causes the player to die() if their health is under 0', function(){
				var dieStub = sinon.stub(agent, 'die');

				agent.health = 0;
				agent.hurt();

				expect(dieStub.calledOnce).toEqual(true);
			});
		});

	});
});