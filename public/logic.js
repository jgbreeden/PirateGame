var socket = io();
var users = [];
var bullets = [];
var update;
var me;
var myname;
let radlen = 100;
let	maxwidth = 800;
let maxheight = 600;
var Surface = document.getElementById("GameArea");
var login = document.getElementById("LoginArea");
var modal = document.getElementById('idea');
Surface.style.height = maxheight;
Surface.style.width = maxwidth;


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var game = {
	canvas: document.getElementById("GameCanvas"),
	start: function () {
		this.canvas.width = maxwidth;
		this.canvas.height = maxheight;
		this.context = this.canvas.getContext("2d");
		this.img = document.createElement("img");
		this.img.src = "imgs/ocean.png";
		window.addEventListener('keypress', function (e) {
			handleKey(e.code);
		  })
	},
	draw : function() {
		this.context.drawImage(this.img, 0, 0);
	},
	clear : function() {
		this.context.clearRect(0, 0, maxwidth, maxheight);
	}
}
var map = {
	minx: 40,
	maxx: 700,
	miny: 70,
	maxy: 580,
	islands: [
		{
			name: "",
			north: 150,
			south: 180,
			east: 200,
			west: 160
		},
		{
			name: "",
			north: 110,
			south: 190,
			east: 600,
			west: 530
		},
		{
			name: "",
			north: 240,
			south: 290,
			east: 320,
			west: 290
		},
		{
			name: "",
			north: 350,
			south: 420,
			east: 600,
			west: 530
		}, 
		{
			name: "",
			north: 420,
			south: 490,
			east: 280,
			west: 200
		}
	],
	corners: [
		{//top corner, left
			north: 80,
			south: "",
			east: "",
			west: 50			
		},
		{//top corner, right
			north: 80,
			south: "",
			east: "",
			west: 690			
		},
		{//bottom corner, left
			north: 50,
			south: "",
			east: "",
			west: 570			
		},
		{//bottom corner, right
			north: 690,
			south: "",
			east: "",
			west: 570			
		}
	],
	ports: [
		{
			x: 50,
			y: 360
		},
		{
			x: 480,
			y: 70
		},
		{
			x: 690,
			y: 330
		}
	]
};

function handleKey(code){
	if (code == "KeyW") {//move forward
		var dis = 10;
		var movement = new Move(0, dis, myname);
		socket.emit("playerMove", movement);
		me.move(movement);
	}
	if (code == "KeyS"){//move backwards
		var dis = -10;
		var movement = new Move(0, dis, myname);
		socket.emit("playerMove", movement);
		me.move(movement);
	}
	if (code == "KeyD"){//turn right
		var dir = 45;
		var dis = 10;
		var movement = new Move(dir, dis, myname);
		socket.emit("playerMove", movement);
		me.move(movement);
	}
	if(code == "KeyA"){//turn left
		var dir = -45;
		var dis = 10;
		var movement = new Move(dir, dis, myname);
		socket.emit("playerMove", movement);
		me.move(movement);
	}
	if(code == "KeyU"){//fire
		console.log("Kill")
		var shoot = new Bullet(me.x, me.y, me.dir);
		socket.emit("shipFire", shoot);
		bullets.push(shoot);
	}
}

function gameUpdate(){
	game.clear();
	game.draw();
	me.draw();
	for (i = 0; i < bullets.length; i++){
		bullets[i].Move();
	};
}
function serverStart(){
	var x = 400;
	var y = 300;
	game.start();
	$('#lobby').hide();
	$("#GameArea").show();
	for (i = 0; i < users.length; i++){
		if (users[i].username == myname) {
			x = map.islands[i].west;
			y = map.islands[i].south;
		} else {
			users[i].ship = new PlayerShip(400, 300, 0, 0);
		}
	}
	update = setInterval(gameUpdate, 20);
	me = new PlayerShip(x, y, 0, 0);
	playerPos();
	console.log("start");
}

function playerPos(){
	var pos = new startPosition(myname, me.x, me.y );
	socket.emit("startPosition", pos);
}

function gameStart(){
	socket.emit("startGame");
}

function openHelp() {
	$("#help").show();
}
function closeHelp() {
	$("#help").hide();
}
$(function () {
	$('#loginForm').submit(function(e) {
		e.preventDefault();
		myname = $('#uname').val();
		socket.emit("new user", myname, function(data){
		//gameStart();
			$('#LoginArea').hide();
			$('#lobby').show();
		});
	});
	socket.on("startPosition", function(pos) {
		for (i = 0; i < users.length; i++){
			if (users[i].username == pos.user){
				users[i].ship.x = pos.x;
				users[i].ship.y = pos.y;
				break;
			}
		}
	});
	socket.on("shipFire", function(ev) {
		console.log("Other Ship Fire")
	});
	socket.on("user list", function(list) {
		$('#userList').text('');
		users = [];
		for (i = 0; i < list.length; i++) { 
			$('#userList').append($('<li>').text(list[i]));
			players.ship = new User(list[i]);
			users.push(players);
		}
	});
	socket.on("late user", function() {
		players.ships =  new PlayerShip(400, 300, 0, 0);
		users.push(players);
	});
	socket.on("playerKilled", function(ev) {
		
	});
	socket.on('playerMove', function(movement) {
		for(i = 0; i < users.length; i ++){
			if(movement.user == users[i].username){
				console.log('your code is working');
				users[i].ship.move(movement);
			}
		};
	});
	socket.on("joinInProgress", function(list) {
		$("#LoginArea").hide();
		users = [];
		for (i = 0; i < list.length; i++) { 
			$('#userList').append($('<li>').text(list[i]));
			var players = new User(list[i]);
			users.push(players);
		}
		serverStart();
	});	
	socket.on("startGame", function(ev){
		serverStart();
	});
});