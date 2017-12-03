"use strict";
app.controller("evoanimalController", function($scope, $location, $window){

	$scope.table_name = "evolucao";
	$scope.primary_key = "id";
	//List
	
	$scope.getTaxas = function(){
		var SQL = "SELECT * FROM "+$scope.table_name+" WHERE propriedadeId_FK="+$scope.getIdPropriedade();
		
		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				return {
					idadeabate : data[0].idade_abate,
					natalidade : data[0].natalidade,
					mortalidadeCria : data[0].mortalidade_cria,
					mortalidadeRecria : data[0].mortalidade_recria,
					mortalidadeAdultos : data[0].mortalidade_adultos,
					descarteMatrizes : data[0].descarte_matrizes,
					descarteBezerras : data[0].descarte_bezerras,
					descarteNovilha1 : data[0].descarte_novilha1,
					descarteNovilha2 : data[0].descarte_novilha2
				};
			}else{
				console.log("nao existe");		
				$('#evoanimalController').modal('show');
				return {};
			}
		});
	}

	$scope.updateAno = function(ano){
		$scope.ano = [
			$scope.getLinha(ano, 1),
			$scope.getLinha(ano, 2),
			$scope.getLinha(ano, 3),
			$scope.getLinha(ano, 4),
			$scope.getLinha(ano, 5),
			$scope.getLinha(ano, 6),
			$scope.getLinha(ano, 7),
			$scope.getLinha(ano, 8),
			$scope.getLinha(ano, 9)
		];
	}

	$scope.getLinha = function(ano, tipo){
		var tipoAnimal = {
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
		var uaAnimal = {
			1 : 1.00,
			2 : 1.25, 
			3 : 0.4, 
			4 : 0.6, 
			5 : 0.8, 
			6 : 0.4, 
			7 : 0.6, 
			8 : 0.8,
			9 : 1.0
		};

		return {
			descricao : tipoAnimal[tipo],
			ua : uaAnimal[tipo],
			cabi : $scope.getCabi(ano, tipo),
			uai : uaAnimal[tipo] * $scope.getCabi(ano, tipo),
			cabf : $scope.getCabf(ano,tipo),
			uaf : uaAnimal[tipo] * $scope.getCabf(ano, tipo),
			mortes : $scope.getMort(ano, tipo),
			compras : $scope.getComp(ano, tipo),
			vendas : $scope.getVend(ano, tipo),
			nasc : $scope.getNasc(ano, tipo)
		};
	}

	$scope.getComp = function(ano, tipo){
		var SQL = "SELECT * FROM animal WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+ano;

		/*basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				return data[tipo-1].qtd;
				console.log("existe animais");
			}else{
				return 0;
				console.log("nao existe animais");
			}
		});*/
		return 1;
	}

	$scope.getCabi = function(ano, tipo){
		return 1;
	}

	$scope.getCabf = function(ano, tipo){
		return 1;
	}

	$scope.getNasc = function(ano, tipo){
		return 1;
	}

	$scope.getMort = function(ano, tipo){
		return 1;
	}

	$scope.getVend = function(ano, tipo){
		return 1;
	}

	$scope.getIdPropriedade = function(){
		return $window.localStorage.getItem("idPropriedade");
	}

	//Saving
	$scope.save = function(){
		$scope.form.propriedadeId_FK = $scope.getIdPropriedade();

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
		$scope.updateAno(1);
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