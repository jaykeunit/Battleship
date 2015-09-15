var loginController = function($http, $document, $scope, $location, $window) {
	var controller = this;
	
	var login = function(){
		if(controller.username.length < 3){
			controller.loginError = "Error: please use at least 3 characters";
		}
		else{
			sessionStorage.clear();
			controller.loginTest();
		}
	}
	
	var loginFail = function(){
		controller.loginError = "Error: can't connect to sever";
	}
	
	var loginTest = function(){
		
		var name = {
			username: controller.username,
			invitedBy: '',
			invited: false
		};
		
		sessionStorage.setItem('myInfo', JSON.stringify(name));
		
		$http.post('/addUser', name).success(controller.sendToLobby).error(controller.loginFail);
	}
	
	var sendToLobby = function(){
		var url = {url: $window.location.href}
		sessionStorage.setItem('url', JSON.stringify(url));
		$window.location.href = url.url + 'playersLobby.html';
	}

	
	controller.username = '';
	controller.loginTest = loginTest;
	controller.sendToLobby = sendToLobby;
	controller.loginFail = loginFail;
	controller.login = login;

}
angular.module('battleshipApp', [])
       .controller('LoginController', loginController);
	   