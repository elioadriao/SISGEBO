"use strict";
app.controller("investimentoController", function($scope, $location, Propriedade){

	var INVESTIMENTO_BD = [];
	var VREBANHO_BD = [];
	var TOTAL_CABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var INVESTIMENTO_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var INVESTIMENTO_PCABECA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
			$scope.initInvestimento();
		}else{
			console.log("Nao Carregou Rebanho..");
			$location.path("/vrebanho");
		}
	}

	/* INICIA O INVESTIMENTO */
	$scope.initInvestimento = function(){
		var SQL = "SELECT * FROM investimento WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				INVESTIMENTO_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Investimento..");
			$scope.tratarInvestimento();
		}else{
			console.log("Nao Carregou Investimento..");
			$scope.createInvestimento();
		}
	}

	/*  */
	$scope.tratarRebanho = function(){
		for(i in VREBANHO_BD){			
			for(var m=0; m<12; m++){
				TOTAL_CABECAS[m] += VREBANHO_BD[i][m].qtd;
			}
		}
	}

	$scope.tratarInvestimento = function(){
		$scope.tratarRebanho();

		for(i in INVESTIMENTO_BD){
			INVESTIMENTO_MES[0] += INVESTIMENTO_BD[i].jan;
			INVESTIMENTO_MES[1] += INVESTIMENTO_BD[i].fev;
			INVESTIMENTO_MES[2] += INVESTIMENTO_BD[i].mar;
			INVESTIMENTO_MES[3] += INVESTIMENTO_BD[i].abr;
			INVESTIMENTO_MES[4] += INVESTIMENTO_BD[i].mai;
			INVESTIMENTO_MES[5] += INVESTIMENTO_BD[i].jun;
			INVESTIMENTO_MES[6] += INVESTIMENTO_BD[i].jul;
			INVESTIMENTO_MES[7] += INVESTIMENTO_BD[i].ago;
			INVESTIMENTO_MES[8] += INVESTIMENTO_BD[i].sem;
			INVESTIMENTO_MES[9] += INVESTIMENTO_BD[i].out;
			INVESTIMENTO_MES[10] += INVESTIMENTO_BD[i].nov;
			INVESTIMENTO_MES[11] += INVESTIMENTO_BD[i].dez;
		}

		for(i=0; i<12; i++){
			INVESTIMENTO_PCABECA[i] = INVESTIMENTO_MES[i] / TOTAL_CABECAS[i];
		}

		$scope.investimento = INVESTIMENTO_BD;
		$scope.investimento_mes = INVESTIMENTO_MES;
		$scope.investimento_pcabeca = INVESTIMENTO_PCABECA;
	}

	/*  */
	$scope.createInvestimento = function(){
		var ESPECIFICACAO = ["Herbicida", "Equip. Aplicação Herbicidas", "Mão de obra para roçagem", "Equip. Roçagem",
			 "Vacas Girolando", "Cocho Sal", "Inseminacao Artificial", "Material para Cercas", "Edificacoes", "Silo",
			 "Curral/Cancelas/Balancas"];

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

		$scope.initInvestimento();
	}

	$scope.save = function(){
		//$scope.form.id;
		//$scope.form.propriedadeId_FK = Propriedade.getId();
		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		$('#investimentoModal').modal('hide');
		
		basel.database.update("investimento", $scope.form, {id: id});
		//$scope.new();

		$scope.initInvestimento();
		//$location.path('/inventario');
	}

	// Cancel form
	$scope.new = function(){
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		basel.database.insert("investimento", $scope.form);
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.edit = function(data){
		$scope.form = data;
		$('#investimentoModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Investimento?")){
			basel.database.delete("investimento", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});