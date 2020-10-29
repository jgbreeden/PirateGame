var socket = io();
var users = [];
var ships = [];
var bullets = [];
var update;
var me;
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
	if(code == "Space"){//fire
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
	game.start();
	$('#userlist').hide();
	$("#GameArea").show();
	for (i = 0; i < users.length; i++){
			ships[i] = new PlayerShip(400, 300, 270, 0);
		}
	update = setInterval(gameUpdate, 20);
	me = new PlayerShip(400, 300, 180, 0);
	playerPos();
}

function playerPos(){
	var name = document.getElementById("uname").value
	var pos = new startPosition(name, me.x, me.y );
	socket.emit("startPosition", pos);
}

function gameStart(){
	socket.emit("startGame");
}

$(function () {
	$('#loginForm').submit(function(e) {
		e.preventDefault();
		socket.emit("new user", $('#uname').val(),function(data){
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
			}
		}
	});
	socket.on("shipFire", function(ev) {
		
	});
	socket.on("user list", function(list) {
		$('#userList').text('');
		for (i = 0; i < list.length; i++) { 
			$('#userList').append($('<li>').text(list[i]));
		}
	});
	socket.on("playerKilled", function(ev) {
		
	});
	socket.on("startGame", function(ev){
		serverStart();
	});
});