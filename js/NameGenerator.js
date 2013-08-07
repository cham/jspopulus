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
		}
	});

	return new NameGenerator();

});