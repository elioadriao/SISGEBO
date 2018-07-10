"use strict";
app.controller("custofixoController", function($scope, $location, Propriedade){

	var INVENTARIO_BD = [];
	var DEPRECIACOES_BD = [];
	var CUSTOFIXO_BD = [];
	var VREBANHO_BD = [];
	var TOTALCABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTALFIXOMES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var FIXOPORCABECA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var DESCANIMAL = ["Matrizes", "Novilhos +14@", "Novilhos 12@ a 14@", "Novilhos até 12@",
					 "Novilhas até 12@", "Bezerros", "Bezerras", "Outros", "Equideos"];
		
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
		var SQL = "SELECT * FROM adm_custofixo WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTOFIXO_BD = data;
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
				TOTALCABECAS[m] += VREBANHO_BD[i][m].qtd;
			}
		}
	}

	$scope.tratarCustoFixo = function(){
		$scope.tratarRebanho();

		for(i in CUSTOFIXO_BD){
			TOTALFIXOMES[0] += CUSTOFIXO_BD[i].jan;
			TOTALFIXOMES[1] += CUSTOFIXO_BD[i].fev;
			TOTALFIXOMES[2] += CUSTOFIXO_BD[i].mar;
			TOTALFIXOMES[3] += CUSTOFIXO_BD[i].abr;
			TOTALFIXOMES[4] += CUSTOFIXO_BD[i].mai;
			TOTALFIXOMES[5] += CUSTOFIXO_BD[i].jun;
			TOTALFIXOMES[6] += CUSTOFIXO_BD[i].jul;
			TOTALFIXOMES[7] += CUSTOFIXO_BD[i].ago;
			TOTALFIXOMES[8] += CUSTOFIXO_BD[i].sem;
			TOTALFIXOMES[9] += CUSTOFIXO_BD[i].out;
			TOTALFIXOMES[10] += CUSTOFIXO_BD[i].nov;
			TOTALFIXOMES[11] += CUSTOFIXO_BD[i].dez;
		}

		for(i in FIXOPORCABECA){
			FIXOPORCABECA[i] = TOTALFIXOMES[i]/TOTALCABECAS[i];
		}

		$scope.custofixo = CUSTOFIXO_BD;
		$scope.fixopormes = TOTALFIXOMES;
		$scope.fixoporcab = TOTALCABECAS;
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

	$scope.save = function(){
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		$('#custofixoModal').modal('hide');
		
		$scope.new();

		$scope.initCustoFixo();
		//$location.path('/inventario');
	}

	// Cancel form
	$scope.new = function(){
		basel.database.insert("adm_custofixo", $scope.form);
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
		if(confirm("Deseja Resetar Inventario?")){
			basel.database.delete("adm_custofixo", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});