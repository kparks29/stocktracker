(function () {
'use strict';

	function AuthService ($http, ApiUrl, $localStorage) {
		function getAuthToken () {
			return $localStorage.authToken;
		}

		function login (user){
			return $http.post(ApiUrl + '/login', user).then(function (response){
				$localStorage.authToken = response.data.authToken;
				return response.data;
			});
		}
		function logout(){
			delete $localStorage.authToken;
			
		}
		return { 
			login: login,
			logout: logout,
			getAuthToken: getAuthToken
		};

   }
	angular.module('StockTracker')
		.service('AuthService', AuthService);

})();