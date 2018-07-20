"use strict";
app.controller("custoOperacionalController", function($scope, $location, Propriedade){

	var CUSTO_OPERACIONAL_BD = [];
	var CUSTO_VARIAVEL_BD = [];
	var VREBANHO_BD = [];
	var TOTAL_CABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var AQUISICAO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_OPERACIONAL_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_OPERACIONAL_C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_OPERACIONAL_S = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	/*   */
	$scope.initRebanho = function(){
		var DESC_ANIMAL = ["Matrizes", "Novilhos +14@", "Novilhos 12@ a 14@", "Novilhos até 12@", 
			 "Novilhas até 12@", "Bezerros", "Bezerras", "Outros", "Equideos"];

		for (i in DESC_ANIMAL){
			var SQL = "SELECT * FROM variacao_rebanho WHERE propriedadeId_FK="+Propriedade.getId()+" AND descricao='"+DESC_ANIMAL[i]+"'";
			var res = false;
			//console.log(DESC_ANIMAL[i]);

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					VREBANHO_BD[i] = data;	
					res = true;
				}else{
					res = false;
				}
			});
		}		

		if(res){
			console.log("Carregou Rebanho..");
			$scope.initCustoVariavel();
		}else{
			console.log("Nao Carregou Rebanho..");
			$location.path("/vrebanho");
		}
	}

	/* INICIA O CUSTO VARIAVEL */
	$scope.initCustoVariavel = function(){
		var SQL = "SELECT * FROM custo_variavel WHERE descricao='Aquisicao de animais' AND propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTO_VARIAVEL_BD = data[0];
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Custo Variavel..");
			$scope.initCustoOperacional();
		}else{
			console.log("Nao Carregou Custo Variavel..");
			$location.path("/custoVariavel");
		}
	}

	/* INICIA O CUSTO OPERACIONAL */
	$scope.initCustoOperacional = function(){
		var SQL = "SELECT * FROM custo_operacional WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTO_OPERACIONAL_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Custo Operacional..");
			$scope.tratarCustoOperacional();
		}else{
			console.log("Nao Carregou Custo Operacional..");
			$location.path("/");
		}
	}

	/*  */
	$scope.tratarRebanho = function(){
		for(i in VREBANHO_BD){			
			for(var m=0; m<12; m++){
				TOTAL_CABECAS[m] += VREBANHO_BD[i][m].qtd;
			}
		}

		AQUISICAO[0] = CUSTO_VARIAVEL_BD.jan;
		AQUISICAO[1] = CUSTO_VARIAVEL_BD.fev;
		AQUISICAO[2] = CUSTO_VARIAVEL_BD.mar;
		AQUISICAO[3] = CUSTO_VARIAVEL_BD.abr;
		AQUISICAO[4] = CUSTO_VARIAVEL_BD.mai;
		AQUISICAO[5] = CUSTO_VARIAVEL_BD.jun;
		AQUISICAO[6] = CUSTO_VARIAVEL_BD.jul;
		AQUISICAO[7] = CUSTO_VARIAVEL_BD.ago;
		AQUISICAO[8] = CUSTO_VARIAVEL_BD.sem;
		AQUISICAO[9] = CUSTO_VARIAVEL_BD.out;
		AQUISICAO[10] = CUSTO_VARIAVEL_BD.nov;
		AQUISICAO[11] = CUSTO_VARIAVEL_BD.dez;
	}

	$scope.tratarCustoOperacional = function(){
		$scope.tratarRebanho();

		for(i in CUSTO_OPERACIONAL_BD){
			TOTAL_OPERACIONAL_MES[0] += CUSTO_OPERACIONAL_BD[i].jan;
			TOTAL_OPERACIONAL_MES[1] += CUSTO_OPERACIONAL_BD[i].fev;
			TOTAL_OPERACIONAL_MES[2] += CUSTO_OPERACIONAL_BD[i].mar;
			TOTAL_OPERACIONAL_MES[3] += CUSTO_OPERACIONAL_BD[i].abr;
			TOTAL_OPERACIONAL_MES[4] += CUSTO_OPERACIONAL_BD[i].mai;
			TOTAL_OPERACIONAL_MES[5] += CUSTO_OPERACIONAL_BD[i].jun;
			TOTAL_OPERACIONAL_MES[6] += CUSTO_OPERACIONAL_BD[i].jul;
			TOTAL_OPERACIONAL_MES[7] += CUSTO_OPERACIONAL_BD[i].ago;
			TOTAL_OPERACIONAL_MES[8] += CUSTO_OPERACIONAL_BD[i].sem;
			TOTAL_OPERACIONAL_MES[9] += CUSTO_OPERACIONAL_BD[i].out;
			TOTAL_OPERACIONAL_MES[10] += CUSTO_OPERACIONAL_BD[i].nov;
			TOTAL_OPERACIONAL_MES[11] += CUSTO_OPERACIONAL_BD[i].dez;
		}

		for(i=0; i<12; i++){
			TOTAL_OPERACIONAL_C[i] = TOTAL_OPERACIONAL_MES[i] / TOTAL_CABECAS[i];
			TOTAL_OPERACIONAL_S[i] = (TOTAL_OPERACIONAL_MES[i] - AQUISICAO[i]) / TOTAL_CABECAS[i];
		}

		$scope.custo_operacional = CUSTO_OPERACIONAL_BD;
		$scope.total_operacional_mes = TOTAL_OPERACIONAL_MES;
		$scope.total_operacional_c = TOTAL_OPERACIONAL_C;
		$scope.total_operacional_s = TOTAL_OPERACIONAL_S;
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Custo Operacional?")){
			basel.database.delete("custo_operacional", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});