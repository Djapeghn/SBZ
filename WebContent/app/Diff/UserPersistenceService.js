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