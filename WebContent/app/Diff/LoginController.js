app.controller('loginController', function($scope, $location, $rootScope, lekFactory, bolestFactory, userPersistenceService, korisnikFactory, pregledFactory, pacijentFactory) {
    function init() {
        korisnikFactory.getKorisnici().success(function (data) {
        	$scope.korisnici = data;
		});
		//userPersistenceService.clearCookieData();
    	if(userPersistenceService.getCookieData()===undefined) {
    		$rootScope.loggedIn = "loggedOut";
    	}
    	else if(userPersistenceService.getCookieData().korisnickoIme==="admin") {
    		$rootScope.loggedIn = "loggedInAsAdmin";
    		$rootScope.loggedInKorisnik = userPersistenceService.getCookieData();
    	}
    	else {
    		$rootScope.loggedIn = "loggedInAsLekar";
    		$rootScope.loggedInKorisnik = userPersistenceService.getCookieData();
    	}
    }
	init();
	
	
	$scope.findLoggedIn = function(username) {
		for(var i=0; i < $scope.korisnici.length; i++) {
			if($scope.korisnici[i].korisnickoIme===$scope.korisnik.korisnickoIme) {
				$rootScope.loggedInKorisnik.idkorisnik = $scope.korisnici[i].idKorisnik;
				$rootScope.loggedInKorisnik.ime = $scope.korisnici[i].ime;
				$rootScope.loggedInKorisnik.prezime = $scope.korisnici[i].prezime;
				$rootScope.loggedInKorisnik.email = $scope.korisnici[i].email;
				$rootScope.loggedInKorisnik.datumRodjenja = $scope.korisnici[i].datumRodjenja;
				$rootScope.loggedInKorisnik.korisnickoIme = $scope.korisnici[i].korisnickoIme;
				$rootScope.loggedInKorisnik.lozinka = $scope.korisnici[i].lozinka;
				$rootScope.loggedInKorisnik.tipKorisnika = $scope.korisnici[i].tipKorisnika;
				//$rootScope.loggedInKorisnik.slikaPutanja = $scope.korisnici[i].slikaPutanja;
				
				if($rootScope.loggedInKorisnik.korisnickoIme==="admin") {
					$rootScope.loggedIn = "loggedInAsAdmin";
					userPersistenceService.setCookieData($rootScope.loggedInKorisnik);
				}
				else {
					$rootScope.loggedIn = "loggedInAsLekar";
					userPersistenceService.setCookieData($rootScope.loggedInKorisnik);
				}
			}
		}
	}
	
	$scope.submit = function() {
		//$rootScope je vidljivo globalno
		$scope.korisnik.korisnickoIme;
		$scope.korisnik.lozinka;

		$rootScope.loggedInKorisnik = {};
		
		korisnikFactory.checkValidity($scope.korisnik).then(function(data) {
			$scope.findLoggedIn($scope.korisnik.korisnickoIme);
			//$scope.getCurrentUserVanredneSituacije();
			toast("Uspesno logovanje.");
			$location.path('/');
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Korisnicko ime i/ili lozinka nisu ispravni.");
		});
	}
	
	$scope.logout = function() {
		
		$rootScope.loggedInKorisnik = {};
		$rootScope.loggedIn = "loggedOut";
		userPersistenceService.clearCookieData();
		
		$location.path('/login');
	}
	
	/*$scope.getCurrentUserVanredneSituacije = function() {
		$rootScope.vanredneSituacijeZaVolontera = [];
	    for(var i=0; i<$scope.vanredneSituacije.length; i++) {
	    	if($scope.vanredneSituacije[i].volonter!=null) {
		    	if($rootScope.loggedInVolonter.korisnickoIme===$scope.vanredneSituacije[i].volonter.korisnickoIme) {
		    		$rootScope.vanredneSituacijeZaVolontera.push($scope.vanredneSituacije[i]);
		    	}
	    	}
	    }
	    userPersistenceService.setCookieData2($rootScope.vanredneSituacijeZaVolontera);
	}*/
	
});