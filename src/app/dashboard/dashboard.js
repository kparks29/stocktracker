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
	
	function DashboardCtrl () {
		this.stocks = [1] ;

	}

	angular.module('StockTracker.dashboard', [] )
		.config(config)
		.controller('DashboardCtrl', DashboardCtrl);

})();