define([
	'Character',
	'Agent'
],
function(
	Character,
	Agent
){
	'use strict';

	describe('Character', function(){

		var character,
			clock = sinon.useFakeTimers();

		beforeEach(function(){
			character = new Character();
		});

		afterEach(function(){
			character = undefined;
			clock.restore();
		});

		describe('initialisation', function(){
			it('extends Agent', function(){
				expect(character instanceof Agent).toEqual(true);
			});
		});

		describe('hunger', function(){

			it('has a hunger property', function(){
				expect(character.hunger).toBeDefined();
				expect(_.isNumber(character.hunger)).toEqual(true);
			});

			it('has the correct default hunger level', function(){
				expect(character.hunger).toEqual(0);
			});

			it('hunger increases by 1 on each tick', function(){
				_(12).times(function(){
					character.tick();
				});
				expect(character.hunger).toEqual(12);
				_(3).times(function(){
					character.tick();
				});
				expect(character.hunger).toEqual(15);
			});

			it('if hunger is over 100 then the character is hurt() on each tick', function(){
				var hurtStub = sinon.stub(character, 'hurt');

				character.hunger = 100;
				character.tick();

				expect(hurtStub.calledOnce).toEqual(true);
				hurtStub.restore();
			});

			it('has an eat method which decreases hunger by 1', function(){
				character.hunger = 50;
				character.eat();
				expect(character.hunger).toEqual(49);
			});

			it('passing a number to eat decreases hunger by that amount', function(){
				character.hunger = 50;
				character.eat(25);
				expect(character.hunger).toEqual(25);
			});

		});

	});
});