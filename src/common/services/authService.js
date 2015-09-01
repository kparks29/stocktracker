(function () {
'use strict';

	function AuthService ($http, ApiUrl) {
		function login (user){
			return $http.post(ApiUrl + '/login', user).then(function (response){
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