define([
	'Agent'
],
function(
	Agent
){
	'use strict';

	return Agent.extend({
		constructor: function(){
			this.hunger = 0;

			Agent.prototype.constructor.call(this);
		},
		eat: function(howmuch){
			if(!this.alive){ return; }

			this.hunger -= howmuch || 1;
		},
		tick: function(){
			if(!this.alive){ return; }

			this.hunger++;
			if(this.hunger>100){
				this.hurt();
			}

			Agent.prototype.tick.call(this);
		}
	});
});