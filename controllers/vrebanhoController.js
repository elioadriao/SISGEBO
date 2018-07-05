"use strict";
app.controller("vrebanhoController", function($scope, $location, $window, Propriedade){

	var VREBANHO_BD = [];
	var TOTALAREA = 1;
	var TOTALCABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var PESOMES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var ESTOQUE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var DENSIDADE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TAXALOTACAO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var DESCANIMAL = ["Matrizes", "Novilhos +14@", "Novilhos 12@ a 14@", "Novilhos até 12@",
					 "Novilhas até 12@", "Bezerros", "Bezerras", "Outros", "Equideos"];

	$scope.initRebanho = function(){
		for (i in DESCANIMAL){
			var SQL = "SELECT * FROM adm_vrebanho WHERE propriedadeId_FK="+Propriedade.getId()+" AND descricao='"+DESCANIMAL[i]+"'";
			var res = false;
			//console.log(DESCANIMAL[i]);

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
			$scope.tratarRebanho();
		}else{
			console.log("Nao Carregou Rebanho..");
			$scope.createRebanho();
		}
	}

	$scope.tratarRebanho = function(){
		for(i in VREBANHO_BD){			
			for(var m=1; m<=12; m++){
				TOTALCABECAS[m-1] += VREBANHO_BD[i][m-1].qtd;
				PESOMES[m-1] += VREBANHO_BD[i][m-1].qtd * VREBANHO_BD[i][m-1].peso;
			}
		}

		for(i in VREBANHO_BD){			
			for(var m=1; m<=12; m++){
				PESOMES[m-1] /= TOTALCABECAS[m-1];
				ESTOQUE[m-1] = (PESOMES[m-1] * TOTALCABECAS[m-1]) / 30;
				DENSIDADE[m-1] = TOTALCABECAS[m-1] / VREBANHO_BD[0][m-1].area;
				TAXALOTACAO[m-1] = ((TOTALCABECAS[m-1] * PESOMES[m-1]) / 450) / ESTOQUE[m-1];	
			}
		}

		$scope.pesomes = PESOMES;
		$scope.totalcabecas = TOTALCABECAS;
		$scope.estoque = ESTOQUE;
		$scope.densidade = DENSIDADE;
		$scope.taxalotacao = TAXALOTACAO;
		$scope.vrebanho = VREBANHO_BD;
	}

	/* Cria Tabela do Rebanho */
	$scope.createRebanho = function(){
		for(i in DESCANIMAL){
			for(var m=1; m<=12; m++){
				$scope.form = {};
				$scope.form.id;
				$scope.form.descricao = DESCANIMAL[i];
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
		$('#vrebanhoModal').modal('hide');

		for(i=0; i<12; i++){
			//console.log($scope.form[i]);
			//basel.database.update("adm_vrebanho", $scope.form[i], {"descricao": $scope.form[i].descricao, "propriedadeId_FK": Propriedade.getId()}); //entidade, dados, where
			var SQL = "UPDATE adm_vrebanho SET qtd = "+$scope.form[i].qtd+", peso = "+$scope.form[i].peso+" WHERE propriedadeId_FK = "+Propriedade.getId()+" AND descricao = '"+$scope.form[i].descricao+"' AND mes = "+$scope.form[i].mes;
			basel.database.runAsync(SQL, function(data){});
		}
		
		$scope.form = {};
		$scope.initRebanho();
	}

	/* Inserindo no Banco */
	$scope.new = function(){
		basel.database.insert("adm_vrebanho", $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.edit = function(data){
		$scope.form = data;
		$('#vrebanhoModal').modal('show');
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