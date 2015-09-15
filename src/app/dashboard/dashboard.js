(function () {
	'use strict';

	function config ($stateProvider) {
		$stateProvider
			.state('dashboard', {
				url: '/dash',
				templateUrl: 'app/dashboard/dashboard.html',
				controller: 'DashboardCtrl as dash'
			});
		}
	
	function DashboardCtrl (StockService) {
		var self = this;
		StockService.getStocks().then(function (stocks){
			self.stocks = stocks;
		});

	}

	angular.module('StockTracker.dashboard', [] )
		.config(config)
		.controller('DashboardCtrl', DashboardCtrl);

})();