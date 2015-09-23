(function () {
	'use strict';

	function config ($stateProvider) {
		$stateProvider
			.state('dashboard', {
				url: '/dash',
				templateUrl: 'app/dashboard/dashboard.html',
				controller: 'DashboardCtrl as dash'
			})
			.state('dashboard.userStockList', {
				url: '/list',
				templateUrl: 'app/dashboard/userStockList.html',
				controller: 'UserStockListCtrl as stocks'
			})
			.state('dashboard.symbol', {
				url: '/:symbol',
				templateUrl: 'app/dashboard/symbol.html',
				controller: 'SymbolCtrl as symbol'
			});
	}
	
	function DashboardCtrl () {

	}

	function UserStockListCtrl (StockService) {
		var self = this;
		StockService.getStocks().then(function (stocks){
			self.stocks = stocks;
		});
	}

	function SymbolCtrl ($stateParams) {
		var self = this;
		self.symbol = $stateParams.symbol;
	}

	angular.module('StockTracker.dashboard', [] )
		.config(config)
		.controller('DashboardCtrl', DashboardCtrl)
		.controller('UserStockListCtrl', UserStockListCtrl)
		.controller('SymbolCtrl', SymbolCtrl);

})();
