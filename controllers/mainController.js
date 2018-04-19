"use strict";
app.controller("mainController", function($scope, $rootScope, $location, AuthenticationService){
	$scope.app = basel.config;
	$scope.menus = basel.menu();
	
	$scope.logoff = function (){
		AuthenticationService.ClearCredentials();
		localStorage.clear();
		$location.path('/login');
	}

	$scope.menuPro = function (){
		$('#projecaoMenu').modal('show');
	}

	$scope.menuAdm = function (){
		$('#admMenu').modal('show');
	}

	$scope.redir = function(location){
		$('#projecaoMenu').modal('hide');
		$('#admMenu').modal('hide');
		$location.path(location);	
	}

});