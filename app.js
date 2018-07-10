 var $routeProviderReference;
 var app = angular.module('cdg', [require('angular-route'),'angularUtils.directives.dirPagination', 'ngCookies']);
 var basel = require('basel-cli');
 var routes = basel.routes();

 app.config(['$routeProvider', function($routeProvider) {
 	$routeProviderReference = $routeProvider;
 }]);

 app.run(['$rootScope', '$http', '$route', '$location', '$cookieStore', function($rootScope, $http, $route, $location, $cookieStore) {
    
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }
 
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if (!$rootScope.globals.currentUser) {
            $('#menubar').hide();
            $location.path('/login');
        }else{
            $('#menubar').show();
        }
    });


    //getting routes
    angular.forEach(routes, function (route) {
    	$routeProviderReference.when( route.when, route.data );
    });

    /** 
    *	For new routes:
    *	$routeProviderReference.when('/when',{
	*		controller: 'yourController',
	*		templateUrl: 'your-view.html'
    *   })
    *
    */
    $routeProviderReference.when('/custovariavel',{
        controller: 'custovariavelController',
        templateUrl: 'views/custovariavel.html'
        });
    $routeProviderReference.when('/custofixo',{
        controller: 'custofixoController',
        templateUrl: 'views/custofixo.html'
        });
    $routeProviderReference.when('/vrebanho',{
        controller: 'vrebanhoController',
        templateUrl: 'views/vrebanho.html'
        });
    $routeProviderReference.when('/depreciacoes',{
        controller: 'depreciacoesController',
        templateUrl: 'views/depreciacoes.html'
        });
    $routeProviderReference.when('/inventario',{
        controller: 'inventarioController',
        templateUrl: 'views/inventario.html'
        });
    $routeProviderReference.when('/cria',{
        controller: 'criaController',
        templateUrl: 'views/cria.html'
        });
    $routeProviderReference.when('/',{
        controller: 'inicioController',
        templateUrl: 'views/inicio.html'
        });
    $routeProviderReference.when('/rebanho',{
        controller: 'rebanhoController',
        templateUrl: 'views/rebanho.html'
        });
    $routeProviderReference.when('/null',{
        controller: 'usuariosController',
        templateUrl: 'views/usuarios.html'
        });
    $routeProviderReference.when('/manutencao',{
        controller: 'manutencaoController',
        templateUrl: 'views/manutencao.html'
        });
    $routeProviderReference.when('/benfeitorias',{
        controller: 'benfeitoriasController',
        templateUrl: 'views/benfeitorias.html'
        });
    $routeProviderReference.when('/maquinas',{
        controller: 'maquinasController',
        templateUrl: 'views/maquinas.html'
        });
    $routeProviderReference.when('/evolucao',{
        controller: 'evolucaoController',
        templateUrl: 'views/evolucao.html'
        });
    $routeProviderReference.when('/login',{
        controller: 'loginController',
        templateUrl: 'views/login.html'
        });
    
    $routeProviderReference.otherwise({ redirectTo: '/' });
    $route.reload();
}]);