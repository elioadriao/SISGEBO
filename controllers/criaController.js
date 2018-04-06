"use strict";
app.controller("criaController", function($scope, $location, $window, Propriedade){

	var TAXAS_BANCO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_DESEMPENHO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_ALIMENTACAO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_RACAO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_PRODUCAO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_OPERACIONAL = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANOS_BALANCO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var EVOLUCAO_BANCO = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	var ANO_ATUAL = 1;
	var TAXAS = { 
			pvi : 0,
			gmd : 0,
			periodo : 0,
			cms : 0,
			vol : 0,
			valor_racao : 0,
			valor_racao_conc : 0,
			valor_arroba : 0
			};
	var TIPO = {
			3 : "Bezerros",
			6 : "Bezerras"
	}

	$scope.initEvolucao = function(){	
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM evolucao WHERE propriedadeId_FK="+Propriedade.getId()+" AND ano="+i;
			var res = false;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					EVOLUCAO_BANCO[i-1] = data;
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
			$location.path('/evolucao');
		}
	}

	$scope.initTaxas = function(){			
		var SQL = "SELECT * FROM cria_taxas WHERE propriedadeId_FK="+Propriedade.getId();

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
			$scope.form.propriedadeId_FK = Propriedade.getId();
			
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
		ANO_ATUAL = ano;
		$scope.getAnoDesempenho(ano);
		$scope.getAnoAlimentacao(ano);
		$scope.getAnoRacao(ano);
		$scope.getAnoOperacional(ano);
		$scope.getAnoProducao(ano);
		$scope.getAnoBalanco(ano);
	}

	$scope.initDesempenho = function(){
		for(var i=1;i<=10;i++){
			var SQL = "SELECT * FROM cria_desempenho WHERE propriedadeId_FK="+Propriedade.getId()+" AND ano="+i;
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
			var SQL = "SELECT * FROM cria_alimentacao WHERE propriedadeId_FK="+Propriedade.getId()+" AND ano="+i;
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
			var SQL = "SELECT * FROM cria_racao WHERE propriedadeId_FK="+Propriedade.getId()+" AND ano="+i;
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
			var SQL = "SELECT * FROM cria_operacional WHERE propriedadeId_FK="+Propriedade.getId()+" AND ano="+i;
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
			var SQL = "SELECT * FROM cria_producao WHERE propriedadeId_FK="+Propriedade.getId()+" AND ano="+i;
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
			var SQL = "SELECT * FROM cria_balanco WHERE propriedadeId_FK="+Propriedade.getId()+" AND ano="+i;
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
			vol : TAXAS_BANCO[ANO_ATUAL-1].vol,
			valor_racao : TAXAS_BANCO[ANO_ATUAL-1].valor_racao, 
			valor_racao_conc : TAXAS_BANCO[ANO_ATUAL-1].valor_racao_conc,
			valor_arroba : TAXAS_BANCO[ANO_ATUAL-1].valor_arroba
		};
	}
	

	/* DESEMPENHO */
	$scope.newDesempenho = function(){
		for(var a=1; a<=10; a++){
			ANO_ATUAL = a;
			TAXAS = $scope.getTaxas();

			for(var i=1; i<3; i++){
				ANOS_DESEMPENHO[a-1][i*3] = {
								ano : a,
								descricao : TIPO[i*3],
								qtd : $scope.getQtdDesempenho(a, i*3),
								pvi : $scope.getPviDesempenho(a, i*3),
								gmd : $scope.getGmdDesempenho(a, i*3),
								periodo : Math.round($scope.getPeriodoDesempenho(a, i*3)),
								desmame : Math.round($scope.getDesmameDesempenho(a, i*3)),
								desmamea : Math.round($scope.getDesmameaDesempenho(a, i*3))
							}

				$scope.form = {};
				$scope.form.id;
				$scope.form.ano = ANOS_DESEMPENHO[a-1][i*3].ano;
				$scope.form.descricao = ANOS_DESEMPENHO[a-1][i*3].descricao;
				$scope.form.qtd = ANOS_DESEMPENHO[a-1][i*3].qtd;
				$scope.form.pvi = ANOS_DESEMPENHO[a-1][i*3].pvi;
				$scope.form.gmd = ANOS_DESEMPENHO[a-1][i*3].gmd;
				$scope.form.periodo = ANOS_DESEMPENHO[a-1][i*3].periodo;
				$scope.form.desmame = ANOS_DESEMPENHO[a-1][i*3].desmame;
				$scope.form.desmamea = ANOS_DESEMPENHO[a-1][i*3].desmamea;
				$scope.form.propriedadeId_FK = Propriedade.getId();
							
				basel.database.insert("cria_desempenho", $scope.form);
			}
		}
	}

	$scope.getAnoDesempenho = function(ano){
		$scope.anoDesempenho = ANOS_DESEMPENHO[ano-1];
	}

	$scope.getQtdDesempenho = function(ano, tipo){
		return EVOLUCAO_BANCO[ano-1][tipo-1].cabf;
	}

	$scope.getPviDesempenho = function(ano, tipo){		
		return TAXAS.pvi;
	}

	$scope.getGmdDesempenho = function(ano, tipo){
		return TAXAS.gmd;
	}

	$scope.getPeriodoDesempenho = function(ano, tipo){
		return TAXAS.periodo;
	}

	$scope.getDesmameDesempenho = function(ano, tipo){
		return ((TAXAS.periodo * 30) * TAXAS.gmd) + TAXAS.pvi;
	}

	$scope.getDesmameaDesempenho = function(ano, tipo){
		return $scope.getDesmameDesempenho(ano, tipo)/30;
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
								cms : $scope.getCmsAlimentacao(a, i*3),
								vol : $scope.getVolAlimentacao(a, i*3),
								volf : Math.round($scope.getVolfAlimentacao(a, i*3)),
								conc : Math.round($scope.getConcAlimentacao(a, i*3)),
								conf : Math.round($scope.getConfAlimentacao(a, i*3))
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
				$scope.form.propriedadeId_FK = Propriedade.getId();
							
				basel.database.insert("cria_alimentacao", $scope.form);
			}
		}
	}

	$scope.getAnoAlimentacao = function(ano){
		//ANO_ATUAL = ano;
		$scope.anoAlimentacao = ANOS_ALIMENTACAO[ano-1];
	}

	$scope.getCmsAlimentacao = function(ano, tipo){
		return TAXAS.cms;
	}

	$scope.getVolAlimentacao = function(ano, tipo){
		return TAXAS.vol;
	}

	$scope.getVolfAlimentacao = function(ano, tipo){
		return ((($scope.getPviDesempenho(ano, tipo) + $scope.getDesmameDesempenho(ano, tipo)) /2) * TAXAS.cms*0.01) * (TAXAS.vol*0.01) * $scope.getQtdDesempenho(ano,tipo) * (TAXAS.periodo * 30);
	}

	$scope.getConcAlimentacao = function(ano, tipo){
		return 100-TAXAS.vol;
	}

	$scope.getConfAlimentacao = function(ano, tipo){
		return $scope.getVolfAlimentacao(ano, tipo) * $scope.getConcAlimentacao(ano, tipo) / TAXAS.vol;
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
				$scope.form.propriedadeId_FK = Propriedade.getId();
							
				basel.database.insert("cria_racao", $scope.form);
			}
		}
	}

	$scope.getAnoRacao = function(ano){
		//ANO_ATUAL = ano;
		$scope.anoRacao = ANOS_RACAO[ano-1];
	}

	$scope.getValorRacao = function(ano, tipo){
		return TAXAS.valor_racao;
	}

	$scope.getValortRacao = function(ano, tipo){
		return $scope.getValorRacao(ano, tipo) * $scope.getVolfAlimentacao(ano, tipo);
	}

	$scope.getConRacao = function(ano, tipo){
		return TAXAS.valor_racao_conc;
	}

	$scope.getContRacao = function(ano, tipo){
		return $scope.getConRacao(ano, tipo) * $scope.getConfAlimentacao(ano, tipo);
	}

	$scope.getTotalRacao = function(ano, tipo){
		return $scope.getContRacao(ano,tipo) + $scope.getValortRacao(ano,tipo);
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
				$scope.form.propriedadeId_FK = Propriedade.getId();

							
				basel.database.insert("cria_producao", $scope.form);
			}
		}
	}

	$scope.getAnoProducao = function(ano){
		//ANO_ATUAL = ano;
		$scope.anoProducao = ANOS_PRODUCAO[ano-1];
	}

	$scope.getValorProducao = function(ano, tipo){
		return TAXAS.valor_arroba;
	}

	$scope.getValorAnimal = function(ano, tipo){
		return TAXAS.valor_arroba * Math.round($scope.getDesmameaDesempenho(ano,tipo));
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
				$scope.form.propriedadeId_FK = Propriedade.getId();
							
				basel.database.insert("cria_operacional", $scope.form);
			}
		}
	}

	$scope.getAnoOperacional = function(ano){
		//ANO_ATUAL = ano;
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
				$scope.form.propriedadeId_FK = Propriedade.getId();
							
				basel.database.insert("cria_balanco", $scope.form);
			}
		}
	}

	$scope.getAnoBalanco = function(ano){
		//ANO_ATUAL = ano;
		$scope.anoBalanco = ANOS_BALANCO[ano-1];
	}

	$scope.getAnimalBalanco = function(ano, tipo){
		return 0;
	}

	$scope.getArrobaBalanco = function(ano, tipo){
		return 0;
	}

	$scope.delete = function(){
		if(confirm("Deseja realmente Resetar?")){
			basel.database.delete("cria_taxas", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("cria_balanco", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("cria_alimentacao", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("cria_desempenho", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("cria_producao", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("cria_operacional", {propriedadeId_FK : Propriedade.getId()});
			$location.path('/evolucao');			
		}
	}

	$scope.cancel = function(){
		$scope.form = {};
	}
});