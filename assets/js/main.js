var player1;
var gameTimer;
var gameCatchCounter;

const NUM_ELVES = 10;

var elves = [];
var elfColors = ["#000000", "#00ff00", "#0000ff", "#00ffff", "#ffff00", "#ff00ff"];

var updateCount = 0;
var spaceHasBeenEvaluated = false;
var time = 0;

var youWinLabel;
var endTimeLabel;

var myGameArea = {
	keys : [],
	frameNumber : 0,
	canvas : $("#game-canvas")[0], // Notice: [0]
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
		if(this.interval == null) {

			clearInterval(this.interval);
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
				spaceHasBeenEvaluated = false;
			});

		}
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
				gameCatchCounter.update();
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

function timer(fontSize, x, y) {
    this.gamearea = myGameArea;
	this.fontSize = fontSize;
    this.x = x;
    this.y = y;
	this.text = "TIME: 0";
	this.centiseconds = 0;
	this.seconds = 0;
	this.minutes = 0;

    this.update = function() {
		ctx = myGameArea.context;
		ctx.font = fontSize + "px Arial";
		ctx.fillStyle = "#000000";

		let clock = (myGameArea.frameNumber*2);
		this.centiseconds = clock % 100;

		if(clock % 100 == 0) {
			this.centiseconds = 0;
			this.seconds++;
		}

		if(this.seconds >= 60) {
			this.seconds = 0;
			this.minutes++;
		}

		this.text = "TIME: " + this.minutes + ":" + this.seconds + ":" + this.centiseconds;
		ctx.fillText(this.text, this.x, this.y);
    }

	return;
}

function catchCounter(fontSize, x, y) {
    this.gamearea = myGameArea;
	this.fontSize = fontSize;
    this.x = x;
    this.y = y;
	this.text = "CAUGHT: " + (NUM_ELVES - elves.length) + "/" + NUM_ELVES;

    this.update = function() {
		ctx = myGameArea.context;
		ctx.font = fontSize + "px Arial";
		ctx.fillStyle = "#000000";
		this.text = "CAUGHT: " + (NUM_ELVES - elves.length) + "/" + NUM_ELVES;
		ctx.fillText(this.text, this.x, this.y);
    }

	return;
}

function startGame(event, difficulty) {
	event.preventDefault();
	console.log(event);
	console.log(difficulty);

    myGameArea.start(); // disable?
	$("#game-canvas").show();
    player1 = new player(30, 30, "#ff0000", 10, 120);

	let timerFontSize = 28;
	gameTimer = new timer(timerFontSize, (myGameArea.canvas.width - 190), (timerFontSize + 10));

	let catchCounterFontSize = 20;
	gameCatchCounter = new catchCounter(catchCounterFontSize, (myGameArea.canvas.width - 190), (catchCounterFontSize + 50));
	gameCatchCounter.update();

	var elfWidth = 30;
	var elfHeight = 30;
	for(i = 0; i < NUM_ELVES; i++) {
		let x = getRndInteger(0, (myGameArea.canvas.width - elfWidth));
		let y = getRndInteger(0, (myGameArea.canvas.width - elfHeight));
		let color = elfColors[getRndInteger(0, elfColors.length)];
		elves[i] = new elf(elfWidth, elfHeight, color, x, y);
	}

}

function updateGameArea() {
    myGameArea.clear();
    player1.speedX = 0;
    player1.speedY = 0;
    if(myGameArea.keys && myGameArea.keys[37]) {player1.speedX = -2; }
    if(myGameArea.keys && myGameArea.keys[39]) {player1.speedX = 2; }
    if(myGameArea.keys && myGameArea.keys[38]) {player1.speedY = -2; }
    if(myGameArea.keys && myGameArea.keys[40]) {player1.speedY = 2; }
    if(myGameArea.keys && myGameArea.keys[32]) {
		if(!spaceHasBeenEvaluated) {
			// console.log("Attempting catch");
			player1.attemptCatch();
			spaceHasBeenEvaluated = true;
		} else {
			// console.log("Not attempting catch");
		}
	}
    player1.updatePosition();
    player1.update();

	if(elves.length < 1) {
		endGame();
		return;
	}

	if(myGameArea.frameNumber % 50 == 0 || myGameArea.frameNumber == 0) {
		for(i = 0; i < elves.length; i++) {
			var elf = elves[i];
			elf.speedX = 0;
			elf.speedY = 0;
			elf.speedX = getRndInteger(-5, 5);
			elf.speedY = getRndInteger(-5, 5);
		}
		updateCount = 0;
	}

	for(i = 0; i < elves.length; i++) {
		var elf = elves[i];
		elf.updatePosition();
		elf.update();
	}

	updateCount++;

	// if(myGameArea.frameNo == 1 || everyinterval(150)) {
	myGameArea.frameNumber += 1;
    gameTimer.update();
    gameCatchCounter.update();
	// }
	return;
}

function label(text, fontSize, x, y) {
	this.text = text;
	this.fontSize = fontSize;
	this.x = x;
	this.y = y;

    this.update = function() {
		ctx = myGameArea.context;
		ctx.font = this.fontSize + "px Arial";
		ctx.fillStyle = "#000000";
		ctx.textAlign = "center";
		ctx.fillText(this.text, this.x, this.y);
    }

}

function endGame() {
	myGameArea.clear();

	youWinLabel = new label("You Win!", 108, myGameArea.canvas.width/2, (myGameArea.canvas.height/2) - 20);
	endTimeLabel = new label("Time: " + gameTimer.minutes + ":" + gameTimer.seconds + ":" + gameTimer.centiseconds, 36, myGameArea.canvas.width/2, (myGameArea.canvas.height/2) + 55);

	youWinLabel.update();
	endTimeLabel.update();
	return;
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function convertSecondsToTimeStr(hundredthSeconds) {
	// console.log(hundredthSeconds);
	let seconds = hundredthSeconds/100;

	let minutes = Math.floor(seconds/60);
	return minutes + ":" + seconds;
}

