"use strict";
app.controller("balancoController", function($scope, $location, Propriedade){

	var BALANCO_1_BD = [];
	var BALANCO_1_TOTAL = [0, 0];
	var BALANCO_2_BD = [];
	var BALANCO_2_TOTAL = [0, 0];
	var BALANCO_3_BD = [];
	var BALANCO_3_TOTAL = [0, 0];
	var BALANCO_4_BD = [];
	var BALANCO_4_TOTAL = [0, 0];
	var BALANCO_5_BD = [];
	var BALANCO_5_TOTAL = [0, 0];

	$scope.num = 0;

	/* INICIA O BALANCO 1 */
	$scope.initBalanco1 = function(){
		var SQL = "SELECT * FROM balanco_1 WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				BALANCO_1_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Balanco1..");
			$scope.initBalanco2();
		}else{
			console.log("Nao Carregou Balanco1..");
			$scope.createBalanco1();
		}
	}

	/* INICIA O BALANCO 2 */
	$scope.initBalanco2 = function(){
		var SQL = "SELECT * FROM balanco_2 WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				BALANCO_2_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Balanco2..");
			$scope.initBalanco3();
		}else{
			console.log("Nao Carregou Balanco2..");
			$scope.createBalanco2();
		}
	}

	/* INICIA O BALANCO 3 */
	$scope.initBalanco3 = function(){
		var SQL = "SELECT * FROM balanco_3 WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				BALANCO_3_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Balanco3..");
			$scope.initBalanco4();
		}else{
			console.log("Nao Carregou Balanco3..");
			$scope.createBalanco3();
		}
	}

	/* INICIA O BALANCO 4 */
	$scope.initBalanco4 = function(){
		var SQL = "SELECT * FROM balanco_4 WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				BALANCO_4_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Balanco4..");
			$scope.initBalanco5();
		}else{
			console.log("Nao Carregou Balanco4..");
			$scope.createBalanco4();
		}
	}

	/* INICIA O BALANCO 5 */
	$scope.initBalanco5 = function(){
		var SQL = "SELECT * FROM balanco_5 WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				BALANCO_5_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Balanco5..");
			$scope.tratarBalanco();
		}else{
			console.log("Nao Carregou Balanco5..");
			$scope.createBalanco5();
		}
	}

	$scope.tratarBalanco = function(){
		for(i in BALANCO_1_BD){
			BALANCO_1_TOTAL[0] += BALANCO_1_BD[i].inicial;
			BALANCO_1_TOTAL[1] += BALANCO_1_BD[i].final;
		}

		for(i in BALANCO_2_BD){
			BALANCO_2_TOTAL[0] += BALANCO_2_BD[i].inicial;
			BALANCO_2_TOTAL[1] += BALANCO_2_BD[i].final;
		}

		for(i in BALANCO_3_BD){
			BALANCO_3_TOTAL[0] += BALANCO_3_BD[i].inicial;
			BALANCO_3_TOTAL[1] += BALANCO_3_BD[i].final;
		}

		for(i in BALANCO_4_BD){
			BALANCO_4_TOTAL[0] += BALANCO_4_BD[i].inicial;
			BALANCO_4_TOTAL[1] += BALANCO_4_BD[i].final;
		}

		for(i in BALANCO_5_BD){
			BALANCO_5_TOTAL[0] += BALANCO_5_BD[i].inicial;
			BALANCO_5_TOTAL[1] += BALANCO_5_BD[i].final;
		}

		$scope.balanco_1 = BALANCO_1_BD;
		$scope.balanco_total_1 = BALANCO_1_TOTAL;
		$scope.balanco_2 = BALANCO_2_BD;
		$scope.balanco_total_2 = BALANCO_2_TOTAL;
		$scope.balanco_3 = BALANCO_3_BD;
		$scope.balanco_total_3 = BALANCO_3_TOTAL;
		$scope.balanco_4 = BALANCO_4_BD;
		$scope.balanco_total_4 = BALANCO_4_TOTAL;
		$scope.balanco_5 = BALANCO_5_BD;
		$scope.balanco_total_5 = BALANCO_5_TOTAL;
	}

	/*  */
	$scope.createBalanco1 = function(){
		var ESPECIFICACAO = ["Dinheiro em caixa", "Títulos e contas a receber a curto prazo", "Adiantamentos e empréstimos a curto prazo",
			 "Aplicacoes finaceiras a curto prazo", "Despesas antecipadas a curto prazo", "Colheitas pendentes", "Estoques de provisoes", 
			 "Estoques de insumos", "Animais de producao, de trabalho e criacoes", "Outros"];

		for(i in ESPECIFICACAO){
			$scope.form = {};
			$scope.form.descricao = ESPECIFICACAO[i];
			$scope.form.inicial = 0;
			$scope.form.final = 0;
			$scope.num = 1;
			$scope.new();
		}

		$scope.initBalanco1();
	}

	$scope.createBalanco2 = function(){
		var ESPECIFICACAO = ["Títulos e contas a receber a longo prazo", "Adiantamentos e empréstimos a longo prazo",
			 "Aplicações finaceiras a longo prazo", "Despesas antecipadas a longo prazo", "Outros créditos a longo prazo"];

		for(i in ESPECIFICACAO){
			$scope.form = {};
			$scope.form.descricao = ESPECIFICACAO[i];
			$scope.form.inicial = 0;
			$scope.form.final = 0;
			$scope.num = 2;
			$scope.new();
		}

		$scope.initBalanco2();
	}

	$scope.createBalanco3 = function(){
		var ESPECIFICACAO = ["Investimentos", "Terras nuas", "Culturas perenes", "Benfeitorias e melhoramentos", "Maquinaria e equipamentos"];

		for(i in ESPECIFICACAO){
			$scope.form = {};
			$scope.form.descricao = ESPECIFICACAO[i];
			$scope.form.inicial = 0;
			$scope.form.final = 0;
			$scope.num = 3;
			$scope.new();
		}

		$scope.initBalanco3();
	}

	$scope.createBalanco4 = function(){
		var ESPECIFICACAO = ["Títulos e contas a pagar a curto prazo", "Impostos a pagar", "Empréstimos a pagar", "Salários a pagar",
			 "Encargos sociais a recolher", "Outras obrigacoes a curto prazo"];

		for(i in ESPECIFICACAO){
			$scope.form = {};
			$scope.form.descricao = ESPECIFICACAO[i];
			$scope.form.inicial = 0;
			$scope.form.final = 0;
			$scope.num = 4;
			$scope.new();
		}

		$scope.initBalanco4();
	}

	$scope.createBalanco5 = function(){
		var ESPECIFICACAO = ["Financiamentos", "Títulos e contas a pagar a longo prazo", "Outras obrigações a longo prazo"];

		for(i in ESPECIFICACAO){
			$scope.form = {};
			$scope.form.descricao = ESPECIFICACAO[i];
			$scope.form.inicial = 0;
			$scope.form.final = 0;
			$scope.num = 5;
			$scope.new();
		}

		$scope.initBalanco5();
	}

	$scope.save = function(){
		//$scope.form.id;
		//$scope.form.propriedadeId_FK = Propriedade.getId();
		var num = $scope.num;
		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		$('#balancoModal').modal('hide');

		switch(num){
			case 1 : 
				basel.database.update("balanco_1", $scope.form, {id: id});
				$scope.initBalanco1();
				break;
			case 2 :
				basel.database.update("balanco_2", $scope.form, {id: id});
				$scope.initBalanco2();
				break;
			case 3 :
				basel.database.update("balanco_3", $scope.form, {id: id});
				$scope.initBalanco3();
				break;
			case 4 :
				basel.database.update("balanco_4", $scope.form, {id: id});
				$scope.initBalanco4();
				break;
			case 5 :
				basel.database.update("balanco_5", $scope.form, {id: id});
				$scope.initBalanco5();
				break;
		}
	}

	// Cancel form
	$scope.new = function(){
		var num = $scope.num;
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		
		switch(num){
			case 1 : 
				basel.database.insert("balanco_1", $scope.form);
				break;
			case 2 :
				basel.database.insert("balanco_2", $scope.form);
				break;
			case 3 :
				basel.database.insert("balanco_3", $scope.form);
				break;
			case 4 :
				basel.database.insert("balanco_4", $scope.form);
				break;
			case 5 :
				basel.database.insert("balanco_5", $scope.form);
				break;
		}
		
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.edit = function(data, num){
		$scope.form = data;
		$scope.num = num;
		$('#balancoModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Balanco?")){
			basel.database.delete("balanco_1", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("balanco_2", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("balanco_3", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("balanco_4", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("balanco_5", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});