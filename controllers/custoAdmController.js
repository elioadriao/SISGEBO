"use strict";
app.controller("custoAdmController", function($scope, $location, Propriedade){

	var CUSTO_ADM_BD = [];
	var VREBANHO_BD = [];
	var TOTAL_CABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_ADM_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_ADM_PCABECA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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

	/* INICIA O CUSTO ADM */
	$scope.initCustoVariavel = function(){
		var SQL = "SELECT * FROM custo_adm WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTO_ADM_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Custo Adm..");
			$scope.tratarCustoAdm();
		}else{
			console.log("Nao Carregou Custo Adm..");
			$scope.createCustoAdm();
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

	$scope.tratarCustoAdm = function(){
		$scope.tratarRebanho();

		for(i in CUSTO_ADM_BD){
			TOTAL_ADM_MES[0] += CUSTO_ADM_BD[i].jan;
			TOTAL_ADM_MES[1] += CUSTO_ADM_BD[i].fev;
			TOTAL_ADM_MES[2] += CUSTO_ADM_BD[i].mar;
			TOTAL_ADM_MES[3] += CUSTO_ADM_BD[i].abr;
			TOTAL_ADM_MES[4] += CUSTO_ADM_BD[i].mai;
			TOTAL_ADM_MES[5] += CUSTO_ADM_BD[i].jun;
			TOTAL_ADM_MES[6] += CUSTO_ADM_BD[i].jul;
			TOTAL_ADM_MES[7] += CUSTO_ADM_BD[i].ago;
			TOTAL_ADM_MES[8] += CUSTO_ADM_BD[i].sem;
			TOTAL_ADM_MES[9] += CUSTO_ADM_BD[i].out;
			TOTAL_ADM_MES[10] += CUSTO_ADM_BD[i].nov;
			TOTAL_ADM_MES[11] += CUSTO_ADM_BD[i].dez;
		}

		for(i=0; i<12; i++){
			TOTAL_ADM_PCABECA[i] = TOTAL_ADM_MES[i] / TOTAL_CABECAS[i];
		}

		$scope.custo_adm = CUSTO_ADM_BD;
		$scope.total_adm_mes = TOTAL_ADM_MES;
		$scope.total_adm_pcabeca = TOTAL_ADM_PCABECA;

		$scope.insertOperacional();
	}

	/*  */
	$scope.createCustoAdm = function(){
		var ESPECIFICACAO = ["Funcionários administrativos", "Alimentacao/Refeicao", "Escritório", "Telefone", "Telefone fixo", "Contador/Advogado",
			 "Informacoes", "Seguros veículos", "Moto/Carro", "Despesas de Viagem", "Energia elétrica"];

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
		var SQL = "SELECT * FROM custo_operacional WHERE descricao='Administrativo' AND propriedadeId_FK="+Propriedade.getId();
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

		$scope.form.jan = TOTAL_ADM_MES[0];
		$scope.form.fev = TOTAL_ADM_MES[1];
		$scope.form.mar = TOTAL_ADM_MES[2];
		$scope.form.abr = TOTAL_ADM_MES[3];
		$scope.form.mai = TOTAL_ADM_MES[4];
		$scope.form.jun = TOTAL_ADM_MES[5];
		$scope.form.jul = TOTAL_ADM_MES[6];
		$scope.form.ago = TOTAL_ADM_MES[7];
		$scope.form.sem = TOTAL_ADM_MES[8];
		$scope.form.out = TOTAL_ADM_MES[9];
		$scope.form.nov = TOTAL_ADM_MES[10];
		$scope.form.dez = TOTAL_ADM_MES[11];
		$scope.form.descricao = "Administrativo";
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
		$('#custoAdmModal').modal('hide');
		
		basel.database.update("custo_adm", $scope.form, {id: id});
		//$scope.new();

		$scope.initCustoVariavel();
		//$location.path('/inventario');
	}

	// Cancel form
	$scope.new = function(){
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		basel.database.insert("custo_adm", $scope.form);
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.edit = function(data){
		$scope.form = data;
		$('#custoAdmModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Custo ADM?")){
			basel.database.delete("custo_adm", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("custo_operacional", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});