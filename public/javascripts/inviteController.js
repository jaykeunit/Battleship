var inviteController =  function($http, $document, $scope, $timeout, $window) {
	var controller = this;
	
	var acceptClick = function(){
		var pair = {inviter: controller.me.username, invitee: controller.me.invitedBy}
		$http.post('/invitePlayer', pair).success(controller.accpetInvite).error(controller.acceptServerError);
	}
	
	var declineClick = function(){
		var pair = {inviter:  controller.me.username, invitee: controller.me.invitedBy}
		$http.post('/declineInvite', pair).success(controller.declineInvite).error(controller.acceptServerError);
	}
	
	var declineInvite = function(){
		sessionStorage.myInfo.invited =false;
		$window.location.href = 'http://localhost:3000/playersLobby.html'
	}
	
	var accpetInvite = function(){
		$window.location.href = 'http://localhost:3000/gameBattle.html';
	}
	
	var showButton = function(){
		if(controller.me.invited === true){
			return true;
		}
	
		else {
			controller.accpetError = 'Waiting for your opponent to accept';
			return false;
		}
	}
	
	var waitForAccept = function(){
		var player = {username: controller.me.username}
		if(controller.me.invited === false){
			$http.post('/checkAccepted', player).success(controller.inviteChoice).error(controller.acceptServerError);
			
			$timeout(controller.waitForAccept, 3000);
		}
	}
	
	var inviteChoice = function(data){
		if(data === 'true')
			$window.location.href = controller.url.url + 'gameBattle.html';
		else if(data === 'decline'){
			sessionStorage.myInfo.invited =false;
			$window.location.href = controller.url.url + 'playersLobby.html';
		}
			
	}
	
	var acceptServerError = function(){
		controller.accpetError = 'Error: cant connect to server';
	}
	
	controller.declineClick = declineClick;
	controller.declineInvite = declineInvite;
	controller.accpetInvite = accpetInvite;
	controller.acceptServerError = acceptServerError;
	controller.inviteChoice = inviteChoice;
	controller.waitForAccept = waitForAccept;
	controller.url = JSON.parse(sessionStorage.getItem('url'));
	controller.me = JSON.parse(sessionStorage.getItem('myInfo'));
	controller.showButton = showButton;
	controller.acceptClick = acceptClick;
	controller.waitForAccept();
	controller.loggedInUser = controller.me.username;
}
angular.module('battleshipApp')
		.controller('InviteController', inviteController);
		