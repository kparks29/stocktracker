(function () {
	'use strict';

	function StockService ($http, ApiUrl, $q)  {
		function getStocks () {
			//fake data call to a fake database
			return $q.when([
				{
					title: 'BABU',
					value: '73.925',
					change: '-0.487'
				},
				{
					title: '^NASDAQ',
					value: '1295.625',
					change: '-93.487'
				}
			]);
		}
		return {
			getStocks: getStocks
		};
	}
	angular.module('StockTracker')
		.service('StockService', StockService);
})();