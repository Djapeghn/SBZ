var app = angular.module('app',['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngCookies']);

app.config(function($routeProvider) {
	$routeProvider.when('/',
	{
		templateUrl: 'partials/welcome.html'
	})
});