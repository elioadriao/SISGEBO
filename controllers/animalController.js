"use strict";
app.controller("animalController", function($scope, $location, $window){

	$scope.table_name = "animal";
	$scope.primary_key = "id";
	$scope.tipoAnimal = {
		1 : "Matrizes",
		2 : "Reprodutores", 
		3 : "Bezerros", 
		4 : "Novilhos 1/2 anos", 
		5 : "Novilhos 2/3 anos", 
		6 : "Bezerras", 
		7 : "Novilhas 1/2 anos", 
		8 : "Novilhas 2/3 anos"
		};

	$scope.getIdPropriedade = function(){
		return $window.localStorage.getItem("idPropriedade");
	}

	$scope.initTable = function(){
		$scope.list(1);
		if($scope.items == null){
			$scope.create();
		}
	}

	$scope.create = function(){

		for (var a=1; a<=10; a++){
			for (var i=1; i<=8; i++){
				$scope.form = {};
				$scope.form.tipo = i;
				$scope.form.ano= a;
				$scope.form.qtd = 0;
				$scope.form.valor = 0;
				$scope.form.peso = 0;
				$scope.save();
			}
		}
		
		$scope.list(1);	
	}
	
	/*$scope.erase = function(a){
		basel.database.delete($scope.table_name, {ano: a});
		$scope.listWhere($scope.getAnoFalse());
	}

	
	$scope.list = function(){
		basel.database.runAsync("SELECT * FROM "+$scope.table_name, function(data){
			$scope.dados = data;
		});
	}*/

	$scope.list = function(a){
		basel.database.runAsync("SELECT * FROM "+$scope.table_name+" WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+a, function(data){
			$scope.items = data;
		});
	}

	//Saving
	$scope.save = function(){
		$scope.form.propriedadeId_FK = $scope.getIdPropriedade();

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
		$('#animalController').modal('hide');
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(data){
		$scope.form = data;
		$('#animalController').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Valores?")){
			$scope.form = data;
			$scope.form.qtd = 0;
			$scope.form.valor = 0;
			$scope.form.peso = 0;
			$scope.save();
		}
	}
});