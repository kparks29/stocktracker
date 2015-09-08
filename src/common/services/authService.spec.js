(function() {
	'use strict';

	describe('Services: AuthService', function() {
		var AuthService,
			$httpBackend,
			$http,
			$q,
			ApiUrl,
			$localStorage;

		beforeEach(module('StockTracker'));
		beforeEach(module('templates'));

		beforeEach(inject(function ($injector) {
			$httpBackend = $injector.get('$httpBackend');
			$http = $injector.get('$http');
			AuthService = $injector.get('AuthService');
			$q = $injector.get('$q');
			ApiUrl = $injector.get('ApiUrl');
			$localStorage = $injector.get('$localStorage');
		}));

		it('is defined', function() {
			expect(AuthService).toBeDefined();
			expect(AuthService.login).toBeDefined();
			expect(AuthService.getAuthToken).toBeDefined();
		});

		it('.login is defined and uses http service', function() {
			var user = {
				email: 'test@test.com',
				password: '123'
			}
			spyOn($http, 'post').and.callFake(function() {
				return $q.when();
			});
			AuthService.login(user);
			expect($http.post).toHaveBeenCalled();
			expect($http.post).toHaveBeenCalledWith( ApiUrl + '/login', user);
		});

		it('.getAuthToken is defined and returns auth token', function() {
			spyOn($localStorage, 'authToken').and.callFake(function() {
				return '123';
			});
			AuthService.getAuthToken();
			expect($localStorage.authToken).toHaveBeenCalled();
			expect(AuthService.getAuthToken()).toEqual('123');
		});

	});

})();