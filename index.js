var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//var mangoDB = require('mangoDB');
var connections = [];
var users = [];

app.use(express.static(path.join(__dirname,'public')));
//we can also specify a specific html file so we don't nessecarily need index, but it automatically gets the index.html or first html file it finds

io.on('connection', function(socket){
	connections.push(socket);
	console.log("Connections:" + connections.length);
	socket.on('new user', function(user, callback) {
		callback(null);
		socket.user = user;
		users.push(user);
		io.emit("user list", users);
	});
	socket.on('disconnect', function(){
		connections.splice(connections.indexOf(socket), 1);
		users.splice(users.indexOf(socket.user), 1);
		console.log('Disconnection:' + socket.user);
		io.emit("user list", users);
	});

	socket.on('startGame', function (){
		//when game first starts
		io.emit('startGame', '');
	});
	socket.on('midGame', function (){
		//when the 3rd bounty is collected, and special event starts
		io.emit('Game Is Coming to an End. Get Your Points QUICK!');
	});
	socket.on('endGame', function (){
		//when the final bounty is collected
		io.emit('Game Has Ended');
	});
	socket.on('playerScore', function (score){
		//when a player places bounty into home base, storing data for amout of points
		io.emit('score board', {user: socket.user, score: score});
	});
	socket.on('shipFire', function (shipFire){
		socket.broadcast.emit('shipFire', shipFire)
	});	
	socket.on('playerKill', function (){
		//when a player is killed by a player or obstacle
		socket.broadcast.emit('playerKilled', playerKilled);
	});
	socket.on('playerChat', function (msg){
		//player game chat if we have one
		io.emit('chat message', {user: socket.user, message: msg});
	});	
	socket.on('startPosition', function (pos){
		//when players join a lobby
		socket.broadcast.emit('startPosition', pos);
	});	
	socket.on('playerStart', function (ship){
		//when players set name and ship
		io.emit('playerData', {user: socket.user, shipType: ship});
	});	
	//events
	socket.on('playerMove', function (movement){
		//data carrying the information of a sockets movement
		socket.broadcast.emit('playerMove', movement);
	});
	socket.on('entitiesList', function (){
		//data carrying the information of the game obstacles
	});
});

//logic for creating game rooms(for sonny's file)

// function hostCreateNewGame() {
    // Create a unique Socket.IO Room
    // var thisGameId = ( Math.random() * 100000 ) | 0;

    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    // this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});

    // Join the Room and wait for the players
    // this.join(thisGameId.toString());
// };


http.listen(PORT, () => {
  console.log('listening on *:3000');
});
