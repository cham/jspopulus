(function(){
	'use strict';

	var testFiles = [
		'spec/Agent.tests.js',
		'spec/Character.tests.js',
		'spec/Locations.tests.js'
	];

	mocha.setup({
	    ui: 'bdd',
	    globals: ['jQuery']
	});
	require(testFiles, function(){
	    'use strict';
	    mocha.run();
	});

})();