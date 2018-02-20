"use strict";
app.controller("evoanimalController", function($scope, $location, $window){

	$scope.table_name = "evolucao";
	$scope.primary_key = "id";
	var TAXAS_BANCO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var REBANHO_BANCO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANO_ATUAL = 1;
	var TAXAS = { idadeabate : 0,
					natalidade : 0,
					mortalidadeCria : 0,
					mortalidadeRecria : 0,
					mortalidadeAdultos : 0,
					descarteMatrizes : 0,
					descarteBezerras : 0,
					descarteNovilha1 : 0,
					descarteNovilha2 : 0 };

			
	$scope.init = function(){
		$scope.initRebanho();
		$scope.initTaxas();
	}

	/* INICIA AS TAXAS NA VARIAVEL */
	$scope.initTaxas = function(){
		//TAXAS_BANCO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM "+$scope.table_name+" WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					TAXAS_BANCO[i-1] = data[0];
					console.log("Carregou Taxas..");
				}else{
					console.log("Nao Carregou Taxas..");
					$('#evoanimalnewController').modal('show');
				}
			});
		}
	}

	/* INICIA O REBANHO NA VARIAVEL */
	$scope.initRebanho = function(){
		//REBANHO_BANCO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM animal WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					REBANHO_BANCO[i-1] = data;
					console.log("Carregou Animais..");
				}else{
					console.log("Nao Carregou Animais..");
					$location.path('/animal');
				}
			});
		}
	}

	

	$scope.getTaxas = function(){
		return {
				idadeabate : TAXAS_BANCO[ANO_ATUAL-1].idade_abate,
				natalidade : TAXAS_BANCO[ANO_ATUAL-1].natalidade/100,
				mortalidadeCria : TAXAS_BANCO[ANO_ATUAL-1].mortalidade_cria/100,
				mortalidadeRecria : TAXAS_BANCO[ANO_ATUAL-1].mortalidade_recria/100,
				mortalidadeAdultos : TAXAS_BANCO[ANO_ATUAL-1].mortalidade_adultos/100,
				descarteMatrizes : TAXAS_BANCO[ANO_ATUAL-1].descarte_matrizes/100,
				descarteBezerras : TAXAS_BANCO[ANO_ATUAL-1].descarte_bezerras/100,
				descarteNovilha1 : TAXAS_BANCO[ANO_ATUAL-1].descarte_novilha1/100,
				descarteNovilha2 : TAXAS_BANCO[ANO_ATUAL-1].descarte_novilha2/100
		};
	}

	$scope.initAnos = function(){
		

	}

	$scope.updateAno = function(ano){
		ANO_ATUAL = ano;
		TAXAS = $scope.getTaxas();

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
		console.log("Gerou ano:"+ANO_ATUAL);
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
			cabi : Math.round($scope.getCabi(ano, tipo)),
			uai : Math.round(uaAnimal[tipo] * $scope.getCabi(ano, tipo)),
			cabf : Math.round($scope.getCabf(ano,tipo)),
			uaf : Math.round(uaAnimal[tipo] * $scope.getCabf(ano, tipo)),
			mortes : Math.round($scope.getMort(ano, tipo)),
			compras : Math.round($scope.getComp(ano, tipo)),
			vendas : Math.round($scope.getVend(ano, tipo)),
			nasc : Math.round($scope.getNasc(ano, tipo))
		};
	}

	// Calcula valor de Compras
	$scope.getComp = function(ano, tipo){
		switch(ano){
			case 0:
				return REBANHO_BANCO[ano][tipo-1].qtd;
			case 1:
				return 0;
			default:
				return REBANHO_BANCO[ano-1][tipo-1].qtd;
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
			res = ((($scope.getCabi(ano, 1) * TAXAS.natalidade) /2) + (($scope.getComp(ano, 1) * TAXAS.natalidade) /2)) - $scope.getCabi(ano, tipo);
		}

		return res;
	}

	// Calcula valor de Mortes
	$scope.getMort = function(ano, tipo){
		var res = 0;

		switch(tipo){
			case 3:
			case 6:
				res = ($scope.getCabi(ano,tipo) + $scope.getComp(ano,tipo) + $scope.getNasc(ano, tipo)) * TAXAS.mortalidadeCria;
				break;
			
			case 4:
			case 7:
				res = ($scope.getCabi(ano,tipo) + $scope.getComp(ano,tipo)) * TAXAS.mortalidadeRecria;
				break;
			
			default:
				res = ($scope.getCabi(ano,tipo) + $scope.getComp(ano,tipo)) * TAXAS.mortalidadeAdultos;
		}
		
		return res;
	}

	// Calcula valor de Vendas
	$scope.getVend = function(ano, tipo){
		var res = 0;

		switch(tipo){
			case 1:
				res = ($scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo)) * TAXAS.descarteMatrizes;
				break;
			
			case 6:
				res = ($scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo)) * TAXAS.descarteBezerras;
				break;
			
			case 7:
				res = ($scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo)) * TAXAS.descarteNovilha1;
				break;
			
			case 8:
				res = ($scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo)) * TAXAS.descarteNovilha2;
				break;

			case 9:
				res = $scope.getCabi(ano, tipo) - $scope.getMort(ano, tipo);
				break;

			default:
				res = 0;
		}

		return res;
	}

	$scope.getIdPropriedade = function(){
		return $window.localStorage.getItem("idPropriedade");
	}

	$scope.save = function(){
		$scope.form.propriedadeId_FK = $scope.getIdPropriedade();
		$scope.form.ano = ANO_ATUAL;

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

	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(){
		//$scope.init();
		$scope.form = TAXAS_BANCO[ANO_ATUAL];
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