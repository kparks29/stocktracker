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
				controller: 'UserStockListCtrl as stockCtrl'
			})
			.state('dashboard.symbol', {
				url: '/:symbol',
				templateUrl: 'app/dashboard/symbol.html',
				controller: 'SymbolCtrl as symbol'
			});
	}
	
	function DashboardCtrl (AuthService , $state) {
		this.logout = function(){
			if (window.confirm('Are you sure you want to log out?')) {
				AuthService.logout();
				$state.go('login');
			}
		};
	}

	function UserStockListCtrl (StockService) {
		var self = this;
		StockService.getStocks().then(function (){
			self.stocks = [
				{
					title: '^SNC',
					value: '12.225',
					change: '0.387'
				},
				{
					title: 'PRPL',
					value: '11.51',
					change: '1.487'
				}
			];
		});

		self.user = {};
		self.user.stocks = [
			{
				title: 'BABU',
				value: '74.225',
				change: '0.487',
			  details: [
					{ name: 'Part I: Stock Values',
						values: [ // §1 data
							{ property: 'Open',
								value: '9.6948',
								ideal: '±5%'	
							},
							{ property: 'Current Price',
								value: '9.48',
								ideal: '±5%'	
							},
							{ property: 'Previous Close',
								value: '10.0848',
								ideal: '±5%'	
							},
							{ property: 'Change Cash Amount',
								value: '-0.2148',
								ideal: '±5%'	
							},
							{ property: 'Change Percentage',
								value: '-5.95%',
								ideal: '±5%'	
							},
							{ property: 'Today\'s High',
								value: '9.7448',
								ideal: '±5%'	
							},
							{ property: 'Today\'s Low',
								value: '9.4290',
								ideal: '±5%'	
							},
							{ property: '52-Week High',
								value: '17.75',
								ideal: '±5%'	
							},
							{ property: '52-Week Low',
								value: '9.36',
								ideal: '±5%'	
							},
							{ property: '15-Day Moving Average',
								value: '10.07',
								ideal: '±5%'	
							},
							{ property: '50-Day Moving Average',
								value: '10.52',
								ideal: '±5%'	
							},
							{ property: '200-Day Moving Average',
								value: '10.07',
								ideal: '±5%'	
							},
							{ property: 'Forward P/E (1-year)',
								value: '1110.191',
								ideal: '±5%'	
							},
							{ property: '1-year Target',
								value: '14.3348',
								ideal: '±5%'	
							},
							{ property: 'Share Volume',
								value: '39680960483',
								ideal: '±5%'	
							},
							{ property: 'Shares Outstanding',
								value: '1310000000',
								ideal: '±5%'	
							},
							{ property: 'Market Capitalization',
								value: '12420000000',
								ideal: '±5%'	
							}
						]
					},
					{ name: 'Part II: Financial Ratios',
						values: [ // §2 sub-tables
							{ name: 'Return on Investment',
								values: [  // §2 sub-table data
									{ property: 'Price / Earnings',
										value: 19.7548,
										ideal: 0
									},
									{ property: 'P/E as % of Industry Group',
										value: 34,
										ideal: 0
									},
									{ property: 'P/E as % of Sector Segment',
										value: 0,
										ideal: 0
									},
									{ property: 'Dividend Payout Ratio',
										value: -1424.00174,
										ideal: '>25%'
									},
									{ property: 'Earnings Per Share',
										value: 0.4848,
										ideal: 1/0
									},
									{ property: 'Dividend Yield',
										value: 0.12,
										ideal: 1/0
									},
									{ property: 'Degree of Financial Leverage',
										value: 0.12,
										ideal: 1/0
									},
									{ property: 'Tangible Book Value per Share',
										value: 0.12,
										ideal: 1/0
									},
									{ property: 'Tangible Book Value per Share',
										value: 0.12,
										ideal: 1/0
									},
									{ property: 'Tangible Book Value per Share',
										value: 0.12,
										ideal: 1/0
									}
								]
							},
							{ name: 'Profitability',
								values: [  // §2 sub-table data
									{ property: 'Operating Cash Flow',
										value: 2000000000,
										ideal: 1/0
									}
								]
							}
						]
					}
				]
			},
			{
				title: '^NASDAQ',
				value: '1295.625',
				change: '-93.487'
			}
		];
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
