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

	function LoginCtrl ($log) {
		var self = this;

		this.user = {};
		this.login = function () {
			if (self.form.$valid) {
				$log.debug('Logging in...');
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