"use strict";
app.controller("custoOportunidadeController", function($scope, $location, Propriedade){

	var CUSTO_OPORTUNIDADE_BD = [];
	var VARIACAO_REBANHO_PESO_BD = [];
	var VARIACAO_REBANHO_QTD_BD = [];
	var VARIACAO_REBANHO_AREA_BD = [];
	var INVENTARIO_BD = [];
	var CUSTO_OPERACIONAL_BD =[];
	var CUSTO_FIXO_BD = [];
	var TOTAL_CABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var PESO_MEDIO_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var ESTOQUE_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var DENSIDADE_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var MEDIA_CABECA = 0;
	var MEDIA_AREA = 0;
	var MEDIA_PESO = 0;
	var MEDIA_DENSIDADE = 0;
	var VALOR_TERRA = 0;
	var VALOR_ANIMAIS = 0;
	var VALOR_IMOBILIZADO = 0;
	var VALOR_DESEMBOLSO = 0;

	/* INICIA O CUSTO DE OPORTUNIDADE */
	$scope.initRebanhoPeso = function(){
		var SQL = "SELECT * FROM variacao_rebanho_peso WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				VARIACAO_REBANHO_PESO_BD = data;	
				res = true;
			}else{
				res = false;
			}
		});			

		if(res){
			console.log("Carregou Peso do Rebanho..");
			$scope.initRebanhoQtd();
		}else{
			console.log("Nao Carregou Peso do Rebanho..");
			$location.path("/variacaoRebanho");
		}
	}

	$scope.initRebanhoQtd = function(){
		var SQL = "SELECT * FROM variacao_rebanho_qtd WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				VARIACAO_REBANHO_QTD_BD = data;	
				res = true;
			}else{
				res = false;
			}
		});			

		if(res){
			console.log("Carregou Qtd do Rebanho..");
			$scope.initRebanhoArea();
		}else{
			console.log("Nao Carregou Qtd do Rebanho..");
			$location.path("/variacaoRebanho");
		}
	}

	$scope.initRebanhoArea = function(){
		var SQL = "SELECT * FROM variacao_rebanho_area WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				VARIACAO_REBANHO_AREA_BD = data[0];	
				res = true;
			}else{
				res = false;
			}
		});			

		if(res){
			console.log("Carregou Rebanho..");
			$scope.initInventario();
		}else{
			console.log("Nao Carregou Rebanho..");
			$location.path("/variacaoRebanho");
		}
	}

	/* INICIA O INVENTARIO */
	$scope.initInventario = function(){	
		
		var SQL = "SELECT * FROM inventario WHERE propriedadeId_FK="+Propriedade.getId();
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
			$scope.initCustoOperacional();
		}else{
			console.log("Nao Carregou Inventario..");
			$location.path("/inventario");
		}
	}

	/* INICIA O CUSTO OPERACIONAL */
	$scope.initCustoOperacional = function(){
		var SQL = "SELECT * FROM custo_operacional WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTO_OPERACIONAL_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Custo Operacional..");
			$scope.initCustoFixo();
		}else{
			console.log("Nao Carregou Custo Operacional..");
			$location.path("/");
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
			$scope.initCustoOportunidade();
		}else{
			console.log("Nao Carregou Custo Fixo..");
			$location.path("/custoFixo");
		}
	}

	$scope.initCustoOportunidade = function(){
		var SQL = "SELECT * FROM custo_oportunidade WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTO_OPORTUNIDADE_BD = data[0];
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou CustoOportunidade..");
			$scope.tratarCustoOportunidade();
		}else{
			console.log("Nao Carregou CustoOportunidade..");
			$scope.createCustoOportunidade();
		}
	}

	$scope.tratarRebanho = function(){
		for(i in VARIACAO_REBANHO_PESO_BD){			
			TOTAL_CABECAS[0] += VARIACAO_REBANHO_QTD_BD[i].jan;
			PESO_MEDIO_MES[0] += VARIACAO_REBANHO_QTD_BD[i].jan * VARIACAO_REBANHO_PESO_BD[i].jan;
			
			TOTAL_CABECAS[1] += VARIACAO_REBANHO_QTD_BD[i].fev;
			PESO_MEDIO_MES[1] += VARIACAO_REBANHO_QTD_BD[i].fev * VARIACAO_REBANHO_PESO_BD[i].fev;
			
			TOTAL_CABECAS[2] += VARIACAO_REBANHO_QTD_BD[i].mar;
			PESO_MEDIO_MES[2] += VARIACAO_REBANHO_QTD_BD[i].mar * VARIACAO_REBANHO_PESO_BD[i].mar;
			
			TOTAL_CABECAS[3] += VARIACAO_REBANHO_QTD_BD[i].abr;
			PESO_MEDIO_MES[3] += VARIACAO_REBANHO_QTD_BD[i].abr * VARIACAO_REBANHO_PESO_BD[i].abr;
			
			TOTAL_CABECAS[4] += VARIACAO_REBANHO_QTD_BD[i].mai;
			PESO_MEDIO_MES[4] += VARIACAO_REBANHO_QTD_BD[i].mai * VARIACAO_REBANHO_PESO_BD[i].mai;
			
			TOTAL_CABECAS[5] += VARIACAO_REBANHO_QTD_BD[i].jun;
			PESO_MEDIO_MES[5] += VARIACAO_REBANHO_QTD_BD[i].jun * VARIACAO_REBANHO_PESO_BD[i].jun;
			
			TOTAL_CABECAS[6] += VARIACAO_REBANHO_QTD_BD[i].jul;
			PESO_MEDIO_MES[6] += VARIACAO_REBANHO_QTD_BD[i].jul * VARIACAO_REBANHO_PESO_BD[i].jul;
			
			TOTAL_CABECAS[7] += VARIACAO_REBANHO_QTD_BD[i].ago;
			PESO_MEDIO_MES[7] += VARIACAO_REBANHO_QTD_BD[i].ago * VARIACAO_REBANHO_PESO_BD[i].ago;
			
			TOTAL_CABECAS[8] += VARIACAO_REBANHO_QTD_BD[i].sem;
			PESO_MEDIO_MES[8] += VARIACAO_REBANHO_QTD_BD[i].sem * VARIACAO_REBANHO_PESO_BD[i].sem;
			
			TOTAL_CABECAS[9] += VARIACAO_REBANHO_QTD_BD[i].out;
			PESO_MEDIO_MES[9] += VARIACAO_REBANHO_QTD_BD[i].out * VARIACAO_REBANHO_PESO_BD[i].out;
			
			TOTAL_CABECAS[10] += VARIACAO_REBANHO_QTD_BD[i].nov;
			PESO_MEDIO_MES[10] += VARIACAO_REBANHO_QTD_BD[i].nov * VARIACAO_REBANHO_PESO_BD[i].nov;
			
			TOTAL_CABECAS[11] += VARIACAO_REBANHO_QTD_BD[i].dez;
			PESO_MEDIO_MES[11] += VARIACAO_REBANHO_QTD_BD[i].dez * VARIACAO_REBANHO_PESO_BD[i].dez;
		}
		
		for(i=0; i<12; i++){
			PESO_MEDIO_MES[i] /= TOTAL_CABECAS[i];
			ESTOQUE_MES[i] = (PESO_MEDIO_MES[i] * TOTAL_CABECAS[i]) / 30;
			DENSIDADE_MES[i] = TOTAL_CABECAS[i] / $scope.getArea(i);
		}

		for(i=0; i<12; i++){
			MEDIA_AREA += $scope.getArea(i);
			MEDIA_CABECA += TOTAL_CABECAS[i];
			MEDIA_DENSIDADE += DENSIDADE_MES[i];
			MEDIA_PESO += PESO_MEDIO_MES[i];
		}
		MEDIA_CABECA /= 12;
		MEDIA_PESO /= 12;
		MEDIA_DENSIDADE /= 12;
		MEDIA_AREA /= 12;
	}

	$scope.tratarInventario = function(){
		var aux = 0;

		for(i in INVENTARIO_BD){
			VALOR_IMOBILIZADO += (INVENTARIO_BD[i].valor_inicial + INVENTARIO_BD[i].valor_final)/2;
			
			switch(INVENTARIO_BD[i].descricao){
				case "Terra":
					VALOR_TERRA = (INVENTARIO_BD[i].valor_inicial + INVENTARIO_BD[i].valor_final)/2;
					break;
				case "Reprodutores Machos":
				case "Reprodutores Femeas":
				case "Animais de Engorda":
				case "Animais de Trabalho":
					VALOR_ANIMAIS += (INVENTARIO_BD[i].valor_inicial + INVENTARIO_BD[i].valor_final)/2;
					break;
				case "Benfeitorias":
				case "Cercas":
				case "Edificacoes":
				case "Pastagem":
					aux += (INVENTARIO_BD[i].valor_inicial + INVENTARIO_BD[i].valor_final)/2;
			}
		}

		VALOR_IMOBILIZADO -= aux;
	}

	$scope.tratarCustoOperacional = function(){
		for(i in CUSTO_OPERACIONAL_BD){
			if(CUSTO_OPERACIONAL_BD[i].descricao == "Administrativo" || CUSTO_OPERACIONAL_BD[i].descricao == "Variavel"){
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].jan;
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].fev;
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].mar;
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].abr;
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].mai;
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].jun;
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].jul;
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].ago;
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].sem;
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].out;
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].nov;
				VALOR_DESEMBOLSO += CUSTO_OPERACIONAL_BD[i].dez;
			}
		}
	}

	$scope.tratarCustoFixo = function(){
		var aux = 0;

		for(i in CUSTO_FIXO_BD){
			switch(CUSTO_FIXO_BD[i].descricao){
				case "Máquinas e Implementos":
				case "Tratores":
				case "Veículos":
				case "Equipamentos Manuais":
				case "Reprodutores Machos":
				case "Reprodutores Femeas":
				case "Animais de Trabalho":
				case "Canavial ou Volumosos":
				case "Benfeitorias":
				case "Edificações":
				case "Pastagem":
					aux = 1;
					break;
				default:
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].jan;
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].fev;
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].mar;
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].abr;
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].mai;
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].jun;
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].jul;
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].ago;
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].sem;
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].out;
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].nov;
					VALOR_DESEMBOLSO += CUSTO_FIXO_BD[i].dez;
			}
		}
	}

	$scope.tratarCustoOportunidade = function(){
		$scope.tratarRebanho();
		$scope.tratarInventario();
		$scope.tratarCustoOperacional();
		$scope.tratarCustoFixo();

		CUSTO_OPORTUNIDADE_BD.selic *= 0.01;
		CUSTO_OPORTUNIDADE_BD.inflacao *= 0.01;
		CUSTO_OPORTUNIDADE_BD.imposto *= 0.01;

		$scope.custoOp = CUSTO_OPORTUNIDADE_BD;
		$scope.custoOp.rebanho = MEDIA_CABECA;
		$scope.custoOp.peso = MEDIA_PESO;
		$scope.custoOp.area = MEDIA_AREA;
		$scope.custoOp.lotacao = $scope.custoOp.rebanho / $scope.custoOp.area;
		$scope.custoOp.produtividade = $scope.custoOp.lotacao * $scope.custoOp.ganho_arroba;
		$scope.custoOp.total_arroba = $scope.custoOp.produtividade * $scope.custoOp.area;
		$scope.custoOp.valor_terra = VALOR_TERRA;
		$scope.custoOp.valor_animais = VALOR_ANIMAIS;
		$scope.custoOp.valor_desembolso = VALOR_DESEMBOLSO;
		$scope.custoOp.valor_economico = VALOR_TERRA + VALOR_ANIMAIS + VALOR_DESEMBOLSO;
		$scope.custoOp.densidade = MEDIA_DENSIDADE;
		$scope.custoOp.valor_total_terra = $scope.custoOp.aluguel_valor * $scope.custoOp.aluguel_tempo * $scope.custoOp.area;
		$scope.custoOp.receita = $scope.custoOp.valor_total_terra / $scope.custoOp.area;
		$scope.custoOp.valor_terra_ha = $scope.custoOp.valor_terra / ($scope.custoOp.area + $scope.custoOp.area_reserva);
		$scope.custoOp.imobilizado = VALOR_IMOBILIZADO;
		$scope.custoOp.oportunidade = ($scope.custoOp.selic - ($scope.custoOp.selic * $scope.custoOp.imposto) - $scope.custoOp.inflacao);
		$scope.custoOp.valor_total_animais = $scope.custoOp.oportunidade * $scope.custoOp.imobilizado;
		$scope.custoOp.operacional = VALOR_DESEMBOLSO;
		$scope.custoOp.valor_total_desembolsos = $scope.custoOp.operacional * $scope.custoOp.inflacao;
		$scope.custoOp.somatoria = $scope.custoOp.valor_total_desembolsos + $scope.custoOp.valor_total_animais + $scope.custoOp.valor_total_terra;

		$scope.insertTotal();
		$scope.insertEquilibrio();
	}

	/*  */
	$scope.createCustoOportunidade = function(){
		$scope.form = {};
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		$scope.form.area_reserva = 1;
		$scope.form.ganho_arroba = 1;
		$scope.form.aluguel_valor = 1;
		$scope.form.aluguel_tempo = 1;
		$scope.form.selic = 1;
		$scope.form.imposto = 1;
		$scope.form.inflacao = 1;

		$scope.new();
		$scope.initCustoOportunidade();
	}

	/* */
	$scope.getArea = function(index){
		switch(index){
			case 0:
				return VARIACAO_REBANHO_AREA_BD.jan;
			case 1:
				return VARIACAO_REBANHO_AREA_BD.fev;
			case 2:
				return VARIACAO_REBANHO_AREA_BD.mar;
			case 3:
				return VARIACAO_REBANHO_AREA_BD.abr;
			case 4:
				return VARIACAO_REBANHO_AREA_BD.mai;
			case 5:
				return VARIACAO_REBANHO_AREA_BD.jun;
			case 6:
				return VARIACAO_REBANHO_AREA_BD.jul;
			case 7:
				return VARIACAO_REBANHO_AREA_BD.ago;
			case 8:
				return VARIACAO_REBANHO_AREA_BD.sem;
			case 9:
				return VARIACAO_REBANHO_AREA_BD.out;
			case 10:
				return VARIACAO_REBANHO_AREA_BD.nov;
			case 11:
				return VARIACAO_REBANHO_AREA_BD.dez;
			default:
				return 0;
		}
	}

	$scope.insertTotal = function(){
		var SQL = "SELECT * FROM custo_total WHERE propriedadeId_FK="+Propriedade.getId();

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				basel.database.delete("custo_total", {propriedadeId_FK : Propriedade.getId()});
			}
		});

		for(i in CUSTO_OPERACIONAL_BD){
			$scope.form = CUSTO_OPERACIONAL_BD[i];
			basel.database.insert("custo_total", $scope.form);
		}

		$scope.form = {};
		$scope.id;
		$scope.form.jan = $scope.custoOp.somatoria/12;
		$scope.form.fev = $scope.custoOp.somatoria/12;
		$scope.form.mar = $scope.custoOp.somatoria/12;
		$scope.form.abr = $scope.custoOp.somatoria/12;
		$scope.form.mai = $scope.custoOp.somatoria/12;
		$scope.form.jun = $scope.custoOp.somatoria/12;
		$scope.form.jul = $scope.custoOp.somatoria/12;
		$scope.form.ago = $scope.custoOp.somatoria/12;
		$scope.form.sem = $scope.custoOp.somatoria/12;
		$scope.form.out = $scope.custoOp.somatoria/12;
		$scope.form.nov = $scope.custoOp.somatoria/12;
		$scope.form.dez = $scope.custoOp.somatoria/12;
		$scope.form.descricao = "Oportunidade";
		$scope.form.propriedadeId_FK = Propriedade.getId();

		basel.database.insert("custo_total", $scope.form);
	}

	$scope.insertEquilibrio = function(){
		var SQL = "SELECT * FROM equilibrio WHERE propriedadeId_FK="+Propriedade.getId();

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				basel.database.delete("equilibrio", {propriedadeId_FK : Propriedade.getId()});
			}
		});

		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Preco Medio";
		$scope.form.valor = 0.0;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		basel.database.insert("equilibrio", $scope.form);
		
		$scope.form = {};
		$scope.form.id;
		$scope.form.descricao = "Arrobas";
		$scope.form.valor = $scope.custoOp.total_arroba;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		basel.database.insert("equilibrio", $scope.form);
	}

	$scope.save = function(){
		//$scope.form.id;
		//$scope.form.propriedadeId_FK = Propriedade.getId();
		//var id = $scope.form["id"];
		//delete $scope.form["id"];
		//delete $scope.form.$$hashKey;
		$('#custoOportunidadeModal').modal('hide');
		
		basel.database.update("custo_oportunidade", $scope.form, {propriedadeId_FK: Propriedade.getId()});
		//$scope.new();

		$scope.initCustoOportunidade();
		//$location.path('/inventario');
	}

	// New form
	$scope.new = function(){
		basel.database.insert("custo_oportunidade", $scope.form);
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.edit = function(data){
		$scope.form = data;
		$('#custoOportunidadeModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Custo Oportunidade?")){
			basel.database.delete("custo_oportunidade", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});