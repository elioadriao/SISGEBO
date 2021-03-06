"use strict";
app.controller("custoTotalController", function($scope, $location, Propriedade){

	var CUSTO_TOTAL_BD = [];
	var CUSTO_VARIAVEL_BD = [];
	var VARIACAO_REBANHO_BD = [];
	var TOTAL_CABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var AQUISICAO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_S = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	/*   */
	$scope.initRebanhoQtd = function(){
		var SQL = "SELECT * FROM variacao_rebanho_qtd WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				VARIACAO_REBANHO_BD = data;	
				res = true;
			}else{
				res = false;
			}
		});			

		if(res){
			console.log("Carregou Qtd do Rebanho..");
			$scope.initCustoVariavel();
		}else{
			console.log("Nao Carregou Qtd do Rebanho..");
			$location.path("/variacaoRebanho");
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
			$scope.initCustoTotal();
		}else{
			console.log("Nao Carregou Custo Variavel..");
			$location.path("/custoVariavel");
		}
	}

	/* INICIA O CUSTO TOTAL */
	$scope.initCustoTotal = function(){
		var SQL = "SELECT * FROM custo_total WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTO_TOTAL_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Custo Total..");
			$scope.tratarCustoTotal();
		}else{
			console.log("Nao Carregou Custo Total..");
			$location.path("/");
		}
	}

	/*  */
	$scope.tratarRebanho = function(){
		for(i in VARIACAO_REBANHO_BD){			
			TOTAL_CABECAS[0] += VARIACAO_REBANHO_BD[i].jan;			
			TOTAL_CABECAS[1] += VARIACAO_REBANHO_BD[i].fev;			
			TOTAL_CABECAS[2] += VARIACAO_REBANHO_BD[i].mar;			
			TOTAL_CABECAS[3] += VARIACAO_REBANHO_BD[i].abr;			
			TOTAL_CABECAS[4] += VARIACAO_REBANHO_BD[i].mai;			
			TOTAL_CABECAS[5] += VARIACAO_REBANHO_BD[i].jun;			
			TOTAL_CABECAS[6] += VARIACAO_REBANHO_BD[i].jul;			
			TOTAL_CABECAS[7] += VARIACAO_REBANHO_BD[i].ago;			
			TOTAL_CABECAS[8] += VARIACAO_REBANHO_BD[i].sem;			
			TOTAL_CABECAS[9] += VARIACAO_REBANHO_BD[i].out;			
			TOTAL_CABECAS[10] += VARIACAO_REBANHO_BD[i].nov;			
			TOTAL_CABECAS[11] += VARIACAO_REBANHO_BD[i].dez;
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

	$scope.tratarCustoTotal = function(){
		$scope.tratarRebanho();

		for(i in CUSTO_TOTAL_BD){
			TOTAL_MES[0] += CUSTO_TOTAL_BD[i].jan;
			TOTAL_MES[1] += CUSTO_TOTAL_BD[i].fev;
			TOTAL_MES[2] += CUSTO_TOTAL_BD[i].mar;
			TOTAL_MES[3] += CUSTO_TOTAL_BD[i].abr;
			TOTAL_MES[4] += CUSTO_TOTAL_BD[i].mai;
			TOTAL_MES[5] += CUSTO_TOTAL_BD[i].jun;
			TOTAL_MES[6] += CUSTO_TOTAL_BD[i].jul;
			TOTAL_MES[7] += CUSTO_TOTAL_BD[i].ago;
			TOTAL_MES[8] += CUSTO_TOTAL_BD[i].sem;
			TOTAL_MES[9] += CUSTO_TOTAL_BD[i].out;
			TOTAL_MES[10] += CUSTO_TOTAL_BD[i].nov;
			TOTAL_MES[11] += CUSTO_TOTAL_BD[i].dez;
		}

		for(i=0; i<12; i++){
			TOTAL_C[i] = TOTAL_MES[i] / TOTAL_CABECAS[i];
			TOTAL_S[i] = (TOTAL_MES[i] - AQUISICAO[i]) / TOTAL_CABECAS[i];
		}

		$scope.custo_total = CUSTO_TOTAL_BD;
		$scope.total_mes = TOTAL_MES;
		$scope.total_c = TOTAL_C;
		$scope.total_s = TOTAL_S;
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Custo Total?")){
			basel.database.delete("custo_total", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});