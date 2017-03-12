"use strict";
app.controller("mainController", function($scope, $location, AuthenticationService){
	$scope.app = basel.config;
	$scope.menus = basel.menu();
	
	$scope.logoff = function (){
		AuthenticationService.ClearCredentials();
		$location.path('/');
	}
});