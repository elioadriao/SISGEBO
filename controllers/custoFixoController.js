"use strict";
app.controller("custoFixoController", function($scope, $location, Propriedade){

	var INVENTARIO_BD = [];
	var DEPRECIACOES_BD = [];
	var CUSTO_FIXO_BD = [];
	var VREBANHO_BD = [];
	var TOTAL_CABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_FIXO_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_FIXO_PCABECA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		
	/* INICIA O INVENTARIO */
	$scope.initInventario = function(){	
		
		var SQL = "SELECT * FROM adm_inventario WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				INVENTARIO_BD = data;
				//console.log(INVENTARIO_BD);
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Inventario..");
			$scope.initDepreciacoes();
		}else{
			console.log("Nao Carregou Inventario..");
			$location.path("/inventario");
		}
	}

	/* INICIA AS DEPRECIACOES */
	$scope.initDepreciacoes = function(){	
		
		var SQL = "SELECT * FROM adm_depreciacoes WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				DEPRECIACOES_BD = data;
				//console.log(DEPRECIACOES_BD);
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Depreciacoes..");
			$scope.initRebanho();
		}else{
			console.log("Nao Carregou Depreciacoes..");
			$location.path("/depreciacoes");
		}
	}

	/*   */
	$scope.initRebanho = function(){
		var DESCANIMAL = ["Matrizes", "Novilhos +14@", "Novilhos 12@ a 14@", "Novilhos até 12@",
			 "Novilhas até 12@", "Bezerros", "Bezerras", "Outros", "Equideos"];
					 
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
			$scope.initCustoFixo();
		}else{
			console.log("Nao Carregou Rebanho..");
			$location.path("/vrebanho");
		}
	}

	/* INICIA O CUSTO FIXO */
	$scope.initCustoFixo = function(){
		var SQL = "SELECT * FROM custo_fixo WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTO_FIXO_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Custo Fixo..");
			$scope.tratarCustoFixo();
		}else{
			console.log("Nao Carregou Custo Fixo..");
			$scope.createCustoFixo();
		}
	}

	/* TRATA AS DEPRECIACOES */
	$scope.tratarDepreciacoes = function(){
		for(i in INVENTARIO_BD){
			for(var d in DEPRECIACOES_BD){
				if(INVENTARIO_BD[i].descricao == DEPRECIACOES_BD[d].descricao){
					INVENTARIO_BD[i].amortizacao = DEPRECIACOES_BD[d].amortizacao;
				}
			}
		}

		for(i in INVENTARIO_BD){
			INVENTARIO_BD[i].medio = (INVENTARIO_BD[i].valor_inicial - INVENTARIO_BD[i].valor_final) /2;
			INVENTARIO_BD[i].anual = (INVENTARIO_BD[i].valor_inicial - INVENTARIO_BD[i].valor_final) /INVENTARIO_BD[i].amortizacao;
			INVENTARIO_BD[i].remuneracao = INVENTARIO_BD[i].medio * DEPRECIACOES_BD[0].juros;
			INVENTARIO_BD[i].fixo = INVENTARIO_BD[i].anual + INVENTARIO_BD[i].remuneracao;
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

	$scope.tratarCustoFixo = function(){
		$scope.tratarRebanho();

		for(i in CUSTO_FIXO_BD){
			TOTAL_FIXO_MES[0] += CUSTO_FIXO_BD[i].jan;
			TOTAL_FIXO_MES[1] += CUSTO_FIXO_BD[i].fev;
			TOTAL_FIXO_MES[2] += CUSTO_FIXO_BD[i].mar;
			TOTAL_FIXO_MES[3] += CUSTO_FIXO_BD[i].abr;
			TOTAL_FIXO_MES[4] += CUSTO_FIXO_BD[i].mai;
			TOTAL_FIXO_MES[5] += CUSTO_FIXO_BD[i].jun;
			TOTAL_FIXO_MES[6] += CUSTO_FIXO_BD[i].jul;
			TOTAL_FIXO_MES[7] += CUSTO_FIXO_BD[i].ago;
			TOTAL_FIXO_MES[8] += CUSTO_FIXO_BD[i].sem;
			TOTAL_FIXO_MES[9] += CUSTO_FIXO_BD[i].out;
			TOTAL_FIXO_MES[10] += CUSTO_FIXO_BD[i].nov;
			TOTAL_FIXO_MES[11] += CUSTO_FIXO_BD[i].dez;
		}

		for(i in TOTAL_FIXO_PCABECA){
			TOTAL_FIXO_PCABECA[i] = TOTAL_FIXO_MES[i]/TOTAL_CABECAS[i];
		}

		$scope.custo_fixo = CUSTO_FIXO_BD;
		$scope.total_fixo_mes = TOTAL_FIXO_MES;
		$scope.total_fixo_pcabeca = TOTAL_FIXO_PCABECA;

		$scope.insertOperacional();
	}

	/*  */
	$scope.createCustoFixo = function(){
		$scope.tratarDepreciacoes();

		for(i in INVENTARIO_BD){
			$scope.form = {};
			$scope.form.id;
			$scope.form.propriedadeId_FK = Propriedade.getId();
			$scope.form.descricao = INVENTARIO_BD[i].descricao;
			$scope.form.jan = INVENTARIO_BD[i].fixo / 12;
			$scope.form.fev = INVENTARIO_BD[i].fixo / 12;
			$scope.form.mar = INVENTARIO_BD[i].fixo / 12;
			$scope.form.abr = INVENTARIO_BD[i].fixo / 12;
			$scope.form.mai = INVENTARIO_BD[i].fixo / 12;
			$scope.form.jun = INVENTARIO_BD[i].fixo / 12;
			$scope.form.jul = INVENTARIO_BD[i].fixo / 12;
			$scope.form.ago = INVENTARIO_BD[i].fixo / 12;
			$scope.form.sem = INVENTARIO_BD[i].fixo / 12;
			$scope.form.out = INVENTARIO_BD[i].fixo / 12;
			$scope.form.nov = INVENTARIO_BD[i].fixo / 12;
			$scope.form.dez = INVENTARIO_BD[i].fixo / 12;
			$scope.new();
		}

		$scope.initCustoFixo();
	}

	$scope.insertOperacional = function(){
		var SQL = "SELECT * FROM custo_operacional WHERE descricao='Fixo' AND propriedadeId_FK="+Propriedade.getId();
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

		$scope.form.jan = TOTAL_FIXO_MES[0];
		$scope.form.fev = TOTAL_FIXO_MES[1];
		$scope.form.mar = TOTAL_FIXO_MES[2];
		$scope.form.abr = TOTAL_FIXO_MES[3];
		$scope.form.mai = TOTAL_FIXO_MES[4];
		$scope.form.jun = TOTAL_FIXO_MES[5];
		$scope.form.jul = TOTAL_FIXO_MES[6];
		$scope.form.ago = TOTAL_FIXO_MES[7];
		$scope.form.sem = TOTAL_FIXO_MES[8];
		$scope.form.out = TOTAL_FIXO_MES[9];
		$scope.form.nov = TOTAL_FIXO_MES[10];
		$scope.form.dez = TOTAL_FIXO_MES[11];
		$scope.form.descricao = "Fixo";
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
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		$('#custoFixoModal').modal('hide');
		
		$scope.new();

		$scope.initCustoFixo();
		//$location.path('/inventario');
	}

	// Cancel form
	$scope.new = function(){
		basel.database.insert("custo_fixo", $scope.form);
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	/*Abrindo para editar
	$scope.edit = function(data){
		$scope.form = {}
		$scope.form.id = data.id;
		$scope.form.descricao = data.descricao;
		$scope.form.valor_final = data.valor_final;
		$scope.form.valor_inicial = data.valor_inicial;
		ISEDIT = true;
		$('#depreciacoesModal').modal('show');
	}
	*/

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Custo Fixo?")){
			basel.database.delete("custo_fixo", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("custo_operacional", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});