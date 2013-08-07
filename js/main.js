/*
	main.js file
*/
require([
	'Character',
	'Locations'
],
function(
	Character,
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

	var person1 = new Character(),
		worldSize = 300;

	person1.position.x = Math.floor(Math.random() * worldSize) - worldSize/2;
	person1.position.y = Math.floor(Math.random() * worldSize) - worldSize/2;
		// person2 = new Character();

	Locations.add({
		type: 'food',
		name: 'Bananas',
		position: {
			x: Math.floor(Math.random() * worldSize) - worldSize/2,
			y: Math.floor(Math.random() * worldSize) - worldSize/2
		}
	});
	Locations.add({
		type: 'food',
		name: 'Sweet shop',
		position: {
			x: Math.floor(Math.random() * worldSize) - worldSize/2,
			y: Math.floor(Math.random() * worldSize) - worldSize/2
		}
	});
	Locations.add({
		type: 'food',
		name: 'Craft Beer Co.',
		position: {
			x: Math.floor(Math.random() * worldSize) - worldSize/2,
			y: Math.floor(Math.random() * worldSize) - worldSize/2
		}
	});

	$('body').append('<div class="person person1"><h1 class="name"></h1><h3 class="status"></h3><h3 class="health"></h3><h3 class="hunger"></h3><h3 class="job"></h3><h3 class="position"></h3><h3 class="inventory"></h3>');
	// $('body').append('<div class="person person2"><h1 class="name"></h1><h3 class="status"></h3><h3 class="health"></h3><h3 class="hunger"></h3><h3 class="job"></h3><h3 class="position"></h3><h3 class="inventory"></h3>');

	$('body').append('<h2>World locations:</h2>');
	$('body').append('<h4>' + _(Locations.locations).reduce(function(memo, location){
		return memo + location.name + ' (' + location.type +') at ' + location.position.x + ', ' + location.position.y + '<br>';
	},'') + '</h4>');

	(function gametick(){
		person1.tick();
		if(person1.alive){
			$('.person1 .name').text(person1.name + ', ' + (Math.floor(person1.numticks/365)+16) + ', ' + person1.gender);
			$('.person1 .status').text(person1.name + ' is currently ' + getReadableJobType(person1.jobs[0].type));
			$('.person1 .health').text('Health: ' + person1.health);
			$('.person1 .hunger').text('Hunger: ' + person1.hunger);
			$('.person1 .position').text('Position: ' + person1.position.x + ', ' + person1.position.y);
			$('.person1 .inventory').text('Holding: ' + person1.inventory.food + ' food');
			setTimeout(gametick, 100);
		}else{
			$('.status').text(person1.name + ' has died!');
		}
		// person2.tick();
		// if(person2.alive){
		// 	$('.person2 .name').text(person2.name + ', ' + (Math.floor(person2.numticks/365)+16) + ', ' + person2.gender);
		// 	$('.person2 .status').text(person2.name + ' is currently ' + getReadableJobType(person2.jobs[0].type));
		// 	$('.person2 .health').text('Health: ' + person2.health);
		// 	$('.person2 .hunger').text('Hunger: ' + person2.hunger);
		// 	$('.person2 .position').text('Position: ' + person2.position.x + ', ' + person2.position.y);
		// 	$('.person2 .inventory').text('Holding: ' + person2.inventory.food + ' food');
		// 	setTimeout(gametick, worldSize/2);
		// }else{
		// 	$('.status').text(person2.name + ' has died!');
		// }
	})();

});