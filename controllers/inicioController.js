"use strict";
app.controller("inicioController", function($scope, $rootScope, $location, $window, AuthenticationService, Propriedade){
	
	$scope.reserva = {"10%" : 0.1, "15%" : 0.15, "20%" : 0.2, "25%" : 0.25, "30%" : 0.3, "35%" : 0.35, "40%" : 0.4, "45%" : 0.45, "50%" : 0.5};
	//Lista as Propriedades
	$scope.list = function(){
		$scope.idPropriedade = Propriedade.getId();

		if ($scope.idPropriedade == null){
			basel.database.runAsync("SELECT * FROM propriedade WHERE usuarioLogin_FK='"+$scope.getUser()+"'", function(data){
				if(data[0] != null){
					$scope.items = data;
					$('#selectModal').modal('show');
				}else{
					$('#selectModal').modal('hide');
					$('#inicioNewModal').modal('show');
					//Não tem propriedades
				}
			});
		} else {
			basel.database.runAsync("SELECT * FROM propriedade WHERE id="+$scope.idPropriedade, function(data){
				if(data[0] != null){
					$scope.atual = data[0];
				}else{
					$('#selectModal').modal('show');
					//Error
				}
			});
		}
	}

	$scope.setId = function(id){
		Propriedade.setId(id);
		$scope.list();
	}

	$scope.clearId = function(){
		Propriedade.clearId();
		$scope.list();
	}

	$scope.getUser = function(){
		if($rootScope.globals.currentUser){
			return $rootScope.globals.currentUser.username	
		}else{
			return null;
		}
	}

	$scope.logoff = function (){
		AuthenticationService.ClearCredentials();
		localStorage.clear();
		$location.path('/login');
	}

	$scope.hideSelect = function(){
		$('#selectModal').modal('hide');
	}

	//Salva no Banco
	$scope.save = function(){
		$scope.form.reserva = $scope.selectedReserva * $scope.form.area;
		$('#inicioModal').modal('hide');

		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey; 
		basel.database.update("propriedade", $scope.form, {id: id}); //entidade, dados, where

		$scope.form = {};
		$scope.list();
	}

	$scope.new = function(){
		$scope.form.usuarioLogin_FK = $scope.getUser();
		$scope.form.reserva = $scope.selectedReserva * $scope.form.area;
		$('#inicioNewModal').modal('hide');

		basel.database.insert("propriedade", $scope.form); // entidade, dados
		$scope.list();
	}

	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(data){
		$scope.form = data;
		$('#inicioModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		var Tables = ["propriedade", "inventario", "depreciacoes", "variacao_rebanho_area", "variacao_rebanho_qtd",
			 "variacao_rebanho_peso", "custo_fixo", "custo_variavel", "custo_adm", "investimento", "custo_operacional",
			 "receita", "balanco", "custo_oportunidade"];
		if(confirm("Deseja realmente Deletar Propriedade?")){
			for(i in Tables){
				basel.database.delete(Tables[i], {id: data["id"]});
			}

			$scope.list();
		}
	}
})
.factory('Propriedade', ['$window', function ( $window ) {
    var service = {};

    service.setId = function(id){
		$window.localStorage['idPropriedade'] = id;
	};

	service.getId = function(){
		return $window.localStorage.getItem("idPropriedade");
	};

	service.clearId = function(){
		$window.localStorage.removeItem("idPropriedade");
	};

	return service;
}]);