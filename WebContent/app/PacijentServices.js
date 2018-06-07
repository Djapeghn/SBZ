app.factory('pacijentFactory', function($http) {
	
	var factory = {};
	factory.getPacijenti = function() {
		return $http.get('/CDSS/rest/pacijentiData/getPacijenti');
	};

	factory.addPacijent = function(pacijent) {
		return $http.post('/CDSS/rest/pacijentiData/addPacijent', pacijent);
	};
	
	factory.modifyPacijent = function(pacijent) {
		return $http.post('/CDSS/rest/pacijentiData/modifyPacijent', pacijent);
	};
	
	factory.deletePacijent = function(pacijent) {
		return $http.post('/CDSS/rest/pacijentiData/deletePacijent', pacijent);
	};
	
	return factory;
	
});