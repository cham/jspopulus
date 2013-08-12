define([
	'Agent',
	'NameGenerator'
],
function(
	Agent,
	NameGenerator
){
	'use strict';

	return Agent.extend({
		constructor: function(options){
			options = _(options || {}).defaults({
				hunger: 0,
				sexdrive: 0,
				jobs: [],
				gender: Math.random() > 0.5 ? 'male': 'female',
				inventory: options.inventory || {},
				surname: '',
				fathername: '',
				fertility: 0.3,
				onBirth: function(options){}
			});

			this.hunger = options.hunger;
			this.sexdrive = options.sexdrive;
			this.jobs = options.jobs;
			this.gender = options.gender;
			this.inventory = options.inventory;
			this.fertility = options.fertility;
			this.onBirth = options.onBirth;

			this.id = parseInt(_.uniqueId(), 10);
			this.name = NameGenerator.getName(this.gender);
			this.surname = NameGenerator.getSurname(this.gender, options.surname, options.fathername);

			Agent.prototype.constructor.call(this, options);
		},
		eat: function(howmuch){
			if(!this.alive){ return; }

			this.hunger -= howmuch || 1;
			if(this.hunger < 0){
				this.hunger = 0;
			}
		},
		addItem: function(itemname, qty){
			if(!this.inventory[itemname]){
				this.inventory[itemname] = qty;
			}else{
				this.inventory[itemname] += qty;
			}
		},
		removeItem: function(itemname, qty){
			if(!this.inventory[itemname]){
				this.inventory[itemname] = 0;
			}else{
				this.inventory[itemname] -= qty;
			}
		},
		giveBirth: function(father){
			this.onBirth({
				surname: this.surname,
				fathername: father.name,
				position: _(this.position).clone()
			});
		},
		mate: function(partner){
			this.sexdrive = 0;
			if(this.gender === 'female' && Math.random() < this.fertility){
				this.giveBirth(partner);
			}
		},
		doJob: function(){
			if(!this.alive || !this.jobs.length){ return; }

			var currentJob = this.jobs[0];

			if(currentJob.type === 'travel'){
				this.moveTowards(currentJob.location.position);
			}else if(currentJob.type === 'get'){
				this.addItem(currentJob.inventory, currentJob.quantity);
			}else if(currentJob.type === 'eat' && this.inventory[currentJob.inventory]>0){
				this.removeItem(currentJob.inventory, 1);
				if(currentJob.inventory === 'food'){
					this.eat(500);
				}
			}else if(currentJob.type === 'mate'){
				this.mate(currentJob.agent);
			}else if(currentJob.type === 'idle'){
				this.move({
					x: Math.round(Math.random()*this.speed*2)-this.speed,
					y: Math.round(Math.random()*this.speed*2)-this.speed
				});
			}
		},
		tick: function(){
			if(!this.alive){ return; }

			this.hunger += Math.floor(Math.random()*3)+1;
			this.sexdrive += Math.floor(Math.random()*5)+1;
			if(this.hunger>500){
				this.hurt();
			}
			this.jobs = [this.decisions.getJob(this)];
			this.doJob();

			Agent.prototype.tick.call(this);
		}
	});
});