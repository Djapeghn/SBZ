app.controller('lekController', function($scope, lekFactory, $http, $rootScope, $location, $window, userPersistenceService) {
	
	$scope.lekovi = [{idLek:"123", naziv:"naziv1", grupaLekova:"antibiotici"}];
	/*$scope.addLekSastojciOptions = [{label:"SASTOJAK0",value:"SASTOJAK0"}, {label:"SASTOJAK1",value:"SASTOJAK1"}, {label:"SASTOJAK2",value:"SASTOJAK2"},
		{label:"SASTOJAK3",value:"SASTOJAK3"}, {label:"SASTOJAK4",value:"SASTOJAK4"}, {label:"SASTOJAK5",value:"SASTOJAK5"},
		{label:"SASTOJAK6",value:"SASTOJAK6"}, {label:"SASTOJAK7",value:"SASTOJAK7"}, {label:"SASTOJAK8",value:"SASTOJAK8"},
		{label:"SASTOJAK9",value:"SASTOJAK9"}, {label:"SASTOJAK10",value:"SASTOJAK10"}, {label:"SASTOJAK11",value:"SASTOJAK11"},
		{label:"SASTOJAK12",value:"SASTOJAK12"}, {label:"SASTOJAK13",value:"SASTOJAK13"}];
	
	$scope.removeOption = function(text){
		  $scope.addLekSastojciOptions.
		  $scope.options.push({label:text,value:text});
		}*/
	$scope.sastojak0 = "";
	$scope.sastojak1 = "";
	$scope.sastojak2 = "";
	$scope.sastojak3 = "";
	$scope.sastojak4 = "";
	$scope.sastojak5 = "";
	$scope.sastojak6 = "";
	$scope.sastojak7 = "";
	$scope.sastojak8 = "";
	$scope.sastojak9 = "";
	$scope.sastojak10 = "";
	$scope.sastojak11 = "";
	$scope.sastojak12 = "";
	$scope.sastojak13 = "";
	
    function init() {
    	console.log('lekController.Init');
        lekFactory.getLekovi().success(function (data2) {
        	$scope.lekovi = data2;
		});
    }
    
	init();
	
	$scope.refresh = function(){
		lekFactory.getLekovi()
	          .success(function(data2){
	        	  $scope.lekovi = data2;
	          });
	}
	
	$scope.addLek = function(lek) {
		lekFactory.addLek(lek).then(function(data) {
			$scope.refresh();
			//$location.path('/displayTeritorijeAdmin');
			toast('Lek ' + lek.naziv + " dodat.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Lek sa unetim nazivom vec postoji.");
		});	
	};
	
	$scope.modifyLek = function(lek) {
		lekFactory.modifyLek(lek).then(function(data) {
			$scope.refresh();
			//$location.path('/displayTeritorijeAdmin');
			toast('Lek ' + lek.naziv + " azuriran.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Greska pri azuriranju leka.");
		});	
	};
	
	$scope.deleteLek = function(lek) {
		lekFactory.deleteLek(lek).then(function(data) {
			$scope.refresh();
			toast('Lek ' + lek.naziv + " obrisan.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Greska pri brisanju leka.");
		});	
	};
	
	$scope.detailViewLekAdmin = function(lek) {
		if(lek==undefined) {
			$rootScope.detailViewLek = userPersistenceService.getCookieData2();
			$location.path('/lekDetailsAdmin');
		}
		else {
			$rootScope.detailViewLek = lek;
			userPersistenceService.setCookieData2($rootScope.detailViewLek);
			$location.path('/lekDetailsAdmin');
		}
		
	};
	
	$scope.detailViewLekLekar = function(lek) {
		if(lek==undefined) {
			$rootScope.detailViewLek = userPersistenceService.getCookieData2();
			$location.path('/lekDetails');
		}
		else {
			$rootScope.detailViewLek = lek;
			userPersistenceService.setCookieData2($rootScope.detailViewLek);
			$location.path('/lekDetails');
		}
		
	};
	
	$scope.back = function() {
		$location.path('/displayLekoviAdmin');
		//$window.history.back();
	};
	
	$scope.saveChanges = function() {
		$scope.modifyLek($rootScope.detailViewLek);
		$location.path('/displayLekoviAdmin');
		$scope.refresh();
	};
	
	$scope.submit = function() {
		//$rootScope je vidljivo globalno
		$scope.lek.idLek;
		$scope.lek.naziv;
		$scope.lek.sastojci = [];
		
		$scope.sviSastojciMoguci = [$scope.sastojak0,$scope.sastojak1,$scope.sastojak2,$scope.sastojak3,$scope.sastojak4,$scope.sastojak5,
			$scope.sastojak6,$scope.sastojak7,$scope.sastojak8,$scope.sastojak9,$scope.sastojak10,$scope.sastojak11,$scope.sastojak12,
			$scope.sastojak13];
		
		for(var i=0; i<$scope.sviSastojciMoguci.length; i++) {
			if($scope.sviSastojciMoguci[i]!=="") {
				$scope.lek.sastojci.push($scope.sviSastojciMoguci[i]);
			}
		}
		
		$scope.lek.grupaLekova;
		$scope.addLek($scope.lek);
		$location.path('/displayLekoviAdmin');
		$scope.refresh();
	};
});

app.controller('loginController', function($scope, $location, $rootScope, lekFactory, bolestFactory, userPersistenceService, korisnikFactory, pregledFactory, pacijentFactory) {
    function init() {
        korisnikFactory.getKorisnici().success(function (data) {
        	$scope.korisnici = data;
		});
		//userPersistenceService.clearCookieData();
    	if(userPersistenceService.getCookieData()===undefined) {
    		$rootScope.loggedIn = "loggedOut";
    		if(userPersistenceService.getCookieData2()!=undefined) {
        		$rootScope.detailViewLek = userPersistenceService.getCookieData2();
    		}
    	}
    	else if(userPersistenceService.getCookieData().korisnickoIme==="admin") {
    		$rootScope.loggedIn = "loggedInAsAdmin";
    		$rootScope.loggedInKorisnik = userPersistenceService.getCookieData();
    		$rootScope.detailViewLek = userPersistenceService.getCookieData2();
    	}
    	else {
    		$rootScope.loggedIn = "loggedInAsLekar";
    		$rootScope.loggedInKorisnik = userPersistenceService.getCookieData();
    		$rootScope.detailViewLek = userPersistenceService.getCookieData2();
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

app.controller('korisnikController', function($scope, korisnikFactory, $http, $rootScope, $window, $location, userPersistenceService) {
	
    function init() {
    	console.log('korisnikController.Init');
        korisnikFactory.getKorisnici().success(function (data) {
        	$scope.korisnici = data;
		});
    }
	init();
	
	$scope.addKorisnik = function(korisnik) {
		korisnikFactory.addKorisnik(korisnik).then(function(data) {
			toast('Korisnik ' + korisnik.korisnickoIme + " registrovan.");
			$rootScope.loggedIn = "loggedInAsLekar";
			$rootScope.loggedInKorisnik = $scope.korisnik;
			userPersistenceService.setCookieData($rootScope.loggedInKorisnik);
			$location.path('/');
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Korisnicko ime, email ili id su vec zauzeti.");
		});	
	};
	
	$scope.modifyKorisnik = function(korisnik) {
		korisnikFactory.modifyKorisnik(korisnik).then(function(data) {
			toast("Nalog azuriran.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Greska prilikom azuriranja.");
		});	
	};
	
	/*$scope.usernameChanged = function() {
	    $http.post('/WP/rest/fileData/checkUsername', $scope.volonter.username).then(function (response) {
	        console.log(response.isValid);
	    }).catch(function (response) {
			//toast("Korisnicko ime vec zauzeto.");
	        notify.warning(response.msg);
	    });
	};
	
	$scope.emailChanged = function() {
	    $http.post('/WP/rest/fileData/checkEmail', $scope.volonter.email).then(function (response) {
	        console.log(response.isValid);
	    }).catch(function (response) {
			//toast("Email vec zauzet.");
	        notify.warning(response.msg);
	    });
	};*/
	
	$scope.back = function() {
		//$location.path('/displayVanredneSituacije');
		$window.history.back();
	}
	
	$scope.submit = function() {
		//$rootScope je vidljivo globalno
		$scope.korisnik.idKorisnik;
		$scope.korisnik.ime;
		$scope.korisnik.prezime;
		$scope.korisnik.email;
		$scope.datumRodjenjaDatePicker;
		$scope.korisnik.korisnickoIme;
		$scope.korisnik.lozinka;
		$scope.korisnik.tipKorisnika = "Lekar";
		$scope.korisnik.datumRodjenja = Date.parse($scope.datumRodjenjaDatePicker);
		$scope.addKorisnik($scope.korisnik);
	}
	
	$scope.modify = function() {
		$scope.modifyKorisnik($rootScope.loggedInKorisnik);
	}
	
	$scope.detailViewKorisnikAdmin = function(korisnik1) {
		if(korisnik1==undefined) {
			$rootScope.detailViewKorisnik = userPersistenceService.getCookieData3();
			$location.path('/korisnikDetailsAdmin');
		}
		else {
			$rootScope.detailViewKorisnik = korisnik1;
			userPersistenceService.setCookieData3($rootScope.detailViewKorisnik);
			$location.path('/korisnikDetailsAdmin');
		}
	};
	
	$scope.modify = function() {
		$scope.modifyKorisnik($rootScope.detailViewKorisnik);
	}
	
	$scope.modifyAccount = function() {
		$
		$scope.modifyKorisnik($rootScope.loggedInKorisnik);
	}
	
});