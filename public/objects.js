const len = 90;
var eHealth;
var shipType;
var shopAmmoCost = 50;
var shopFuelCost = 25;
var shopRepairCost = 50;
var shootSound;
var deathSound;
var collectSound;
var hitSound;
var shopKeep;
var purchase;

function PlayerShip(x, y, dir, a){//the place the players spawn, 
	//in relation to their respawn port, with an area of interaction that moves with the player
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.a = a;
	this.rot = 0;
	this.munitions = shipType.ammo;
	this.score = 0;
	this.kills = 0;
	this.coins = shipType.coins;
	this.health = shipType.health;
	this.fuel = shipType.fuel;
	this.visible = false;
	this.docked = false;
	this.explosion = false;
	this.erased = false;
	this.img = document.createElement("img");
	this.img.src = shipType.imgName;
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
		if (this.explosion){	
			this.explosion.draw();	
		}
	};
	this.radar = function () {
		var trans = 1;
		for( k = 0; k < 10; k++){
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
				if (users[j].username != myname){
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
			};
			this.rot -= 0.05; //call this.checkBounty
			trans -= 0.2;
		};	
		this.rot += .55;
		if(this.rot > Math.PI * 2) {
			this.rot = 0;
		};
	};
	this.move = function(Move) {
		if (this.fuel > 0 && this.health > 0 && this.docked == false){
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
			this.fuel -= 0.5;
			CheckBounds(this);
		} else if (this.fuel == 0) {
			console.log(this.fuel);
		}
		stats();
	};
	this.dock = function(val){//checkdistance <- (reminder)
		if(this.y >= BountyShip.north - 30
			|| this.y <= BountyShip.south + 30
			|| this.x >= BountyShip.west - 30
			|| this.x <= BountyShip.east + 30){
				this.docked = true;
			}
		for (i = 0; i < map.ports.length; i++){
			if(this.docked == false && val == 1 && this.y >= map.ports[i].y - 20
				&& this.y <= map.ports[i].y + 20 // add 10
				&& this.x >= map.ports[i].x - 20// click X/Y into port
				&& this.x <= map.ports[i].x + 20) { 
					this.docked = true;
					var type = 1;
					socket.emit("playerDocked", type);
					document.getElementById("Merchant").style.display = "block";
					shopKeep.play()
					this.x = map.ports[i].x
					this.y = map.ports[i].y
					console.log('something worked');
			} else if(this.docked == true && val == 2){
				this.docked = false;
				console.log('bruh');
				var type = 2;
				socket.emit("playerDocked", type);
				document.getElementById("Merchant").style.display = "none";
				shopKeep.stop();
			}
		}
	};
	this.hit = function(x, y, uname){
		me.score += 25;
		this.health -= 25
		if(this.health == 0){
			me.kills += 1;
			stats();
		}
		stats();
		this.explosion = new Explosion(this.x, this.y, uname, this.user);
		socket.emit("playerHit", this.explosion);
		var local = this;
		setTimeout(function() {	
			local.explosion = false;	
		}, 500);
	}
};
//hi 
//if anyone else see this make a comment underneath mine - Sonny
function stats(){
	var statPage = document.getElementById('statPage');
	statPage.style.display = "block";
	document.getElementById("pName").innerHTML = 'Player Name: ' + document.getElementById('uname').value; 
	document.getElementById("pHealth").innerHTML = 'Player Health: ' + me.health;
	document.getElementById("pScore").innerHTML = 'Player Score: ' + me.score;
	document.getElementById("pCoins").innerHTML = 'Player Coins: ' + me.coins;
	document.getElementById("pKills").innerHTML = 'Kill Count: ' + me.kills;
	document.getElementById("pAmmo").innerHTML = 'Ammunition: '+ me.munitions;
	document.getElementById("pFuel").innerHTML = 'Fuel Left: ' + me.fuel;
}

function confirmSelect(x){
	shipType = new ShipType("imgs/ship" + x + ".png", ships.ships[x - 1].health, ships.ships[x - 1].ammo, ships.ships[x - 1].speed, ships.ships[x - 1].fuel, ships.ships[x - 1].coins);
}

function ShipType(imgName, health, ammo, speed, fuel, coins){
	this.imgName = imgName;
	this.health = health;
	this.ammo = ammo;
	this.speed = speed;
	this.fuel = fuel;
	this.coins = coins;
}

function ammo(name){
	for(i = 0; i < users.length; i++){
		if(name == users[i].username && users[i].ship.coins >= shopAmmoCost){
			users[i].ship.coins -= shopAmmoCost;
			users[i].ship.munitions += 25;
			stats();
			purchase.play();
			setTimeout(function() {	
				purchase.stop();	
			}, 2000);
			var newCoins = {coins: users[i].ship.coins, val: 1};
			socket.emit('shopPurchase', newCoins);
		}
	}
}

function repair(name){
	for(i = 0; i < users.length; i++){
		if(name == users[i].username && users[i].ship.coins >= shopRepairCost){
			users[i].ship.coins -= shopRepairCost;
			users[i].ship.health = shipType.health;
			stats();
			purchase.play();
			setTimeout(function() {	
				purchase.stop();	
			}, 2000);
			var newData = {coins: users[i].ship.coins, health: users[i].ship.health, val: 2};
			socket.emit('shopPurchase', newData);
		}
	}
}

function fuel(name){
	for(i = 0; i < users.length; i++){
		if(name == users[i].username && users[i].ship.coins >= shopFuelCost){
			users[i].ship.coins -= shopFuelCost;
			users[i].ship.fuel += 50;
			stats();
			purchase.play()
			setTimeout(function() {	
				purchase.stop();	
			}, 2000);
			var newCoins = {coins: users[i].ship.coins, val: 1};
			socket.emit('shopPurchase', newCoins);
		}
	}
}

function done(name){
	for(i = 0; i < users.length; i++){
		if(name == users[i].username){
			users[i].ship.docked = false;
			console.log('bruh');
			var type = 2;
			socket.emit("playerDocked", type);
			document.getElementById("Merchant").style.display = "none";
			shopKeep.stop();
		}
	}
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.preload = "auto";
	this.sound.controls = "none";
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.volume = 0.3;
		this.sound.currentTime = 0;
		this.sound.loop = 'true';
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
		this.sound.loop = 'false';
	    	this.sound.currentTime = 0;
	}    
 }

function Dead(user, coins){
	this.user = user;
	this.coins = coins;
}

function User(username){
	this.ship = {};
	this.username = username;
}
function Bullet(x, y, dir, killer){
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.killer = killer;
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
			console.log(this.dir)
		};
		this.life = this.life - 1;
		checkDistance(me, bullets[i])
		for (u = 0; u <users.length; u++){
			if(checkDistance(users[u].ship, this) < 20 && users[u].ship != me && users[u].ship.docked == false && users[u].ship.health > 0){
				console.log(users[u].ship.docked);
				this.life = 0;
				users[u].ship.hit(this.x, this.y, users[u].username, this.killer);
			}
		}
	};
	this.draw = function() {
		game.context.beginPath();
		game.context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
		game.context.fillStyle = "rgba(255, 0, 0)";
		game.context.fill();
	}
	//move method 
			
		//check distant travled
			//self destruct if max distance or collides
				//if collides with ship emit damage
			//display boo
}

function Explosion(x, y, user, killer){
	this.x = x;
	this.y = y;
	this.user = user;
	this.killer = killer;
	this.img = document.createElement("img");
	this.img.src = "imgs/explosion.png";
	this.draw = function() {
		game.context.drawImage(this.img, this.x, this.y);
	}
}

function BountyShip(x, y, dir, a){// Ship.AI, moves w/no limitation/ don't hard code AI
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.a = a;
	this.coins = Math.floor(Math.random()*898) + 101;
	this.docked = false;
	this.img = document.createElement("img");
	this.img.src = "imgs/FinalAI.png";
	this.draw = function(){
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
	}
	this.move = function(){
		//movement
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
			console.log(this.dir)
		};
		//checking bounds
		if(this.x == map.minx){
			console.log(dis);
		} else if (this.x == map.maxx){
			console.log(dis);
		} else if (this.y == map.miny){
			console.log(dis);
		} else if (this.y == map.maxy){
			console.log(dis);
		}
	}
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
