"use strict";
app.controller("evolucaoController", function($scope, $location, $window){

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


	/* INICIA O REBANHO NA VARIAVEL */
	$scope.initRebanho = function(){	
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM rebanho WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;
			var res = false;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					REBANHO_BANCO[i-1] = data;
					//console.log(REBANHO_BANCO[i-1]);
					res =true;
				}else{
					res= false;
				}
			});
		}

		if(res){
			console.log("Carregou Animais..");
			$scope.initTaxas();
		}else{
			console.log("Nao Carregou Animais..");
			$location.path('/rebanho');
		}
	}

	/* INICIA AS TAXAS NA VARIAVEL */
	$scope.initTaxas = function(){			
		var SQL = "SELECT * FROM evolucao_taxas WHERE propriedadeId_FK="+$scope.getIdPropriedade();

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				for(var i=0;i<10;i++){
					TAXAS_BANCO[i] = data[i];
					//console.log(TAXAS_BANCO[i]);
				}
				console.log("Carregou Taxas..");
				$scope.initAnos();
			}else{
				console.log("Nao Carregou Taxas..");
				$('#evolucaonewController').modal('show');
			}
		});
				
	}

	/* INICIA OS ANOS NA VARIAVEL */
	$scope.initAnos = function(){	
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM evolucao WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;
			var res = false;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					ANOS[i-1] = data;
					res = true;
					console.log(ANOS[i-1]);		
				}else{
					res = false;			
				}
			});
		}

		if(res){
			console.log("Carregou Anos..");
		}else{
			$scope.newAno();
			console.log("Gerou Anos..");
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

	$scope.getAno = function(ano){
		ANO_ATUAL = ano;
		$scope.ano = ANOS[ano-1];
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

		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		basel.database.update("evolucao_taxas", $scope.form, {"ano": $scope.form.ano}); //entidade, dados, where

		$('#evolucaoController').modal('hide');
		$scope.form = {};
		//$scope.getAno(1);
	}

	$scope.newTaxas = function(){
		for(var i=1;i<=10;i++){
			//$scope.form = {};
			$scope.form.id;
			$scope.form.ano=i;
			$scope.form.propriedadeId_FK = $scope.getIdPropriedade();
			
			basel.database.insert("evolucao_taxas", $scope.form);
		}
		$('#evolucaonewController').modal('hide');
		$scope.initTaxas();
	}

	$scope.newAno = function(){
		for(var a=1; a<=10; a++){
			ANO_ATUAL = a;
			TAXAS = $scope.getTaxas();
			
			for(var i=0; i<9; i++){
				ANOS[a-1][i] = $scope.getLinha(a, i+1);

				$scope.form = {};
				$scope.form.id;
				$scope.form.descricao = ANOS[a-1][i].descricao;
				$scope.form.ua = ANOS[a-1][i].ua;
				$scope.form.uai = ANOS[a-1][i].uai;
				$scope.form.cabi = ANOS[a-1][i].cabi;
				$scope.form.cabf = ANOS[a-1][i].cabf;
				$scope.form.uaf = ANOS[a-1][i].uaf;
				$scope.form.mortes = ANOS[a-1][i].mortes;
				$scope.form.compras = ANOS[a-1][i].compras;
				$scope.form.vendas = ANOS[a-1][i].vendas;
				$scope.form.nasc = ANOS[a-1][i].nasc;
				$scope.form.propriedadeId_FK = $scope.getIdPropriedade();
				$scope.form.ano = a;
							
				basel.database.insert("evolucao", $scope.form);
			}
		}
	}

	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(){
		//$scope.init();
		$scope.form = TAXAS_BANCO[ANO_ATUAL];
		$('#evolucaoController').modal('show');
	}
	$scope.delete = function(){
		if(confirm("Deseja realmente Resetar?")){
			basel.database.delete("evolucao", {propriedadeId_FK : $scope.getIdPropriedade()});
			basel.database.delete("evolucao_taxas", {propriedadeId_FK : $scope.getIdPropriedade()});
			$location.path('/rebanho');			
		}
	}
});