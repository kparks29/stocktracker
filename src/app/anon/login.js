(function () {
'use strict';

	function config($stateProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'app/anon/login.html',
				controller: 'LoginCtrl as login'
			});
		

	}

	function LoginCtrl ($log, AuthService, $state) {
		var self = this;

		this.user = {};
		this.login = function () {
			if (self.form.$valid) {
				AuthService.login(self.user).then(function(){
					//todo set auth token
					$state.go('dashboard');
				});
			}
			else {
				$log.error('Fill out form correctly');
			}
		};

	}


	angular.module('StockTracker.anon', [])
		.config(config)
		.controller('LoginCtrl', LoginCtrl);

})();