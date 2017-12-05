"use strict";
app.controller("evoanimalController", function($scope, $location, $window){

	$scope.table_name = "evolucao";
	$scope.primary_key = "propriedadeId_FK";
		
	$scope.init = function(){
		var SQL = "SELECT * FROM "+$scope.table_name+" WHERE propriedadeId_FK="+$scope.getIdPropriedade();
		
		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				$scope.itemBanco = data[0];
				$scope.existe = true;
			}else{
				$scope.existe = false;
				console.log("nao existe variaveis");
				$('#evoanimalController').modal('show');
			}
		});
	}

	$scope.getAnimais = function(ano){
		var SQL = "SELECT * FROM animal WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+ano;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				$scope.itemAnimais = data;
				console.log("existe animais");
			}else{
				console.log("nao existe animais");
			}
		});
	}

	$scope.getTaxas = function(){
		return {
				idadeabate : $scope.itemBanco.idade_abate,
				natalidade : $scope.itemBanco.natalidade/100,
				mortalidadeCria : $scope.itemBanco.mortalidade_cria/100,
				mortalidadeRecria : $scope.itemBanco.mortalidade_recria/100,
				mortalidadeAdultos : $scope.itemBanco.mortalidade_adultos/100,
				descarteMatrizes : $scope.itemBanco.descarte_matrizes/100,
				descarteBezerras : $scope.itemBanco.descarte_bezerras/100,
				descarteNovilha1 : $scope.itemBanco.descarte_novilha1/100,
				descarteNovilha2 : $scope.itemBanco.descarte_novilha2/100
		};
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

	// Calcula valor de Compras
	$scope.getComp = function(ano, tipo){
		$scope.getAnimais(ano);
	
		return $scope.itemAnimais[tipo-1].qtd;
	}

	// Calcula valor de Cabeças Inicial
	$scope.getCabi = function(ano, tipo){
		var res = 0;
		
		if(ano == 1){
			res = $scope.getComp(ano, tipo);
		}else{
			res = $scope.getCabf(ano-1, tipo) + $scope.getComp(ano-1, tipo);
		}

		return res;
	}

	// Calcula valor de Cabeças Final
	$scope.getCabf = function(ano, tipo){
		var res = 0;

		if(ano == 1){
			res = $scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo) - $scope.getVend(ano, tipo);
		}else{
			res = $scope.getCabi(ano, tipo) + $scope.getComp(ano, tipo) - $scope.getMort(ano, tipo) - $scope.getVend(ano, tipo);
		}

		return res;
	}

	// Calcula valor de Nascimentos
	$scope.getNasc = function(ano, tipo){
		var res = 0;
		
		if(tipo == 3 || tipo == 6){
			res = ((($scope.getCabi(ano, 1) * $scope.getTaxas().natalidade) /2) + (($scope.getComp(ano, 1) * $scope.getTaxas().natalidade) /2)) - $scope.getCabi(ano, tipo);
		}

		return res.toFixed(0);
	}

	// Calcula valor de Mortes
	$scope.getMort = function(ano, tipo){
		var res = 0;

		switch(tipo){
			case 3:
			case 6:
				res = ($scope.getCabi(ano,tipo) + $scope.getComp(ano,tipo)) * $scope.getTaxas().mortalidadeCria;
				break;
			
			case 4:
			case 7:
				res = ($scope.getCabi(ano,tipo) + $scope.getComp(ano,tipo)) * $scope.getTaxas().mortalidadeRecria;
				break;
			
			default:
				res = ($scope.getCabi(ano,tipo) + $scope.getComp(ano,tipo)) * $scope.getTaxas().mortalidadeAdultos;
		}
		
		return res.toFixed(0);
	}

	// Calcula valor de Vendas
	$scope.getVend = function(ano, tipo){
		var res = 0;

		switch(tipo){
			case 1:
				res = ($scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo)) * $scope.getTaxas().descarteMatrizes;
				break;
			
			case 6:
				res = ($scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo)) * $scope.getTaxas().descarteBezerras;
				break;
			
			case 7:
				res = ($scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo)) * $scope.getTaxas().descarteNovilha1;
				break;
			
			case 8:
				res = ($scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo)) * $scope.getTaxas().descarteNovilha2;
				break;

			case 9:
				res = $scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo);
				break;

			default:
				res = 0;
		}

		return res.toFixed(0);
	}

	$scope.getIdPropriedade = function(){
		return $window.localStorage.getItem("idPropriedade");
	}

	$scope.save = function(){
		$scope.form.propriedadeId_FK = $scope.getIdPropriedade();

		if($scope.existe){
			var id = $scope.form[$scope.primary_key];
			delete $scope.form[$scope.primary_key];
			delete $scope.form.$$hashKey;
			basel.database.update($scope.table_name, $scope.form, {"propriedadeId_FK": id}); //entidade, dados, where
			console.log("velho");
		}else{
			basel.database.insert($scope.table_name, $scope.form); // entidade, dados
			console.log("novo");
			$scope.existe = true;
		}
		$('#evoanimalController').modal('hide');
		$scope.form = {};
		$scope.updateAno(1);
	}

	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(){
		$scope.init();
		$scope.form = $scope.itemBanco;
		$('#evoanimalController').modal('show');
	}

	/*
	$scope.delete = function(data){
		if(confirm("Are you sure?")){
			basel.database.delete($scope.table_name, {PRIMARY_KEY: data[$scope.primary_key]});
			$scope.list();
		}
	}*/
});