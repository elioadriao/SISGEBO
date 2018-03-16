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
				$('#evolucaonewController').modal('show');
			}
		});
				
	}

	$scope.initAnos = function(){	
		$scope.initDesempenho();	
		$scope.initAlimentacao();
		$scope.initRacao();
		$scope.initProducao();
		$scope.initBalanco();
		$scope.initOperacional();
	}

	$scope.initDesempenho() = function(){
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

	$scope.initAlimentacao() = function(){
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

	$scope.initRacao() = function(){
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

	$scope.initOperacional() = function(){
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
	
	$scope.initProducao() = function(){
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

	$scope.initBalanco() = function(){
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

	$scope.getTaxas() = function(){
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
								id : "",
								ano : a,
								descricao : TIPO[i*3],
								qtd : $scope.getQtd(a, i),
								pvi : $scope.getPvi(a, i),
								gmd : $scope.getGmd(a, i),
								periodo : $scope.getPeriodo(a, i),
								desmame : $scope.getDesmame(a, i),
								desmamea : $scope.getDesmamea(a, i),
								propriedadeId_FK : $scope.getIdPropriedade()
							}

				$scope.form = {};
				$scope.form = ANOS_DESEMPENHO[a-1][i];
							
				basel.database.insert("cria_desempenho", $scope.form);
			}
		}
	}

	$scope.getAnoDesempenho = function(ano){
		ANO_ATUAL = ano;
		$scope.anoDesempenho = ANOS_DESEMPENHO[ano-1];
	}

	$scope.getQtd = function(ano, tipo){
		return 0;
	}

	$scope.getPvi = function(ano, tipo){
		return 0;
	}

	$scope.getGmd = function(ano, tipo){
		return 0;
	}

	$scope.getPeriodo = function(ano, tipo){
		return 0;
	}

	$scope.getDesmame = function(ano, tipo){
		return 0;
	}

	$scope.getDesmamea = function(ano, tipo){
		return 0;
	}


	/* ALIMENTACÃO */
	$scope.newAlimentacao = function(){
		for(var a=1; a<=10; a++){
			ANO_ATUAL = a;
			TAXAS = $scope.getTaxas();
			
			for(var i=1; i<3; i++){
				ANOS_ALIMENTACAO[a-1][i] = {
								id : "",
								descricao : TIPO[i*3],
								ano : a,
								cms : $scope.getCms(a, i),
								vol : $scope.getVol(a, i),
								volf : $scope.getVolf(a, i),
								conc : $scope.getConc(a, i),
								conf : $scope.getConf(a, i),
								propriedadeId_FK : $scope.getIdPropriedade()
							}

				$scope.form = {};
				$scope.form = ANOS_ALIMENTACAO[a-1][i];
							
				basel.database.insert("cria_alimentacao", $scope.form);
			}
		}
	}

	$scope.getAnoAlimentacao = function(ano){
		ANO_ATUAL = ano;
		$scope.anoAlimentacao = ANOS_ALIMENTACAO[ano-1];
	}

	$scope.getCms = function(ano, tipo){
		return 0;
	}

	$scope.getVol = function(ano, tipo){
		return 0;
	}

	$scope.getVolf = function(ano, tipo){
		return 0;
	}

	$scope.getConc = function(ano, tipo){
		return 0;
	}

	$scope.getConf = function(ano, tipo){
		return 0;
	}


	/* RACAO */
	$scope.newRacao = function(){
		for(var a=1; a<=10; a++){
			ANO_ATUAL = a;
			TAXAS = $scope.getTaxas();
			
			for(var i=1; i<3; i++){
				ANOS_RACAO[a-1][i] = {
								id : "",
								descricao : TIPO[i*3],
								ano : a,
								valor : $scope.getValor(a, i),
								valort : $scope.getValort(a, i),
								con : $scope.getCon(a, i),
								cont : $scope.getCont(a, i),
								propriedadeId_FK : $scope.getIdPropriedade()
							}

				$scope.form = {};
				$scope.form = ANOS_RACAO[a-1][i];
							
				basel.database.insert("cria_racao", $scope.form);
			}
		}
	}

	$scope.getAnoRacao = function(ano){
		ANO_ATUAL = ano;
		$scope.anoRacao = ANOS_RACAO[ano-1];
	}

	$scope.getValor = function(ano, tipo){
		return 0;
	}

	$scope.getValort = function(ano, tipo){
		return 0;
	}

	$scope.getCon = function(ano, tipo){
		return 0;
	}

	$scope.getCont = function(ano, tipo){
		return 0;
	}

	//PRODUCAO
	$scope.createProducao = function(){	"id:INTEGER, descricao:CHAR(20), valor:INTEGER, vanimal:INTEGER, vtotal:INTEGER"
		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Bezerros";
		$scope.form.valor = 0;
		$scope.form.vanimal = 0;
		$scope.form.vtotal = 0;
		$scope.newProducao();

		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Bezerras";
		$scope.form.valor = 0;
		$scope.form.vanimal = 0;
		$scope.form.vtotal = 0;
		$scope.newProducao();
				
		$scope.listProducao();
	}

	$scope.listProducao = function(){
		$scope.table_name = "cria_producao";

		basel.database.runAsync("SELECT * FROM "+$scope.table_name, function(data){
			if(data[0] != null){
				$scope.itemsProducao = data;
				console.log("existe");
			}else{
				console.log("existe nao producao");
				$scope.createProducao();
			}
		});
	}

	$scope.saveProducao = function(){
		$scope.table_name = "cria_producao";

		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey; 
		basel.database.update($scope.table_name, $scope.form, {id: id}); //entidade, dados, where
		
		$scope.form = {};
		$('#producaoController').modal('hide');
	}

	$scope.newProducao = function(){
		$scope.table_name = "cria_producao";

		basel.database.insert($scope.table_name, $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.editProducao = function(data){
		$scope.form = data;
		$('#producaoController').modal('show');
	}

	//OPERACIONAL
	$scope.createOperacional = function(){
		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Bezerros";
		$scope.form.qtd = 0;
		$scope.form.valor = 0;
		$scope.form.total = 0;
		$scope.newOperacional();

		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Bezerras";
		$scope.form.qtd = 0;
		$scope.form.valor = 0;
		$scope.form.total = 0;
		$scope.newOperacional();
				
		$scope.listOperacional();
	}

	$scope.listOperacional = function(){
		$scope.table_name = "cria_operacional";

		basel.database.runAsync("SELECT * FROM "+$scope.table_name, function(data){
			if(data[0] != null){
				$scope.itemsOperacional = data;
				console.log("existe");
			}else{
				console.log("existe nao operacional");
				$scope.createOperacional();
			}
		});
	}

	$scope.saveOperacional = function(){
		$scope.table_name = "cria_operacional";

		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey; 
		basel.database.update($scope.table_name, $scope.form, {id: id}); //entidade, dados, where
		
		$scope.form = {};
		$('#operacionalController').modal('hide');
	}

	$scope.newOperacional = function(){
		$scope.table_name = "cria_operacional";

		basel.database.insert($scope.table_name, $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.editOperacional = function(data){
		$scope.form = data;
		$('#operacionalController').modal('show');
	}

	//BALANCO
	$scope.createBalanco = function(){
		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Gasto de Producao";
		$scope.form.animal = 0;
		$scope.form.arroba = 0;
		$scope.form.total = 0;
		$scope.newBalanco();

		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Lucro (ano)";
		$scope.form.animal = 0;
		$scope.form.arroba = 0;
		$scope.form.total = 0;
		$scope.newBalanco();

		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Lucro (mes)";
		$scope.form.animal = 0;
		$scope.form.arroba = 0;
		$scope.form.total = 0;
		$scope.newBalanco();
				
		$scope.listBalanco();
	}

	$scope.listBalanco = function(){
		$scope.table_name = "cria_balanco";

		basel.database.runAsync("SELECT * FROM "+$scope.table_name, function(data){
			if(data[0] != null){
				$scope.itemsBalanco = data;
				console.log("existe");
			}else{
				console.log("existe nao balanco");
				$scope.createBalanco();
			}
		});
	}

	$scope.newBalanco = function(){
		$scope.table_name = "cria_balanco";

		basel.database.insert($scope.table_name, $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.cancel = function(){
		$scope.form = {};
	}
});