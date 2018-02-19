"use strict";
app.controller("evoanimalController", function($scope, $location, $window){

	$scope.table_name = "evolucao";
	$scope.primary_key = "id";
			
	$scope.init = function(){
		$scope.initAnimal();
		$scope.initTaxas();
	}

	/* INICIA AS TAXAS NA VARIAVEL */
	$scope.initTaxas = function(){
		$scope.itemBanco = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM "+$scope.table_name+" WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					$scope.itemBanco[i-1] = data[0];
					console.log("Carregou Taxas..");
				}else{
					console.log("Nao Carregou Taxas..");
					$('#evoanimalnewController').modal('show');
					//$scope.newTaxas();
				}
			});
		}
	}

	$scope.initAnimal = function(){
		$scope.itemAnimais = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM animal WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					$scope.itemAnimais[i-1] = data;
					console.log("Carregou Animais..");
				}else{
					console.log("Nao Carregou Animais..");
					$location.path('/animal');
				}
			});
		}
	}

	$scope.newTaxas = function(){
		$('#evoanimalnewController').modal('hide');
		for(var i=1;i<=10;i++){
			//$scope.form = {};
			$scope.form.id;
			$scope.form.ano=i;
			$scope.form.propriedadeId_FK = $scope.getIdPropriedade();
			$scope.new();
		}
	}

	$scope.getTaxas = function(){
		return {
				idadeabate : $scope.itemBanco[$scope.ano_atual-1].idade_abate,
				natalidade : $scope.itemBanco[$scope.ano_atual-1].natalidade/100,
				mortalidadeCria : $scope.itemBanco[$scope.ano_atual-1].mortalidade_cria/100,
				mortalidadeRecria : $scope.itemBanco[$scope.ano_atual-1].mortalidade_recria/100,
				mortalidadeAdultos : $scope.itemBanco[$scope.ano_atual-1].mortalidade_adultos/100,
				descarteMatrizes : $scope.itemBanco[$scope.ano_atual-1].descarte_matrizes/100,
				descarteBezerras : $scope.itemBanco[$scope.ano_atual-1].descarte_bezerras/100,
				descarteNovilha1 : $scope.itemBanco[$scope.ano_atual-1].descarte_novilha1/100,
				descarteNovilha2 : $scope.itemBanco[$scope.ano_atual-1].descarte_novilha2/100
		};
	}

	$scope.initAnos = function(){
		var anos = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

	}

	$scope.updateAno = function(ano){
		$scope.ano_atual = ano;

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
		console.log("Gerou ano:"+$scope.ano_atual);
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
		switch(ano){
			case 0:
				return $scope.itemAnimais[ano][tipo-1].qtd;
			case 1:
				return 0;
			default:
				return $scope.itemAnimais[ano-1][tipo-1].qtd;
		}
	}

	// Calcula valor de Cabeças Inicial
	$scope.getCabi = function(ano, tipo){
		var res = 0;
		
		if(ano == 1){
			res = $scope.getComp(ano-1, tipo);
		}else if(ano > 3 && tipo == 1){
			res = $scope.getCabf(ano-1, tipo) + $scope.getComp(ano-1, tipo) + $scope.getCabf(ano-1, 8);
		}else{
			switch(tipo){
				case 3:
				case 6:
					res = $scope.getComp(ano, tipo);
					break;
				case 4:
				case 5:
				case 7:
				case 8:
					res = $scope.getCabf(ano-1, tipo-1) + $scope.getComp(ano-1, tipo-1);
					break;

				case 9:
					res = $scope.getCabf(ano-1, 5) + $scope.getComp(ano-1, 5);
					break;

				default:
					res = $scope.getCabf(ano-1, tipo) + $scope.getComp(ano-1, tipo);
			}			
		}

		return res;
	}

	// Calcula valor de Cabeças Final
	$scope.getCabf = function(ano, tipo){
		var res = 0;

		if(ano == 1){
			if(tipo == 3 || tipo == 6){
				res = $scope.getCabi(ano, tipo) + $scope.getNasc(ano, tipo) - $scope.getMort(ano, tipo) - $scope.getVend(ano, tipo);
			}else{
				res = $scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo) - $scope.getVend(ano, tipo);
			}
		}else{
			if(tipo == 3 || tipo == 6){
				res = $scope.getCabi(ano, tipo) + $scope.getComp(ano, tipo) + $scope.getNasc(ano, tipo) - $scope.getMort(ano, tipo) - $scope.getVend(ano, tipo);
			}else{
				res = $scope.getCabi(ano, tipo) + $scope.getComp(ano, tipo) - $scope.getMort(ano, tipo) - $scope.getVend(ano, tipo);
			}
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
				res = ($scope.getCabi(ano,tipo) + $scope.getComp(ano,tipo) + $scope.getNasc(ano, tipo)) * $scope.getTaxas().mortalidadeCria;
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
		$scope.form.ano = $scope.ano_atual;

		var id = $scope.form[$scope.primary_key];
		delete $scope.form[$scope.primary_key];
		delete $scope.form.$$hashKey;
		basel.database.update($scope.table_name, $scope.form, {"ano": $scope.form.ano}); //entidade, dados, where

		$('#evoanimalController').modal('hide');
		$scope.form = {};
		//$scope.updateAno(1);
	}

	$scope.new = function(){
		basel.database.insert($scope.table_name, $scope.form); // entidade, dados

		//$scope.form = {};
	}

	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(){
		//$scope.init();
		$scope.form = $scope.itemBanco[$scope.ano_atual];
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