"use strict";
app.controller("propriedadeController", function($scope, $location){

	$scope.table_name = "propriedade";
	$scope.primary_key = "id";

	//List
	$scope.list = function(){
		basel.database.runAsync("SELECT * FROM "+$scope.table_name, function(data){
			if(data[0] != null){
				$scope.items = data;
			}else{
				$('#propriedadeController').modal('show');
			}
		});
	}

	//Saving
	$scope.save = function(){
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
		$('#propriedadeController').modal('hide');
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(data){
		$scope.form = data;
		$('#propriedadeController').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Are you sure?")){
			basel.database.delete($scope.table_name, {id: data[$scope.primary_key]});
			$scope.list();
		}
	}
});