"use strict";
app.controller("custoVariavelController", function($scope, $location, Propriedade){

	var CUSTO_VARIAVEL_BD = [];
	var VREBANHO_BD = [];
	var TOTAL_CABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var AQUISICAO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_VARIAVEL_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_VARIAVEL_C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_VARIAVEL_S = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	/*   */
	$scope.initRebanho = function(){
		var DESC_ANIMAL = ["Matrizes", "Novilhos +14@", "Novilhos 12@ a 14@", "Novilhos até 12@", 
			 "Novilhas até 12@", "Bezerros", "Bezerras", "Outros", "Equideos"];

		for (i in DESC_ANIMAL){
			var SQL = "SELECT * FROM adm_vrebanho WHERE propriedadeId_FK="+Propriedade.getId()+" AND descricao='"+DESC_ANIMAL[i]+"'";
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
		var SQL = "SELECT * FROM custo_variavel WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTO_VARIAVEL_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Custo Variavel..");
			$scope.tratarCustoVariavel();
		}else{
			console.log("Nao Carregou Custo Variavel..");
			$scope.createCustoVariavel();
		}
	}

	/*  */
	$scope.tratarRebanho = function(){
		for(i in VREBANHO_BD){			
			for(var m=0; m<12; m++){
				TOTAL_CABECAS[m] += VREBANHO_BD[i][m].qtd;
			}
		}

		for(i in CUSTO_VARIAVEL_BD){
			if(CUSTO_VARIAVEL_BD[i].descricao == "Aquisicao de animais"){
				AQUISICAO[0] = CUSTO_VARIAVEL_BD[i].jan;
				AQUISICAO[1] = CUSTO_VARIAVEL_BD[i].fev;
				AQUISICAO[2] = CUSTO_VARIAVEL_BD[i].mar;
				AQUISICAO[3] = CUSTO_VARIAVEL_BD[i].abr;
				AQUISICAO[4] = CUSTO_VARIAVEL_BD[i].mai;
				AQUISICAO[5] = CUSTO_VARIAVEL_BD[i].jun;
				AQUISICAO[6] = CUSTO_VARIAVEL_BD[i].jul;
				AQUISICAO[7] = CUSTO_VARIAVEL_BD[i].ago;
				AQUISICAO[8] = CUSTO_VARIAVEL_BD[i].sem;
				AQUISICAO[9] = CUSTO_VARIAVEL_BD[i].out;
				AQUISICAO[10] = CUSTO_VARIAVEL_BD[i].nov;
				AQUISICAO[11] = CUSTO_VARIAVEL_BD[i].dez;
			}
		}
	}

	$scope.tratarCustoVariavel = function(){
		$scope.tratarRebanho();

		for(i in CUSTO_VARIAVEL_BD){
			TOTAL_VARIAVEL_MES[0] += CUSTO_VARIAVEL_BD[i].jan;
			TOTAL_VARIAVEL_MES[1] += CUSTO_VARIAVEL_BD[i].fev;
			TOTAL_VARIAVEL_MES[2] += CUSTO_VARIAVEL_BD[i].mar;
			TOTAL_VARIAVEL_MES[3] += CUSTO_VARIAVEL_BD[i].abr;
			TOTAL_VARIAVEL_MES[4] += CUSTO_VARIAVEL_BD[i].mai;
			TOTAL_VARIAVEL_MES[5] += CUSTO_VARIAVEL_BD[i].jun;
			TOTAL_VARIAVEL_MES[6] += CUSTO_VARIAVEL_BD[i].jul;
			TOTAL_VARIAVEL_MES[7] += CUSTO_VARIAVEL_BD[i].ago;
			TOTAL_VARIAVEL_MES[8] += CUSTO_VARIAVEL_BD[i].sem;
			TOTAL_VARIAVEL_MES[9] += CUSTO_VARIAVEL_BD[i].out;
			TOTAL_VARIAVEL_MES[10] += CUSTO_VARIAVEL_BD[i].nov;
			TOTAL_VARIAVEL_MES[11] += CUSTO_VARIAVEL_BD[i].dez;
		}

		for(i=0; i<12; i++){
			TOTAL_VARIAVEL_C[i] = TOTAL_VARIAVEL_MES[i] / TOTAL_CABECAS[i];
			TOTAL_VARIAVEL_S[i] = (TOTAL_VARIAVEL_MES[i] - AQUISICAO[i]) / TOTAL_CABECAS[i];
		}

		$scope.custo_variavel = CUSTO_VARIAVEL_BD;
		$scope.total_variavel_mes = TOTAL_VARIAVEL_MES;
		$scope.total_variavel_c = TOTAL_VARIAVEL_C;
		$scope.total_variavel_s = TOTAL_VARIAVEL_S;

		$scope.insertOperacional();
	}

	/*  */
	$scope.createCustoVariavel = function(){
		var ESPECIFICACAO = ["Suplementacao", "Sal mineral", "Carrapaticidas", "Mosca do chifre", "Vermífugo", "Vacina de aftosa",
			 "Vacina clostridiose", "Outras vacinas", "Outros medicamentos", "Mao de obra", "Materiais", "Curral", "Frete Carretas",
			 "Casas", "Tratores", "Máquinas", "Combustível", "Celular", "Encargos Bancarios", "Projeto Pecuario", "Energia elétrica",
			 "Aquisicao de animais"];

		for(i in ESPECIFICACAO){
			$scope.form = {};
			$scope.form.descricao = ESPECIFICACAO[i];
			$scope.form.jan = 0;
			$scope.form.fev = 0;
			$scope.form.mar = 0;
			$scope.form.abr = 0;
			$scope.form.mai = 0;
			$scope.form.jun = 0;
			$scope.form.jul = 0;
			$scope.form.ago = 0;
			$scope.form.sem = 0;
			$scope.form.out = 0;
			$scope.form.nov = 0;
			$scope.form.dez = 0;
			$scope.new();
		}

		$scope.initCustoVariavel();
	}

	$scope.insertOperacional = function(){
		var SQL = "SELECT * FROM custo_operacional WHERE descricao='Variavel' AND propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				$scope.form = data[0];
				res = true;
			}else{
				$scope.form = {};
				$scope.form.id;
				res = false;
			}
		});

		$scope.form.jan = TOTAL_VARIAVEL_MES[0];
		$scope.form.fev = TOTAL_VARIAVEL_MES[1];
		$scope.form.mar = TOTAL_VARIAVEL_MES[2];
		$scope.form.abr = TOTAL_VARIAVEL_MES[3];
		$scope.form.mai = TOTAL_VARIAVEL_MES[4];
		$scope.form.jun = TOTAL_VARIAVEL_MES[5];
		$scope.form.jul = TOTAL_VARIAVEL_MES[6];
		$scope.form.ago = TOTAL_VARIAVEL_MES[7];
		$scope.form.sem = TOTAL_VARIAVEL_MES[8];
		$scope.form.out = TOTAL_VARIAVEL_MES[9];
		$scope.form.nov = TOTAL_VARIAVEL_MES[10];
		$scope.form.dez = TOTAL_VARIAVEL_MES[11];
		$scope.form.descricao = "Variavel";
		$scope.form.propriedadeId_FK = Propriedade.getId();

		if(res){
			var id = $scope.form["id"];
			delete $scope.form["id"];
			delete $scope.form.$$hashKey;
			
			basel.database.update("custo_operacional", $scope.form, {id: id});
		}else{
			basel.database.insert("custo_operacional", $scope.form);
		}	
	}

	$scope.save = function(){
		//$scope.form.id;
		//$scope.form.propriedadeId_FK = Propriedade.getId();
		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		$('#custoVariavelModal').modal('hide');
		
		basel.database.update("custo_variavel", $scope.form, {id: id});
		//$scope.new();

		$scope.initCustoVariavel();
		//$location.path('/inventario');
	}

	// Cancel form
	$scope.new = function(){
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		basel.database.insert("custo_variavel", $scope.form);
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.edit = function(data){
		$scope.form = data;
		$('#custoVariavelModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Custo Variavel?")){
			basel.database.delete("custo_variavel", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("custo_operacional", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});