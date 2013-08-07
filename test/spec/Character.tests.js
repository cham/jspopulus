define([
	'Character',
	'Agent',
	'DecisionMaker'
],
function(
	Character,
	Agent,
	DecisionMaker
){
	'use strict';

	describe('Character', function(){

		var character,
			jobStub,
			clock = sinon.useFakeTimers();

		beforeEach(function(){
			jobStub = sinon.stub(DecisionMaker.prototype, 'getJob', function(){ return {type:'somenewjob'}; });
			character = new Character();
		});

		afterEach(function(){
			character = undefined;
			clock.restore();
			jobStub.restore();
		});

		describe('initialisation', function(){
			it('extends Agent', function(){
				expect(character instanceof Agent).toEqual(true);
			});

			it('has an instance of DecisionMaker in order to make decisions', function(){
				expect(character.decisions).toBeDefined();
				expect(character.decisions instanceof DecisionMaker).toEqual(true);
			});

			it('has a hunger property with the correct default hunger level', function(){
				expect(character.hunger).toBeDefined();
				expect(_.isNumber(character.hunger)).toEqual(true);
				expect(character.hunger).toEqual(0);
			});

			it('has a jobs property', function(){
				expect(character.jobs).toBeDefined();
			});

			it('has a gender', function(){
				expect(character.gender).toBeDefined();
			});

			it('has a name', function(){
				expect(character.name).toBeDefined();
			});
		});

		describe('hunger', function(){
			var jobStub;
			beforeEach(function(){
				jobStub = sinon.stub(character, 'doJob');
			});
			afterEach(function(){
				jobStub.restore();
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

			it('if hunger is over 500 then the character is hurt() on each tick', function(){
				var hurtStub = sinon.stub(character, 'hurt');

				character.hunger = 500;
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

		describe('decision making and jobs', function(){
			it('calls DecisionMaker.getJob on tick if it has no current job', function(){
				character.tick();

				expect(jobStub.called).toEqual(true);
			});

			it('calls doJob on tick if it has a current job', function(){
				var doJobStub = sinon.stub(character, 'doJob');

				character.jobs = [{type:'idle'}];
				character.tick();

				expect(doJobStub.called).toEqual(true);
				doJobStub.restore();
			});

			it('moves towards the location position if the job action is travel', function(){
				character.jobs = [{type:'travel', location:{position:{x:2,y:-1}}}];

				character.doJob();
			});
		});

	});
});