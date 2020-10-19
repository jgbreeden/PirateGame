var users = [];
var stuff = [];
var me;
let radlen = 100;
let	maxwidth = 800;
let maxheight = 600;
var Surface = document.getElementById("GameArea");
var login = document.getElementById("LoginArea");
var modal = document.getElementById('idea');
Surface.style.height = maxheight;
Surface.style.width = maxwidth;
//Surface.style.display = "none";

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
	},
	draw : function() {
		this.context.drawImage(this.img, 0, 0);
	},
	clear : function() {
		this.context.clearRect(0, 0, maxwidth, maxheight);
	}
}

function gameUpdate(){
	game.clear();
	game.draw();
	me.draw();
	//display gameStart
	//call our own ship update methods 
	//loop through shipp arrays
		//move based on new x,y coords
}

function gameStart(){
	game.start();
	login.style.display = "none";
	Surface.style.display = "block";
	//create ships
	var update = setInterval(gameUpdate, 20);
	me = new PlayerShip(400, 300, 270, 0);
}

//function move()

// controllers 

window.addEventListener("keypress", function (e) {
	//function call for diffrent key 
	//if movement key
	var dis = 10;
	var movement = new Move(0, dis);
	socket.emit("playerMove", movement);
	me.move(movement);
});

$(function () {
	var socket = io();
	socket.on("playerJoined", function(ev) {
		
	});
	socket.on("shipFire", function(ev) {
		
	});
	socket.on("user list", function(ev) {
		
	});
	socket.on("playerKilled", function(ev) {
		
	});
});