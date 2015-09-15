//test not working, think its has to do with sessionStorage

describe('inviteController', function() {
	var controller;
	
	beforeEach(module('battleshipApp'));
	
	beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _$timeout_, _$window_ ) {
		scope = $rootScope.$new();
		controller = $controller('InviteController', {$scope: scope});
		$httpBackend = _$httpBackend_;
		timeout = _$timeout_;
		window = _$window_;
	}));
	
	
	it('canary should sing', function(){
		expect(true).to.be.eql(true);
	});
	
	
});