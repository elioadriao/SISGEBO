"use strict";
app.controller("variacaoRebanhoController", function($scope, $location, $window, Propriedade){

	var VARIACAO_REBANHO_BD = [];
	var TOTAL_CABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var PESO_MEDIO_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var ESTOQUE_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var DENSIDADE_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var LOTACAO_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var DESC_ANIMAL = ["Matrizes", "Novilhos +14@", "Novilhos 12@ a 14@", "Novilhos até 12@",
					 "Novilhas até 12@", "Bezerros", "Bezerras", "Outros", "Equideos"];

	$scope.initRebanho = function(){
		for (i in DESC_ANIMAL){
			var SQL = "SELECT * FROM variacao_rebanho WHERE propriedadeId_FK="+Propriedade.getId()+" AND descricao='"+DESC_ANIMAL[i]+"'";
			var res = false;
			//console.log(DESC_ANIMAL[i]);

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					VARIACAO_REBANHO_BD[i] = data;	
					res = true;
				}else{
					res = false;
				}
			});
		}		

		if(res){
			console.log("Carregou Rebanho..");
			$scope.tratarRebanho();
		}else{
			console.log("Nao Carregou Rebanho..");
			$scope.createRebanho();
		}
	}

	$scope.tratarRebanho = function(){
		for(i in VARIACAO_REBANHO_BD){			
			for(var m=1; m<=12; m++){
				TOTAL_CABECAS[m-1] += VARIACAO_REBANHO_BD[i][m-1].qtd;
				PESO_MEDIO_MES[m-1] += VARIACAO_REBANHO_BD[i][m-1].qtd * VARIACAO_REBANHO_BD[i][m-1].peso;
			}
		}

		for(i in VARIACAO_REBANHO_BD){			
			for(var m=1; m<=12; m++){
				PESO_MEDIO_MES[m-1] /= TOTAL_CABECAS[m-1];
				ESTOQUE_MES[m-1] = (PESO_MEDIO_MES[m-1] * TOTAL_CABECAS[m-1]) / 30;
				DENSIDADE_MES[m-1] = TOTAL_CABECAS[m-1] / VARIACAO_REBANHO_BD[0][m-1].area;
				LOTACAO_MES[m-1] = ((TOTAL_CABECAS[m-1] * PESO_MEDIO_MES[m-1]) / 450) / ESTOQUE_MES[m-1];	
			}
		}

		$scope.peso_medio_mes = PESO_MEDIO_MES;
		$scope.total_cabecas = TOTAL_CABECAS;
		$scope.estoque_mes = ESTOQUE_MES;
		$scope.densidade_mes = DENSIDADE_MES;
		$scope.lotacao_mes = LOTACAO_MES;
		$scope.variacao_rebanho = VARIACAO_REBANHO_BD;
	}

	/* Cria Tabela do Rebanho */
	$scope.createRebanho = function(){
		for(i in DESC_ANIMAL){
			for(var m=1; m<=12; m++){
				$scope.form = {};
				$scope.form.id;
				$scope.form.descricao = DESC_ANIMAL[i];
				$scope.form.mes = m;
				$scope.form.qtd = 0;
				$scope.form.peso = 0;
				$scope.form.area = 1;
				$scope.form.propriedadeId_FK = Propriedade.getId();
				$scope.new();
			}
		}		
		$scope.initRebanho();
	}

	/* Salvando no Banco */
	$scope.save = function(){
		$('#variacaoRebanhoModal').modal('hide');

		for(i=0; i<12; i++){
			//console.log($scope.form[i]);
			//basel.database.update("variacao_rebanho", $scope.form[i], {"descricao": $scope.form[i].descricao, "propriedadeId_FK": Propriedade.getId()}); //entidade, dados, where
			var SQL = "UPDATE variacao_rebanho SET qtd = "+$scope.form[i].qtd+", peso = "+$scope.form[i].peso+" WHERE propriedadeId_FK = "+Propriedade.getId()+" AND descricao = '"+$scope.form[i].descricao+"' AND mes = "+$scope.form[i].mes;
			basel.database.runAsync(SQL, function(data){});
		}
		
		$scope.form = {};
		$scope.initRebanho();
	}

	/* Inserindo no Banco */
	$scope.new = function(){
		basel.database.insert("variacao_rebanho", $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.edit = function(data){
		$scope.form = data;
		$('#variacaoRebanhoModal').modal('show');
	}

	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.delete = function(data){
		if(confirm("Deseja Resetar Valores?")){
			$scope.form = data;
			$scope.form.qtd = 0;
			$scope.form.valor = 0;
			$scope.form.peso = 0;
			$scope.save();
		}
	}
});