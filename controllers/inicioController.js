"use strict";
app.controller("inicioController", function($scope, $rootScope, $location, $window, AuthenticationService, Propriedade){
	
	//Lista as Propriedades
	$scope.list = function(){
		$scope.idPropriedade = Propriedade.getId();

		if ($scope.idPropriedade == null){
			basel.database.runAsync("SELECT * FROM propriedade WHERE usuarioLogin_FK='"+$scope.getUser()+"'", function(data){
				if(data[0] != null){
					$scope.items = data;
					$('#selectController').modal('show');
				}else{
					$('#selectController').modal('hide');
					$('#inicioController').modal('show');
					//Não tem propriedades
				}
			});
		} else {
			basel.database.runAsync("SELECT * FROM propriedade WHERE id="+$scope.idPropriedade, function(data){
				if(data[0] != null){
					$scope.atual = data[0];
				}else{
					$('#selectController').modal('show');
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
		$('#selectController').modal('hide');
	}

	//Salva no Banco
	$scope.save = function(){
		$scope.form.usuarioLogin_FK = $scope.getUser();

		if($scope.form["id"]){
			//Edit
			var id = $scope.form["id"];
			delete $scope.form["id"];
			delete $scope.form.$$hashKey; 
			basel.database.update("propriedade", $scope.form, {id: id}); //entidade, dados, where
		}else{
			//new
			basel.database.insert("propriedade", $scope.form); // entidade, dados
		}
		$scope.form = {};
		$scope.list();
		$('#inicioController').modal('hide');
	}

	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(data){
		$scope.form = data;
		$('#inicioController').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja realmente Deletar?")){
			basel.database.delete("propriedade", {id: data["id"]});
			basel.database.delete("animal", {propriedadeId_FK: data["id"]});
			basel.database.delete("benfeitorias", {propriedadeId_FK: data["id"]});
			basel.database.delete("manutencao", {propriedadeId_FK: data["id"]});
			basel.database.delete("maquinas", {propriedadeId_FK: data["id"]});
			basel.database.delete("evolucao", {propriedadeId_FK: data["id"]});
			basel.database.delete("evolucao_taxas", {propriedadeId_FK: data["id"]});
			basel.database.delete("cria_taxas", {propriedadeId_FK: data["id"]});
			basel.database.delete("cria_desempenho", {propriedadeId_FK: data["id"]});
			basel.database.delete("cria_alimentacao", {propriedadeId_FK: data["id"]});
			basel.database.delete("cria_producao", {propriedadeId_FK: data["id"]});
			basel.database.delete("cria_operacional", {propriedadeId_FK: data["id"]});
			basel.database.delete("cria_balanco", {propriedadeId_FK: data["id"]});
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