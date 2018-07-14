"use strict";
app.controller("mainController", function($scope, $rootScope, $location, AuthenticationService){
	$scope.app = basel.config;
	$scope.menus = basel.menu();

	var ADM_PAGES = {"/inventario" : 0, "/depreciacoes" : 1, "/vrebanho" : 2, "/custoFixo" : 3, "/custoVariavel" : 4,
		"/custoAdm" : 5, "/investimento" : 6, "/custoOperacional" : 7, "/custoOportunidade" : 8, "/custoTotal" : 9, "/receita" : 10};
	var PRO_PAGES = {"/maquinas" : 0, "/benfeitorias" : 1, "manutencao" : 2, "/rebanho" : 3, "evolucao" : 4, "cria" : 5};
	var ATUAL = { key : -1, value : "", selected : -1};
	
	$scope.logoff = function (){
		AuthenticationService.ClearCredentials();
		localStorage.clear();
		$location.path('/login');
	}

	$scope.menuPro = function (){
		ATUAL.selected = 0
		$('#projecaoMenu').modal('show');
	}

	$scope.menuAdm = function (){
		ATUAL.selected = 1
		$('#admMenu').modal('show');
	}

	$scope.redir = function(location){
		if(ATUAL.selected == 0){
			ATUAL.key = PRO_PAGES[location];
			ATUAL.value = location;
		}else if(ATUAL.selected == 1){
			ATUAL.key = ADM_PAGES[location];
			ATUAL.value = location;
		}
		console.log("Redirecionando.. "+ATUAL.value);
		$('#projecaoMenu').modal('hide');
		$('#admMenu').modal('hide');
		$location.path(location);	
	}

	$scope.next = function (){
		if(ATUAL.selected == 0){
			if (ATUAL.key >= 0){
				for(var page in PRO_PAGES){
					if (PRO_PAGES[page] == ATUAL.key+1){
						$scope.redir(page);
						break;
					}
				}
			}
		}else if(ATUAL.selected == 1){
			if (ATUAL.key >= 0){
				for(var page in ADM_PAGES){
					if (ADM_PAGES[page] == ATUAL.key+1){
						$scope.redir(page);
						break;
					}
				}
			}
		} 	
	}

	$scope.prev = function (){
		if(ATUAL.selected == 0){
			if (ATUAL.key >= 0){
				for(var page in PRO_PAGES){
					if (PRO_PAGES[page] == ATUAL.key-1){
						$scope.redir(page);
						break;
					}
				}
			}
		}else if(ATUAL.selected == 1){
			if (ATUAL.key >= 0){
				for(var page in ADM_PAGES){
					if (ADM_PAGES[page] == ATUAL.key-1){
						$scope.redir(page);
						break;
					}
				}
			}
		}	
	}

});