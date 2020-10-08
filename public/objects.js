function PlayerShip(x, y, dir, a){//the place the players spawn, in relation to their respawn port, with an area of interaction that moves with the player
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.a = a;
	this.move = function(mvmt) {
		this.dir = mvmt.dir;
		if(this.dir == 0){
			this.y -= this.dis;//make ship go up
		} else if(this.dir == 45){
			this.y -= this.dis;
			this.x += this.dis;
		} else if (this.dir == 90){
			this.x += this.dis;
		} else if (this.dir == 135){
			this.y += this.dis;
			this.x += this.dis;
		} else if (this.dir == 180){
			this.y += this.dis;
		} else if (this.dir == 225){
			this.y += this.dis;
			this.x += this.dis;
		} else if (this.dir == 270){
			this.x -= this.dis;
		} else if (this.dir == 315){
			this.y += this.dis;
			this.x += this.dis;
		}
	};
}

function BountyShip(x, y, dir, a){//similar to the PlayerShip function, but this isn't controller by the player but is rather just spawned in and placed randomly on the map with no restriction 
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


