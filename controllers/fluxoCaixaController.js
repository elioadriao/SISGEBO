"use strict";
app.controller("fluxoCaixaController", function($scope, $location, Propriedade){

	var CUSTO_TOTAL_BD = [];
	var RECEITA_BD = [];
	var INVESTIMENTO_BD = [];
	var CUSTO_FIXO_BD = [];
	var FLUXO_CAIXA_BD = [];
	var TOTAL_MES_FIXO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_MES_RECEITA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_MES_INVESTIMENTO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_MES_ADM = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_MES_VARIAVEL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_MES_EMP_R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_MES_EMP_P = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_MES_SAIDA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_MES_ENTRADA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_MES_FLUXO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var TOTAL_MES_ACUMULATIVO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
			$scope.initInvestimento();
		}else{
			console.log("Nao Carregou Receita..");
			$location.path("/receita");
		}
	}


	/* INICIA O INVESTIMENTO */
	$scope.initInvestimento = function(){
		var SQL = "SELECT * FROM investimento WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				INVESTIMENTO_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Investimento..");
			$scope.initCustoFixo();
		}else{
			console.log("Nao Carregou Investimento..");
			$location.path("/investimento");
		}
	}

	/* INICIA O CUSTO FIXO */
	$scope.initCustoFixo = function(){
		var SQL = "SELECT * FROM custo_fixo WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				CUSTO_FIXO_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Custo Fixo..");
			$scope.initCustoTotal();
		}else{
			console.log("Nao Carregou Custo Fixo..");
			$location.path("/custoFixo");
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
			$scope.initFluxoCaixa();
		}else{
			console.log("Nao Carregou Custo Total..");
			$location.path("/");
		}
	}

	/* INICIA O FLUXO DE CAIXA */
	$scope.initFluxoCaixa = function(){
		var SQL = "SELECT * FROM fluxo_caixa WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				FLUXO_CAIXA_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("Carregou Fluxo de Caixa..");
			$scope.tratarFluxoCaixa();
		}else{
			console.log("Nao Carregou Fluxo de Caixa..");
			$scope.createFluxoCaixa();
		}
	}

	/*  */
	$scope.tratarInvestimento = function(){
		for(i in INVESTIMENTO_BD){
			TOTAL_MES_INVESTIMENTO[0] += INVESTIMENTO_BD[i].jan;
			TOTAL_MES_INVESTIMENTO[1] += INVESTIMENTO_BD[i].fev;
			TOTAL_MES_INVESTIMENTO[2] += INVESTIMENTO_BD[i].mar;
			TOTAL_MES_INVESTIMENTO[3] += INVESTIMENTO_BD[i].abr;
			TOTAL_MES_INVESTIMENTO[4] += INVESTIMENTO_BD[i].mai;
			TOTAL_MES_INVESTIMENTO[5] += INVESTIMENTO_BD[i].jun;
			TOTAL_MES_INVESTIMENTO[6] += INVESTIMENTO_BD[i].jul;
			TOTAL_MES_INVESTIMENTO[7] += INVESTIMENTO_BD[i].ago;
			TOTAL_MES_INVESTIMENTO[8] += INVESTIMENTO_BD[i].sem;
			TOTAL_MES_INVESTIMENTO[9] += INVESTIMENTO_BD[i].out;
			TOTAL_MES_INVESTIMENTO[10] += INVESTIMENTO_BD[i].nov;
			TOTAL_MES_INVESTIMENTO[11] += INVESTIMENTO_BD[i].dez;
		}
	}

	$scope.tratarReceita = function(){
		for(i in RECEITA_BD){
			TOTAL_MES_RECEITA[0] += RECEITA_BD[i].jan;
			TOTAL_MES_RECEITA[1] += RECEITA_BD[i].fev;
			TOTAL_MES_RECEITA[2] += RECEITA_BD[i].mar;
			TOTAL_MES_RECEITA[3] += RECEITA_BD[i].abr;
			TOTAL_MES_RECEITA[4] += RECEITA_BD[i].mai;
			TOTAL_MES_RECEITA[5] += RECEITA_BD[i].jun;
			TOTAL_MES_RECEITA[6] += RECEITA_BD[i].jul;
			TOTAL_MES_RECEITA[7] += RECEITA_BD[i].ago;
			TOTAL_MES_RECEITA[8] += RECEITA_BD[i].sem;
			TOTAL_MES_RECEITA[9] += RECEITA_BD[i].out;
			TOTAL_MES_RECEITA[10] += RECEITA_BD[i].nov;
			TOTAL_MES_RECEITA[11] += RECEITA_BD[i].dez;
		}
	}

	$scope.tratarCustoFixo = function(){
		var aux = 0;

		for(i in CUSTO_FIXO_BD){
			switch(CUSTO_FIXO_BD[i].descricao){
				case "Máquinas e Implementos":
				case "Tratores":
				case "Veículos":
				case "Equipamentos Manuais":
				case "Reprodutores Machos":
				case "Reprodutores Femeas":
				case "Animais de Trabalho":
				case "Canavial ou Volumosos":
				case "Benfeitorias":
				case "Edificações":
				case "Pastagem":
					aux = 1;
					break;
				default:
					TOTAL_MES_FIXO[0] += CUSTO_FIXO_BD[i].jan;
					TOTAL_MES_FIXO[1] += CUSTO_FIXO_BD[i].fev;
					TOTAL_MES_FIXO[2] += CUSTO_FIXO_BD[i].mar;
					TOTAL_MES_FIXO[3] += CUSTO_FIXO_BD[i].abr;
					TOTAL_MES_FIXO[4] += CUSTO_FIXO_BD[i].mai;
					TOTAL_MES_FIXO[5] += CUSTO_FIXO_BD[i].jun;
					TOTAL_MES_FIXO[6] += CUSTO_FIXO_BD[i].jul;
					TOTAL_MES_FIXO[7] += CUSTO_FIXO_BD[i].ago;
					TOTAL_MES_FIXO[8] += CUSTO_FIXO_BD[i].sem;
					TOTAL_MES_FIXO[9] += CUSTO_FIXO_BD[i].out;
					TOTAL_MES_FIXO[10] += CUSTO_FIXO_BD[i].nov;
					TOTAL_MES_FIXO[11] += CUSTO_FIXO_BD[i].dez;
			}
		}
	}

	$scope.tratarCustoTotal = function(){
		for(i in CUSTO_TOTAL_BD){
			switch(CUSTO_TOTAL_BD[i].descricao){
				case "Variavel" :
					TOTAL_MES_VARIAVEL[0] += CUSTO_TOTAL_BD[i].jan;
					TOTAL_MES_VARIAVEL[1] += CUSTO_TOTAL_BD[i].fev;			
					TOTAL_MES_VARIAVEL[2] += CUSTO_TOTAL_BD[i].mar;			
					TOTAL_MES_VARIAVEL[3] += CUSTO_TOTAL_BD[i].abr;			
					TOTAL_MES_VARIAVEL[4] += CUSTO_TOTAL_BD[i].mai;			
					TOTAL_MES_VARIAVEL[5] += CUSTO_TOTAL_BD[i].jun;			
					TOTAL_MES_VARIAVEL[6] += CUSTO_TOTAL_BD[i].jul;			
					TOTAL_MES_VARIAVEL[7] += CUSTO_TOTAL_BD[i].ago;			
					TOTAL_MES_VARIAVEL[8] += CUSTO_TOTAL_BD[i].sem;			
					TOTAL_MES_VARIAVEL[9] += CUSTO_TOTAL_BD[i].out;			
					TOTAL_MES_VARIAVEL[10] += CUSTO_TOTAL_BD[i].nov;			
					TOTAL_MES_VARIAVEL[11] += CUSTO_TOTAL_BD[i].dez;
					break;
				case "Administrativo" :
					TOTAL_MES_ADM[0] += CUSTO_TOTAL_BD[i].jan;
					TOTAL_MES_ADM[1] += CUSTO_TOTAL_BD[i].fev;			
					TOTAL_MES_ADM[2] += CUSTO_TOTAL_BD[i].mar;			
					TOTAL_MES_ADM[3] += CUSTO_TOTAL_BD[i].abr;			
					TOTAL_MES_ADM[4] += CUSTO_TOTAL_BD[i].mai;			
					TOTAL_MES_ADM[5] += CUSTO_TOTAL_BD[i].jun;			
					TOTAL_MES_ADM[6] += CUSTO_TOTAL_BD[i].jul;			
					TOTAL_MES_ADM[7] += CUSTO_TOTAL_BD[i].ago;			
					TOTAL_MES_ADM[8] += CUSTO_TOTAL_BD[i].sem;			
					TOTAL_MES_ADM[9] += CUSTO_TOTAL_BD[i].out;			
					TOTAL_MES_ADM[10] += CUSTO_TOTAL_BD[i].nov;			
					TOTAL_MES_ADM[11] += CUSTO_TOTAL_BD[i].dez;
			}
		}
	}

	$scope.tratarFluxoCaixa = function(){
		$scope.tratarReceita();
		$scope.tratarCustoFixo();
		$scope.tratarCustoTotal();
		$scope.tratarInvestimento();

		for(i in FLUXO_CAIXA_BD){
			switch(FLUXO_CAIXA_BD[i].descricao){
				case "Receita Emprestimo" :
					TOTAL_MES_EMP_R[0] += FLUXO_CAIXA_BD[i].jan;
					TOTAL_MES_EMP_R[1] += FLUXO_CAIXA_BD[i].fev;			
					TOTAL_MES_EMP_R[2] += FLUXO_CAIXA_BD[i].mar;			
					TOTAL_MES_EMP_R[3] += FLUXO_CAIXA_BD[i].abr;			
					TOTAL_MES_EMP_R[4] += FLUXO_CAIXA_BD[i].mai;			
					TOTAL_MES_EMP_R[5] += FLUXO_CAIXA_BD[i].jun;			
					TOTAL_MES_EMP_R[6] += FLUXO_CAIXA_BD[i].jul;			
					TOTAL_MES_EMP_R[7] += FLUXO_CAIXA_BD[i].ago;			
					TOTAL_MES_EMP_R[8] += FLUXO_CAIXA_BD[i].sem;			
					TOTAL_MES_EMP_R[9] += FLUXO_CAIXA_BD[i].out;			
					TOTAL_MES_EMP_R[10] += FLUXO_CAIXA_BD[i].nov;			
					TOTAL_MES_EMP_R[11] += FLUXO_CAIXA_BD[i].dez;
					break;
				case "Pagamento Emprestimo" :
					TOTAL_MES_EMP_P[0] += FLUXO_CAIXA_BD[i].jan;
					TOTAL_MES_EMP_P[1] += FLUXO_CAIXA_BD[i].fev;			
					TOTAL_MES_EMP_P[2] += FLUXO_CAIXA_BD[i].mar;			
					TOTAL_MES_EMP_P[3] += FLUXO_CAIXA_BD[i].abr;			
					TOTAL_MES_EMP_P[4] += FLUXO_CAIXA_BD[i].mai;			
					TOTAL_MES_EMP_P[5] += FLUXO_CAIXA_BD[i].jun;			
					TOTAL_MES_EMP_P[6] += FLUXO_CAIXA_BD[i].jul;			
					TOTAL_MES_EMP_P[7] += FLUXO_CAIXA_BD[i].ago;			
					TOTAL_MES_EMP_P[8] += FLUXO_CAIXA_BD[i].sem;			
					TOTAL_MES_EMP_P[9] += FLUXO_CAIXA_BD[i].out;			
					TOTAL_MES_EMP_P[10] += FLUXO_CAIXA_BD[i].nov;			
					TOTAL_MES_EMP_P[11] += FLUXO_CAIXA_BD[i].dez;
			}
		}

		for(i=0; i<12; i++){
			TOTAL_MES_SAIDA[i] = TOTAL_MES_FIXO[i] + TOTAL_MES_ADM[i] + TOTAL_MES_VARIAVEL[i] + TOTAL_MES_INVESTIMENTO[i] + TOTAL_MES_EMP_P[i];
			TOTAL_MES_ENTRADA[i] = TOTAL_MES_RECEITA[i] + TOTAL_MES_EMP_R[i];
			TOTAL_MES_FLUXO[i] = TOTAL_MES_ENTRADA[i] - TOTAL_MES_SAIDA[i];
			if(i == 0){
				TOTAL_MES_ACUMULATIVO[i] = TOTAL_MES_FLUXO[i];
			}else{
				TOTAL_MES_ACUMULATIVO[i] = TOTAL_MES_ACUMULATIVO[i-1] + TOTAL_MES_FLUXO[i];
			}
		}

		$scope.total_receita = TOTAL_MES_RECEITA;
		$scope.total_emp_r = TOTAL_MES_EMP_R;
		$scope.total_fixo = TOTAL_MES_FIXO;
		$scope.total_variavel = TOTAL_MES_VARIAVEL;
		$scope.total_adm = TOTAL_MES_ADM;
		$scope.total_emp_p = TOTAL_MES_EMP_P;
		$scope.total_investiento = TOTAL_MES_INVESTIMENTO;
		$scope.total_saida = TOTAL_MES_SAIDA;
		$scope.total_entrada = TOTAL_MES_ENTRADA;
		$scope.total_fluxo = TOTAL_MES_FLUXO;
		$scope.total_acumulativo = TOTAL_MES_ACUMULATIVO;
	}

	/*  */
	$scope.createFluxoCaixa = function(){
		var ESPECIFICACAO = ["Receita Emprestimo", "Pagamento Emprestimo"];

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

		$scope.initFluxoCaixa();
	}

	$scope.save = function(){
		//$scope.form.id;
		//$scope.form.propriedadeId_FK = Propriedade.getId();
		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		$('#fluxoCaixaModal').modal('hide');
		
		basel.database.update("fluxo_caixa", $scope.form, {id: id});
		//$scope.new();

		$scope.initCustoVariavel();
		//$location.path('/inventario');
	}

	// Cancel form
	$scope.new = function(){
		$scope.form.id;
		$scope.form.propriedadeId_FK = Propriedade.getId();
		basel.database.insert("fluxo_caixa", $scope.form);
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.edit = function(num){
		if(num == 1){
			var rotulo = "Pagamento Emprestimo";
		}else{
			var rotulo = "Receita Emprestimo";
		}

		for(i in FLUXO_CAIXA_BD){
			if(FLUXO_CAIXA_BD[i].descricao == rotulo){
				$scope.form = FLUXO_CAIXA_BD[i];
			}
		}

		$('#fluxoCaixaModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		if(confirm("Deseja Resetar Fluxo de Caixa?")){
			basel.database.delete("fluxo_caixa", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});