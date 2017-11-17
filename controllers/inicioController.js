"use strict";
app.controller("inicioController", function($scope, $rootScope, $location, $window){

	$scope.table_name = "propriedade";
	$scope.primary_key = "id";
	
	//List
	$scope.list = function(){
		$scope.idPropriedade = $scope.getId();

		if ($scope.idPropriedade == null){
			basel.database.runAsync("SELECT * FROM "+$scope.table_name, function(data){
				if(data[0] != null){
					$scope.items = data;
					$('#selectController').modal('show');
				}else{
					$('#inicioController').modal('show');
					//Não tem propriedades
				}
			});
		} else {
			basel.database.runAsync("SELECT * FROM "+$scope.table_name+" WHERE id="+$scope.idPropriedade, function(data){
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
		$window.localStorage['idPropriedade'] = id;
		$scope.list();
	}

	$scope.getId = function(){
		return $window.localStorage.getItem("idPropriedade");
	}

	$scope.clearId = function(){
		$window.localStorage.removeItem("idPropriedade");
		$scope.list();
	}

	$scope.getUser = function(){
		return $rootScope.globals.currentUser.username
	}

	$scope.hideSelect = function(){
		$('#selectController').modal('hide');
	}

	//Saving
	$scope.save = function(){
		$scope.form.usuarioLogin_FK = $scope.getUser();

		if($scope.form[$scope.primary_key]){
			//Edit
			var id = $scope.form[$scope.primary_key];
			delete $scope.form[$scope.primary_key];
			delete $scope.form.$$hashKey; //Apaga elemento $$hashKey do objeto
			basel.database.update($scope.table_name, $scope.form, {id: id}); //entidade, dados, where
		}else{
			//new
			basel.database.insert($scope.table_name, $scope.form); // entidade, dados
		}
		$scope.form = {};
		$scope.list();
		$('#inicioController').modal('hide');
	}

	// Cancel form
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
			basel.database.delete($scope.table_name, {id: data[$scope.primary_key]});
			basel.database.delete("animal", {propriedadeId_FK: data[$scope.primary_key]});
			basel.database.delete("benfeitorias", {propriedadeId_FK: data[$scope.primary_key]});
			basel.database.delete("manutencao", {propriedadeId_FK: data[$scope.primary_key]});
			basel.database.delete("maquinas", {propriedadeId_FK: data[$scope.primary_key]});
			$scope.list();
		}
	}
});