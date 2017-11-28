"use strict";
app.controller("evoanimalController", function($scope, $location){

	$scope.table_name = "evoanimal";
	$scope.primary_key = "id";

	//List
	$scope.list = function(){
		basel.database.runAsync("SELECT * FROM "+$scope.table_name+" WHERE propriedadeId_FK="+$scope.getIdPropriedade(), function(data){
			if(data[0] != null){

				$scope.classificacao = data[0].classificacao;
				$scope.caracterizacao = data[0].caracterizacao;
				$scope.idadeabate = data[0].idadeabate;
				$scope.tnatalidade = data[0].tnatalidade;
				$scope.tmcria = data[0].tmcria;
				$scope.tmrecria = data[0].tmrecria;
				$scope.tmadultos = data[0].tmadultos;
				$scope.tdmatrizes = data[0].tdmatrizes;
				$scope.tdbezerras = data[0].tdbezerras;
				$scope.tdnovilha = data[0].tdnovilha;
				$scope.tdnovilha2 = data[0].tdnovilha2;
				console.log("existe");
				
			}else{
				console.log("existe nao");
				$('#evoanimalController').modal('show');
			}
		});
	}

	$scope.getIdPropriedade = function(){
		return $window.localStorage.getItem("idPropriedade");
	}

	//Saving
	$scope.save = function(){
		if($scope.form[$scope.primary_key]){
			//Edit
			var id = $scope.form[$scope.primary_key];
			delete $scope.form[$scope.primary_key];
			delete $scope.form.$$hashKey; //Apaga elemento $$hashKey do objeto
			basel.database.update($scope.table_name, $scope.form, {PRIMARY_KEY: id}); //entidade, dados, where
		}else{
			//new
			basel.database.insert($scope.table_name, $scope.form); // entidade, dados
		}
		$scope.form = {};
		$scope.list();
		$('#evoanimalController').modal('hide');
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(data){
		$scope.form = data;
		$('#evoanimalController').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Are you sure?")){
			basel.database.delete($scope.table_name, {PRIMARY_KEY: data[$scope.primary_key]});
			$scope.list();
		}
	}
});