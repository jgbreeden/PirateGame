function Move(dir, dis) {//position, what direction, how far a player moves
	this.dir = dir;
	this.dis = dis;
}

function Fire(speedx, speedy, dist){//how fast the missle travels and how far it can reach before it dies out
	var speed_x = Math.cos(this.sprite.rotation + Math.PI / 2) * 20;
    var speed_y = Math.sin(this.sprite.rotation + Math.PI / 2) * 20;
    var bullet = {};
    bullet.speed_x = speed_x;
    bullet.speed_y = speed_y;
    bullet.sprite = game.add.sprite(
		this.sprite.x + bullet.speed_x,
		this.sprite.y + bullet.speed_y,
		"bullet"
	);
    bullet_array.push(bullet);
    this.shot = true;
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

function CheckBounds(PlayerShip){//if needed, my idea was to have several maps rather than a big one, but thats up to the group, but this is so the players x and y goes back to ther opposite side(credit to the asteroids game)
	if (PlayerShip.x <= 0){
		PlayerShip.x = 800;
	}
	else if (PlayerShip.x >= 800){
		PlayerShip.x = 0;
	}
	else if(PlayerShip.y <= 0){
		PlayerShip.y = 600;
	}
	else if(PlayerShip.y >= 600){
		PlayerShip.y = 0;
	}
};