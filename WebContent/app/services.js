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

app.factory('bolestFactory', function($http) {
	
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

app.factory("userPersistenceService", [
	"$cookieStore", function($cookieStore) {
		
		var userName = "";

		return {
			setCookieData: function(username) {
				userName = username;
				$cookieStore.put("userName", username);
			},
			getCookieData: function() {
				userName = $cookieStore.get("userName");
				return userName;
			},
			clearCookieData: function() {
				userName = "";
				$cookieStore.remove("userName");
			}
		}
	}
]);

app.factory( 'AuthService', function() {
	  var currentUser = undefined;

	  return {
	    login: function(korisnikFactory) {
	    	
	    },
	    logout: function() {
	    	currentUser = undefined;
	    },
	    isLoggedIn: function() {
	    	if(currentUser===undefined) {
	    		return false;
	    	}
	    	else {
	    		return true;
	    	}
	    },
	    currentUser: function() { return currentUser; }
	  };
	});