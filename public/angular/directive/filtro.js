app.filter("filtro", function(){

	return function(items, term, property) {

		if(!term.length) return items

		let filtered = []

		for(let i = 0; i < items.length; i++) {

			let formated = items[i][property].toUpperCase()

			formated = formated
							.replace("Á","A")
							.replace("É","E")
							.replace("Í","I")
							.replace("Ú","U")
							.replace("Ç","c")

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
		replace: true,
		transclude: true,
		scope: {
			placeholder: "@",
			ngModel: "="
		},
		template: `
			<form class="ui input fluid">
			  <input
			  	type="text"
			  	placeholder="{{ placeholder || 'Pesquisar..' }}"
			  	ng-model="ngModel"
			  	autofocus>
			</form>
		`
	}
})
