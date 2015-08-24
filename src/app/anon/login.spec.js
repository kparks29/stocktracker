(function() {
	'use strict';

	describe('Controllers: LoginCtrl', function() {
		var controller,
			$log,
			AuthService,
			$q;

		beforeEach(module('StockTracker'));
		beforeEach(module('templates'));

		beforeEach(inject(function ($injector) {
			var $controller = $injector.get('$controller');
			$log = $injector.get('$log');
			AuthService = {
				login: angular.noop
			};
			$q = $injector.get('$q');

			controller = $controller('LoginCtrl', {

			});
		}));

		it('is defined', function() {
			expect(controller).toBeDefined();
			expect(controller.user).toBeDefined;
			expect(controller.login).toBeDefined;
		});

		it('.login on invalid form display error', function() {
			spyOn($log, 'error').and.callFake(angular.noop);
			expect(controller.form).not.toBeDefined();
			controller.form = {
				$valid: false
			};
			controller.login();
			expect($log.error).toHaveBeenCalled();
		});

		it('.login on valid form call AuthService', function() {
			spyOn(AuthService, 'login').and.callFake(function() {
				return $q.when();
			});
			controller.form = {
				$valid: true
			};
			controller.user = {
				email: 'test@test.com',
				password: '123'
			};
			controller.login();
			expect(AuthService.login).toHaveBeenCalled();
			expect(AuthService.login).toHaveBeenCalledWith(controller.user);
		});
	});

})();