"use strict";
app.controller("manutencaoController", function($scope, $location, Propriedade){

	$scope.table_name = "manutencao";
	$scope.primary_key = "id";

	//List
	$scope.list = function(){
		basel.database.runAsync("SELECT * FROM "+$scope.table_name+" WHERE propriedadeId_FK="+Propriedade.getId(), function(data){
			$scope.items = data;
		});
	}

	//Saving
	$scope.save = function(){
		$scope.form.propriedadeId_FK = Propriedade.getId();

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
		$('#manutencaoController').modal('hide');
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(data){
		$scope.form = data;
		$('#manutencaoController').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Are you sure?")){
			basel.database.delete($scope.table_name, {id: data[$scope.primary_key]});
			$scope.list();
		}
	}
});