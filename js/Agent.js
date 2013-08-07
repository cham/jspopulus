define([
],
function(
){
	'use strict';

	return Toolbox.Base.extend({
		constructor: function(){
			this.alive = true;
			this.position = {x:0,y:0};
			this.numticks = 0;
			this.health = 100;
			this.speed = 1;
			this.randomChance = 1/100;
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
		die: function(){
			this.alive = false;
		},
		tick: function(){
			if(!this.alive){ return; }

			this.numticks++;
		}
	});

});