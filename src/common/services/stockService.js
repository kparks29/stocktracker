(function () {
	'use strict';

	function StockService ($http)  {
		function getStocks () {
			// TODO set up calls to fake data call to a fake database
			return $http.get('common/services/stockService.json').then(function (response) {
				return response.data;
			});
		}
		return {
			getStocks: getStocks
		};
	}
	angular.module('StockTracker')
		.service('StockService', StockService);
})();