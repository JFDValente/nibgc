app.filter("filtro", function(){

	return function(items, term, property) {			

		if(!term.length) return items

		let filtered = []

		for(let i = 0; i < items.length; i++) {

			let formated = items[i][property]

			formated = formated
							.replace("á","a")
							.replace("é","e")
							.replace("í","i")
							.replace("ç","c")

			formated = formated.toUpperCase()
			term = term.toUpperCase()			

			if(formated.indexOf(term) > -1) {
				filtered.push(items[i])
			}
		}

		return filtered
	}
})

app.directive("filter", function(){
	return {
		restrict: "EA",	
		scope: {
			placeholder: "@",
			model: "="			
		},
		template: `
			<form class="ui input"">
			  <input 
			  	type="text" 
			  	placeholder="{{ placeholder || 'Pesquisar..' }}" 
			  	ng-model="model"
			  	autofocus>			  
			</form>
		`
	}
})