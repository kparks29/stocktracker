(function() {
	'use strict';

	describe('Services: AuthService', function() {
		var AuthService,
			$httpBackend,
			$http,
			$q;

		beforeEach(module('StockTracker'));
		beforeEach(module('templates'));

		beforeEach(inject(function ($injector) {
			$httpBackend = $injector.get('$httpBackend');
			$http = $injector.get('$http');
			AuthService = $injector.get('AuthService');
			$q = $injector.get('$q');
		}));

		it('is defined', function() {
			expect(AuthService).toBeDefined();
			expect(AuthService.login).toBeDefined();
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
			expect($http.post).toHaveBeenCalledWith('http://localhost:8081/login', user);
		});

	});

})();