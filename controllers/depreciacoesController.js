"use strict";
app.controller("depreciacoesController", function($scope, $location, Propriedade){

	var INVENTARIO_BD = [];
	var DEPRECIACOES_BD = [];
		
	/* INICIA O INVENTARIO */
	$scope.initInventario = function(){	
		
		var SQL = "SELECT * FROM adm_inventario WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				INVENTARIO_BD = data;
				console.log(INVENTARIO_BD);
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Inventario..");
			$scope.preInventario = INVENTARIO_BD;
			$scope.initDepreciacoes();
		}else{
			console.log("Nao Carregou Inventario..");
			$location.path("/inventario");
		}
	}

	$scope.initDepreciacoes = function(){	
		
		var SQL = "SELECT * FROM adm_depreciacoes WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				DEPRECIACOES_BD = data;
				console.log(DEPRECIACOES_BD);
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Depreciacoes..");
			$scope.tratarDepreciacoes();
		}else{
			console.log("Nao Carregou Depreciacoes..");
			$('#depreciacoesModal').modal('show');
		}
	}

	$scope.tratarDepreciacoes = function(){
		$scope.sincAmortizacao();

		for(i in INVENTARIO_BD){
			INVENTARIO_BD[i].medio = (INVENTARIO_BD[i].valor_inicial - INVENTARIO_BD[i].valor_final) /2;
			INVENTARIO_BD[i].anual = (INVENTARIO_BD[i].valor_inicial - INVENTARIO_BD[i].valor_final) /INVENTARIO_BD[i].amortizacao;
			INVENTARIO_BD[i].remuneracao = INVENTARIO_BD[i].medio * DEPRECIACOES_BD[0].juros;
			INVENTARIO_BD[i].fixo = INVENTARIO_BD[i].anual + INVENTARIO_BD[i].remuneracao;
			INVENTARIO_BD[i].percent = 100 / INVENTARIO_BD[i].amortizacao;
		}

		$scope.inventario = INVENTARIO_BD;
	}

	$scope.sincAmortizacao = function(){
		for(i in INVENTARIO_BD){
			for(d in INVENTARIO_BD){
				if(INVENTARIO_BD[i].descricao == DEPRECIACOES_BD[d].descricao){
					INVENTARIO_BD[i].amortizacao = DEPRECIACOES_BD[d].amortizacao;
				}
			}
		}
	}

	//Saving
	$scope.save = function(){
		$scope.form.propriedadeId_FK = Propriedade.getId();
		$('#depreciacoesModal').modal('hide');

		if(ISEDIT){
			var id = $scope.form["id"];
			delete $scope.form["id"];
			delete $scope.form.$$hashKey; //Apaga elemento $$hashKey do objeto
			basel.database.update("adm_depreciacoes", $scope.form, {id: id}); //entidade, dados, where

			$scope.initInventario();
			ISEDIT = false;
		}else{			
			$scope.new();
		}
		//$location.path('/inventario');
	}

	// Cancel form
	$scope.new = function(){
		basel.database.insert("adm_depreciacoes", $scope.form);
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(data){
		$scope.form = {}
		$scope.form.id = data.id;
		$scope.form.descricao = data.descricao;
		$scope.form.valor_final = data.valor_final;
		$scope.form.valor_inicial = data.valor_inicial;
		ISEDIT = true;
		$('#depreciacoesModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Inventario?")){
			basel.database.delete("adm_depreciacoes", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});