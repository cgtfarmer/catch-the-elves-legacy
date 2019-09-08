var player1;
var gameTimer;
var gameCatchCounter;

var spriteMap = {
	"filepath": "assets/images/spriteSheet.png",
	"source-size": 100,
	"destination-sizes": {
		"elf": 30,
		"santa": 50
	},
	"rows": {
		"up": 0,
		"right": 100,
		"down": 200,
		"left": 300
	},
	"columns": {
		"santa": 0,
		"elfBlue": 100,
		"elfGray": 200,
		"elfGreen": 300,
		"elfOrange": 400,
		"elfYellow": 500
	}
};

spriteSheet = new Image();
spriteSheet.src = spriteMap["filepath"];

var elfSpeeds = { easy : 1,
				  medium : 2,
				  hard : 5,
				  insane : 7,
				  legendary : 11,
				  impossible : 15 };

var directionChangeRate = { easy : 150,
							medium : 100,
							hard : 50,
							insane : 25,
							legendary : 15,
							impossible : 10 };

var gameDifficulty;

const NUM_ELVES = 10;

var elves = [];
// var elfColors = ["#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff", "#ff8800"];
var elfColors = ["elfBlue", "elfGray", "elfGreen", "elfOrange", "elfYellow"]

var updateCount = 0;
var spaceHasBeenEvaluated = false;
var time = 0;

var youWinLabel;
var endTimeLabel;

// ===========================================================================
// => END OF GLOBAL VARIABLES
// ===========================================================================

var myGameArea = {
	keys : [],
	frameNumber : 0,
	canvas : $("#game-canvas")[0], // Notice: [0]
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
		this.frameNumber = 0;
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
	gameDifficulty = difficulty;
	// console.log(event);
	// console.log(difficulty);

    myGameArea.start(); // disable?
	$("#game-canvas").show();
    // player1 = new player(30, 30, "#ff0000", (myGameArea.canvas.width/2), (myGameArea.canvas.height/2));
    player1 = new Player(spriteMap["destination-sizes"]["santa"], spriteMap["destination-sizes"]["santa"], "santa", (myGameArea.canvas.width/2), (myGameArea.canvas.height/2));

	let timerFontSize = 28;
	gameTimer = new timer(timerFontSize, (myGameArea.canvas.width - 190), (timerFontSize + 10));

	let catchCounterFontSize = 20;
	gameCatchCounter = new catchCounter(catchCounterFontSize, (myGameArea.canvas.width - 190), (catchCounterFontSize + 50));
	gameCatchCounter.update();

	var elfWidth = spriteMap["destination-sizes"]["elf"];
	var elfHeight = spriteMap["destination-sizes"]["elf"];
	for(i = 0; i < NUM_ELVES; i++) {
		let x = getRndInteger(0, (myGameArea.canvas.width - elfWidth));
		let y = getRndInteger(0, (myGameArea.canvas.width - elfHeight));
		let color = elfColors[getRndInteger(0, elfColors.length - 1)];
		elves[i] = new Elf(elfWidth, elfHeight, color, x, y);
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

	if(myGameArea.frameNumber % directionChangeRate[gameDifficulty] == 0 || myGameArea.frameNumber == 0) {

		for(i = 0; i < elves.length; i++) {
			elves[i].updateSpeed();
		}

		updateCount = 0;
	}

	for(i = 0; i < elves.length; i++) {
		elves[i].updatePosition();
		elves[i].update();
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

