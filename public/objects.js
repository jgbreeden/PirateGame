const len = 90;

function PlayerShip(x, y, dir, a){//the place the players spawn, 
	//in relation to their respawn port, with an area of interaction that moves with the player
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.a = a;
	this.munitions = 90;
	this.rot = 0;
	this.visible = false;
	this.docked == false;
	this.score = 0;
	this.img = document.createElement("img");
	this.img.src = "imgs/ship.png";
	this.draw = function() {
		let imgw = this.img.width/2
		var offsetx = this.x;
		var offsety = this.y;
		switch (this.dir) {
			case 0:
				offsetx -= imgw;
				offsety -= imgw;
				break;
			case 45:
				offsety -= imgw * 1.4;
				break;
			case 90:
				offsetx += imgw;
				offsety -= imgw;
				break;
			case 135:
				offsetx += imgw * 1.4;
				break;
			case 180:
				offsetx += imgw;
				offsety += imgw;
				break;
			case 225:
				offsety += imgw * 1.4;
				break;
			case 270:
				offsetx -= imgw;
				offsety += imgw;
				break;
			case 315:
				offsetx -= imgw * 1.4;
				break;
			default:
				console.log("The code is not working")
		  }
		game.context.translate(offsetx, offsety);
		game.context.rotate(+this.dir * Math.PI/180);
		game.context.drawImage(this.img, 0, 0);
		game.context.rotate(-this.dir * Math.PI/180);
		game.context.translate(-offsetx, -offsety);
		if (this == me) {
			this.radar();
		} else {
			var disx = me.x - this.x;
			var disy = me.y - this.y;
			if(len * len / 2 <= disx * disx + disy * disy){
				this.visible = false;
			}
		};
	};
	this.radar = function () {
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
				if (users[j].username != myname)
					var deltax = users[j].ship.x - this.x;
					var deltay = users[j].ship.y - this.y;
					var rad = Math.atan2(deltax, deltay);
					if (rad < 0){
						rad = Math.PI * 2 + rad;
					};
					if (len * len/2 >= deltax * deltax + deltay * deltay){
						users[j].ship.visible = true;
					} else if (rad > this.rot - 0.2 && rad < this.rot + 0.2
					 && len * len >= deltax * deltax + deltay * deltay){
						game.context.fillStyle = "rgba(255, 0, 0" + trans +")";
						game.context.fillRect(users[j].ship.x, users[j].ship.y, 10, 10);
					
					};
			};
			this.rot -= 0.05;
			trans -= 0.2;
		};
	this.rot += .55;
	if(this.rot > Math.PI * 2) {
			this.rot = 0;
		};
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
		CheckBounds(this);
	};
	this.dock = function(){

	};
	this.hit = function(){

	}
};
//hi 

function User(username){
	this.ship = {};
	this.username = username;

}
function Bullet(x, y, dir){
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.startx = x;
	this.starty = y;
	this.life = 100;
	
	this.move = function(){
		let dis = 3;
		if(this.dir == 90){//Right or E
			this.x += dis;//Make move thing up/down/left/right

		} else if(this.dir == 135){//SE or SE
			this.y += dis;
			this.x += dis;

		} else if (this.dir == 180){//S our Down
			this.y += dis;

		} else if (this.dir == 225){//SW or SW
			this.y += dis;
			this.x -= dis;

		} else if (this.dir == 270){//W or left
			this.x -= dis;

		} else if (this.dir == 315){// NW or NW
			this.y -= dis;
			this.x -= dis;

		} else if (this.dir == 0){//N or UP
			this.y -= dis;

		} else if (this.dir == 45){//NE or NE
			this.y -= dis;
			this.x += dis;
		} else {
			console(this.dir)
		};
		this.life = this.life - 1;
		checkDistance(me, bullets[i])
		this.life = this.life - 1;
		for (u = 0; u <users.length; u++){
			if(checkDistance(users[u].ship, this) < 10 ){
				console.log("end me");
				this.life = 0;
				users[u].ship.hit();
			}
		}
	};
	this.draw = function() {
		game.context.beginPath();
		game.context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
		game.context.fillStyle = "rgba(255, 0, 0)";
		game.context.fill();
	}

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


