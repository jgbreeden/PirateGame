function PlayerShip(x, y, dir, a){//the place the players spawn, 
	//in relation to their respawn port, with an area of interaction that moves with the player
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.a = a;
	this.img = document.createElement("img");
	this.img.src = "imgs/ship.png";
	this.draw = function() {game.context.drawImage(this.img, this.x, this.y)};
	this.move = function(Move) {
		this.dir += Move.dir;
		if(this.dir == 0){
			this.y += Move.dis;//Make move thing up/down/left/right
		} else if(this.dir == 45){
			this.y -= this.dis;
			this.x += this.dis;
		} else if (this.dir == 90){
			this.x += this.dis;
		} else if (this.dir == 135){
			this.y -= this.dis;
			this.x += this.dis;
		} else if (this.dir == 180){
			this.y += this.dis;
		} else if (this.dir == 225){
			this.y -= this.dis;
			this.x += this.dis;
		} else if (this.dir == 270){
			this.x -= Move.dis;
		} else if (this.dir == 315){
			this.y -= this.dis;
			this.x += this.dis;
		};
	};
	this.fire = function(Fire){//make thing shoot thing


	};
};
	


function BountyShip(x, y, dir, a){// Ship.AI, moves w/no limitation 
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.a = a;
}

function Island(x, y, b){//position of island, with a barrier that playerships and other entities cannot cross unless it has treasure, or has resources.
	this.x = x;
	this.y = y;
	this.b = b;
}

function Port(x, y, a){//position, and specific area of interaction on the certain playership that "owns" it
	this.x = x;
	this.y = y;
	this.a = a;
}

function Treasure(x, y, val){//determines where treasure chest spawn, and the amount of gold inside
	this.x = x;
	this.y = y;
	this.val = val;
}

function GameObstacle(x, y, a){//position for game created enemies such as sharks or other boats and their area of interaction(the space were the players interact with the game obstacles)
	this.x = x;
	this.y = y;
	this.a = a;
}


