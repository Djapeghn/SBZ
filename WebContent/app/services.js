app.factory('lekFactory', function($http) {
	
	var factory = {};
	factory.getLekovi = function() {
		return $http.get('/CDSS/rest/fileData/getLekovi');
	};
	
	factory.getAllSastojci = function() {
		return $http.get('/CDSS/rest/fileData/getAllSastojci');
	};

	factory.addLek = function(lek) {
		return $http.post('/CDSS/rest/fileData/addLek', lek);
	};
	
	factory.modifyLek = function(lek) {
		return $http.post('/CDSS/rest/fileData/modifyLek', lek);
	};
	
	factory.deleteLek = function(lek) {
		return $http.post('/CDSS/rest/fileData/deleteLek', lek);
	};
	
	return factory;
	
});

app.factory('bolestFactory', function($http) {
	
	var factory = {};
	factory.getBolesti = function() {
		return $http.get('/CDSS/rest/fileData/getBolesti');
	};
	
	factory.getAllSimptomi = function() {
		return $http.get('/CDSS/rest/fileData/getAllSimptomi');
	};

	factory.addBolest = function(Bolest) {
		return $http.post('/CDSS/rest/fileData/addBolest', Bolest);
	};
	
	factory.modifyBolest = function(Bolest) {
		return $http.post('/CDSS/rest/fileData/modifyBolest', Bolest);
	};
	
	factory.deleteBolest = function(Bolest) {
		return $http.post('/CDSS/rest/fileData/deleteBolest', Bolest);
	};
	
	return factory;
	
});

app.factory('korisnikFactory', function($http) {
	
	var factory = {};
	factory.getKorisnici = function() {
		return $http.get('/CDSS/rest/fileData/getKorisnici');
	};

	factory.addKorisnik = function(korisnik) {
		return $http.post('/CDSS/rest/fileData/addKorisnik', korisnik);
	};
	
	factory.modifyKorisnik = function(korisnik) {
		return $http.post('/CDSS/rest/fileData/modifyKorisnik', korisnik);
	};
	
	factory.checkValidity = function(korisnik) {
		return $http.post('/CDSS/rest/fileData/checkValidity', korisnik);
	};
	
	factory.deleteKorisnik = function(korisnik) {
		return $http.post('/CDSS/rest/fileData/deleteKorisnik', korisnik);
	};
	
	return factory;
	
});

app.factory('pregledFactory', function($http) {
	
	var factory = {};
	factory.getPregledi = function() {
		return $http.get('/CDSS/rest/fileData/getPregledi');
	};

	factory.addPregled = function(pregled) {
		return $http.post('/CDSS/rest/fileData/addPregled', pregled);
	};
	
	factory.modifyPregled = function(pregled) {
		return $http.post('/CDSS/rest/fileData/modifyPregled', pregled);
	};
	
	factory.deletePregled = function(pregled) {
		return $http.post('/CDSS/rest/fileData/deletePregled', pregled);
	};
	
	return factory;
	
});

app.factory('pacijentFactory', function($http) {
	
	var factory = {};
	factory.getPacijenti = function() {
		return $http.get('/CDSS/rest/fileData/getPacijenti');
	};

	factory.addPacijent = function(pacijent) {
		return $http.post('/CDSS/rest/fileData/addPacijent', pacijent);
	};
	
	factory.modifyPacijent = function(pacijent) {
		return $http.post('/CDSS/rest/fileData/modifyPacijent', pacijent);
	};
	
	factory.deletePacijent = function(pacijent) {
		return $http.post('/CDSS/rest/fileData/deletePacijent', pacijent);
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
			setCookieData2: function(detailViewLek) {
				detailViewLek1 = detailViewLek;
				$cookieStore.put("detailViewLek1", detailViewLek);
			},
			getCookieData2: function() {
				detailViewLek = $cookieStore.get("detailViewLek1");
				return detailViewLek;
			},
			setCookieData3: function(detailViewKorisnik) {
				detailViewKorisnik1 = detailViewKorisnik;
				$cookieStore.put("detailViewKorisnik1", detailViewKorisnik);
			},
			getCookieData3: function() {
				detailViewKorisnik = $cookieStore.get("detailViewKorisnik1");
				return detailViewKorisnik;
			},
			setCookieData4: function(detailViewBolest) {
				detailViewBolest1 = detailViewBolest;
				$cookieStore.put("detailViewBolest1", detailViewBolest);
			},
			getCookieData4: function() {
				detailViewBolest = $cookieStore.get("detailViewBolest1");
				return detailViewBolest;
			},
			clearCookieData: function() {
				userName = "";
				$cookieStore.remove("userName");
				$cookieStore.remove("detailViewLek1");
				$cookieStore.remove("detailViewKorisnik1");
				$cookieStore.remove("detailViewBolest1");
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