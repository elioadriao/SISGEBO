"use strict";
app.controller("analiseController", function($scope, $location, Propriedade){

	var CUSTO_TOTAL_BD = [];
	var VARIACAO_REBANHO_AREA_BD = [];
	var RECEITA_BD = [];
	var INVENTARIO_BD = [];
	var TOTAL_RECEITA = 0;
	var TOTAL_INVENTARIO = 0;
	var TOTAL_AREA = 0;
	var TOTAL_CUSTO_TOTAL = [0, 0, 0, 0];

	/* INICIA A AREA */
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
			$scope.initReceita();
		}else{
			console.log("Nao Carregou Inventario..");
			$location.path("/inventario");
		}
	}

	/* INICIA A RECEITA */
	$scope.initReceita = function(){	
		
		var SQL = "SELECT * FROM receita WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				RECEITA_BD = data;
				//console.log(INVENTARIO_BD);
				res = true;
			}else{
				res = false;
			}
		});
		
		if(res){
			console.log("Carregou Receita..");
			$scope.initCustoTotal();
		}else{
			console.log("Nao Carregou Receita..");
			$location.path("/receita");
		}
	}

	/* INICIA O CUSTO TOTAL */
	$scope.initCustoTotal = function(){
		var SQL = "SELECT * FROM custo_total WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTO_TOTAL_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Custo Total..");
			$scope.tratarAnalise();
		}else{
			console.log("Nao Carregou Custo Total..");
			$location.path("/");
		}
	}

	$scope.tratarInventario = function(){
		for(i in INVENTARIO_BD){
			TOTAL_INVENTARIO += (INVENTARIO_BD[i].valor_inicial + INVENTARIO_BD[i].valor_final)/2;
		}
	}

	$scope.tratarReceita = function(){
		for(i in RECEITA_BD){
			TOTAL_RECEITA += RECEITA_BD[i].jan;
			TOTAL_RECEITA += RECEITA_BD[i].fev;			
			TOTAL_RECEITA += RECEITA_BD[i].mar;			
			TOTAL_RECEITA += RECEITA_BD[i].abr;			
			TOTAL_RECEITA += RECEITA_BD[i].mai;			
			TOTAL_RECEITA += RECEITA_BD[i].jun;			
			TOTAL_RECEITA += RECEITA_BD[i].jul;			
			TOTAL_RECEITA += RECEITA_BD[i].ago;			
			TOTAL_RECEITA += RECEITA_BD[i].sem;			
			TOTAL_RECEITA += RECEITA_BD[i].out;			
			TOTAL_RECEITA += RECEITA_BD[i].nov;			
			TOTAL_RECEITA += RECEITA_BD[i].dez;
		}
	}

	$scope.tratarArea = function(){
		for(i=0; i<12; i++){
			TOTAL_AREA += $scope.getArea(i);
		}

		TOTAL_AREA /= 12;
	}

	$scope.tratarCustoTotal = function(){
		var v;

		for(i in CUSTO_TOTAL_BD){
			switch(CUSTO_TOTAL_BD[i].descricao){
				case "Fixo" :
					v = 0;
					break;
				case "Variavel" :
					v = 1;
					break;
				case "Administrativo" :
					v = 2;
					break;
				case "Oportunidade" :
					v = 3;
			}

			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].jan;
			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].fev;			
			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].mar;			
			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].abr;			
			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].mai;			
			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].jun;			
			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].jul;			
			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].ago;			
			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].sem;			
			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].out;			
			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].nov;			
			TOTAL_CUSTO_TOTAL[v] += CUSTO_TOTAL_BD[i].dez;
		}
	}

	$scope.tratarAnalise = function(){
		$scope.tratarInventario();
		$scope.tratarCustoTotal();
		$scope.tratarReceita();
		$scope.tratarArea();

		$scope.total_fixo = TOTAL_CUSTO_TOTAL[0];
		$scope.total_variavel = TOTAL_CUSTO_TOTAL[1];
		$scope.total_adm = TOTAL_CUSTO_TOTAL[2];
		$scope.total_oportunidade = TOTAL_CUSTO_TOTAL[3];
		$scope.total_inventario = TOTAL_INVENTARIO;
		$scope.total_operacional = $scope.total_fixo + $scope.total_variavel + $scope.total_adm;
		$scope.total_total = $scope.total_operacional + $scope.total_oportunidade;
		$scope.total_receita = TOTAL_RECEITA;
		$scope.total_caixa = $scope.total_receita - ($scope.total_variavel + $scope.total_adm);
		$scope.total_lucro_o = $scope.total_caixa - $scope.total_fixo;
		$scope.total_lucro_e = $scope.total_lucro_o - $scope.total_oportunidade;
		$scope.total_lucro_o_ha = $scope.total_lucro_o / TOTAL_AREA;
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
});