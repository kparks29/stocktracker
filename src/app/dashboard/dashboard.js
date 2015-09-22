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
	
	function DashboardCtrl (StockService, AuthService , $state) {
		var self = this;
		StockService.getStocks().then(function (stocks){
			self.stocks = stocks;
		});

		this.logout = function(){
			AuthService.logout();
			$state.go('login');

		};
	
	}

	angular.module('StockTracker.dashboard', [] )
		.config(config)
		.controller('DashboardCtrl', DashboardCtrl);

})();