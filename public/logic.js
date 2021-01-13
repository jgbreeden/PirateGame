var socket = io({transports: ['websocket'], upgrade: false});
var users = [];
var bullets = [];
var update;
var me;
var myname;
let radlen = 100;
let maxwidth = 800;
let maxheight = 600;
var Surface = document.getElementById("GameArea");
var login = document.getElementById("LoginArea");
var modal = document.getElementById('idea');
Surface.style.height = maxheight;
Surface.style.width = maxwidth;


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var game = {
	canvas: document.getElementById("GameCanvas"),
	start: function () {
		this.canvas.width = maxwidth;
		this.canvas.height = maxheight;
		this.context = this.canvas.getContext("2d");
		this.img = document.createElement("img");
		this.img.src = "imgs/ocean.png";
		window.addEventListener('keypress', function (e) {
			handleKey(e.code);
		  })
	},
	draw : function() {
		this.context.drawImage(this.img, 0, 0);
	},
	clear : function() {
		this.context.clearRect(0, 0, maxwidth, maxheight);
	}
}
var map = {
	minx: 45,
	maxx: 730,
	miny: 70,
	maxy: 555,
	islands: [
		{
			name: "",
			north: 175,
			south: 250,
			east: 265,
			west: 125
		},
		{
			name: "",
			north: 100,
			south: 210,
			east: 440,
			west: 322
		},
		{
			name: "",
			north: 297,
			south: 366,
			east: 397,
			west: 341
		},
		{
			name: "",
			north: 350,
			south: 475,
			east: 560,
			west: 406
		}, 
		{
			name: "",
			north: 390,
			south: 495,
			east: 485,
			west: 205
		}
	],
	corners: [
		{//top corner, left
			north: 60,
			south: 80,
			east: 50,
			west: 30			
		},
		{//top corner, right
			north: 60,
			south: 80,
			east: 690,
			west: 670			
		},
		{//bottom corner, left
			north: 570,
			south: 590,
			east: 50,
			west: 30			
		},
		{//bottom corner, right
			north: 570,
			south: 590,
			east: 690,
			west: 670			
		}
	],
	ports: [
		{
			x: 53,
			y: 333
		},
		{
			x: 723,
			y: 501
		},
		{
			x: 658,
			y: 64
		}
	]
};
var ships = {
    ships: [
      {
        name: "Silver Bullet",
        health: 100,
        ammo: 15,
	   speed: 8,
	   fuel: 150,
	   length: 3,
	   coins: 150
      },
      {
        name: "S.S Payback",
        health: 125,
        ammo: 20,
	   speed: 5,
	   fuel: 125,
	   length: 4,
	   coins: 125
      },
      {
        name: "Battleship Batalion",
        health: 225,
        ammo: 35,
	   speed: 4,
	   fuel: 225,
	   length: 5,
	   coins: 350
      },
      {
        name: "Catalyst Cruiser",
        health: 150,
        ammo: 25,
	   speed: 6,
	   fuel: 175,
	   length: 3,
	   coins: 175
      },
      {
        name: "Submarine Subjugator",
        health: 250,
        ammo: 50,
	   speed: 3,
	   fuel: 275,
	   length: 6,
	   coins: 250
      }
    ]
};

function handleKey(code){
	if (code == "KeyW") {//move forward
		var dis = shipType.speed;
		if (me.fuel > 0){
			var movement = new Move(0, dis, myname);
			socket.emit("playerMove", movement);
			me.move(movement);
		}
	}
	if (code == "KeyS"){//move backwards
		var dis = -shipType.speed;
		if (me.fuel > 0){
			var movement = new Move(0, dis, myname);
			socket.emit("playerMove", movement);
			me.move(movement);
		}
	}
	if (code == "KeyD"){//turn right
		var dir = 45;
		var dis = shipType.speed;
		if (me.fuel > 0){
			var movement = new Move(dir, dis, myname);
			socket.emit("playerMove", movement);
			me.move(movement);
		}
	}
	if(code == "KeyA"){//turn left
		var dir = -45;
		var dis = shipType.speed;
		if (me.fuel > 0){
			var movement = new Move(dir, dis, myname);
			socket.emit("playerMove", movement);
			me.move(movement);  
		}   
	}

	if (code == "KeyY"){//dock
		me.dock();
		console.log('Key works')


	}
	
	if(code == "KeyE"){//fire
		if (me.munitions > 0 ){
			var shoot = new Bullet(me.x, me.y, me.dir, myname);
			socket.emit("shipFire", shoot);
			bullets.push(shoot);
			me.munitions--;
			document.getElementById("pAmmo").innerHTML = 'Ammunition: '+ me.munitions;
			console.log("Bullets left " + me.munitions);
		} else {
			console.log("Out of Bullets");
		}
	}
	if(code == "KeyQ"){
		for(i = 0; i < users.length; i++){
			if(users[i].ship.health == 0 && users[i].ship != me && me.x < users[i].ship.x + 20
			  && me.x > users[i].ship.x - 20 && me.y < users[i].ship.y + 20 && me.y > users[i].ship.y - 20){
				  console.log(users[i].ship.coins + " " + me.coins);
				  me.coins += users[i].ship.coins;
				  stats();
			}
		}
	}
}

function getCursorPosition(canvas, event) {
	const rect = canvas.getBoundingClientRect()
	const x = event.clientX - rect.left
	const y = event.clientY - rect.top
	console.log("x: " + x + " y: " + y)
 }
 
 const canvas = document.querySelector('canvas')
 canvas.addEventListener('mousedown', function(e) {
	getCursorPosition(canvas, e)
 })

function gameUpdate(){
	game.clear();
	game.draw();
	for(i = 0; i < users.length; i++){
		if(users[i].ship.visible || users[i].ship.explosion){
			users[i].ship.draw();
		}
	}
	me.draw();
	for (i = 0; i < bullets.length; i++){
		bullets[i].move();
		if (bullets[i].life > 0) {
			bullets[i].draw();
		} else {
			bullets.splice(i, 1)
		}
	};
}

function serverStart(AI){
	var x = 400;
	var y = 300;
	game.start();
	$('#lobby').hide();
	$("#GameArea").show();
	for (i = 0; i < users.length; i++){
		if (users[i].username == myname) {
			x = map.islands[i].west;
			y = map.islands[i].south;
			me = new PlayerShip(x , y, 0, 0);
			users[i].ship = me;
		} else {
			users[i].ship = new PlayerShip(400, 300, 0, 0);
		}
	}
	update = setInterval(gameUpdate, 20);
	me.visible = true;
	playerPos();
	console.log("start");
	console.log(AI);
}

function checkDistance(ob1, ob2) {
	x1 = ob1.x;
	x2 = ob2.x;
	y1 = ob1.y;
	y2 = ob2.y;
	difx = x1 - x2;
	dify = y1 - y2;
	powx = Math.pow(difx, 2);
	powy = Math.pow(dify, 2);
	sum = powx + powy;
	distance = Math.sqrt(sum);
	return distance;
}

function playerPos(){
	var pos = new startPosition(myname, me.x, me.y, shipType.imgName, shipType.health, shipType.coins);
	socket.emit("startPosition", pos);
}

function dead(death){
	socket.emit('playerKilled', death);
	console.log(death);
}

function gameStart(){
	socket.emit("startGame");
}

function openHelp() {
	$("#help").show();
}
function closeHelp() {
	$("#help").hide();
}
$(function () {
	$('#loginForm').submit(function(e) {
		e.preventDefault();
		myname = $('#uname').val();
		socket.emit("new user", myname, function(data){
		//gameStart();
			$('#LoginArea').hide();
			$('#lobby').show();
		});
	});
	socket.on("startPosition", function(pos) {
		for (i = 0; i < users.length; i++){
			if (users[i].username == pos.user){
				users[i].ship.x = pos.x;
				users[i].ship.y = pos.y;
				users[i].ship.img.src = pos.img;
				users[i].ship.health = pos.health;
				users[i].ship.coins = pos.coins;
				console.log(users[i].ship.coins)
				break;
			}
		}
	});
	socket.on("shipFire", function(ev) {
		console.log("Other Ship Fire")
	});
	socket.on("user list", function(list) {
		$('#userList').text('');
		users = [];
		for (i = 0; i < list.length; i++) { 
			$('#userList').append($('<li>').text(list[i]));
			var player = new User(list[i]);
			users.push(player);
		}
	});
	socket.on("late user", function(user) {
		var player = new User(user);
		player.ship = new PlayerShip(400, 300, 0, 0);
		users.push(player);
	});
	socket.on("playerHit", function(playerHit) {
		for(i = 0; i < users.length; i++){
			if(playerHit.user == users[i].username){
				users[i].ship.health -= 25;
				stats();
				users[i].ship.explosion = new Explosion(playerHit.x, playerHit.y, playerHit.username);
				var user = users[i]
				setTimeout(function() {	
					user.ship.explosion = false;	
				}, 500);
				if(me.health == 0){
					me.img.src = "imgs/treasure.png";
					var death = new Dead(users[i].username, users[i].ship.coins)
					dead(death);
				}
			}
		}
	});
	socket.on('playerKilled', function(dead){
		for(i = 0; i < users.length; i++){
			if(dead.user == users[i].username){
				console.log("bruh");
				users[i].ship.img.src = "imgs/treasure.png";
				users[i].ship.coins = dead.coins;
			}
		}
	});
	socket.on('playerMove', function(movement) {
		for(i = 0; i < users.length; i ++){
			if(movement.user == users[i].username){
				users[i].ship.move(movement);
			}
		};
	});
	socket.on('playerDocked', function(user){
		for(c= 0; c < users.length; c++){
			if(user == users[c].username){
				users[c].ship.docked = true;
			}
		}
	});
	socket.on("joinInProgress", function(list) {
		$("#LoginArea").hide();
		users = [];
		for (i = 0; i < list.length; i++) { 
			$('#userList').append($('<li>').text(list[i]));
			var player = new User(list[i]);
			users.push(player);
		}
		serverStart();
	});	
	socket.on("startGame", function(AI){
		serverStart(AI);
	});
});