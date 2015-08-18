(function () {
	'use strict';

	function configure ($urlRouterProvider) {

		$urlRouterProvider.otherwise('/login');
	}

	configure.$inject = [
		'$urlRouterProvider'
	];

	angular.module('StockTracker')
		.config(configure);

})();