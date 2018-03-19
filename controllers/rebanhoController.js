"use strict";
app.controller("rebanhoController", function($scope, $location, $window, Propriedade){

	$scope.table_name = "rebanho";
	$scope.primary_key = "id";
	$scope.tipoAnimal = {
		1 : "Matrizes",
		2 : "Reprodutores", 
		3 : "Bezerros", 
		4 : "Novilhos +1 anos", 
		5 : "Novilhos +2 anos", 
		6 : "Bezerras", 
		7 : "Novilhas +1 anos", 
		8 : "Novilhas +2 anos",
		9 : "Novilhos +3 anos"
		};

	/* Cria Tabela do Rebanho */
	$scope.create = function(){
		for (var a=1; a<=10; a++){
			for (var i=1; i<=9; i++){
				$scope.form = {};
				$scope.form.id;
				$scope.form.tipo = i;
				$scope.form.ano = a;
				$scope.form.qtd = 0;
				$scope.form.valor = 0;
				$scope.form.peso = 0;
				$scope.form.propriedadeId_FK = Propriedade.getId();
				$scope.new();
			}
		}		
		$scope.list(1);	
	}

	/* Lista Rebanho da Propriedade x no ano y */
	$scope.list = function(a){
		basel.database.runAsync("SELECT * FROM "+$scope.table_name+" WHERE propriedadeId_FK="+Propriedade.getId()+" AND ano="+a, function(data){
			if(data[0] != null){
				$scope.items = data;
				console.log("existe");
			}else{
				console.log("existe nao");
				$scope.create();
			}
		});
	}

	/* Salvando no Banco */
	$scope.save = function(){
		var id = $scope.form[$scope.primary_key];
		delete $scope.form[$scope.primary_key];
		delete $scope.form.$$hashKey; 
		basel.database.update($scope.table_name, $scope.form, {id: id}); //entidade, dados, where
		
		$scope.form = {};
		$('#rebanhoController').modal('hide');
	}

	/* Inserindo no Banco */
	$scope.new = function(){
		basel.database.insert($scope.table_name, $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.edit = function(data){
		$scope.form = data;
		$('#rebanhoController').modal('show');
	}

	$scope.cancel = function(){
		$scope.form = {};
	}

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