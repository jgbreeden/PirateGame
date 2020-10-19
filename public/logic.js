var users = [];
var stuff = [];
let radlen = 100;
let	maxwidth = 800;
let maxheight = 600;
var Surface = document.getElementById("GameArea");
var modal = document.getElementById('idea');
Surface.style.height = maxheight;
Surface.style.width = maxwidth;
Surface.style.display = "none";

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
		},
	draw : function() {

	},
}

function gameUpdate(){
	Surface.clear();

	//display gameStart
	//call our own ship update methods 
	//loop through shipp arrays
		//move based on new x,y coords
	

}

function gameStart(){
	document.getElementById("GameArea").style.display = "block";

	//create ships
	var update = setInterval(gameUpdate, 20);
	
}

function fire(){
	
}

//function move()

// controllers 

window.addEventListener("keypress", function (e) {
	//function call for diffrent key 
	//if movement key 
	var movement = newMove(dir, dis);
	socket.emit("shipMoved", movement);
	PlayerShip.move(movement);
});

$(function () {
	var socket = io();
	socket.on("event name", function(ev) {
		
	});

	socket.on("shipFire", function(ev) {
		
	});
}



//fuuuuuuuhhhh refrences