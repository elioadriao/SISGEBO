"use strict";
app.controller("variacaoRebanhoController", function($scope, $location, $window, Propriedade){

	var VARIACAO_REBANHO_PESO_BD = [];
	var VARIACAO_REBANHO_QTD_BD = [];
	var VARIACAO_REBANHO_AREA_BD = [];
	var TOTAL_CABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var PESO_MEDIO_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var ESTOQUE_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var DENSIDADE_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var LOTACAO_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var DESC_ANIMAL = ["Matrizes", "Novilhos[+14@]", "Novilhos[12@-14@]", "Novilhos[1@-12@]",
					 "Novilhas[1@-12@]", "Bezerros", "Bezerras", "Outros", "Equideos"];

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
			$scope.createRebanhoPeso();
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
			$scope.createRebanhoQtd();
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
			$scope.tratarRebanho();
		}else{
			console.log("Nao Carregou Rebanho..");
			$scope.createRebanhoArea();
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
			LOTACAO_MES[i] = ((TOTAL_CABECAS[i] * PESO_MEDIO_MES[i]) / 450) / $scope.getArea(i);	
		}

		$scope.total_cabecas = TOTAL_CABECAS;
		$scope.peso_medio_mes = PESO_MEDIO_MES;
		$scope.estoque_mes = ESTOQUE_MES;
		$scope.densidade_mes = DENSIDADE_MES;
		$scope.lotacao_mes = LOTACAO_MES;
		$scope.area_util_mes = VARIACAO_REBANHO_AREA_BD;
		$scope.variacao_rebanho_peso = VARIACAO_REBANHO_PESO_BD;
		$scope.variacao_rebanho_qtd = VARIACAO_REBANHO_QTD_BD;

		$scope.repeatData = VARIACAO_REBANHO_QTD_BD.map(function(value, index) {
		    return {
		        qtd: value,
		        peso: VARIACAO_REBANHO_PESO_BD[index]
		    }
		});
	}

	/* Cria Tabela do Rebanho */
	$scope.createRebanhoPeso = function(){
		for(i in DESC_ANIMAL){
			$scope.form = {};
			$scope.form.descricao = DESC_ANIMAL[i];
			$scope.form.propriedadeId_FK = Propriedade.getId();
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
			$scope.newPeso();
		}

		$scope.initRebanhoPeso();
	}

	$scope.createRebanhoQtd = function(){
		for(i in DESC_ANIMAL){
			$scope.form = {};
			$scope.form.descricao = DESC_ANIMAL[i];
			$scope.form.propriedadeId_FK = Propriedade.getId();
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
			$scope.newQtd();
		}

		$scope.initRebanhoQtd();
	}

	$scope.createRebanhoArea = function(){
		$scope.form = {};
		$scope.form.propriedadeId_FK = Propriedade.getId();
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
		$scope.newArea();

		$scope.initRebanhoArea();
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

	/* Salvando no Banco */
	$scope.savePeso = function(){
		var id = $scope.form["id"];
		$('#variacaoRebanhoPesoModal').modal('hide');
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		
		basel.database.update("variacao_rebanho_peso", $scope.form, {id: id});

		$scope.initRebanhoPeso();
	}

	$scope.saveQtd = function(){
		var id = $scope.form["id"];
		$('#variacaoRebanhoQtdModal').modal('hide');
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		
		basel.database.update("variacao_rebanho_qtd", $scope.form, {id: id});

		$scope.initRebanhoQtd();
	}

	$scope.saveArea = function(){
		var id = $scope.form["id"];
		$('#variacaoRebanhoAreaModal').modal('hide');
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		
		basel.database.update("variacao_rebanho_area", $scope.form, {id: id});

		$scope.initRebanhoArea();
	}

	/* Inserindo no Banco */
	$scope.newPeso = function(){
		basel.database.insert("variacao_rebanho_peso", $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.newQtd = function(){
		basel.database.insert("variacao_rebanho_qtd", $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.newArea = function(){
		basel.database.insert("variacao_rebanho_area", $scope.form); // entidade, dados
		$scope.form = {};
	}

	/* */
	$scope.editPeso = function(data){
		$scope.form = data;
		$('#variacaoRebanhoPesoModal').modal('show');
	}

	$scope.editQtd = function(data){
		$scope.form = data;
		$('#variacaoRebanhoQtdModal').modal('show');
	}

	$scope.editArea = function(data){
		$scope.form = data;
		$('#variacaoRebanhoAreaModal').modal('show');
	}

	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.delete = function(data){
		if(confirm("Deseja Resetar Variacao de Rebanho?")){
			basel.database.delete("variacao_rebanho_qtd", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("variacao_rebanho_peso", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("variacao_rebanho_area", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});