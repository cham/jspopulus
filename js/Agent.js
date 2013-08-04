define([
	'Locations'
],
function(
	Locations
){
	'use strict';

	var locations = new Locations();

	function Agent(){
		this.alive = true;
		this.position = {x:0,y:0};
		this.numticks = 0;
		this.hunger = 0;
		this.health = 100;
	}

	Agent.prototype.move = function(coords){
		if(!this.alive){ return; }

		this.position.x += coords.x;
		this.position.y += coords.y;
	};

	Agent.prototype.hurt = function(howmuch){
		if(!this.alive){ return; }

		this.health -= howmuch || 1;
		if(this.health < 0){
			this.die();
		}
	};

	Agent.prototype.die = function(){
		this.alive = false;
	};

	Agent.prototype.eat = function(howmuch){
		if(!this.alive){ return; }

		this.hunger -= howmuch || 1;
	};

	Agent.prototype.tick = function(){
		if(!this.alive){ return; }

		this.numticks++;
		this.hunger++;
		if(this.hunger>100){
			this.hurt();
		}
	};

	return Agent;

});