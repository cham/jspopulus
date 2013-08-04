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

		describe('hunger', function(){

			it('has a hunger property', function(){
				expect(agent.hunger).toBeDefined();
				expect(_.isNumber(agent.hunger)).toEqual(true);
			});

			it('has the correct default hunger level', function(){
				expect(agent.hunger).toEqual(0);
			});

			it('hunger increases by 1 on each tick', function(){
				_(12).times(function(){
					agent.tick();
				});
				expect(agent.hunger).toEqual(12);
				_(3).times(function(){
					agent.tick();
				});
				expect(agent.hunger).toEqual(15);
			});

			it('if hunger is over 100 then the agent is hurt() on each tick', function(){
				var hurtStub = sinon.stub(agent, 'hurt');

				agent.hunger = 100;
				agent.tick();

				expect(hurtStub.calledOnce).toEqual(true);
				hurtStub.restore();
			});

			it('has an eat method which decreases hunger by 1', function(){
				agent.hunger = 50;
				agent.eat();
				expect(agent.hunger).toEqual(49);
			});

			it('passing a number to eat decreases hunger by that amount', function(){
				agent.hunger = 50;
				agent.eat(25);
				expect(agent.hunger).toEqual(25);
			});

		});

	});
});