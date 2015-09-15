var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');

var app = require('../app.js');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/manifest', function(req, res, next){
	res.header('Content-type', 'text/cache-manifest');
	res.end('CACHE MANIFEST');
});

router.post('/addUser', function(req, res, next) {
  app.server.addUser(req.body);
  res.send('got it');
});

router.get('/getUsers', function(req, res, next){
	res.send(app.server.getUsers());
});

router.post('/invitePlayer', function(req, res, next){
	app.server.setPlayerInvited(req.body);
	res.send('got it');
});

router.post('/declineInvite', function(req, res, next){
	app.server.setPlayerDecline(req.body);
	res.send('got it');
});


router.post('/checkAccepted', function(req, res, next){
	var choice = app.server.isPlayerInvited(req.body)
	if(choice === true){
		res.send('true');
	}
	else if(choice === 'decline'){
		res.send('decline');
	}
	else{
		res.send('false');
	}
	
});

router.post('/makeGame', function(req, res, next){
	app.server.makeGame(req.body.gameName)
	res.send('game made');
});

router.post('/makeMove', function(req, res, next){
	app.server.makeMove(req.body);
	res.send('got it');
	
});

router.post('/gameReady', function(req, res, next){
	app.server.setGameReady(req.body);
	res.send('got it');
});

router.get('/getGameupdate', function(req, res, next){
	var parts = url.parse(req.url, true);
	var query = parts.query;
	res.send(app.server.getGameInfo(query.gameName));
});

router.post('/lostOrLeave', function(req, res, next){
	app.server.updatePlayerStatus(req.body);
	res.send('got it');
});



module.exports = router;