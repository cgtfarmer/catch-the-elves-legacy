var player1;
var elves = [];
var updateCount = 0;

var myGameArea = {
	keys : null,
	canvas : $("#game-canvas")[0], // Notice: [0]
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        $("#page-grid").keydown(function(e) {
			if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
			}
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        });
        $("#page-grid").keyup(function(e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        });
        // window.addEventListener('keydown', function(e) {
            // myGameArea.keys = (myGameArea.keys || []);
            // myGameArea.keys[e.keyCode] = (e.type == "keydown");
        // })
        // window.addEventListener('keyup', function (e) {
            // myGameArea.keys[e.keyCode] = (e.type == "keydown");
        // })
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function player(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect((this.x - 10), (this.y - 10), (this.width + 20), (this.height + 20));
    }

    this.updatePosition = function() {
        this.x += this.speedX;
        this.y += this.speedY;
		this.x = this.handleWrapping(this.x, this.width, myGameArea.canvas.width);
		this.y = this.handleWrapping(this.y, this.height, myGameArea.canvas.height);
    }

	this.handleWrapping = function(position, length, canvasLength) {

		if(position > (canvasLength-length)) {
			position = (canvasLength-length);
		} else if(position < 0) {
			position = 0;
		}

		return position;
	}

	this.attemptCatch = function() {
		for(i = 0; i < elves.length; i++) {
			var elf = elves[i];

			if(elf.x >= (this.x - 10) &&
				elf.y >= (this.y - 10) &&
				(elf.x + elf.width) <= ((this.x  + this.width) + 10) &&
				(elf.y + elf.height) <= ((this.y + this.height) + 10)) {
				elves.splice(i, 1);
				console.log("Hit");
			} else {
				console.log("Miss");
			}
		}

		return;
	}

}

function elf(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.updatePosition = function() {
        this.x += this.speedX;
        this.y += this.speedY;
		this.x = this.handleWrapping(this.x, this.width, myGameArea.canvas.width);
		this.y = this.handleWrapping(this.y, this.height, myGameArea.canvas.height);
    }

	this.handleWrapping = function(position, length, canvasLength) {
		// if(position > (canvasLength-length)) {
			// position = (position-canvasLength);
		// } else if(position < 0) {
			// position = (canvasLength+position);
		// }

		if(position > canvasLength) {
			position = (position-canvasLength);
		} else if(position < (0-length)) {
			position = (canvasLength+position);
		}

		return position;
	}

}

function startGame() {
    myGameArea.start();
    player1 = new player(30, 30, "#ff0000", 10, 120);

	for(i = 0; i < 5; i++) {
		elves[i] = new elf(30, 30, "#000000", 30, 120);
	}
}

function updateGameArea() {
    myGameArea.clear();
    player1.speedX = 0;
    player1.speedY = 0;
    if(myGameArea.keys && myGameArea.keys[37]) {player1.speedX = -1; }
    if(myGameArea.keys && myGameArea.keys[39]) {player1.speedX = 1; }
    if(myGameArea.keys && myGameArea.keys[38]) {player1.speedY = -1; }
    if(myGameArea.keys && myGameArea.keys[40]) {player1.speedY = 1; }
    if(myGameArea.keys && myGameArea.keys[32]) {player1.attemptCatch(); }
    player1.updatePosition();
    player1.update();

	if(elves.length < 1) {
		return;
	}

	if(updateCount == 50) {
		for(i = 0; i < elves.length; i++) {
			var elf = elves[i];
			elf.speedX = 0;
			elf.speedY = 0;
			elf.speedX = getRndInteger(-3, 3);
			elf.speedY = getRndInteger(-3, 3);
		}
		updateCount = 0;
	}

	for(i = 0; i < elves.length; i++) {
		var elf = elves[i];
		elf.updatePosition();
		elf.update();
	}

	updateCount++;
	return;
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

