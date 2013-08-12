define([
	'Locations'
],
function(
	Locations
){

	return {
		getJob: function(characterState){
			var target;

			characterState = characterState || {};

			if(characterState.hunger > 250){
				if(characterState.inventory && characterState.inventory.food>0){
					return {
						type: 'eat',
						inventory: 'food'
					};
				}
			}

			if(characterState.hunger > 200 && (!characterState.inventory || !characterState.inventory.food || characterState.inventory.food < 2)){
				target = Locations.findClosestLocation({type: 'food'}, characterState.position);
				if(target){
					if(_.isEqual(target.position, characterState.position)){
						return {
							type: 'get',
							inventory: 'food',
							quantity: 10
						};
					}else{
						return {
							type: 'travel',
							target: 'food',
							location: target
						};
					}
				}
			}

			if(characterState.hunger < 200 && characterState.sexdrive > 100){
				target = Locations.findAgent({
					sexdrive: function(sexdrive){ return sexdrive > 100; },
					gender: characterState.gender === 'male' ? 'female' : 'male'
				});
				if(target){
					if(_.isEqual(target.position, characterState.position)){
						return {
							type: 'mate',
							agent: target
						};
					}else{
						return {
							type: 'travel',
							location: target
						};
					}
				}
			}

			return {
				type: 'idle'
			};
		},
		addAgent: function(agent){
			Locations.addAgent(agent);
		},
		removeAgent: function(agent){
			Locations.removeAgent(agent);
		}
	};

});