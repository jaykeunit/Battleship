
var usersLoggedIn = [];
var Games =[{}];

var deleteGameAndUsers = function(name){
	delete Games[name];
	for(x in usersLoggedIn){
		if(name.indexOf(usersLoggedIn[x].username) > -1){
			usersLoggedIn.splice(x,1);;
		}
	}
}

module.exports = {
	addUser: function(user){
		usersLoggedIn.push(user);
	},
	
	getUsers: function(removeName){
		return usersLoggedIn;
	},
	
	setPlayerInvited: function(pair){
		for(x in usersLoggedIn){
			if(usersLoggedIn[x].username === pair.invitee){
				usersLoggedIn[x].invited = true;
				usersLoggedIn[x].invitedBy = pair.inviter;
			}
			else if(usersLoggedIn[x].username === pair.inviter){
				usersLoggedIn[x].invited = 'waiting';
				usersLoggedIn[x].invitedBy = pair.invitee;
			}
		}
	},
	
	setPlayerDecline: function(pair){
			
		for(x in usersLoggedIn){
			if(usersLoggedIn[x].username === pair.invitee){
				usersLoggedIn[x].invited = 'denied';
				usersLoggedIn[x].invitedBy = '';
			}
			else if(usersLoggedIn[x].username === pair.inviter){
				usersLoggedIn[x].invited = false;
				usersLoggedIn[x].invitedBy = '';
			}
		}
	},
	
	isPlayerInvited: function(player){
		for(x in usersLoggedIn){
			if(usersLoggedIn[x].username === player.username){
				if(usersLoggedIn[x].invited === true){
					return true;
				} 
				else if(usersLoggedIn[x].invited === 'denied'){
					return 'decline';
				}
				else
					return false;
			}
		}
	},
	
	makeGame: function(name){
		Games[name] = {
			player1Move: '',
			player1MakingMove: true,
			player1Ready: false,
			player1Gameboard: [],
			player1LastMoveWasHit: '',
			player1status: 'active',
			player2Move: '',
			player2MakingMove: false,
			player2Ready: false,
			player2Gameboard: [],
			player2LastMoveWasHit: '',
			player2status: 'active'
		};
	},
	
	setGameReady: function(gameInfo){
		if(gameInfo.player === 'player1'){
			Games[gameInfo.gameName].player1Ready = true;
			Games[gameInfo.gameName].player1Gameboard = gameInfo.gameboard;
		}
		else if(gameInfo.player === 'player2'){
			Games[gameInfo.gameName].player2Ready = true;
			Games[gameInfo.gameName].player2Gameboard = gameInfo.gameboard;
		}
	},
	
	makeMove: function(gameInfo){
		if(Games[gameInfo.gameName].player1MakingMove){
			Games[gameInfo.gameName].player1Move = gameInfo.move;
			Games[gameInfo.gameName].player1MakingMove = !Games[gameInfo.gameName].player1MakingMove;
			Games[gameInfo.gameName].player2MakingMove = !Games[gameInfo.gameName].player2MakingMove;
			if(Games[gameInfo.gameName].player2Gameboard.indexOf(gameInfo.move) > -1){
				Games[gameInfo.gameName].player1LastMoveWasHit = true;
			}
			else
				Games[gameInfo.gameName].player1LastMoveWasHit = false;
			
		}
		else if(Games[gameInfo.gameName].player2MakingMove){
			Games[gameInfo.gameName].player2Move = gameInfo.move;
			Games[gameInfo.gameName].player2MakingMove = !Games[gameInfo.gameName].player2MakingMove;
			Games[gameInfo.gameName].player1MakingMove = !Games[gameInfo.gameName].player1MakingMove;
			if(Games[gameInfo.gameName].player1Gameboard.indexOf(gameInfo.move) > -1){
				Games[gameInfo.gameName].player2LastMoveWasHit = true;
			}
			else 
				Games[gameInfo.gameName].player2LastMoveWasHit = false;
		}
	},
	
	getGameInfo: function(name){
		return Games[name];
	},
	
	updatePlayerStatus: function(gameInfo){
		if(gameInfo.player === 'player1'){
			Games[gameInfo.gameName].player1status = gameInfo.status;
		}
		else if(gameInfo.player === 'player2'){
			Games[gameInfo.gameName].player2status = gameInfo.status;
		}
		setTimeout(function(){
			deleteGameAndUsers(gameInfo.gameName);
		}, 20000)
	}
}





