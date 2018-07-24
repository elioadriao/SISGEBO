"use strict";
app.controller("vplController", function($scope, $location, Propriedade){

	var VPL_BD = [];

	/* INICIA O VPL */
	$scope.initVPL = function(){
		var SQL = "SELECT * FROM vpl WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				VPL_BD = data[0];	
				res = true;
			}else{
				res = false;
			}
		});			

		if(res){
			console.log("Carregou VPL..");
			$scope.tratarVPL();
		}else{
			console.log("Nao Carregou VPL..");
			$scope.createVPL();
		}
	}

	$scope.tratarVPL = function(){
		$scope.vpl_inicial = VPL_BD.inicial;
		$scope.vpl_final = VPL_BD.final;
		$scope.vpl_juros = VPL_BD.juros;
		$scope.vpl_meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		$scope.vpl_caixa = $scope.vpl_final * $scope.juros;
		$scope.vpl = ($scope.vpl_final * $scope.vpl_juros) - ($scope.vpl_inicial * $scope.juros);
	}

	$scope.createVPL = function(){
		$scope.form = {}
		$scope.form.inicial = 0;
		$scope.form.final = 0;
		$scope.form.juros = 0.1;
		$scope.new();

		$scope.initVPL();
	}

	$scope.save = function(){
		//$scope.form.id;
		//$scope.form.propriedadeId_FK = Propriedade.getId();
		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		$('#vplModal').modal('hide');
		
		basel.database.update("vpl", $scope.form, {id: id});
		//$scope.new();

		$scope.initVPL();
		//$location.path('/inventario');
	}

	// Cancel form
	$scope.new = function(){
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		basel.database.insert("vpl", $scope.form);
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.saveMes = function(){
		$('#vplMesModal').modal('hide');
	}

	$scope.editMes = function(){
		$('#vplMesModal').modal('show');
	}

	$scope.edit = function(data){
		$scope.form = data;
		$('#vplModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar VPL?")){
			basel.database.delete("vpl", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});