"use strict";
app.controller("mainController", function($scope, $rootScope, $location, AuthenticationService){
	$scope.app = basel.config;
	$scope.menus = basel.menu();
	
	$scope.logoff = function (){
		AuthenticationService.ClearCredentials();
		$location.path('/login');
	}

	$scope.getUser = function(){
		if($rootScope.globals.currentUser){
			return $rootScope.globals.currentUser.username	
		}else{
			return null;
		}		
	}

});