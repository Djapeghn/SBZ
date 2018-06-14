var app = angular.module('app',['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngCookies']);

app.config(function($routeProvider) {
	$routeProvider.when('/',
	{
		templateUrl: 'partials/displayLekoviAdmin.html'
	}).when('/displayLekoviAdmin',
	{
		templateUrl: 'partials/displayLekoviAdmin.html'
	})
});