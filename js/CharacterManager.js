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
			var self = this,
				person = new Character(_(options).extend({
					onBirth: function(options){
						self.birthPerson(options);
					},
					onDeath: function(person){
						self.removePerson(person.id);
					}
				}));
			this.people.push(person);
			return person.id;
		},
		removePerson: function(personId){
			var index,
				person = _(this.people).find(function(person, i){
					if(person.id === personId){
						index = i;
						return true;
					}
				});

			delete this.people[index];
			this.people = _.compact(this.people);
		},
		tick: function(){
			_(this.people).each(function(person){
				person.tick();
			});
		}
	});

});