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
		game.context.translate(this.x, this.y);
		game.context.rotate(+this.dir * Math.PI/180);
		game.context.drawImage(this.img, 0, 0);
		game.context.rotate(-this.dir * Math.PI/180);
		game.context.translate(-this.x, -this.y);
		var len = 90;
		var trans = 1;
		for( i = 0; i < 10; i++){
			var x = Math.sin(this.rot) * len;
			var y = Math.cos(this.rot) * len;
			game.context.strokeStyle = "rgba(50, 205, 50," + trans + ")";
			game.context.beginPath();
			game.context.moveTo(this.x, this.y);
			var linex = this.x + x;
			var liney = this.y + y;	
			game.context.lineTo(linex, liney);
			game.context.stroke();
			for (j = 0; j < users.length; j++) {
				var deltax = ships[j].x - this.x;
				var deltay = ships[j].y - this.y;
				var rad = Math.atan2(deltax, deltay);
				if (rad < 0){
					rad = Math.PI * 2 + rad;
				}
				if (rad > this.rot - 0.2 && rad < this.rot + 0.2
					&& len * len >= deltex * deltax + deltay * deltay){
					 game.context.fillStyle = "rgba(255, 0, 0" + trans +")";
					 game.context.fillRect(ships[j].x, ships[j].y, 10, 10);
					}
			}
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
		if(this.dir == 90){//Right or E
			this.x += Move.dis;//Make move thing up/down/left/right
		} else if(this.dir == 135){//SE or SE
			this.y += Move.dis;
			this.x += Move.dis;
		} else if (this.dir == 180){//S our Down
			this.y += Move.dis;
		} else if (this.dir == 225){//SW or SW
			this.y += Move.dis;
			this.x -= Move.dis;
		} else if (this.dir == 270){//W or left
			this.x -= Move.dis;
		} else if (this.dir == 315){// NW or NW
			this.y -= Move.dis;
			this.x -= Move.dis;
		} else if (this.dir == 0){//N or UP
			this.y -= Move.dis;
		} else if (this.dir == 45){//NE or NE
			this.y -= Move.dis;
			this.x += Move.dis;
			

		};
		CheckBounds(PlayerShip)
	};
	this.fire = function(Fire){//make thing shoot thing
		//Create Projectile
		//Emit Message

	};
};


function User(username){
	this.ship;
	this.username = username;

}
function Bullet(x, y, dir){
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.startx = x;
	this.starty = y;
}
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


