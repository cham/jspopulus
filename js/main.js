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

	function getReadableJobType(type){
		if(type === 'travel:food'){
			return 'travelling to get food';
		}
		if(type === 'get:food'){
			return 'getting some food';
		}
		if(type === 'eat:food'){
			return 'eating';
		}
		return type;
	}

	var worldSize = 300,
		numpeople = 12,
		numfood = 4,
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
		$('body').append('<div class="person person'+i+'"><h1 class="name"></h1><h3 class="status"></h3><h3 class="health"></h3><h3 class="hunger"></h3><h3 class="job"></h3><h3 class="position"></h3><h3 class="inventory"></h3>');
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


	(function gametick(){
		var $person;

		characterManager.tick();

		_(characterManager.people).each(function(person,i){
			$person = $('.person'+i);
			if(person.alive){
				$person.find('.name').text(person.name + ', ' + (Math.floor(person.numticks/365)+16) + ', ' + person.gender);
				$person.find('.status').text(person.name + ' is currently ' + getReadableJobType(person.jobs[0].type));
				$person.find('.health').text('Health: ' + person.health);
				$person.find('.hunger').text('Hunger: ' + person.hunger);
				$person.find('.position').text('Position: ' + person.position.x + ', ' + person.position.y);
				$person.find('.inventory').text('Holding: ' + (person.inventory.food || 0) + ' food');
			}else{
				$person.find('.status').text(person.name + ' has died!');
			}
		});

		setTimeout(gametick, 100);
	})();

});