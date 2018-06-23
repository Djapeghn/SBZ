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
    		/*if(userPersistenceService.getCookieData2()!=undefined) {
        		$rootScope.detailViewLek = userPersistenceService.getCookieData2();
    		}*/
    	}
    	else if(userPersistenceService.getCookieData().korisnickoIme==="admin") {
    		$rootScope.loggedIn = "loggedInAsAdmin";
    		$rootScope.loggedInKorisnik = userPersistenceService.getCookieData();
    		$rootScope.detailViewLek = userPersistenceService.getCookieData2();
    		$rootScope.detailViewKorisnik = userPersistenceService.getCookieData3();
    		$rootScope.detailViewBolest = userPersistenceService.getCookieData4();
    		$rootScope.detailViewPacijent = userPersistenceService.getCookieData5();
    		$rootScope.detailViewPregled = userPersistenceService.getCookieData6();
    	}
    	else {
    		$rootScope.loggedIn = "loggedInAsLekar";
    		$rootScope.loggedInKorisnik = userPersistenceService.getCookieData();
    		$rootScope.detailViewLek = userPersistenceService.getCookieData2();
    		$rootScope.detailViewKorisnik = userPersistenceService.getCookieData3();
    		$rootScope.detailViewBolest = userPersistenceService.getCookieData4();
    		$rootScope.detailViewPacijent = userPersistenceService.getCookieData5();
    		$rootScope.detailViewPregled = userPersistenceService.getCookieData6();
    	}
    }
	init();
	
	
	$scope.findLoggedIn = function(username) {
		for(var i=0; i < $scope.korisnici.length; i++) {
			if($scope.korisnici[i].korisnickoIme===$scope.korisnik.korisnickoIme) {
				/*$rootScope.loggedInKorisnik.idKorisnik = $scope.korisnici[i].idKorisnik;
				$rootScope.loggedInKorisnik.ime = $scope.korisnici[i].ime;
				$rootScope.loggedInKorisnik.prezime = $scope.korisnici[i].prezime;
				$rootScope.loggedInKorisnik.email = $scope.korisnici[i].email;
				$rootScope.loggedInKorisnik.datumRodjenja = $scope.korisnici[i].datumRodjenja;
				$rootScope.loggedInKorisnik.korisnickoIme = $scope.korisnici[i].korisnickoIme;
				$rootScope.loggedInKorisnik.lozinka = $scope.korisnici[i].lozinka;
				$rootScope.loggedInKorisnik.tipKorisnika = $scope.korisnici[i].tipKorisnika;*/
				$rootScope.loggedInKorisnik = $scope.korisnici[i];
				
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
	
	$scope.refresh = function(){
		korisnikFactory.getKorisnici()
	          .success(function(data2){
	        	  $scope.korisnici = data2;
	          });
	}
	
	$scope.deleteKorisnik = function(korisnik) {
		korisnikFactory.deleteKorisnik(korisnik).then(function(data) {
			$scope.refresh();
			toast('Korisnik ' + korisnik.korisnickoIme + " obrisan.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Greska pri brisanju korisnika.");
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

app.controller('pacijentController', function($scope, pacijentFactory, pregledFactory, bolestFactory, lekFactory, $http, $rootScope, $window, $location, userPersistenceService) {
	
    function init() {
    	console.log('pacijentController.Init');
        pacijentFactory.getPacijenti().success(function (data) {
        	$scope.pacijenti = data;
		});
        pregledFactory.getPregledi().success(function (data2) {
        	$scope.pregledi = data2;
		});
        bolestFactory.getBolesti().success(function (data3) {
        	$scope.bolesti = data3;
		});
        bolestFactory.getAllSimptomi().success(function (data4) {
        	$scope.placeholderBolest = data4;
		});
        lekFactory.getLekovi().success(function (data5) {
        	$scope.lekovi = data5;
		});
    }
	init();
	
	$scope.addPacijent = function(pacijent) {
		pacijentFactory.addPacijent(pacijent).then(function(data) {
			$scope.refresh();
			toast('Pacijent ' + pacijent.idPacijent + " dodat.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Id je vec zauzet.");
		});	
	};
	
	$scope.dijagnostika = function(pregled) {
		pregledFactory.dijagnostika(pregled).then(function(data) {
			$scope.refresh();
			toast('Dijagnostikovana bolest je: ' + data + ".");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Bolest neuspesno dijagnostikovana.");
		});	
	};
	
	$scope.modifyPacijent = function(pacijent) {
		pacijentFactory.modifyPacijent(pacijent).then(function(data) {
			$scope.refresh();
			toast("Pacijent azuriran.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Greska prilikom azuriranja.");
		});	
	};
	
	$scope.refresh = function(){
		pacijentFactory.getPacijenti().success(function(data1){
	        	  $scope.pacijenti = data1;
	    });
        pregledFactory.getPregledi().success(function (data2) {
        	$scope.pregledi = data2;
		});
        bolestFactory.getBolesti().success(function (data3) {
        	$scope.bolesti = data3;
		});
        bolestFactory.getAllSimptomi().success(function (data4) {
        	$scope.placeholderBolest = data4;
		});
        lekFactory.getLekovi().success(function (data5) {
        	$scope.lekovi = data5;
		});
	}
	
	$scope.simptomiPregledaFields = { fields: [] };

	$scope.addSimptomiPregledaField = function() {
		$scope.simptomiPregledaFields.fields.push('');
	}
	
	$scope.alergicanNaLekoveFields = { fields: [] };

	$scope.addAlergicanNaLekoveField = function() {
		$scope.alergicanNaLekoveFields.fields.push('');
	}
	
	$scope.deletePacijent = function(pacijent) {
		
		for(var i=0; i<pacijent.pregledi.length; i++) {
			for(var j=0; j<$scope.pregledi.length; j++) {
				if(pacijent.pregledi[i].idPregleda===$scope.pregledi[j].idPregleda) {
					$scope.deletePregled($scope.pregledi[j]);
				}
			}
		} 
		
		pacijentFactory.deletePacijent(pacijent).then(function(data) {
			$scope.refresh();
			toast('Pacijent ' + pacijent.idPacijent + " obrisan.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Greska pri brisanju pacijenta.");
		});	
	};
	
	$scope.deletePregled = function(pregled) {
		
		for(var i=0; i<$scope.pacijenti.length; i++) {
			for(var j=0; j<$scope.pacijenti[i].pregledi.length; j++) {
				if($scope.pacijenti[i].pregledi[j].idPregleda===pregled.idPregleda) {
					$scope.pacijenti[i].pregledi.splice(j,1);
					$rootScope.detailViewPacijent = $scope.pacijenti[i];
					userPersistenceService.setCookieData5($rootScope.detailViewPacijent);
					$scope.modifyPacijent($scope.pacijenti[i]);
					break;
				}
			}
		}
		
		pregledFactory.deletePregled(pregled).then(function(data) {
			$scope.refresh();
			toast('Pregled ' + pregled.idPregleda + " obrisan.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Greska pri brisanju pregleda.");
		});	
	};
	
	$scope.back = function() {
		//$location.path('/displayVanredneSituacije');
		$window.history.back();
	}
	
	$scope.submit = function() {
		//$rootScope je vidljivo globalno
		$scope.pacijent.idPacijent;
		$scope.pacijent.ime;
		$scope.pacijent.prezime;
		$scope.datumRodjenjaDatePicker;
		$scope.pacijent.pol;
		$scope.pacijent.datumRodjenja = Date.parse($scope.datumRodjenjaDatePicker);
		$scope.pacijent.pregledi = [];
		$scope.pacijent.bolesti = [];
		$scope.pacijent.alergicanNaLekove = [];
		$scope.addPacijent($scope.pacijent);
	}
	
	$scope.detailViewPacijentLekar = function(pacijent1) {
		if(pacijent1==undefined) {
			$rootScope.detailViewPacijent = userPersistenceService.getCookieData5();
			$location.path('/pacijentDetails');
		}
		else {
			$rootScope.detailViewPacijent = pacijent1;
			userPersistenceService.setCookieData5($rootScope.detailViewPacijent);
			$location.path('/pacijentDetails');
		}
	};
	
	$scope.detailViewPacijentAdmin = function(pacijent1) {
		if(pacijent1==undefined) {
			$rootScope.detailViewPacijent = userPersistenceService.getCookieData5();
			$location.path('/pacijentDetailsAdmin');
		}
		else {
			$rootScope.detailViewPacijent = pacijent1;
			userPersistenceService.setCookieData5($rootScope.detailViewPacijent);
			$location.path('/pacijentDetailsAdmin');
		}
	};
	
	$scope.detailViewPregledLekar = function(pregled1) {
		if(pregled1==undefined) {
			$rootScope.detailViewPregled = userPersistenceService.getCookieData6();
			$location.path('/pregledDetails');
		}
		else {
			$rootScope.detailViewPregled = pregled1;
			userPersistenceService.setCookieData6($rootScope.detailViewPregled);
			$location.path('/pregledDetails');
		}
	};
	
	$scope.detailViewPregledAdmin = function(pregled1) {
		if(pregled1==undefined) {
			$rootScope.detailViewPregled = userPersistenceService.getCookieData6();
			$location.path('/pregledDetailsAdmin');
		}
		else {
			$rootScope.detailViewPregled = pregled1;
			userPersistenceService.setCookieData6($rootScope.detailViewPregled);
			$location.path('/pregledDetailsAdmin');
		}
	};
	
	$scope.modify = function() {
		$scope.datumRodjenjaDatePicker;
		$rootScope.detailViewPacijent.datumRodjenja = Date.parse($scope.datumRodjenjaDatePicker);
		$scope.modifyPacijent($rootScope.detailViewPacijent);
	}
	
	$scope.addPregledPage = function() {
		if($rootScope.detailViewPacijent==undefined) {
			$location.path('/');
		}
		else {
			$location.path('/addPregled');
		}
	}
	
	$scope.addPregled = function(pregled) {
		pregledFactory.addPregled(pregled).then(function(data) {
			$scope.refresh();
			toast('Pregled ' + pregled.idPregleda + " dodat.");
		}).catch(function (response) {
			//$notify.error(response.msg);
			toast("Id je vec zauzet.");
		});	
	};
	
	$scope.addPregledSubmit = function() {
		$scope.pregled.idPregleda;
		$scope.pregled.lekar = $rootScope.loggedInKorisnik;
		//$scope.pregled.datumPregleda = new Date();
		$scope.pregled.datumPregleda = new Date();
		$scope.pregled.simptomi = [];
		$scope.dijagnostikovanaBolest1;
		$scope.propisanLek1;
		$scope.pregled.dijagnostikovanaBolest = {};
		$scope.pregled.propisanLek = {};
		$scope.alergicanNaLekove1 = {};
		
		var unetAlergican = false;
		
		if ($scope.propisanLek1!==undefined) {
			for(var n=0; n<$rootScope.detailViewPacijent.alergicanNaLekove.length; n++) {
				if ($rootScope.detailViewPacijent.alergicanNaLekove[n].idLek===(angular.fromJson($scope.propisanLek1)).idLek) {
					unetAlergican = true;
				}
			}
		}
		
		if (unetAlergican) {
			toast("Pacijent je alergican na izabrani lek.");
		} else {
			
			for(var i=0; i<$scope.simptomiPregledaFields.fields.length; i++) {
				if($scope.simptomiPregledaFields.fields[i]!=="") {
					$scope.pregled.simptomi.push($scope.simptomiPregledaFields.fields[i]);
				}
			}
			
			for(var i=0; i<$scope.alergicanNaLekoveFields.fields.length; i++) {
				if($scope.alergicanNaLekoveFields.fields[i]!=="") {
					$scope.alergicanNaLekove1 = angular.fromJson($scope.alergicanNaLekoveFields.fields[i]);
					$rootScope.detailViewPacijent.alergicanNaLekove.push($scope.alergicanNaLekove1);
				}
			}
			
			if ($scope.dijagnostikovanaBolest1!==undefined) {
				//pretvara json string u objekat
				$scope.pregled.dijagnostikovanaBolest = angular.fromJson($scope.dijagnostikovanaBolest1);
				$rootScope.detailViewPacijent.bolesti.push($scope.pregled.dijagnostikovanaBolest);
			}
			if ($scope.propisanLek1!==undefined) {
				//pretvara json string u objekat
				$scope.pregled.propisanLek = angular.fromJson($scope.propisanLek1);
			}
			
			$rootScope.detailViewPacijent.pregledi.push($scope.pregled);
			$scope.modifyPacijent($rootScope.detailViewPacijent);
			userPersistenceService.setCookieData5($rootScope.detailViewPacijent);
			
			console.log($scope.pregled);
			
			$scope.addPregled($scope.pregled);
			$scope.back();
			
		}
	}
	
	$scope.dijagnostikaSubmit = function() {
		$scope.pregled = {};
		$scope.pregled.idPregleda = "";
		$scope.pregled.lekar = $rootScope.loggedInKorisnik;
		$scope.pregled.datumPregleda = new Date();
		$scope.pregled.simptomi = [];
		//$scope.dijagnostikovanaBolest1;
		//$scope.propisanLek1;
		$scope.pregled.dijagnostikovanaBolest = {};
		$scope.pregled.propisanLek = {};
		//$scope.alergicanNaLekove1 = {};
		
		for(var i=0; i<$scope.simptomiPregledaFields.fields.length; i++) {
			if($scope.simptomiPregledaFields.fields[i]!=="") {
				$scope.pregled.simptomi.push($scope.simptomiPregledaFields.fields[i]);
			}
		}
		
		/*for(var i=0; i<$scope.alergicanNaLekoveFields.fields.length; i++) {
			if($scope.alergicanNaLekoveFields.fields[i]!=="") {
				$scope.alergicanNaLekove1 = angular.fromJson($scope.alergicanNaLekoveFields.fields[i]);
				$rootScope.detailViewPacijent.alergicanNaLekove.push($scope.alergicanNaLekove1);
			}
		}
		
		if ($scope.dijagnostikovanaBolest1!==undefined) {
			//pretvara json string u objekat
			$scope.pregled.dijagnostikovanaBolest = angular.fromJson($scope.dijagnostikovanaBolest1);
			$rootScope.detailViewPacijent.bolesti.push($scope.pregled.dijagnostikovanaBolest);
		}
		if ($scope.propisanLek1!==undefined) {
			//pretvara json string u objekat
			$scope.pregled.propisanLek = angular.fromJson($scope.propisanLek1);
			$rootScope.detailViewPacijent.pregledi.push($scope.pregled);
			$scope.modifyPacijent($rootScope.detailViewPacijent);
			userPersistenceService.setCookieData5($rootScope.detailViewPacijent);
		}*/
		
		console.log($scope.pregled);
		
		$scope.dijagnostika($scope.pregled);
		//$scope.back();
	}
	
	$scope.modifyPregledSubmit = function() {
		$scope.pregled.lekar = $rootScope.loggedInKorisnik;
		//$scope.pregled.datumPregleda = new Date();
		$scope.datumRodjenjaDatePicker;
		$scope.pregled.datumPregleda = new Date();
		$scope.pregled.simptomi = [];
		$scope.dijagnostikovanaBolest1;
		$scope.propisanLek1;
		$scope.pregled.dijagnostikovanaBolest = {};
		$scope.pregled.propisanLek = {};
		$scope.alergicanNaLekove1 = {};
		
		for(var i=0; i<$scope.simptomiPregledaFields.fields.length; i++) {
			if($scope.simptomiPregledaFields.fields[i]!=="") {
				$scope.pregled.simptomi.push($scope.simptomiPregledaFields.fields[i]);
			}
		}
		
		for(var i=0; i<$scope.alergicanNaLekoveFields.fields.length; i++) {
			if($scope.alergicanNaLekoveFields.fields[i]!=="") {
				$scope.alergicanNaLekove1 = angular.fromJson($scope.alergicanNaLekoveFields.fields[i]);
				$rootScope.detailViewPacijent.alergicanNaLekove.push($scope.alergicanNaLekove1);
			}
		}
		
		if ($scope.dijagnostikovanaBolest1!==undefined) {
			//pretvara json string u objekat
			$scope.pregled.dijagnostikovanaBolest = angular.fromJson($scope.dijagnostikovanaBolest1);
			$rootScope.detailViewPacijent.bolesti.push($scope.pregled.dijagnostikovanaBolest);
		}
		if ($scope.propisanLek1!==undefined) {
			//pretvara json string u objekat
			$scope.pregled.propisanLek = angular.fromJson($scope.propisanLek1);
			$rootScope.detailViewPacijent.pregledi.push($scope.pregled);
			$scope.modifyPacijent($rootScope.detailViewPacijent);
			userPersistenceService.setCookieData5($rootScope.detailViewPacijent);
		}
		
		console.log($scope.pregled);
		
		$scope.addPregled($scope.pregled);
		$scope.back();
	}
	
});