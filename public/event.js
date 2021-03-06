function Move(dir, dis, user) {//what direction, how far a player moves
	this.dir = dir;
	this.dis = dis;
	this.user = user;
}

function Fire(speedx, speedy, dist){//how fast the missle travels and how far it can reach before it dies out
	this.speedx = speedx;
	this.speedy = speedy;
	this.dist = dist;
}
 
function Collision(x, y, dam, playerSpeed, playerHealth, ){//determining where the missle hits so damage is multiplied, dam is set in relation to player choosen ship
	this.x = x;
	this.y = y;
	this.dam = dam;
	this.playerSpeed = playerSpeed;
	this.playerHealth = playerHealth;
 }

function TreasureCollection(x, y, a){//determines where treasure chest how big the interaction of collecting treasure can be
	this.x = x;
	this.y = y;
	this.a = a;
}

function startPosition(user, x, y, img, health, coins){
	this.user = user;
	this.x = x;
	this.y = y;
	this.img = img;
	this.health = health;
	this.coins = coins;
}

//pushing comment

function CheckBounds(PlayerShip){
	if (PlayerShip.x <= map.minx){
		PlayerShip.x = map.minx + shipType.speed;
	} else if (PlayerShip.x >= map.maxx){
		PlayerShip.x = map.maxx - shipType.speed;
	} else if (PlayerShip.y <= map.miny){
		PlayerShip.y = map.miny + shipType.speed;
	} else if (PlayerShip.y >= map.maxy){
		PlayerShip.y = map.maxy - shipType.speed;
	};
	// console.log(PlayerShip.x + " : " + PlayerShip.y)
	for(i = 0; i < map.islands.length; i ++){
		if(PlayerShip.y >= map.islands[i].north 
		 && PlayerShip.y <= map.islands[i].south
		 && PlayerShip.x >= map.islands[i].west
		 && PlayerShip.x <= map.islands[i].east){
			if(PlayerShip.dir == 0){
				PlayerShip.y += shipType.speed;
			} else if(PlayerShip.dir == 45){
				PlayerShip.y += shipType.speed;
				PlayerShip.x -= shipType.speed;
			} else if(PlayerShip.dir == 90){
				PlayerShip.x -= shipType.speed;
			} else if(PlayerShip.dir == 135){
				PlayerShip.y -= shipType.speed;
				PlayerShip.x -= shipType.speed;
			} else if(PlayerShip.dir == 180){
				PlayerShip.y -= shipType.speed;
			} else if(PlayerShip.dir == 225){
				PlayerShip.y -= shipType.speed;
				PlayerShip.x += shipType.speed;
			} else if(PlayerShip.dir == 270){
				PlayerShip.x += shipType.speed;
			} else if(PlayerShip.dir == 315){
				PlayerShip.y += shipType.speed;
				PlayerShip.x += shipType.speed;
			};
			console.log("you just crash landed");
		};
	};
	for(i = 0; i < map.corners.length; i ++){
		if(PlayerShip.y >= map.corners[i].north 
			&& PlayerShip.y <= map.corners[i].south
			&& PlayerShip.x >= map.corners[i].west
			&& PlayerShip.x <= map.corners[i].east){
			   if(PlayerShip.dir == 0){
				   PlayerShip.y += shipType.speed;
			   } else if(PlayerShip.dir == 45){
				   PlayerShip.y += shipType.speed;
				   PlayerShip.x -= shipType.speed;
			   } else if(PlayerShip.dir == 90){
				   PlayerShip.x -= shipType.speed;
			   } else if(PlayerShip.dir == 135){
				   PlayerShip.y -= shipType.speed;
				   PlayerShip.x -= shipType.speed;
			   } else if(PlayerShip.dir == 180){
				   PlayerShip.y -= shipType.speed;
			   } else if(PlayerShip.dir == 225){
				   PlayerShip.y -= shipType.speed;
				   PlayerShip.x += shipType.speed;
			   } else if(PlayerShip.dir == 270){
				   PlayerShip.x += shipType.speed;
			   } else if(PlayerShip.dir == 315){
				   PlayerShip.y += shipType.speed;
				   PlayerShip.x += shipType.speed;
			   };
		};
	};
};