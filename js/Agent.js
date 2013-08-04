define([
	'Locations'
],
function(
	Locations
){
	'use strict';

	return Toolbox.Base.extend({
		constructor: function(){
			this.alive = true;
			this.position = {x:0,y:0};
			this.numticks = 0;
			this.health = 100;
		},
		move: function(coords){
			if(!this.alive){ return; }

			this.position.x += coords.x;
			this.position.y += coords.y;
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