(function() {
	'use strict';

	function config ($urlRouterProvider) {
		
		$urlRouterProvider.otherwise('/login');
		$httpProvider.interceptors.push('stockServiceInjectors');
	}

	angular.module('StockTracker')
		.config(config);

})();