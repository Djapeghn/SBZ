app.controller('lekController', function($scope, lekFactory, $http, $rootScope, $location, $window, userPersistenceService) {
	
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
			$rootScope.detailViewLek = userPersistenceService.getCookieData5();
			$location.path('/lekDetailsAdmin');
		}
		else {
			$rootScope.detailViewLek = lek;
			userPersistenceService.setCookieData5($rootScope.detailViewLek);
			$location.path('/lekDetailsAdmin');
		}
		
	};
	
	$scope.back = function() {
		$location.path('/displayLekoviAdmin');
		//$window.history.back();
	};
	
	$scope.saveChanges = function() {
		$scope.modifyLek($rootScope.detailViewLek);
		$location.path('/displayLekoviAdmin');
	};
	
	$scope.submit = function() {
		//$rootScope je vidljivo globalno
		$scope.lek.idLek;
		$scope.lek.naziv;
		$scope.lek.sastojci;
		$scope.lek.grupaLekova;
	};
});