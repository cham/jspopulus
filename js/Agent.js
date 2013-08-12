define([
	'DecisionMaker',
],
function(
	DecisionMaker
){
	'use strict';

	return Toolbox.Base.extend({
		constructor: function(options){
			options = _(options || {}).defaults({
				alive: true,
				position: options.position || {x:0, y:0},
				health: 100,
				speed: 1,
				onDeath: function(person){}
			});

			this.numticks = 0;
			this.alive = options.alive;
			this.position = options.position;
			this.health = options.health;
			this.speed = options.speed;
			this.onDeath = options.onDeath;

			this.decisions = DecisionMaker;
			this.decisions.addAgent(this);
		},
		move: function(coords){
			if(!this.alive){ return; }

			this.position.x += coords.x;
			this.position.y += coords.y;
		},
		moveTowards: function(destinationCoords){
			var dx = this.position.x - destinationCoords.x,
				dy = this.position.y - destinationCoords.y;

			dx = dx !== 0 ? (0-(dx / Math.abs(dx))) * this.speed : 0;
			dy = dy !== 0 ? (0-(dy / Math.abs(dy))) * this.speed : 0;

			this.move({x:dx,y:dy});
		},
		hurt: function(howmuch){
			if(!this.alive){ return; }

			this.health -= howmuch || 1;
			if(this.health < 0){
				this.die();
			}
		},
		heal: function(howmuch){
			if(!this.alive){ return; }

			this.health += howmuch || 1;
			if(this.health>100){
				this.health = 100;
			}
		},
		die: function(){
			this.alive = false;
			this.decisions.removeAgent(this);
			this.onDeath(this);
		},
		tick: function(){
			if(!this.alive){ return; }

			this.numticks++;
		}
	});

});