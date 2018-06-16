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
			$scope.createDepreciacoes();
			//$('#depreciacoesModal').modal('show');
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

		$scope.depreciacoes = DEPRECIACOES_BD;
		$scope.inventario = INVENTARIO_BD;
	}

	$scope.sincAmortizacao = function(){
		for(i in INVENTARIO_BD){
			var d;
			for(d in DEPRECIACOES_BD){
				if(INVENTARIO_BD[i].descricao == DEPRECIACOES_BD[d].descricao){
					INVENTARIO_BD[i].amortizacao = DEPRECIACOES_BD[d].amortizacao;
				}
			}
		}
	}

	$scope.createDepreciacoes = function(){
		for(i in INVENTARIO_BD){
			$scope.form = {}
			$scope.form.id;
			$scope.form.descricao = INVENTARIO_BD[i].descricao;
			$scope.form.juros = 0.0;
			$scope.form.amortizacao = 1.0;
			$scope.form.propriedadeId_FK = Propriedade.getId();
			$scope.new();
		}
		$scope.initDepreciacoes();
	}

	//Saving
	$scope.save = function(){
		$scope.form.propriedadeId_FK = Propriedade.getId();
		$('#depreciacoesModal').modal('hide');
		
		var d;
		for(d in $scope.depreciacoes){
			$scope.form.descricao = $scope.depreciacoes[d].descricao;
			$scope.form.amortizacao = $scope.depreciacoes[d].amortizacao;

			basel.database.update("adm_depreciacoes", $scope.form, {"descricao" : $scope.form.descricao}); //entidade, dados, where
		}

		$scope.initDepreciacoes();
		//$location.path('/inventario');*/
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