app.controller("membros", function($scope, Membros){

	$scope.membros = Membros.all()
})
