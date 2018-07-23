"use strict";
app.controller("balancoController", function($scope, $location, Propriedade){

	var BALANCO_BD = [];
	var BALANCO_ATIVO = [0, 0];
	var BALANCO_LIQUIDO = [0, 0];
	var BALANCO_PASSIVO = [0, 0];
	var BALANCO_TOTAL = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

	/* INICIA O BALANCO */
	$scope.initBalanco = function(){
		for(i=0; i<5; i++){
			var SQL = "SELECT * FROM balanco WHERE propriedadeId_FK="+Propriedade.getId()+" AND var="+i;
			var res = false;

			basel.database.runAsync(SQL, function(data){
				if(data[0] != null){
					BALANCO_BD[i] = data;
					res = true;
				}else{
					res = false;
				}
			});
		}

		if(res){
			console.log("Carregou Balanco..");
			$scope.tratarBalanco();
		}else{
			console.log("Nao Carregou Balanco..");
			$scope.createBalanco();
		}
	}

	$scope.tratarBalanco = function(){
		for(var v=0; v<5; v++){
			for(i in BALANCO_BD[v]){
				BALANCO_TOTAL[v][0] += BALANCO_BD[v][i].inicial;
				BALANCO_TOTAL[v][1] += BALANCO_BD[v][i].final;
				
				switch(v){
					case 0 :
					case 1 :
					case 2 :
						BALANCO_ATIVO[0] += BALANCO_BD[v][i].inicial;
						BALANCO_ATIVO[1] += BALANCO_BD[v][i].final;
						break;
					default :
						BALANCO_PASSIVO[0] += BALANCO_BD[v][i].inicial;
						BALANCO_PASSIVO[1] += BALANCO_BD[v][i].final;
				}
			}
		}
		
		BALANCO_LIQUIDO[0] = BALANCO_ATIVO[0] - BALANCO_PASSIVO[0];
		BALANCO_LIQUIDO[1] = BALANCO_ATIVO[1] - BALANCO_PASSIVO[1];
		BALANCO_PASSIVO[0] += BALANCO_LIQUIDO[0];
		BALANCO_PASSIVO[1] += BALANCO_LIQUIDO[1];

		$scope.balanco = BALANCO_BD;
		$scope.balanco_total = BALANCO_TOTAL;
		$scope.balanco_ativo = BALANCO_ATIVO;
		$scope.balanco_liquido = BALANCO_LIQUIDO;
		$scope.balanco_passivo = BALANCO_PASSIVO; 
	}

	/*  */
	$scope.createBalanco = function(){
		var TEXT0 = ["Dinheiro em caixa", "Títulos e contas a receber a curto prazo", "Adiantamentos e empréstimos a curto prazo",
			 "Aplicacoes finaceiras a curto prazo", "Despesas antecipadas a curto prazo", "Colheitas pendentes", "Estoques de provisoes", 
			 "Estoques de insumos", "Animais de producao, de trabalho e criacoes", "Outros"];

		var TEXT1 = ["Títulos e contas a receber a longo prazo", "Adiantamentos e empréstimos a longo prazo",
			 "Aplicações finaceiras a longo prazo", "Despesas antecipadas a longo prazo", "Outros créditos a longo prazo"];

		var TEXT2 = ["Investimentos", "Terras nuas", "Culturas perenes", "Benfeitorias e melhoramentos", "Maquinaria e equipamentos"];

		var TEXT3 = ["Títulos e contas a pagar a curto prazo", "Impostos a pagar", "Empréstimos a pagar", "Salários a pagar",
			 "Encargos sociais a recolher", "Outras obrigacoes a curto prazo"];

		var TEXT4 = ["Financiamentos", "Títulos e contas a pagar a longo prazo", "Outras obrigações a longo prazo"];

		var ESPECIFICACAO = [TEXT0, TEXT1, TEXT2, TEXT3, TEXT4];

		for(var v=0; v<5; v++){
			for(i in ESPECIFICACAO[v]){
				$scope.form = {};
				$scope.form.descricao = ESPECIFICACAO[v][i];
				$scope.form.inicial = 0;
				$scope.form.final = 0;
				$scope.form.var = v;
				$scope.new();
			}
		}

		$scope.initBalanco();
	}

	$scope.save = function(){
		//$scope.form.id;
		//$scope.form.propriedadeId_FK = Propriedade.getId();
		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		$('#balancoModal').modal('hide');

		basel.database.update("balanco", $scope.form, {id: id});
		$scope.initBalanco();
	}

	// Cancel form
	$scope.new = function(){
		var num = $scope.num;
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		
		basel.database.insert("balanco", $scope.form);		
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.edit = function(data){
		$scope.form = data;
		$('#balancoModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Balanco?")){
			basel.database.delete("balanco", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});