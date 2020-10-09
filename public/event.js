function Move(dir, dis) {//position, what direction, how far a player moves
	this.dir = dir;
	this.dis = dis;
}

function Fire(speedx, speedy, dist){//how fast the missle travels and how far it can reach before it dies out
	this.speedx = x;
	this.speedy= y;
	this.dist = dist;
}
 
function Collision(x, y, dam, playerSpeed, playerHealth, ){//determining where the missle hits so damage is multiplied, dam is set in relation to player choosen ship
	this.x = x;
	this.y = y;
	this.dam = dam;
	this.playerSpeed = PlayerSpeed;
	this.playerHealth = playerHealth;
 }
 
 function GameObstacle(x, y, a){//position for game created enemies such as sharks or other boats and their area of interaction(the space were the players interact with the game obstacles)
	 this.x = x;
	 this.y = y;
	 this.a = a;
 }

function TreasureCollection(x, y, a){//determines where treasure chest how big the interaction of collecting treasure can be
	this.x = x;
	this.y = y;
	this.a = a;
}