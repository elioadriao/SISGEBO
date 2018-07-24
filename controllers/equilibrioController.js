"use strict";
app.controller("equilibrioController", function($scope, $location, Propriedade){

	var EQUILIBRIO_BD = [];
	var CUSTO_OPERACIONAL_BD = [];
	var TOTAL_OPERACIONAL = 0;
	var TOTAL_FIXO = 0;
	var ARROBAS = 0;
	var PRECO_MEDIO = 0;

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
			$scope.initEquilibrio();
		}else{
			console.log("Nao Carregou Custo Operacional..");
			$location.path("/");
		}
	}

	/* INICIA O CUSTO OPERACIONAL */
	$scope.initEquilibrio = function(){
		var SQL = "SELECT * FROM equilibrio WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				EQUILIBRIO_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Equilibrio..");
			$scope.tratarEquilibrio();
		}else{
			console.log("Nao Carregou Equilibrio..");
			$location.path("/custoOportunidade");
		}
	}

	$scope.tratarCustoOperacional = function(){
		for(i in CUSTO_OPERACIONAL_BD){
			if(CUSTO_OPERACIONAL_BD[i].descricao == "Fixo"){
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].jan;
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].fev;
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].mar;
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].abr;
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].mai;
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].jun;
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].jul;
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].ago;
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].sem;
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].out;
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].nov;
				TOTAL_FIXO += CUSTO_OPERACIONAL_BD[i].dez;
			}

			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].jan;
			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].fev;
			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].mar;
			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].abr;
			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].mai;
			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].jun;
			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].jul;
			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].ago;
			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].sem;
			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].out;
			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].nov;
			TOTAL_OPERACIONAL += CUSTO_OPERACIONAL_BD[i].dez;
		}
	}

	$scope.tratarEquilibrio = function(){
		$scope.tratarCustoOperacional();

		for(i in EQUILIBRIO_BD){
			switch(EQUILIBRIO_BD[i].descricao){
				case "Preco Medio" :
					PRECO_MEDIO = EQUILIBRIO_BD[i].valor;
					break;
				case "Arrobas" :
					ARROBAS = EQUILIBRIO_BD[i].valor;
			}
		}


		$scope.total_fixo = TOTAL_FIXO;
		$scope.total_variavel_unitario = TOTAL_OPERACIONAL / ARROBAS;
		$scope.total_preco_medio = PRECO_MEDIO;
		$scope.total_pe_anual = TOTAL_FIXO / (PRECO_MEDIO - $scope.total_variavel_unitario);
		$scope.total_pe_mensal = $scope.total_pe_anual /12;
		$scope.total_pe_diario = $scope.total_pe_anual /365;
		$scope.total_pa_anual = ARROBAS;
		$scope.total_pa_mensal = $scope.total_pa_anual /12;
		$scope.total_pa_diario = $scope.total_pa_anual /365;
		$scope.total_balanco_anual = $scope.total_pa_anual - $scope.total_pe_anual;
		$scope.total_balanco_mensal = $scope.total_pa_mensal - $scope.total_pe_mensal;
		$scope.total_balanco_diario = $scope.total_pa_diario - $scope.total_pe_diario;
	}

	$scope.save = function(){
		//$scope.form.id;
		//$scope.form.propriedadeId_FK = Propriedade.getId();
		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		$('#equilibrioModal').modal('hide');
		
		basel.database.update("equilibrio", $scope.form, {id: id});
		//$scope.new();

		$scope.initEquilibrio();
		//$location.path('/inventario');
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.edit = function(){
		for(i in EQUILIBRIO_BD){
			if(EQUILIBRIO_BD[i].descricao == "Preco Medio"){
				$scope.form = {};
				$scope.form = EQUILIBRIO_BD[i];
				break;
			}
		}

		$('#equilibrioModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Equilibrio?")){
			basel.database.delete("equilibrio", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});