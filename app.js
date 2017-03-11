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
            $location.path('/login');
            //$('#loginController').modal('show');
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
    $routeProviderReference.when('/',{
        controller: 'propriedadeController',
        templateUrl: 'views/propriedade.html'
        });
    $routeProviderReference.when('/inicio',{
        controller: 'usuariosController',
        templateUrl: 'views/usuarios.html'
        });
    $routeProviderReference.when('/login',{
        controller: 'loginController',
        templateUrl: 'views/login.html'
        });
    
    $routeProviderReference.otherwise({ redirectTo: '/' });
    $route.reload();
}]);