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
	minx: 20,
	maxx: 780,
	miny: 20,
	maxy: 600,
	islands: [
		{
			name: "",
			north: 140,
			south: 160,
			east: 160,
			west: 140
		},
		{
			name: "",
			north: 130,
			south: 150,
			east: 660,
			west: 630
		}
	]
}

function handleKey(code){
	if (code == "KeyW") {//move forward
		var dis = 10;
		var movement = new Move(0, dis);
		socket.emit("playerMove", movement);
		me.move(movement);
	}
	if (code == "KeyS"){//move backwards
		var dis = -10;
		var movement = new Move(0, dis);
		socket.emit("playerMove", movement);
		me.move(movement);
	}
	if (code == "KeyD"){//turn right
		var dir = 45;
		var dis = 10;
		var movement = new Move(dir, 0);
		socket.emit("playerMove", movement);
		me.move(movement);
	}
	if(code == "KeyA"){//turn left
		var dir = -45;
		var dis = 10;
		var movement = new Move(dir, 0);
		socket.emit("playerMove", movement);
		me.move(movement);
	}
	if(code == "KeyU"){//fire
		console.log("Kill")
		var shoot = new Bullet(me.x, me.y, me.dir);
		socket.emit("shipFire", shoot);
	}
}

function gameUpdate(){
	game.clear();
	game.draw();
	me.draw();

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
			users[i].username = new PlayerShip(400, 300, 0, 0);
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
			if (users[i] == pos.name){
				ship[i].x = pos.x;
				ship[i].y = pos.y;
				break;
			}
		}
	});
	socket.on("shipFire", function(ev) {
		console.log("Other Ship Fire")
	});
	socket.on("user list", function(list) {
		$('#userList').text('');
		new users = [];
		for (i = 0; i < list.length; i++) { 
			$('#userList').append($('<li>').text(list[i]));
			users.push(User(list[i]));
		}
	});
	socket.on("playerKilled", function(ev) {
		
	});
	socket.on("startGame", function(ev){
		serverStart();
	});
});