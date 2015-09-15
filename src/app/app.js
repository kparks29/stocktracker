(function () {
	'use strict';

	var dependencies = [
		'ui.router',
		'StockTracker.anon',
		'ngStorage',
		'StockTracker.dashboard'
	];

	angular.module('StockTracker', dependencies);

})();