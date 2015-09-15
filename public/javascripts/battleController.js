var battleController =  function($http, $document, $scope, $timeout, $window) {
	var controller = this;
	
	var setGameName = function(){
		if(controller.game.player === 'player1'){
			controller.gameName = controller.game.opponent + controller.myInfo.username;
			controller.currentMove = true;
			controller.makeGame(controller.gameName);;
		}
		else{
			controller.gameName = controller.myInfo.username + controller.game.opponent;
			controller.currentMove = false;
			controller.pickShipLocations();
		}
			
	}
	
	var makeGame = function(name){
		var game = {gameName: name};
		$http.post('/makeGame', game).success(controller.pickShipLocations).error(controller.battleServerError);
	}
	
	var pickShipLocations = function(){
		controller.battleError = "place your 10 ships";
	}
	

	var shipsReady = function(){
		if(controller.shipsLocation.length === 10){
			controller.sendGameReady();
		}
		else{
			controller.battleError = "you need to pick at least 10 ship locations";
		}
	}
	
	var sendGameReady = function(){
		if(controller.isGamePlaying){
			controller.gameMessage = 'game is already playing';
		}
		else{
			var ready = {
				gameName: controller.gameName,
				player: controller.game.player,
				gameboard: controller.shipsLocation
			};
	
			$http.post('/gameReady', ready).success(function(){controller.getGameupdate(controller.gameStart)}).error(controller.battleServerError);
		}
	}
	
	var gameStart = function(data){
		if(data.player1Ready && data.player2Ready){
			controller.battleError = "Game start";
			controller.isGamePlaying = true;
			controller.waitForMove();
		}
		else{
			controller.battleError = "Game has not started yet";
			$timeout(function(){controller.getGameupdate(controller.gameStart)}, 3000);
		}
	}
	
	var waitForMove = function(){
		if(controller.enemyHits.length === 10){
			controller.battleError = '';
			controller.gameMessage = 'YOU LOSE!';
			$timeout(controller.exitGameLose, 5000);
		}
		else if(controller.currentMove){
			controller.battleError = "your move";
			controller.gameMessage = '';
		}
		else{
			controller.getGameupdate(controller.handleGameUpdate);
		}
	}
	
	var getGameupdate = function(callbackFunction){
		$http.get('/getGameupdate', {params: {gameName: controller.gameName}}).success(callbackFunction).error(controller.battleServerError);
	}
		
	var handleGameUpdate = function(data){	   
		if(controller.game.player === 'player1'){
			if(data.player2status === 'lost'){
				controller.battleError = "YOU WIN!";
				controller.gameMessage = '';
				$timeout(controller.exitGameWon, 5000);
			}
			else if(data.player2status === 'left'){
				controller.battleError = 'your opponent left the game...YOU WIN!';
				controller.gameMessage = '';
				$timeout(controller.exitGameWon, 5000);
			}
			else if(data.player1status === 'lost' ){
				controller.battleError = '';
				controller.gameMessage = 'YOU LOSE!';
				$timeout(controller.exitGameLose, 5000);
			}
			else if(data.player2MakingMove){
				controller.battleError = "player 2 is thinking...";
				if(data.player1LastMoveWasHit === true){
					controller.gameMessage = 'you hit your opponents ship!'
					controller.hitLocations.push(data.player1Move);
				}
				else if(data.player1LastMoveWasHit === false){
					controller.gameMessage = 'you missed your opponents ship!'
					controller.missLocations.push(data.player1Move);
				}
				$timeout(controller.waitForMove, 1000);
			}
			else{
				controller.currentMove = !controller.currentMove;
				controller.inGameCheckCell(data.player2Move);
				$timeout(controller.waitForMove, 1000);
			}
		}
		else if(controller.game.player === 'player2'){
			if(data.player1status === 'lost'){
				controller.battleError = "";
				controller.gameMessage = 'YOU WIN!';
				$timeout(controller.exitGameWon, 5000);
			}
			else if(data.player1status === 'left'){
				controller.battleError = '';
				controller.gameMessage = 'your opponent left the game...YOU WIN!';
				$timeout(controller.exitGameWon, 5000);
			}
			else if(data.player2status === 'lost'){
				controller.battleError = '';
				controller.gameMessage = 'YOU LOSE!';
				$timeout(controller.exitGameLose, 5000);
			}
			else if(data.player1MakingMove){
				controller.battleError = "player 1 is thinking...";
				if(data.player2LastMoveWasHit === true){
					controller.gameMessage = 'you hit your opponents ship!'
					controller.hitLocations.push(data.player2Move);
				}
				else if(data.player2LastMoveWasHit === false){
					controller.gameMessage = 'you missed your opponents ship!'
					controller.missLocations.push(data.player2Move);
				}
				$timeout(controller.waitForMove, 1000);
			}
			else{
				controller.currentMove = !controller.currentMove;
				controller.inGameCheckCell(data.player1Move);
				$timeout(controller.waitForMove, 1000);
			}
		}
       
	}
	
	var makeMove = function(cell){
		if(controller.isGamePlaying){
			if(controller.currentMove){
				controller.currentMove = !controller.currentMove;
				var game = {gameName: controller.gameName, move: cell};
				$http.post('/makeMove', game).success(function(){controller.getGameupdate(controller.handleGameUpdate)}).error(controller.battleServerError);
			}
			else{
				controller.battleError = "its not your move yet, wait for your opponent to make theirs";
			}
		}
		else{
			controller.placeShipsCheckcell(cell);
		}
	}
	
	var inGameCheckCell = function(cell){
		if(controller.shipsLocation.indexOf(cell) > -1){
			controller.gameMessage = '';
			if(controller.enemyHits.indexOf(cell) < 0){
				controller.battleError = 'your ship at '+ cell +' was hit!';
				controller.enemyHits.push(cell);
				controller.myShipLabel = "my ships " + controller.shipsLocation;
				if(controller.enemyHits.length === 10){
					controller.sendLostOrLeave('lost');
				}
			}
			else{
				controller.battleError = 'your opponent shot at the same ship again!'
			}
			
		}
		else{
			controller.enemyMiss.push(cell);
			controller.gameMessage = '';
			controller.battleError = 'your opponent at '+ cell +' and missed!';
		}
	}
	
	var placeShipsCheckcell = function(cell){
		if(controller.shipsLocation.length < 10 && controller.shipsLocation.indexOf(cell) < 0){
			controller.shipsLocation.push(cell);
			if(controller.shipsLocation.length === 10){
				controller.battleError = 'your ships are in place select ready and waiting for your opponent';
				controller.myShipLabel = "my ships " + controller.shipsLocation;
			}
			else{
				var shipsRemaining = 10 - controller.shipsLocation.length;
				controller.battleError = 'ship placed at cell ' + cell + ", you have " + shipsRemaining + ' ships remaining.';
				controller.myShipLabel = "my ships " + controller.shipsLocation;
			}
		}
		else if(controller.shipsLocation.length < 10 && controller.shipsLocation.indexOf(cell) > -1){
			controller.battleError = 'You already have a ship at that cell';
		}
		else{
			controller.battleError = 'you do not have more ships available, please hit ready and wait for your opponent';
		}
	}
	
	var battleServerError = function(){
		controller.battleError = "Error: unable to connect to server";
		controller.gameMessage = '';
	}
	
	var generateMap = function() {
		var ctr=0;
		$scope.rows = [];
		var theRows = [];
		for (var i = 0; i < 10; i++) {
			var row = [];
			for (var j = 0; j < 10; j++) {
				ctr++;
				row.push(decideOnImage(ctr));
			}
			theRows.push(row);
		}
		$scope.rows = theRows;
	}
	
	var decideOnImage = function(cell){
		if(controller.shipsLocation.indexOf(cell) > -1 && controller.hitLocations.indexOf(cell) > -1 && controller.enemyHits.indexOf(cell) > -1){
			return {val: cell, background: {'background-image':'url(images/waterTwoShipsSunk.jpg)'}};
		}
		else if(controller.shipsLocation.indexOf(cell) > -1 && controller.missLocations.indexOf(cell) > -1 && controller.enemyHits.indexOf(cell) > -1){
			return {val: cell, background: {'background-image':'url(images/waterOneShipHitMiss.jpg)'}};
		}
		else if(controller.shipsLocation.indexOf(cell) > -1 && controller.hitLocations.indexOf(cell) > -1){
			return {val: cell, background: {'background-image':'url(images/waterTwoShipsOneSunk.jpg)'}};
		}
		else if(controller.shipsLocation.indexOf(cell) > -1 && controller.missLocations.indexOf(cell) > -1){
			return {val: cell, background: {'background-image':'url(images/waterOneShipMIss.jpg)'}};
		}
		else if(controller.shipsLocation.indexOf(cell) > -1 && controller.enemyHits.indexOf(cell) > -1){
			return {val: cell, background: {'background-image':'url(images/waterOneShipSunk.jpg)'}};
		}
		else if(controller.shipsLocation.indexOf(cell) < 0 && controller.hitLocations.indexOf(cell) > -1){
			return {val: cell, background: {'background-image':'url(images/waterOneEnemyShip.jpg)'}};
		}
		else if(controller.shipsLocation.indexOf(cell) > -1){
			return {val: cell, background: {'background-image':'url(images/waterOneShip.jpg)'}};
		}
		else if(controller.missLocations.indexOf(cell) > -1 && controller.enemyMiss.indexOf(cell) > -1){
			return {val: cell, background: {'background-image':'url(images/waterDoubleMiss.jpg)'}};
		}
		else if(controller.enemyMiss.indexOf(cell) > -1){
			return {val: cell, background: {'background-image':'url(images/waterOppMiss.jpg)'}};
		}
		else if(controller.missLocations.indexOf(cell) > -1 ){
			return {val: cell, background: {'background-image':'url(images/waterMiss.jpg)'}};
		}
		else{
			return {val: cell, background: {'background-image':'url(images/water.jpg)'}};
		}
	}
	
	var sendLostOrLeave = function(newstatus){
		var player = {player: controller.game.player, status: newstatus, gameName: controller.gameName };
		$http.post('/lostOrLeave', player).error(controller.battleServerError);
	}
	
	var exitGameLose = function(){
		sessionStorage.clear();
		$window.location.href = controller.url.url + 'indexLose.html';
	}
	
	var exitGameWon = function(){
		sessionStorage.clear();
		$window.location.href = controller.url.url + 'indexWon.html';
	}
	
	controller.sendLostOrLeave = sendLostOrLeave;
	controller.exitGameLose = exitGameLose;
	controller.exitGameWon = exitGameWon;
	controller.enemyHits = [];
	controller.enemyMiss = [];
	controller.missLocations = [];
	controller.hitLocations = [];
	controller.placeShipsCheckcell = placeShipsCheckcell;
	controller.inGameCheckCell = inGameCheckCell;
	controller.isGamePlaying = false;
	controller.waitForMove = waitForMove;
	controller.gameStart = gameStart;
	controller.handleGameUpdate = handleGameUpdate;
	controller.url = JSON.parse(sessionStorage.getItem('url'));
	controller.getGameupdate = getGameupdate;
	controller.sendGameReady = sendGameReady;
	controller.shipsReady = shipsReady;
	controller.shipsLocation = [];
	controller.makeMove = makeMove;
	controller.battleServerError = battleServerError;
	controller.makeGame = makeGame;
	controller.url = JSON.parse(sessionStorage.getItem('url'));
	controller.pickShipLocations = pickShipLocations;
	controller.battleServerError = battleServerError;
	controller.generateMap = generateMap;
	controller.currentMove = '';
	controller.setGameName = setGameName;
	controller.gameName = '';
	controller.game = JSON.parse(sessionStorage.getItem('game'));
	controller.myInfo = JSON.parse(sessionStorage.getItem('myInfo'));
	controller.setGameName();
}
angular.module('battleshipApp')
		.controller('BattleController', battleController);
	