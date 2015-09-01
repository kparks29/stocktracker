(function() {
	'use strict';

	function config ($urlRouterProvider, $httpProvider) {
		
		$urlRouterProvider.otherwise('/login');
		$httpProvider.interceptors.push('stockServiceInjectors');
	}

	angular.module('StockTracker')
		.config(config);

})();