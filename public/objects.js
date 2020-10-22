function PlayerShip(x, y, dir, a){//the place the players spawn, 
	//in relation to their respawn port, with an area of interaction that moves with the player
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.a = a;
	this.rot = 0;
	this.img = document.createElement("img");
	this.img.src = "imgs/ship.png";
	this.draw = function() {
		game.context.drawImage(this.img, this.x, this.y)
		var len = 90;
		var trans = 1;
		for( i = 0; i < 10; i++){
			var x = Math.sin(this.rot) * len;
			var y = Math.cos(this.rot) * len;
			game.context.strokeStyle = "rgba(50, 205, 50," + trans + ")";
			game.context.beginPath();
			game.context.moveTo(100, 100);
			var linex = 100 + x;
			var liney = 100 + y;
			game.context.lineTo(linex, liney);
			game.context.stroke();
			this.rot -= 0.05;
			trans -= 0.2;
		}
		this.rot += .55;
		if(this.rot > Math.PI * 2) {
			this.rot = 0;
		}
	};
	this.move = function(Move) {
		this.dir += Move.dir;
		if(this.dir < 0){
			this.dir = 315;
		};
		if(this.dir > 315){
			this.dir = 0;
		};
		if(this.dir == 0){//Right or E
			this.x += Move.dis;//Make move thing up/down/left/right
		} else if(this.dir == 45){//SE or SE
			this.y -= Move.dis;
			this.x -= Move.dis;
		} else if (this.dir == 90){//S our Down
			this.y -= Move.dis;
		} else if (this.dir == 135){//SW or SW
			this.y -= Move.dis;
			this.x += Move.dis;
		} else if (this.dir == 180){//W or left
			this.x -= Move.dis;
		} else if (this.dir == 225){// NW or NW
			this.y += Move.dis;
			this.x += Move.dis;
		} else if (this.dir == 270){//N or UP
			this.y += Move.dis;
		} else if (this.dir >= 315){//NE or NE
			this.y += Move.dis;
			this.x -= Move.dis;
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


