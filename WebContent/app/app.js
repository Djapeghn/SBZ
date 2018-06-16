var app = angular.module('app',['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngCookies', 'ngQuickDate']);

app.config(function($routeProvider) {
	$routeProvider.when('/',
	{
		
		templateUrl: 'partials/welcome.html'
	}).when('/login',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn!="loggedOut") {
					$location.path('/');
				}
			}
		},
		
		templateUrl: 'partials/login.html'
	}).when('/register',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn!="loggedOut") {
					$location.path('/');
				}
			}
		},
		
		templateUrl: 'partials/register.html'
	}).when('/displayLekovi',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
				else if($rootScope.loggedIn=="loggedInAsAdmin") {
					$location.path('/displayLekoviAdmin');
				}
			}
		},
		
		templateUrl: 'partials/displayLekovi.html'
	}).when('/displayLekoviAdmin',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
				else if($rootScope.loggedIn=="loggedInAsLekar") {
					$location.path('/displayLekovi');
				}
			}
		},
		
		templateUrl: 'partials/displayLekoviAdmin.html'
	}).when('/lekDetails',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedInAsAdmin") {
					$location.path('/lekDetailsAdmin');
				}
				else if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
			}
		},
		templateUrl: 'partials/lekDetails.html'
	}).when('/lekDetailsAdmin',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedInAsLekar") {
					$location.path('/lekDetails');
				}
				else if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
			}
		},
		templateUrl: 'partials/lekDetailsAdmin.html'
	}).when('/displayBolesti',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
				else if($rootScope.loggedIn=="loggedInAsAdmin") {
					$location.path('/displayBolestiAdmin');
				}
			}
		},
		
		templateUrl: 'partials/displayBolesti.html'
	}).when('/displayBolestiAdmin',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
				else if($rootScope.loggedIn=="loggedInAsLekar") {
					$location.path('/displayBolesti');
				}
			}
		},
		
		templateUrl: 'partials/displayBolestiAdmin.html'
	}).when('/bolestDetails',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedInAsAdmin") {
					$location.path('/bolestDetailsAdmin');
				}
				else if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
			}
		},
		templateUrl: 'partials/bolestDetails.html'
	}).when('/bolestDetailsAdmin',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedInAsLekar") {
					$location.path('/bolestDetails');
				}
				else if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
			}
		},
		templateUrl: 'partials/bolestDetailsAdmin.html'
	}).when('/displayPacijenti',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
				else if($rootScope.loggedIn=="loggedInAsAdmin") {
					$location.path('/displayPacijentiAdmin');
				}
			}
		},
		
		templateUrl: 'partials/displayPacijenti.html'
	}).when('/displayPacijentiAdmin',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
				else if($rootScope.loggedIn=="loggedInAsLekar") {
					$location.path('/displayPacijenti');
				}
			}
		},
		
		templateUrl: 'partials/displayPacijentiAdmin.html'
	}).when('/pacijentDetails',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedInAsAdmin") {
					$location.path('/pacijentDetailsAdmin');
				}
				else if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
			}
		},
		templateUrl: 'partials/pacijentDetails.html'
	}).when('/pacijentDetailsAdmin',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedInAsLekar") {
					$location.path('/pacijentDetails');
				}
				else if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
			}
		},
		templateUrl: 'partials/pacijentDetailsAdmin.html'
	}).when('/displayKorisniciAdmin',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn!="loggedInAsAdmin") {
					$location.path('/');
				}
			}
		},
		
		templateUrl: 'partials/displayKorisniciAdmin.html'
	}).when('/korisnikDetailsAdmin',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn!="loggedInAsAdmin") {
					$location.path('/');
				}
			}
		},
		templateUrl: 'partials/korisnikDetailsAdmin.html'
	}).when('/pregledDetails',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedInAsAdmin") {
					$location.path('/pregledDetailsAdmin');
				}
				else if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
			}
		},
		templateUrl: 'partials/pregledDetails.html'
	}).when('/pregledDetailsAdmin',
	{
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.loggedIn=="loggedInAsLekar") {
					$location.path('/pregledDetails');
				}
				else if($rootScope.loggedIn=="loggedOut") {
					$location.path('/');
				}
			}
		},
		templateUrl: 'partials/pregledDetailsAdmin.html'
	})
	
});