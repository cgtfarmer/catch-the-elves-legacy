var player1;
var gameTimer;
var gameCatchCounter;

var fonts = {"primary": "Arial"};

var spriteSheetMap = new SpriteSheetMap(
	["up", "right", "down", "left"],
	["santa", "elfBlue", "elfGray", "elfGreen", "elfOrange", "elfYellow"],
	new SpriteSheet("assets/images/spriteSheet.png", 100, 100)
);

var directionChangeRate = {
	easy : 150,
	medium : 100,
	hard : 50,
	insane : 25,
	legendary : 15,
	impossible : 10
};

var gameDifficulty;

const NUM_ELVES = 10;

var elves = [];

var updateCount = 0;
var spaceHasBeenEvaluated = false;

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
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function startGame(event, difficulty) {
	event.preventDefault();
	gameDifficulty = difficulty;
    myGameArea.start(); // disable?
	$("#game-canvas").show();
    player1 = new Player("santa", (myGameArea.canvas.width/2), (myGameArea.canvas.height/2));

	let timerFontSize = 28;
	gameTimer = new Timer(
		timerFontSize,
		fonts["primary"],
		(myGameArea.canvas.width - 190),
		(timerFontSize + 10)
	);

	let catchCounterFontSize = 20;
	gameCatchCounter = new Label(
		"CAUGHT: " + (NUM_ELVES - elves.length) + "/" + NUM_ELVES,
		catchCounterFontSize,
		fonts["primary"],
		"left",
		(myGameArea.canvas.width - 190),
		(catchCounterFontSize + 50)
	);
	gameCatchCounter.update();

	var elfOptions = Object.keys(spriteSheetMap.entities).slice(1);
	for(let i = 0; i < NUM_ELVES; i++) {
		let x = getRndInteger(0, (myGameArea.canvas.width - Elf.width));
		let y = getRndInteger(0, (myGameArea.canvas.height - Elf.height));
		let color = elfOptions[getRndInteger(0, elfOptions.length - 1)];
		elves[i] = new Elf(color, x, y);
	}

}

function updateGameArea() {
    myGameArea.clear();

	player1.updateSpeed();
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

	gameCatchCounter.text = "CAUGHT: " + (NUM_ELVES - elves.length) + "/" + NUM_ELVES;
    gameCatchCounter.update();
	// }
	return;
}

function endGame() {
	myGameArea.clear();

	var youWinLabel = new Label("You Win!", 108, fonts["primary"], "center", myGameArea.canvas.width/2, (myGameArea.canvas.height/2) - 20);
	var endTimeLabel = new Label("Time: " + gameTimer.minutes + ":" + gameTimer.seconds + ":" + gameTimer.centiseconds, 36, fonts["primary"], "center", myGameArea.canvas.width/2, (myGameArea.canvas.height/2) + 55);

	youWinLabel.update();
	endTimeLabel.update();
	return;
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

