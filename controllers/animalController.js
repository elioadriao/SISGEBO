"use strict";
app.controller("animalController", function($scope, $location){

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
	$scope.ano = {1 : true, 2 : true, 3 : true, 4 : true, 5 : true, 6 : true, 7 : true, 8 :true, 9 : true, 10 :true};


	$scope.sincAno = function(){
		$scope.list();
		var j;

		for(i in $scope.ano){
			for(j in $scope.items){
				if($scope.items[j].ano == i){
					$scope.ano[i] = false;
				}
			}
		}
	}

	$scope.getAno = function(){
		$scope.sincAno();
		var result = 0;

		for(i in $scope.ano){
			if($scope.ano[i]){
				console.log(i);
				result = i;
				break;
			}
		}
		return result;
	}

	$scope.create = function(){
		var ano = $scope.getAno();
		if(ano == 0){
			alert("Limite de Anos Atingido!");
		}else{
			for (i=1;i<=8;i++){
				$scope.form = {};
				$scope.form.tipo = i;
				$scope.form.ano= ano;
				$scope.form.qtd = 0;
				$scope.form.valor = 0;
				$scope.form.peso = 0;
				$scope.save();
			}
		}
	}
	
	$scope.erase = function(a){
		basel.database.delete($scope.table_name, {ano: a});
		$scope.list();
	}

	//List
	$scope.list = function(){
		basel.database.runAsync("SELECT * FROM "+$scope.table_name, function(data){
			$scope.items = data;
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
		if(confirm("Deseja Resetar Linha?")){
			$scope.form = data;
			$scope.form.qtd = 0;
			$scope.form.valor = 0;
			$scope.form.peso = 0;
			$scope.save();
		}
	}
});