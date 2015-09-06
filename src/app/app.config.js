(function() {
	'use strict';

	function config ($urlRouterProvider, $httpProvider) {
		
		$urlRouterProvider.otherwise('/login');
		$httpProvider.interceptors.push('httpInjector');
	}

	angular.module('StockTracker')
		.config(config);

})();