var playersLobbyController =  function($http, $document, $scope, $timeout, $window) {
	var controller = this;
	
	var getUserList = function(){
		$http.get('/getUsers').success(controller.saveList).error(controller.getListError);
		$timeout(controller.getUserList, 1000);
	}
	
	var saveList = function(data){
		controller.userList = data;
	}
	
	var getListError = function(){
		controller.lobbyError = "Error: Could not get user list";
	}
	
	var returnList = function(){
		return controller.userList.filter(controller.filterName);
	}
		
	var filterName = function(player){
		if(player.username === controller.myName )
		{
			sessionStorage.myInfo = JSON.stringify(player);
			if(player.invited === true)
			{	
				sessionStorage.setItem('game', JSON.stringify({opponent: player.invitedBy, player: 'player1'}));
				$window.location.href = controller.url.url + "invited.html"
			}
			return false;
		}
		else if(player.invited === true || player.invited === 'waiting'){
			return false;
		}
		else
			return true;
	}
	
	var invitePlayer = function(player){
		sessionStorage.setItem('game', JSON.stringify({opponent: player.username, player: 'player2'}));
		var pair = {inviter: controller.myName, invitee: player.username}
		$http.post('/invitePlayer', pair).success(controller.inviteSuccess).error(controller.inviteFail);
	}
	
	var inviteSuccess = function(){
		$window.location.href = controller.url.url + "invited.html"
	}
	
	var inviteFail = function(){
		controller.lobbyError = "invite fail, your invitedBy might have just joined a game";
	}
	
	controller.invitedPlayer = '';
	controller.inviteSuccess = inviteSuccess;
	controller.inviteFail = inviteFail
	controller.invitePlayer = invitePlayer;
	controller.filterName = filterName;
	controller.myName = JSON.parse(sessionStorage.getItem('myInfo')).username;
	controller.url = JSON.parse(sessionStorage.getItem('url'));
	controller.saveList = saveList
	controller.getListError = getListError;
	controller.returnList = returnList;
	controller.getUserList = getUserList;
	controller.userList = [];
	controller.loggedInUser = controller.myName;
	
	controller.getUserList();
}
angular.module('battleshipApp')
		.controller('PlayersLobbyController', playersLobbyController);
		