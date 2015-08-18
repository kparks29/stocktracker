(function() {
	'use strict';

	function config ($urlRouterProvider) {
		
		$urlRouterProvider.otherwise('/login');
	}

	angular.module('StockTracker')
		.config(config);

})();