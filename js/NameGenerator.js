define([
	'data/nameoptions'
],
function(
	nameoptions
){

	var NameGenerator = Toolbox.Base.extend({
		getName: function(gender){
			var possibleNames = nameoptions.firstnames[gender],
				numNames = possibleNames.length,
				selectedName = Math.floor(Math.random() * numNames);

			return possibleNames[selectedName];
		},
		getSurname: function(gender, current, fatherName){
			if(!fatherName){
				return '';
			}
			if(!current){		
				return fatherName + (gender === 'male' ? 'son' : 'dottir');
			}

			return this.morphSurname(current);
		},
		morphSurname: function(base){
			var surname = _([
				{ chance: 0.7,  match: /(\w)\1+?/, replace: '$1' },
				{ chance: 0.05, match: /a/, replace: 'ae' },
				{ chance: 0.05, match: /e/, replace: 'ee' },
				{ chance: 0.1,  match: /i/, replace: 'y' },
				{ chance: 0.1,  match: /o/, replace: 'u' },
				{ chance: 0.1,  match: /u/, replace: 'uv' },
				{ chance: 0.2,  match: /s/, replace: 'ss' },
				{ chance: 0.05, match: /ss/, replace: 'ff' },
				{ chance: 0.05, match: /do/, replace: 'no' },
				{ chance: 0.2,  match: /on/, replace: 'en' },
				{ chance: 0.1,  match: /tir/, replace: 'ter' },
				{ chance: 0.05, match: /yn/, replace: 'yne' },
				{ chance: 0.05, match: /son/, replace: 'zon' },
				{ chance: 0.1,  match: /ll/, replace: 'l' }
			]).reduce(function(morphed, morphRules){
				if(Math.random() < morphRules.chance){
					morphed = morphed.replace(morphRules.match, morphRules.replace);
				}
				return morphed;
			},base.toLowerCase());

			return surname.charAt(0).toUpperCase() + surname.slice(1);
		}
	});

	return new NameGenerator();

});