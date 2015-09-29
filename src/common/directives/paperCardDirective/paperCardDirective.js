(function () {
	'use strict';

	function paperCardDirective () {

		/*
		function link ($scope, element, attr) {

		}
		*/

		return {
			restict: 'E',
			templateUrl: 'common/directives/paperCardDirective/paperCardDirective.html',
			scope: {
				stock: '='
			}
		}
	}

	angular.module('StockTracker')
		.directive('paperCardDirective', paperCardDirective);
})();