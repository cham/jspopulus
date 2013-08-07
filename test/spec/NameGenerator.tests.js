define([
	'NameGenerator'
],
function(
	NameGenerator
){
	'use strict';

	describe('NameGenerator', function(){

		var decisions,
			clock = sinon.useFakeTimers();

		beforeEach(function(){
			nameGen = NameGenerator;
		});

		afterEach(function(){
			decisions = undefined;
			clock.restore();
			Locations.reset();
		});

		describe('initialisation', function(){
			it('is a singleton', function(){
				var makeNewError;

				expect(typeof NameGenerator).toEqual('object');
				
				try{
					new NameGenerator();
				}catch(e){
					makeNewError = e;
				}

				expect(makeNewError.toString()).toEqual('object is not a function');
			});
		});
	});
});