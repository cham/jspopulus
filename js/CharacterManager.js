define([
	'Character'
],
function(
	Character
){
	
	return Toolbox.Base.extend({
		people: [],
		constructor: function(){

		},
		birthPerson: function(options){
			var person = new Character(options);
			this.people.push(person);
			return person;
		},
		removePerson: function(personId){

		},
		tick: function(){
			_(this.people).each(function(person){
				person.tick();
			});
		}
	});

});