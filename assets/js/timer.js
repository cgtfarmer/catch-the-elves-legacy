class Timer extends Label {
	constructor(fontSize, fontFamily, x, y) {
		super("TIME: 0", fontSize, fontFamily, "left", x, y);
		this.centiseconds = 0;
		this.seconds = 0;
		this.minutes = 0;
	}

    update() {
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

		super.update();
    }
}
