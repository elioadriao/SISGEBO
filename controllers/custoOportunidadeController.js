"use strict";
app.controller("custoOportunidadeController", function($scope, $location, Propriedade){

	var CUSTO_OPORTUNIDADE_BD = [];

	/* INICIA A RECEITA */
	$scope.initCustoOportunidade = function(){
		var SQL = "SELECT * FROM custo_oportunidade WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTO_OPORTUNIDADE_BD = data;
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

	$scope.tratarCustoOportunidade = function(){
		for(i in CUSTO_OPORTUNIDADE_BD){

		}

		$scope.custoOportunidade = CUSTO_OPORTUNIDADE_BD;
	}

	/*  */
	$scope.createCustoOportunidade = function(){
		var ESPECIFICACAO = ["Venda de Boi Gordo", "Toutinhos", "Abate"];

		for(i in ESPECIFICACAO){
			$scope.form = {};
			$scope.new();
		}

		$scope.initCustoOportunidade();
	}

	$scope.save = function(){
		//$scope.form.id;
		//$scope.form.propriedadeId_FK = Propriedade.getId();
		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		$('#custoOportunidadeModal').modal('hide');
		
		basel.database.update("custo_oportunidade", $scope.form, {id: id});
		//$scope.new();

		$scope.initCustoOportunidade();
		//$location.path('/inventario');
	}

	// Cancel form
	$scope.new = function(){
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
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