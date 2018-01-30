"use strict";
app.controller("criaController", function($scope, $location, $window){

	//$scope.table_name = "animal";
	$scope.primary_key = "id";
	$scope.tipoAnimal = {
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

	$scope.getIdPropriedade = function(){
		return $window.localStorage.getItem("idPropriedade");
	}

	//DESEMPENHO
	$scope.createDesempenho = function(){
		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Bezerros";
		$scope.form.qtd = 0;
		$scope.form.pvi = 0;
		$scope.form.gmd = 0;
		$scope.form.periodo = 0;
		$scope.form.desmame = 0;
		$scope.form.demamea = 0;
		$scope.newDesempenho();

		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Bezerras";
		$scope.form.qtd = 0;
		$scope.form.pvi = 0;
		$scope.form.gmd = 0;
		$scope.form.periodo = 0;
		$scope.form.desmame = 0;
		$scope.form.demamea = 0;
		$scope.newDesempenho();
				
		$scope.listDesempenho();
	}

	$scope.listDesempenho = function(){
		$scope.table_name = "cria_desempenho";

		basel.database.runAsync("SELECT * FROM "+$scope.table_name, function(data){
			if(data[0] != null){
				$scope.itemsDesempenho = data;
				console.log("existe");
			}else{
				console.log("existe nao desempenho");
				$scope.createDesempenho();
			}
		});
	}

	$scope.saveDesempenho = function(){
		$scope.table_name = "cria_desempenho";

		var id = $scope.form[$scope.primary_key];
		delete $scope.form[$scope.primary_key];
		delete $scope.form.$$hashKey; 
		basel.database.update($scope.table_name, $scope.form, {id: id}); //entidade, dados, where
		
		$scope.form = {};
		$('#desempenhoController').modal('hide');
	}

	$scope.newDesempenho = function(){
		$scope.table_name = "cria_desempenho";

		basel.database.insert($scope.table_name, $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.editDesempenho = function(data){
		$scope.form = data;
		$('#desempenhoController').modal('show');
	}

	//ALIMENTAÇÃO
	$scope.createAlimentacao = function(){
		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Bezerros";
		$scope.form.cms = 0;
		$scope.form.vol = 0;
		$scope.form.volf = 0;
		$scope.form.conc = 0;
		$scope.form.conf = 0;
		$scope.newAlimentacao();

		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Bezerras";
		$scope.form.cms = 0;
		$scope.form.vol = 0;
		$scope.form.volf = 0;
		$scope.form.conc = 0;
		$scope.form.conf = 0;
		$scope.newAlimentacao();
				
		$scope.listAlimentacao();
	}

	$scope.listAlimentacao = function(){
		$scope.table_name = "cria_alimentacao";

		basel.database.runAsync("SELECT * FROM "+$scope.table_name, function(data){
			if(data[0] != null){
				$scope.itemsAlimentacao = data;
				console.log("existe");
			}else{
				console.log("existe nao alimentacao");
				$scope.createAlimentacao();
			}
		});
	}

	$scope.saveAlimentacao = function(){
		$scope.table_name = "cria_alimentacao";

		var id = $scope.form[$scope.primary_key];
		delete $scope.form[$scope.primary_key];
		delete $scope.form.$$hashKey; 
		basel.database.update($scope.table_name, $scope.form, {id: id}); //entidade, dados, where
		
		$scope.form = {};
		$('#alimentacaoController').modal('hide');
	}

	$scope.newAlimentacao = function(){
		$scope.table_name = "cria_alimentacao";

		basel.database.insert($scope.table_name, $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.editAlimentacao = function(data){
		$scope.form = data;
		$('#alimentacaoController').modal('show');
	}

	//RACAO
	$scope.createRacao = function(){
		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Bezerros";
		$scope.form.vol = 0;
		$scope.form.volt = 0;
		$scope.form.con = 0;
		$scope.form.cont = 0;
		$scope.form.racaot = 0;
		$scope.newRacao();

		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Bezerras";
		$scope.form.vol = 0;
		$scope.form.volt = 0;
		$scope.form.con = 0;
		$scope.form.cont = 0;
		$scope.form.racaot = 0;
		$scope.newRacao();
				
		$scope.listRacao();
	}

	$scope.listRacao = function(){
		$scope.table_name = "cria_racao";

		basel.database.runAsync("SELECT * FROM "+$scope.table_name, function(data){
			if(data[0] != null){
				$scope.itemsRacao = data;
				console.log("existe");
			}else{
				console.log("existe nao racao");
				$scope.createRacao();
			}
		});
	}

	$scope.saveRacao = function(){
		$scope.table_name = "cria_racao";

		var id = $scope.form[$scope.primary_key];
		delete $scope.form[$scope.primary_key];
		delete $scope.form.$$hashKey; 
		basel.database.update($scope.table_name, $scope.form, {id: id}); //entidade, dados, where
		
		$scope.form = {};
		$('#racaoController').modal('hide');
	}

	$scope.newRacao = function(){
		$scope.table_name = "cria_racao";

		basel.database.insert($scope.table_name, $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.editRacao = function(data){
		$scope.form = data;
		$('#racaoController').modal('show');
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

		var id = $scope.form[$scope.primary_key];
		delete $scope.form[$scope.primary_key];
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

		var id = $scope.form[$scope.primary_key];
		delete $scope.form[$scope.primary_key];
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