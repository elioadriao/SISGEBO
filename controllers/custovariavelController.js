"use strict";
app.controller("custovariavelController", function($scope, $location, Propriedade){

	var CUSTOVARIAVEL_BD = [];
	var VREBANHO_BD = [];
	var TOTALCABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var ESPECIFICACAO = ["Suplementação", "Linha Branca (Sal mineral)", "Carrapaticidas", "Mosca do chifre", "Vermífugo", "Vacina de aftosa",
	 "Vacina clostridiose", "Outras vacinas", "Outros medicamentos", "Mão de obra temporária", "Materiais p/Fazenda", "Curral",
	  "Frete Carretas", "Casas", "Tratores", "Máquinas", "Combustível", "Celular", "Encargos Bancos", "Elabor.Projeto Pecuario",
	   "Energia elétrica", "Aquisição de animais"];

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
			$scope.initCustoVariavel();
		}else{
			console.log("Nao Carregou Rebanho..");
			$location.path("/vrebanho");
		}
	}

	/* INICIA O CUSTO FIXO */
	$scope.initCustoVariavel = function(){
		var SQL = "SELECT * FROM adm_custovariavel WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTOVARIAVEL_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Custo Variavel..");
			$scope.tratarCustoVariavel();
		}else{
			console.log("Nao Carregou Custo Variavel..");
			$scope.createCustoVariavel();
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

	$scope.tratarCustoVariavel = function(){
		$scope.tratarRebanho();
		
	}

	/*  */
	$scope.createCustoVariavel = function(){
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

		$scope.initCustoVariavel();
	}

	$scope.save = function(){
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		$('#custofixoModal').modal('hide');
		
		$scope.new();

		$scope.initCustoVariavel();
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