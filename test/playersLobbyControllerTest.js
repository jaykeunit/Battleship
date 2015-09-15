//test not working, think its has to do with sessionStorage


describe('playersLobbyController', function() {
	var controller;
	
	beforeEach(module('battleshipApp'));
	
	beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _$timeout_, _$window_ ) {
		scope = $rootScope.$new();
		controller = $controller('PlayersLobbyController', {$scope: scope});
		$httpBackend = _$httpBackend_;
		timeout = _$timeout_;
		window = _$window_;
	}));
	
	it('canary should sing', function(){
		expect(true).to.be.eql(true);
	});
	
	
	it('save lists correctly saves list', function(){
		var list = 'im a list'
		
		controller.saveList(list);
		
		expect(controller.userList).to.be.eql(list);
		
	})
	
	it('getListError correctly sets error msg', function(){
		controller.lobbyError = '';
		
		controller.getListError();
		
		expect(controller.lobbyError).to.contain('Error');
	})
	
	it('returnList returns controller.userList with controller.myname removed', function(){
		controller.myName = 'Jake';
		
		controller.userList = [{username: 'Jake'}, {username: 'Nes'}];
		var list = controller.returnList();
		
		var filteredList = [{username: 'Nes'}];
		
		expect(list).to.be.eql(filteredList);
	})
	
	it('filter name correctly returns true when it gets the same name', function(){
		controller.myName = 'Jake';
		
		var test = controller.filterName({username: 'Jake'});
		
		expect(test).to.be.eql(false);
	})

});

describe('playersLobbyController', function() {
	var controller;
	
	beforeEach(module('battleshipApp'));
	
	beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _$timeout_ ) {
		scope = $rootScope.$new();
		controller = $controller('PlayersLobbyController', {$scope: scope});
		$httpBackend = _$httpBackend_;
		timeout = _$timeout_;
	}));
	

	it('invitePlayer function calls inviteSuccess on success', function(){
		var tester = false;
		controller.inviteSuccess = function(data){
			tester = true;
		}
		
		$httpBackend.expectGET('/getUsers').respond(404);
		
		controller.myName = 'Nes';
		player = {username: 'Jake'};
		
		var pair = {inviter: controller.myName, invitee: player.username}
		
		$httpBackend.expectPOST('/invitePlayer', pair).respond(200);
	
		controller.invitePlayer(player);
		
		$httpBackend.flush();
		
		expect(tester).to.be.eql(true);
	})
	
});