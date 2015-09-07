(function () {
'use strict';

	function AuthService ($http, ApiUrl, $localStorage) {
		function login (user){
			return $http.post(ApiUrl + '/login', user).then(function (response){
				$localStorage.authToken = response.data.authToken;
				return response.data;
			});
		}
		return { 
			login: login
		};
	}	

	angular.module('StockTracker')
		.service('AuthService', AuthService);

})();