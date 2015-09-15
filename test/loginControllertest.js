describe('loginController', function() {
	var controller;
	
	beforeEach(module('battleshipApp'));
	
	beforeEach(inject(function($controller, $rootScope, _$httpBackend_ ) {
		scope = $rootScope.$new();
		controller = $controller('LoginController', {$scope: scope});
		$httpBackend = _$httpBackend_;
	}));
	
	it('canary should sing', function(){
		expect(true).to.be.eql(true);
	});

	it('login test should call sendToLobby on working server call', function(){
		
		var tester = false;
		controller.sendToLobby = function(data){
			tester = true;
		}
		
		controller.username = 'Joe';
		var data = {username: controller.username, invitedBy: '', invited: false};
		
		$httpBackend.expectPOST('/addUser', data).respond(200);
	
		controller.loginTest();
		
		$httpBackend.flush();
		
		expect(tester).to.be.eql(true);
	})
	
	it('login test should call loginFail on working server call', function(){
		
		var tester = false;
		controller.loginFail = function(data){
			tester = true;
		}
		
		controller.username = 'Joe';
		var data = {username: controller.username, invitedBy: '', invited: false};
		
		$httpBackend.expectPOST('/addUser', data).respond(404);
	
		controller.loginTest();
		
		$httpBackend.flush();
		
		expect(tester).to.be.eql(true);
	})

	
	it('loginFail function sets fail messege to loginError', function(){
		controller.loginError = '';
		
		controller.loginFail();
		
		expect(controller.loginError).to.contain('Error');
	})
	
	it('login function should check for valid login name', function(){
		
		controller.username = '';
		controller.loginError = '';
		controller.loginTest = function(){};
		
		controller.login();
		
		expect(controller.loginError).to.contain('Error');
	})
	
	it('login function should call loginTest with vaild user name', function(){
		var called = false
		controller.loginTest = function(){
			called = true;
		}
		
		controller.username = 'BattleshipPro';
		
		controller.login();
		
		expect(called).to.be.eql(true);
	})

	
});
