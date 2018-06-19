app.controller('lekController', function($scope, lekFactory, $http, $rootScope, $location, $window, userPersistenceService) {
	
	$scope.lekovi = [{idLek:"123", naziv:"naziv1", grupaLekova:"antibiotici"}];
	
    function init() {
    	console.log('lekController.Init');
        lekFactory.getLekovi().success(function (data2) {
        	$scope.lekovi = data2;
		});
        lekFactory.getAllSastojci().success(function (data3) {
        	$scope.placeholderLek = data3;
		});
    }
    
	init();
	
	$scope.refresh = function(){
		lekFactory.getLekovi()
	          .success(function(data2){
	        	  $scope.lekovi = data2;
	          });
	}
	
	  $scope.sastojciFields = { fields: [] };

	  $scope.addSastojciField = function() {
	    $scope.sastojciFields.fields.push('');
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
		
		for(var i=0; i<$scope.sastojciFields.fields.length; i++) {
			if($scope.sastojciFields.fields[i]!=="") {
				$scope.lek.sastojci.push($scope.sastojciFields.fields[i]);
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
				$rootScope.loggedInKorisnik.idKorisnik = $scope.korisnici[i].idKorisnik;
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
	
	$scope.modifyAccount = function() {
		$scope.datumRodjenjaDatePicker;
		$rootScope.loggedInKorisnik.datumRodjenja = Date.parse($scope.datumRodjenjaDatePicker);
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
	
});

app.controller('bolestController', function($scope, bolestFactory, $http, $rootScope, $location, $window, userPersistenceService) {
	
    function init() {
    	console.log('bolestController.Init');
        bolestFactory.getBolesti().success(function (data2) {
        	$scope.bolesti = data2;
		});
        bolestFactory.getAllSimptomi().success(function (data3) {
        	$scope.placeholderBolest = data3;
		});
    }
    
	init();
	
	$scope.refresh = function(){
		bolestFactory.getBolesti()
	          .success(function(data2){
	        	  $scope.bolesti = data2;
	          });
	}
	
	  $scope.opstiSimptomiFields = { fields: [] };
	  $scope.specificniSimptomiFields = { fields: [] };

	  $scope.addOpstiSimptomiField = function() {
	    $scope.opstiSimptomiFields.fields.push('');
	  }
	  $scope.addSpecificniSimptomiField = function() {
		    $scope.specificniSimptomiFields.fields.push('');
	  }
	
	$scope.addBolest = function(bolest) {
		bolestFactory.addBolest(bolest).then(function(data) {
			$scope.refresh();
			//$location.path('/displayTeritorijeAdmin');
			toast('Bolest ' + bolest.naziv + " dodata.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Bolest sa unetim nazivom vec postoji.");
		});	
	};
	
	$scope.modifyBolest = function(bolest) {
		bolestFactory.modifyBolest(bolest).then(function(data) {
			$scope.refresh();
			//$location.path('/displayTeritorijeAdmin');
			toast('Bolest ' + bolest.naziv + " azurirana.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Greska pri azuriranju bolesti.");
		});	
	};
	
	$scope.deleteBolest = function(bolest) {
		bolestFactory.deleteBolest(bolest).then(function(data) {
			$scope.refresh();
			toast('Bolest ' + bolest.naziv + " obrisana.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Greska pri brisanju bolesti.");
		});	
	};
	
	$scope.detailViewBolestAdmin = function(bolest) {
		if(bolest==undefined) {
			$rootScope.detailViewBolest = userPersistenceService.getCookieData4();
			$location.path('/bolestDetailsAdmin');
		}
		else {
			$rootScope.detailViewBolest = bolest;
			userPersistenceService.setCookieData4($rootScope.detailViewBolest);
			$location.path('/bolestDetailsAdmin');
		}
		
	};
	
	$scope.detailViewBolestLekar = function(bolest) {
		if(bolest==undefined) {
			$rootScope.detailViewBolest = userPersistenceService.getCookieData4();
			/*$rootScope.userFriendlyDisplayOpstiSimptomi = $rootScope.detailViewBolest.opstiSimptomi;
			$rootScope.userFriendlyDisplaySpecificniSimptomi = $rootScope.detailViewBolest.specificniSimptomi;
			for(var i=0; i<$rootScope.userFriendlyDisplayOpstiSimptomi.length; i++) {
				$rootScope.userFriendlyDisplayOpstiSimptomi[i] = $rootScope.userFriendlyDisplayOpstiSimptomi[i].replace("_","/\s/g");
			}
			for(var i=0; i<$rootScope.userFriendlyDisplaySpecificniSimptomi.length; i++) {
				$rootScope.userFriendlyDisplaySpecificniSimptomi[i] = $rootScope.userFriendlyDisplaySpecificniSimptomi[i].replace("_","/\s/g");
			}*/
			$location.path('/bolestDetails');
		}
		else {
			$rootScope.detailViewBolest = bolest;
			userPersistenceService.setCookieData4($rootScope.detailViewBolest);
			/*$rootScope.userFriendlyDisplayOpstiSimptomi = $rootScope.detailViewBolest.opstiSimptomi;
			$rootScope.userFriendlyDisplaySpecificniSimptomi = $rootScope.detailViewBolest.specificniSimptomi;
			for(var i=0; i<$rootScope.userFriendlyDisplayOpstiSimptomi.length; i++) {
				$rootScope.userFriendlyDisplayOpstiSimptomi[i] = $rootScope.userFriendlyDisplayOpstiSimptomi[i].replace("_","/\s/g");
			}
			for(var i=0; i<$rootScope.userFriendlyDisplaySpecificniSimptomi.length; i++) {
				$rootScope.userFriendlyDisplaySpecificniSimptomi[i] = $rootScope.userFriendlyDisplaySpecificniSimptomi[i].replace("_","/\s/g");
			}*/
			$location.path('/bolestDetails');
		}
		
	};
	
	$scope.back = function() {
		$location.path('/displayBolestiAdmin');
		//$window.history.back();
	};
	
	$scope.saveChanges = function() {
		$scope.modifyBolest($rootScope.detailViewBolest);
		$location.path('/displayBolestiAdmin');
		$scope.refresh();
	};
	
	$scope.submit = function() {
		//$rootScope je vidljivo globalno
		$scope.bolest.idBolest;
		$scope.bolest.naziv;
		$scope.bolest.grupa;
		$scope.bolest.opstiSimptomi = [];
		$scope.bolest.specificniSimptomi = [];
		
		for(var i=0; i<$scope.opstiSimptomiFields.fields.length; i++) {
			if($scope.opstiSimptomiFields.fields[i]!=="") {
				$scope.bolest.opstiSimptomi.push($scope.opstiSimptomiFields.fields[i]);
			}
		}
		for(var i=0; i<$scope.specificniSimptomiFields.fields.length; i++) {
			if($scope.specificniSimptomiFields.fields[i]!=="") {
				$scope.bolest.specificniSimptomi.push($scope.specificniSimptomiFields.fields[i]);
			}
		}
		
		
		$scope.addBolest($scope.bolest);
		$location.path('/displayBolestiAdmin');
		$scope.refresh();
	};
});