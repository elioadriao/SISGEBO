"use strict";
app.controller("criaController", function($scope, $location, $window){

	var TAXAS_BANCO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_DESEMPENHO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_ALIMENTACAO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_RACAO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_PRODUCAO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_OPERACIONAL = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_BALANCO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANO_ATUAL = 1;
	var TAXAS = { 
			pvi : 0,
			gmd : 0,
			periodo : 0,
			cms : 0,
			valor_racao : 0,
			valor_racao_conc : 0
			};
	var TIPO = {
			3 : "Bezerros",
			6 : "Bezerras"
	}

	$scope.getIdPropriedade = function(){
		return $window.localStorage.getItem("idPropriedade");
	}

	$scope.initTaxas = function(){			
		var SQL = "SELECT * FROM cria_taxas WHERE propriedadeId_FK="+$scope.getIdPropriedade();

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
				$('#taxasController').modal('show');
			}
		});
				
	}

	$scope.newTaxas = function(){
		for(var i=1;i<=10;i++){
			//$scope.form = {};
			$scope.form.id;
			$scope.form.ano=i;
			$scope.form.propriedadeId_FK = $scope.getIdPropriedade();
			
			basel.database.insert("cria_taxas", $scope.form);
		}
		$('#taxasController').modal('hide');
		$scope.initTaxas();
	}

	$scope.initAnos = function(){	
		$scope.initDesempenho();	
		$scope.initAlimentacao();
		$scope.initRacao();
		$scope.initProducao();
		$scope.initBalanco();
		$scope.initOperacional();
	}

	$scope.getAno = function(ano){
		$scope.getAnoDesempenho(ano);
		$scope.getAnoAlimentacao(ano);
		$scope.getAnoRacao(ano);
		$scope.getAnoOperacional(ano);
		$scope.getAnoProducao(ano);
		$scope.getAnoBalanco(ano);
	}

	$scope.initDesempenho = function(){
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM cria_desempenho WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;
			var res = false;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					ANOS_DESEMPENHO[i-1] = data;
					res = true;
					//console.log(ANOS[i-1]);		
				}else{
					res = false;			
				}
			});
		}

		if(res){
			console.log("Carregou Desempenho..");
		}else{
			$scope.newDesempenho();
			console.log("Gerou Desempenho..");
		}
	}

	$scope.initAlimentacao = function(){
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM cria_alimentacao WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;
			var res = false;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					ANOS_ALIMENTACAO[i-1] = data;
					res = true;
					//console.log(ANOS[i-1]);		
				}else{
					res = false;			
				}
			});
		}

		if(res){
			console.log("Carregou Alimentacao..");
		}else{
			$scope.newAlimentacao();
			console.log("Gerou Alimentacao..");
		}
	}

	$scope.initRacao = function(){
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM cria_racao WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;
			var res = false;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					ANOS_RACAO[i-1] = data;
					res = true;
					//console.log(ANOS[i-1]);		
				}else{
					res = false;			
				}
			});
		}

		if(res){
			console.log("Carregou Racao..");
		}else{
			$scope.newRacao();
			console.log("Gerou Racao..");
		}
	}

	$scope.initOperacional = function(){
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM cria_operacional WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;
			var res = false;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					ANOS_OPERACIONAL[i-1] = data;
					res = true;
					//console.log(ANOS[i-1]);		
				}else{
					res = false;			
				}
			});
		}

		if(res){
			console.log("Carregou Operacional..");
		}else{
			$scope.newOperacional();
			console.log("Gerou Operacional..");
		}
	}
	
	$scope.initProducao = function(){
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM cria_producao WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;
			var res = false;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					ANOS_PRODUCAO[i-1] = data;
					res = true;
					//console.log(ANOS[i-1]);		
				}else{
					res = false;			
				}
			});
		}

		if(res){
			console.log("Carregou Producao..");
		}else{
			$scope.newProducao();
			console.log("Gerou Producao..");
		}
	}

	$scope.initBalanco = function(){
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM cria_balanco WHERE propriedadeId_FK="+$scope.getIdPropriedade()+" AND ano="+i;
			var res = false;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					ANOS_BALANCO[i-1] = data;
					res = true;
					//console.log(ANOS[i-1]);		
				}else{
					res = false;			
				}
			});
		}

		if(res){
			console.log("Carregou Balanco..");
		}else{
			$scope.newBalanco();
			console.log("Gerou Balanco..");
		}
	}

	$scope.getTaxas = function(){
		return {
			pvi : TAXAS_BANCO[ANO_ATUAL-1].pvi,
			gmd : TAXAS_BANCO[ANO_ATUAL-1].gmd,
			periodo : TAXAS_BANCO[ANO_ATUAL-1].periodo,
			cms : TAXAS_BANCO[ANO_ATUAL-1].cms,
			valor_racao : TAXAS_BANCO[ANO_ATUAL-1].valor_racao,
			valor_racao_conc : TAXAS_BANCO[ANO_ATUAL-1].valor_racao_conc
		};
	}
	

	/* DESEMPENHO */
	$scope.newDesempenho = function(){
		for(var a=1; a<=10; a++){
			ANO_ATUAL = a;
			TAXAS = $scope.getTaxas();

			for(var i=1; i<3; i++){
				ANOS_DESEMPENHO[a-1][i] = {
								ano : a,
								descricao : TIPO[i*3],
								qtd : $scope.getQtdDesempenho(a, i),
								pvi : $scope.getPviDesempenho(a, i),
								gmd : $scope.getGmdDesempenho(a, i),
								periodo : $scope.getPeriodoDesempenho(a, i),
								desmame : $scope.getDesmameDesempenho(a, i),
								desmamea : $scope.getDesmameaDesempenho(a, i)
							}

				$scope.form = {};
				$scope.form.id;
				$scope.form.ano = ANOS_DESEMPENHO[a-1][i].ano;
				$scope.form.descricao = ANOS_DESEMPENHO[a-1][i].descricao;
				$scope.form.qtd = ANOS_DESEMPENHO[a-1][i].qtd;
				$scope.form.pvi = ANOS_DESEMPENHO[a-1][i].pvi;
				$scope.form.gmd = ANOS_DESEMPENHO[a-1][i].gmd;
				$scope.form.periodo = ANOS_DESEMPENHO[a-1][i].periodo;
				$scope.form.desmame = ANOS_DESEMPENHO[a-1][i].desmame;
				$scope.form.desmamea = ANOS_DESEMPENHO[a-1][i].desmamea;
				$scope.form.propriedadeId_FK = $scope.getIdPropriedade();
							
				basel.database.insert("cria_desempenho", $scope.form);
			}
		}
	}

	$scope.getAnoDesempenho = function(ano){
		ANO_ATUAL = ano;
		$scope.anoDesempenho = ANOS_DESEMPENHO[ano-1];
	}

	$scope.getQtdDesempenho = function(ano, tipo){
		return 0;
	}

	$scope.getPviDesempenho = function(ano, tipo){
		return 0;
	}

	$scope.getGmdDesempenho = function(ano, tipo){
		return 0;
	}

	$scope.getPeriodoDesempenho = function(ano, tipo){
		return 0;
	}

	$scope.getDesmameDesempenho = function(ano, tipo){
		return 0;
	}

	$scope.getDesmameaDesempenho = function(ano, tipo){
		return 0;
	}


	/* ALIMENTACÃO */
	$scope.newAlimentacao = function(){
		for(var a=1; a<=10; a++){
			ANO_ATUAL = a;
			TAXAS = $scope.getTaxas();
			
			for(var i=1; i<3; i++){
				ANOS_ALIMENTACAO[a-1][i] = {
								descricao : TIPO[i*3],
								ano : a,
								cms : $scope.getCmsAlimentacao(a, i),
								vol : $scope.getVolAlimentacao(a, i),
								volf : $scope.getVolfAlimentacao(a, i),
								conc : $scope.getConcAlimentacao(a, i),
								conf : $scope.getConfAlimentacao(a, i)
							}

				$scope.form = {};
				$scope.form.id;
				$scope.form.descricao = ANOS_ALIMENTACAO[a-1][i].descricao;
				$scope.form.ano = ANOS_ALIMENTACAO[a-1][i].ano;
				$scope.form.cms = ANOS_ALIMENTACAO[a-1][i].cms;
				$scope.form.vol = ANOS_ALIMENTACAO[a-1][i].vol;
				$scope.form.volf = ANOS_ALIMENTACAO[a-1][i].volf;
				$scope.form.conc = ANOS_ALIMENTACAO[a-1][i].conc;
				$scope.form.conf = ANOS_ALIMENTACAO[a-1][i].conf;
				$scope.form.propriedadeId_FK = $scope.getIdPropriedade();
							
				basel.database.insert("cria_alimentacao", $scope.form);
			}
		}
	}

	$scope.getAnoAlimentacao = function(ano){
		ANO_ATUAL = ano;
		$scope.anoAlimentacao = ANOS_ALIMENTACAO[ano-1];
	}

	$scope.getCmsAlimentacao = function(ano, tipo){
		return 0;
	}

	$scope.getVolAlimentacao = function(ano, tipo){
		return 0;
	}

	$scope.getVolfAlimentacao = function(ano, tipo){
		return 0;
	}

	$scope.getConcAlimentacao = function(ano, tipo){
		return 0;
	}

	$scope.getConfAlimentacao = function(ano, tipo){
		return 0;
	}


	/* RACAO */
	$scope.newRacao = function(){
		for(var a=1; a<=10; a++){
			ANO_ATUAL = a;
			TAXAS = $scope.getTaxas();
			
			for(var i=1; i<3; i++){
				ANOS_RACAO[a-1][i] = {
								descricao : TIPO[i*3],
								ano : a,
								valor : $scope.getValorRacao(a, i),
								valort : $scope.getValortRacao(a, i),
								con : $scope.getConRacao(a, i),
								cont : $scope.getContRacao(a, i),
								total : $scope.getTotalRacao(a, i)
							}

				$scope.form = {};
				$scope.form .id;
				$scope.form.descricao = ANOS_RACAO[a-1][i].descricao;
				$scope.form.valor = ANOS_RACAO[a-1][i].valor;
				$scope.form.ano = ANOS_RACAO[a-1][i].ano;
				$scope.form.valort = ANOS_RACAO[a-1][i].valort;
				$scope.form.con = ANOS_RACAO[a-1][i].con;
				$scope.form.cont = ANOS_RACAO[a-1][i].cont;
				$scope.form.total = ANOS_RACAO[a-1][i].total;
				$scope.form.propriedadeId_FK = $scope.getIdPropriedade();
							
				basel.database.insert("cria_racao", $scope.form);
			}
		}
	}

	$scope.getAnoRacao = function(ano){
		ANO_ATUAL = ano;
		$scope.anoRacao = ANOS_RACAO[ano-1];
	}

	$scope.getValorRacao = function(ano, tipo){
		return 0;
	}

	$scope.getValortRacao = function(ano, tipo){
		return 0;
	}

	$scope.getConRacao = function(ano, tipo){
		return 0;
	}

	$scope.getContRacao = function(ano, tipo){
		return 0;
	}

	$scope.getTotalRacao = function(ano, tipo){
		return 0;
	}

	/* PRODUCAO */
	$scope.newProducao = function(){
		for(var a=1; a<=10; a++){
			ANO_ATUAL = a;
			TAXAS = $scope.getTaxas();
			
			for(var i=1; i<3; i++){
				ANOS_PRODUCAO[a-1][i] = {
								descricao : TIPO[i*3],
								ano : a,
								valor : $scope.getValorProducao(a, i),
								valor_animal : $scope.getValorAnimal(a, i)
							}

				$scope.form = {};
				$scope.form.id;
				$scope.form.descricao = ANOS_PRODUCAO[a-1][i].descricao;
				$scope.form.ano = ANOS_PRODUCAO[a-1][i].ano;
				$scope.form.valor = ANOS_PRODUCAO[a-1][i].valor;
				$scope.form.valor_animal = ANOS_PRODUCAO[a-1][i].valor_animal;
				$scope.form.propriedadeId_FK = $scope.getIdPropriedade();

							
				basel.database.insert("cria_producao", $scope.form);
			}
		}
	}

	$scope.getAnoProducao = function(ano){
		ANO_ATUAL = ano;
		$scope.anoProducao = ANOS_PRODUCAO[ano-1];
	}

	$scope.getValorProducao = function(ano, tipo){
		return 0;
	}

	$scope.getValorAnimal = function(ano, tipo){
		return 0;
	}

	/* OPERACIONAL */
	$scope.newOperacional = function(){
		for(var a=1; a<=10; a++){
			ANO_ATUAL = a;
			TAXAS = $scope.getTaxas();
			
			for(var i=1; i<3; i++){
				ANOS_OPERACIONAL[a-1][i] = {
								descricao : TIPO[i*3],
								ano : a,
								qtd : $scope.getQtdOperacional(a, i),
								valor : $scope.getValorOperacional(a, i),
							}

				$scope.form = {};
				$scope.form.id;
				$scope.form.descricao = ANOS_OPERACIONAL[a-1][i].descricao;
				$scope.form.ano = ANOS_OPERACIONAL[a-1][i].ano;
				$scope.form.qtd = ANOS_OPERACIONAL[a-1][i].qtd;
				$scope.form.valor = ANOS_OPERACIONAL[a-1][i].valor;
				$scope.form.propriedadeId_FK = $scope.getIdPropriedade();
							
				basel.database.insert("cria_operacional", $scope.form);
			}
		}
	}

	$scope.getAnoOperacional = function(ano){
		ANO_ATUAL = ano;
		$scope.anoOperacional = ANOS_OPERACIONAL[ano-1];
	}

	$scope.getQtdOperacional = function(ano, tipo){
		return 0;
	}

	$scope.getValorOperacional = function(ano, tipo){
		return 0;
	}

	/* BALANCO */
	$scope.newBalanco = function(){
		for(var a=1; a<=10; a++){
			ANO_ATUAL = a;
			TAXAS = $scope.getTaxas();
			
			for(var i=1; i<3; i++){
				ANOS_BALANCO[a-1][i] = {
								descricao : TIPO[i*3],
								ano : a,
								animal : $scope.getAnimalBalanco(a, i),
								arroba : $scope.getArrobaBalanco(a, i)
							}

				$scope.form = {};
				$scope.form.id;
				$scope.form.descricao = ANOS_BALANCO[a-1][i].descricao;
				$scope.form.ano = ANOS_BALANCO[a-1][i].ano;
				$scope.form.animal = ANOS_BALANCO[a-1][i].animal;
				$scope.form.arroba = ANOS_BALANCO[a-1][i].arroba;
				$scope.form.propriedadeId_FK = $scope.getIdPropriedade();
							
				basel.database.insert("cria_balanco", $scope.form);
			}
		}
	}

	$scope.getAnoBalanco = function(ano){
		ANO_ATUAL = ano;
		$scope.anoBalanco = ANOS_BALANCO[ano-1];
	}

	$scope.getAnimalBalanco = function(ano, tipo){
		return 0;
	}

	$scope.getArrobaBalanco = function(ano, tipo){
		return 0;
	}

	$scope.cancel = function(){
		$scope.form = {};
	}
});