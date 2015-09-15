
var server = module.exports;

it('canary should sing', function(){
		expect(true).to.be.eql(true);
});

it('add user should push user to usersLogged In', function(){
	usersLoggedIn = [];
	server.addUser('joe');
	
	
	expect(usersLoggedIn.length).to.be.eql(1);
});

it('getUsers should return usersLoggedIn', function(){
	usersLoggedIn = ['battleship Pro'];
	
	var users = server.getUsers();
	
	expect(users).to.be.eql(usersLoggedIn);
});

it('setPlayerInvited should set invitee to invited = true ', function(){
	var player1 = {username: 'john', invited: false, invitedBy: ''};
	var player2 = {username: 'joe', invited: false, invitedBy: ''};
	
	var pair = {invitee: 'john', inviter: 'joe'};
	
	usersLoggedIn = [player1, player2];
	
	server.setPlayerInvited(pair);
	
	expect(usersLoggedIn[0].invited).to.be.eql(true);
});

it('setPlayerInvited should set invitee to invitedBy = joe ', function(){
	var player1 = {username: 'john', invited: false, invitedBy: ''};
	var player2 = {username: 'joe', invited: false, invitedBy: ''};
	
	var pair = {invitee: 'john', inviter: 'joe'};
	
	usersLoggedIn = [player1, player2];
	
	server.setPlayerInvited(pair);
	
	expect(usersLoggedIn[0].invitedBy).to.be.eql('joe');
})

it('setPlayerInvited should set inviter to invited = waiting ', function(){
	var player1 = {username: 'john', invited: false, invitedBy: ''};
	var player2 = {username: 'joe', invited: false, invitedBy: ''};
	
	var pair = {invitee: 'john', inviter: 'joe'};
	
	usersLoggedIn = [player1, player2];
	
	server.setPlayerInvited(pair);
	
	expect(usersLoggedIn[1].invited).to.be.eql('waiting');
});

it('setPlayerInvited should set inviter to invitedBy = john ', function(){
	var player1 = {username: 'john', invited: false, invitedBy: ''};
	var player2 = {username: 'joe', invited: false, invitedBy: ''};
	
	var pair = {invitee: 'john', inviter: 'joe'};
	
	usersLoggedIn = [player1, player2];
	
	server.setPlayerInvited(pair);
	
	expect(usersLoggedIn[1].invitedBy).to.be.eql('john');
});

it('setPlayerDecline should set invitee to invited = denied', function(){
	var player1 = {username: 'john', invited: false, invitedBy: ''};
	var player2 = {username: 'joe', invited: false, invitedBy: ''};
	
	var pair = {invitee: 'john', inviter: 'joe'};
	
	usersLoggedIn = [player1, player2];
	
	server.setPlayerDecline(pair);
	
	expect(usersLoggedIn[0].invited).to.be.eql('denied');
});

it('setPlayerDecline should set inviter to invited = false', function(){
	var player1 = {username: 'john', invited: false, invitedBy: ''};
	var player2 = {username: 'joe', invited: false, invitedBy: ''};
	
	var pair = {invitee: 'john', inviter: 'joe'};
	
	usersLoggedIn = [player1, player2];
	
	server.setPlayerDecline(pair);
	
	expect(usersLoggedIn[1].invited).to.be.eql(false);
});

it('setPlayerDecline should set invitee to invitedBy empty', function(){
	var player1 = {username: 'john', invited: false, invitedBy: ''};
	var player2 = {username: 'joe', invited: false, invitedBy: ''};
	
	var pair = {invitee: 'john', inviter: 'joe'};
	
	usersLoggedIn = [player1, player2];
	
	server.setPlayerDecline(pair);
	
	expect(usersLoggedIn[0].invitedBy).to.be.eql('');
});

it('setPlayerDecline should set inviter to invitedBy empty', function(){
	var player1 = {username: 'john', invited: false, invitedBy: ''};
	var player2 = {username: 'joe', invited: false, invitedBy: ''};
	
	var pair = {invitee: 'john', inviter: 'joe'};
	
	usersLoggedIn = [player1, player2];
	
	server.setPlayerDecline(pair);
	
	expect(usersLoggedIn[1].invitedBy).to.be.eql('');
});

it('isPlayerInvited should return true if player is invited', function(){
	var player1 = {username: 'joe', invited: true, invitedBy: ''};
	usersLoggedIn = [player1];
	
	var player = {username: 'joe'};
	
	var returned = server.isPlayerInvited(player);
	
	expect(returned).to.be.eql(true);
});

it('isPlayerInvited should return decline if player is denied', function(){
	var player1 = {username: 'joe', invited: 'denied', invitedBy: ''};
	usersLoggedIn = [player1];
	
	var player = {username: 'joe'};
	
	var returned = server.isPlayerInvited(player);
	
	expect(returned).to.be.eql('decline');
});


it('isPlayerInvited should return false if player is false', function(){
	var player1 = {username: 'joe', invited: false, invitedBy: ''};
	usersLoggedIn = [player1];
	
	var player = {username: 'joe'};
	
	var returned = server.isPlayerInvited(player);
	
	expect(returned).to.be.eql(false);
});

it('makeGame should make a property to Games with concatination of the two player usernames', function(){
	name = 'johnjoe';
	
	Games =[{}];
	
	var game = {
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
	
	server.makeGame(name);
	
	expect(Games[name]).to.be.eql(game);
	
});

it('setGame ready should set player1 to ready', function(){
	Games['game'] = {
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
	
	var gameBoard = [1,2,3,4,5,6,7,8,9,10];
	
	var gameInfo = {gameName: 'game', player: 'player1', gameboard: gameBoard};
	
	server.setGameReady(gameInfo);
	
	expect(Games.game.player1Ready).to.be.eql(true);
	
});

it('setGame ready should set player1 gameBoard', function(){
	Games['game'] = {
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
	
	var gameBoard = [1,2,3,4,5,6,7,8,9,10];
	
	var gameInfo = {gameName: 'game', player: 'player1', gameboard: gameBoard};
	
	server.setGameReady(gameInfo);
	
	expect(Games.game.player1Gameboard).to.be.eql(gameBoard);
	
});

it('setGame ready should set player2 to ready', function(){
	Games['game'] = {
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
	
	var gameBoard = [1,2,3,4,5,6,7,8,9,10];
	
	var gameInfo = {gameName: 'game', player: 'player2', gameboard: gameBoard};
	
	server.setGameReady(gameInfo);
	
	expect(Games.game.player2Ready).to.be.eql(true);
	
});

it('setGame ready should set player2 gameBoard', function(){
	Games['game'] = {
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
	
	var gameBoard = [1,2,3,4,5,6,7,8,9,10];
	
	var gameInfo = {gameName: 'game', player: 'player2', gameboard: gameBoard};
	
	server.setGameReady(gameInfo);
	
	expect(Games.game.player2Gameboard).to.be.eql(gameBoard);
	
});


it('makeMove should set player1 move if its their move', function(){
	Games['game'] = {
		player1Move: '',
		player1MakingMove: true,
		player1Ready: true,
		player1Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player1LastMoveWasHit: '',
		player1status: 'active',
		player2Move: '',
		player2MakingMove: false,
		player2Ready: true,
		player2Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player2LastMoveWasHit: '',
		player2status: 'active'
	};

	var gameInfo = {gameName: 'game', move: 10};
	
	server.makeMove(gameInfo);
	
	expect(Games.game.player1Move).to.be.eql(10);
	
});

it('makeMove should set player2 move if its their move', function(){
	Games['game'] = {
		player1Move: '',
		player1MakingMove: false,
		player1Ready: true,
		player1Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player1LastMoveWasHit: '',
		player1status: 'active',
		player2Move: '',
		player2MakingMove: true,
		player2Ready: true,
		player2Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player2LastMoveWasHit: '',
		player2status: 'active'
	};

	var gameInfo = {gameName: 'game', move: 10};
	
	server.makeMove(gameInfo);
	
	expect(Games.game.player2Move).to.be.eql(10);
	
});

it('makeMove should set player1 player1LastMoveWasHit to true if its their move was a hit', function(){
	Games['game'] = {
		player1Move: '',
		player1MakingMove: true,
		player1Ready: true,
		player1Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player1LastMoveWasHit: '',
		player1status: 'active',
		player2Move: '',
		player2MakingMove: false,
		player2Ready: true,
		player2Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player2LastMoveWasHit: '',
		player2status: 'active'
	};

	var gameInfo = {gameName: 'game', move: 10};
	
	server.makeMove(gameInfo);
	
	expect(Games.game.player1LastMoveWasHit).to.be.eql(true);
	
});

it('makeMove should set player2 player2LastMoveWasHit to true if its their move was a hit', function(){
	Games['game'] = {
		player1Move: '',
		player1MakingMove: false,
		player1Ready: true,
		player1Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player1LastMoveWasHit: '',
		player1status: 'active',
		player2Move: '',
		player2MakingMove: true,
		player2Ready: true,
		player2Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player2LastMoveWasHit: '',
		player2status: 'active'
	};

	var gameInfo = {gameName: 'game', move: 10};
	
	server.makeMove(gameInfo);
	
	expect(Games.game.player2LastMoveWasHit).to.be.eql(true);
	
});

it('makeMove should set player1 player1LastMoveWasHit to false if its their move was a hit', function(){
	Games['game'] = {
		player1Move: '',
		player1MakingMove: true,
		player1Ready: true,
		player1Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player1LastMoveWasHit: '',
		player1status: 'active',
		player2Move: '',
		player2MakingMove: false,
		player2Ready: true,
		player2Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player2LastMoveWasHit: '',
		player2status: 'active'
	};

	var gameInfo = {gameName: 'game', move: 20};
	
	server.makeMove(gameInfo);
	
	expect(Games.game.player1LastMoveWasHit).to.be.eql(false);
	
});

it('makeMove should set player2 player2LastMoveWasHit to false if its their move was a hit', function(){
	Games['game'] = {
		player1Move: '',
		player1MakingMove: false,
		player1Ready: true,
		player1Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player1LastMoveWasHit: '',
		player1status: 'active',
		player2Move: '',
		player2MakingMove: true,
		player2Ready: true,
		player2Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player2LastMoveWasHit: '',
		player2status: 'active'
	};

	var gameInfo = {gameName: 'game', move: 20};
	
	server.makeMove(gameInfo);
	
	expect(Games.game.player2LastMoveWasHit).to.be.eql(false);
	
});

it('getGameInfo should return the game of the name passed to the function', function(){
	var game = Games['game'];
	
	var returned = server.getGameInfo('game');
	
	expect(game).to.be.eql(returned);
});

it('update should set player1 status', function(){
		Games['game'] = {
		player1Move: '',
		player1MakingMove: false,
		player1Ready: true,
		player1Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player1LastMoveWasHit: '',
		player1status: 'active',
		player2Move: '',
		player2MakingMove: true,
		player2Ready: true,
		player2Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player2LastMoveWasHit: '',
		player2status: 'active'
	};

	var gameInfo = {gameName: 'game', status: 'lose', player: 'player1'};
	
	server.updatePlayerStatus(gameInfo);
	
	expect(Games['game'].player1status).to.be.eql('lose');
});

it('update should set player2 status', function(){
		Games['game'] = {
		player1Move: '',
		player1MakingMove: false,
		player1Ready: true,
		player1Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player1LastMoveWasHit: '',
		player1status: 'active',
		player2Move: '',
		player2MakingMove: true,
		player2Ready: true,
		player2Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player2LastMoveWasHit: '',
		player2status: 'active'
	};

	var gameInfo = {gameName: 'game', status: 'lose', player: 'player2'};
	
	server.updatePlayerStatus(gameInfo);
	
	expect(Games['game'].player2status).to.be.eql('lose');
});

it('deleteGameAndUsers should delete game', function(){
		Games['game'] = {
		player1Move: '',
		player1MakingMove: false,
		player1Ready: true,
		player1Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player1LastMoveWasHit: '',
		player1status: 'active',
		player2Move: '',
		player2MakingMove: true,
		player2Ready: true,
		player2Gameboard: [1,2,3,4,5,6,7,8,9,10],
		player2LastMoveWasHit: '',
		player2status: 'active'
	};
	
	deleteGameAndUsers('game');
	
	expect(Games['game']).to.be.eql(undefined);
});

it('deleteGameAndUsers should delete user matching username',function(){
	usersLoggedIn = [{username: 'joe'}];
	
	var name = 'johnjoe';
	
	deleteGameAndUsers(name);
	
	expect(usersLoggedIn.length).to.be.eql(0);
});

