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

