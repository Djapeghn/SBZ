app.factory('lekFactory', function($http) {
	
	var factory = {};
	factory.getLekovi = function() {
		return $http.get('/CDSS/rest/lekoviData/getLekovi');
	};

	factory.addLek = function(lek) {
		return $http.post('/CDSS/rest/lekoviData/addLek', lek);
	};
	
	factory.modifyLek = function(lek) {
		return $http.post('/CDSS/rest/lekoviData/modifyLek', lek);
	};
	
	factory.deleteLek = function(lek) {
		return $http.post('/CDSS/rest/lekoviData/deleteLek', lek);
	};
	
	return factory;
	
});