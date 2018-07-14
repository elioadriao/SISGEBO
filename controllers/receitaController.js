"use strict";
app.controller("receitaController", function($scope, $location, Propriedade){

	var RECEITA_BD = [];
	var RECEITA_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	/* INICIA A RECEITA */
	$scope.initReceita = function(){
		var SQL = "SELECT * FROM receita WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				RECEITA_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Receita..");
			$scope.tratarReceita();
		}else{
			console.log("Nao Carregou Receita..");
			$scope.createReceita();
		}
	}

	$scope.tratarReceita = function(){
		for(i in RECEITA_BD){
			RECEITA_MES[0] += RECEITA_BD[i].jan;
			RECEITA_MES[1] += RECEITA_BD[i].fev;
			RECEITA_MES[2] += RECEITA_BD[i].mar;
			RECEITA_MES[3] += RECEITA_BD[i].abr;
			RECEITA_MES[4] += RECEITA_BD[i].mai;
			RECEITA_MES[5] += RECEITA_BD[i].jun;
			RECEITA_MES[6] += RECEITA_BD[i].jul;
			RECEITA_MES[7] += RECEITA_BD[i].ago;
			RECEITA_MES[8] += RECEITA_BD[i].sem;
			RECEITA_MES[9] += RECEITA_BD[i].out;
			RECEITA_MES[10] += RECEITA_BD[i].nov;
			RECEITA_MES[11] += RECEITA_BD[i].dez;
		}

		$scope.receita = RECEITA_BD;
		$scope.receita_mes = RECEITA_MES;
	}

	/*  */
	$scope.createReceita = function(){
		var ESPECIFICACAO = ["Venda de Boi Gordo", "Toutinhos", "Abate"];

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

		$scope.initReceita();
	}

	$scope.save = function(){
		//$scope.form.id;
		//$scope.form.propriedadeId_FK = Propriedade.getId();
		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		$('#receitaModal').modal('hide');
		
		basel.database.update("receita", $scope.form, {id: id});
		//$scope.new();

		$scope.initReceita();
		//$location.path('/inventario');
	}

	// Cancel form
	$scope.new = function(){
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		basel.database.insert("receita", $scope.form);
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.edit = function(data){
		$scope.form = data;
		$('#receitaModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Receita?")){
			basel.database.delete("receita", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});