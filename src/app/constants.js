(function () {
'use strict';
	
	var ApiUrl = 'http://stock-service.herokuapp.com'; 

		 
    angular.module('StockTracker')
		.constant('ApiUrl', ApiUrl);

})();