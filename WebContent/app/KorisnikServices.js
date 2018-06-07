app.factory('korisnikFactory', function($http) {
	
	var factory = {};
	factory.getKorisnici = function() {
		return $http.get('/CDSS/rest/korisniciData/getKorisnici');
	};

	factory.addKorisnik = function(korisnik) {
		return $http.post('/CDSS/rest/korisniciData/addKorisnik', korisnik);
	};
	
	factory.modifyKorisnik = function(korisnik) {
		return $http.post('/CDSS/rest/korisniciData/modifyKorisnik', korisnik);
	};
	
	factory.checkValidity = function(korisnik) {
		return $http.post('/CDSS/rest/korisniciData/checkValidity', korisnik);
	};
	
	factory.deleteKorisnik = function(korisnik) {
		return $http.post('/CDSS/rest/korisniciData/deleteKorisnik', korisnik);
	};
	
	return factory;
	
});