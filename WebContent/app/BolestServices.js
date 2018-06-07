app.factory('BolestFactory', function($http) {
	
	var factory = {};
	factory.getBolesti = function() {
		return $http.get('/CDSS/rest/bolestiData/getBolesti');
	};

	factory.addBolest = function(Bolest) {
		return $http.post('/CDSS/rest/bolestiData/addBolest', Bolest);
	};
	
	factory.modifyBolest = function(Bolest) {
		return $http.post('/CDSS/rest/bolestiData/modifyBolest', Bolest);
	};
	
	factory.deleteBolest = function(Bolest) {
		return $http.post('/CDSS/rest/bolestiData/deleteBolest', Bolest);
	};
	
	return factory;
	
});