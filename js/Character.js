define([
	'Agent',
	'DecisionMaker',
	'NameGenerator'
],
function(
	Agent,
	DecisionMaker,
	NameGenerator
){
	'use strict';

	return Agent.extend({
		constructor: function(){
			this.hunger = 0;
			this.jobs = [];
			this.decisions = new DecisionMaker();
			this.gender = Math.random() > 0.5 ? 'male': 'female';
			this.name = NameGenerator.getName(this.gender);
			this.inventory = {
				food: 0
			};

			Agent.prototype.constructor.call(this);
		},
		eat: function(howmuch){
			if(!this.alive){ return; }

			this.hunger -= howmuch || 1;
			if(this.hunger < 0){
				this.hunger = 0;
			}
		},
		doJob: function(){
			if(!this.alive || !this.jobs.length){ return; }

			var currentJob = this.jobs[0],
				jobTypeInfo = currentJob.type.split(':');

			if(jobTypeInfo[0] === 'travel'){
				this.moveTowards(currentJob.location.position);
			}else if(jobTypeInfo[0] === 'get'){
				this.inventory[jobTypeInfo[1]] += currentJob.quantity;
			}else if(jobTypeInfo[0] === 'eat' && this.inventory[jobTypeInfo[1]]>0){
				this.inventory[jobTypeInfo[1]]--;
				if(jobTypeInfo[1] === 'food'){
					this.eat(500);
				}
			}else if(jobTypeInfo[0] === 'idle'){
				this.move({
					x: Math.round(Math.random()*this.speed*2)-this.speed,
					y: Math.round(Math.random()*this.speed*2)-this.speed
				});
			}
		},
		tick: function(){
			if(!this.alive){ return; }

			this.hunger++;
			if(this.hunger>500){
				this.hurt();
			}
			if(this.hunger<300 && this.health<100){
				this.hurt(-1);
			}
			this.jobs = [this.decisions.getJob(this)];
			this.doJob();

			Agent.prototype.tick.call(this);
		}
	});
});