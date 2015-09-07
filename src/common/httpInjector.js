(function () {
'use strict';

function httpInjector ($injector, $q) {

	// recursively convert object keys with passed in function (e.g. to convert from snake_case to camelCase and back)
	function transformKeysDeep (data, keyTransformFunc) {

		function transformKeys (obj, v, k) {
			// Assigns the obj with the camelCase'd 'key' to
			// IF the value is an object
			// THEN calls the transformKeysDeep func on the value
			// ELSE does nothing
			obj[keyTransformFunc(k)] = _.isObject(v) ? transformKeysDeep(v, keyTransformFunc) : v;
		}

		function transform (data) {
			// IF the passed in data is NOT a string AND NOT a number
			// THEN modifies the data by passign it into the transformKeys func
			// ELSE returns the data
			return !_.isString(data) && !_.isNumber(data) ? _.transform(data, transformKeys) : data;
		}

		// IF the passed in data is an array
		// THEN it calls the transform func on each idx of data
		// ELSE calls the transform function on the data
		return _.isArray(data) ? _.map(data, transform) : transform(data);
	}

	function parseKey (func, key) {
		// ignore $$ properties, which are defined by Angular or used internally and are removed by angular.toJson
		// IF the key is a string and has $$ as the first two chars
		if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
			return key; // just returns the key
		} else { // ELSE converts the key with the snakeCase func that was passed in
			return func(key);
		}
	}

	return {
		// If getting a response back from the database
		'response': function (response) {
			// IF there is response.data exists
			// THEN copies the modified data (called in the transformKeysDeep function) into the resp
			// ELSE returns the response
			return response.data ? _.extend(response, { data: transformKeysDeep(response.data, _.camelCase) }) : response;
		},
		'responseError': function (response) {
			if (response.status === 401) {
				$injector.get('AuthService').logoutLocal();
				$injector.get('$state').go('anon.login');
			}
			return $q.reject(response);
		},
		// If making a request to the database
		'request': function (config) {
			// if (config.headers) {
			// 	config.headers['Access-Token'] = $injector.get('AuthService').getAccessToken();
			// }
			// If config.data exists
			if (config.data) {
				// IF config.data exists
				// THEN calls the transformKeysDeep function on the config data (that has been modified by the parseKey function)
				// ELSE assigns config.data to config.data
				config.data = config.data ? transformKeysDeep(config.data, _.wrap(_.snakeCase, parseKey)) : config.data;
			}
			return config;
	  }
	};
}

angular.module('StockTracker')
	.factory('httpInjector', httpInjector);

})();