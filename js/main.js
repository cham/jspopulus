/*
	main.js file
*/
require([
	'CharacterManager',
	'Locations'
],
function(
	CharacterManager,
	Locations
){
	'use strict';

	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();

	function getReadableJob(jobInfo){
		var jobstr = '';

		if(!jobInfo){ return; }
		
		if(jobInfo.type === 'travel'){
			jobstr += 'travelling';
			if(jobInfo.target){
				jobstr += ' to ' + jobInfo.target;
			}
		}
		if(jobInfo.type === 'get'){
			jobstr += 'getting some ';
		}
		if(jobInfo.type === 'eat'){
			jobstr += 'eating';
		}
		return jobstr || jobInfo.type;
	}

	var worldSize = 900,
		numpeople = 6,
		numfood = 6,
		foodnames = ['Bananas', 'Wheat', 'Apple Tree', 'Cucumber Field', 'Wild Lettuce'],
		characterManager = new CharacterManager();

	_(numpeople).times(function(i){
		characterManager.birthPerson({
			position: {
				x: Math.floor(Math.random() * worldSize) - worldSize/2,
				y: Math.floor(Math.random() * worldSize) - worldSize/2
			},
			hunger: Math.floor(Math.random()*200)
		});
		
	});

	_(numfood).times(function(){
		Locations.add({
			type: 'food',
			name: foodnames[Math.floor(Math.random()*foodnames.length)],
			position: {
				x: Math.floor(Math.random() * worldSize) - worldSize/2,
				y: Math.floor(Math.random() * worldSize) - worldSize/2
			}
		});
	});


	$('body').append('<h4>' + _(Locations.locations).reduce(function(memo, location){
		return memo + location.name + ' (' + location.type +') at ' + location.position.x + ', ' + location.position.y + '<br>';
	},'') + '</h4>');
	$('body').append('<button>Stop</button');
	$('body').append('<span class="numpeople"></span>');


	var running = true;
	$('button').click(function(e){
		e.preventDefault();
		running = false;
	});
	(function gametick(){
		var $person, age;

		if(!running){ return; }

		characterManager.tick();

		$('.person').remove();
		_(characterManager.people).each(function(person,i){
			if(i>50){ return ;}
			$('body').append('<div class="person person'+i+' '+person.gender+'"><h1 class="name"></h1><h3 class="age"></h3><h3 class="status"></h3><h3 class="health"></h3><h3 class="hunger"></h3><h3 class="job"></h3><h3 class="position"></h3><h3 class="inventory"></h3>');
			$person = $('.person'+i);
			if(person.alive){
				age = (Math.floor(person.numticks/(365/4))+16);
				if(age>30){
					person.hurt(3);
				}
				$person.find('.name').text(person.name + ' ' + person.surname);
				$person.find('.age').text(person.gender + ', ' + age);
				$person.find('.status').text(person.name + ' is currently ' + getReadableJob(person.jobs[0]));
				$person.find('.health').text('Health: ' + person.health);
				$person.find('.hunger').text('Hunger: ' + person.hunger);
				$person.find('.position').text('Position: ' + person.position.x + ', ' + person.position.y);
				$person.find('.inventory').text('Holding: ' + (person.inventory.food || 0) + ' food');
			}else{
				$person.find('.status').text(person.name + ' has died!');
			}
		});

		$('.numpeople').text(_(characterManager.people).size());

		if(_(characterManager.people).size() === 0){
			$('body').append("<h1>Everyone has died!</h1>");
		}else{
			requestAnimFrame(gametick);
		}
	})();

});