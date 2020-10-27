function Move(dir, dis) {//what direction, how far a player moves
	this.dir = dir;
	this.dis = dis;
}

function Fire(speedx, speedy, dist){//how fast the missle travels and how far it can reach before it dies out

}
 
function Collision(x, y, dam, playerSpeed, playerHealth, ){//determining where the missle hits so damage is multiplied, dam is set in relation to player choosen ship
	this.x = x;
	this.y = y;
	this.dam = dam;
	this.playerSpeed = PlayerSpeed;
	this.playerHealth = playerHealth;
 }

function TreasureCollection(x, y, a){//determines where treasure chest how big the interaction of collecting treasure can be
	this.x = x;
	this.y = y;
	this.a = a;
}

function CheckBounds(PlayerShip){//if needed, my idea was to have several maps rather than a big one, but thats up to the group, but this is so the players x and y goes back to ther opposite side(credit to the asteroids game)
	if (PlayerShip.x <= 20){
		PlayerShip.dir = 0;
		PlayerShip.x = 30;
	}
	else if (PlayerShip.x >= 780){
		PlayerShip.dir = 180;
		PlayerShip.x = 770;
	}
	else if(PlayerShip.y <= 20){
		PlayerShip.dir = 90;
		PlayerShip.y = 30;
	}
	else if(PlayerShip.y >= 580){
		PlayerShip.dir = 270;
		PlayerShip.y = 570;
	}
	
};