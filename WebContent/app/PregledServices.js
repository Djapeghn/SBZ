app.factory('pregledFactory', function($http) {
	
	var factory = {};
	factory.getPregledi = function() {
		return $http.get('/CDSS/rest/preglediData/getPregledi');
	};

	factory.addPregled = function(pregled) {
		return $http.post('/CDSS/rest/preglediData/addPregled', pregled);
	};
	
	factory.modifyPregled = function(pregled) {
		return $http.post('/CDSS/rest/preglediData/modifyPregled', pregled);
	};
	
	factory.deletePregled = function(pregled) {
		return $http.post('/CDSS/rest/preglediData/deletePregled', pregled);
	};
	
	return factory;
	
});