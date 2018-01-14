app.factory('listener', function ($rootScope, $timeout) {    

	return {
		update: function (callback) {
			$timeout(() => {
				$rootScope.$apply(() => {
					if(callback) callback.apply()
				})
			})
		}
  	}
})

app.factory('Dialog', function(){

	return {
		error: (message = "Ocorreu um erro", title = "Ops") => {
			return swal(title, message, 'error')
		},
		
		info: (message, title = "Aviso") => {
			return swal(title, message, 'info')
		},

		success: (message, title ="Finalizado") => {
			return swal(title, message, 'success')
		},

		warning: (message, title = "Aviso") => {
			return swal(title, message, 'warning')
		},

		confirm: function(message, callback) {
			return swal({
				title: "Confirmar ação",
				text: message,
				type: "question",
				showCancelButton: true,				
			})
			.then(
				result => {
					if(result.value) {
						if(callback) callback()
					}
				},
				() => {} // dismiss, cancel, overlay, close and timer
			)
		},

		toast: function(title, message, timeout = 10000) {
			iziToast.show({
				title: title,
				message: message,
				timeout: timeout
			})
		}
	}
})
