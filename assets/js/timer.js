var MILLISECONDS_PER_CENTISECOND = 10;

class Timer extends Label {
	constructor(fontSize, fontFamily, x, y) {
		super("TIME: 0", fontSize, fontFamily, "left", x, y);
		this.centiseconds = 0;
		this.seconds = 0;
		this.minutes = 0;
	}

	increment() {

		// console.log("Before increment: " + this.centiseconds);
		this.centiseconds += 1;
		// console.log("After increment: " + this.centiseconds);
		if(this.centiseconds >= 100) {
			// console.log("incrementing seconds...");
			this.centiseconds = 0;
			this.seconds++;
		}
//
		if(this.seconds >= 60) {
			this.seconds = 0;
			this.minutes++;
		}

		// let clock = (myGameArea.frameNumber * 2);
		// this.centiseconds = clock % 100;
// //
		// if(clock % 100 == 0) {
			// this.centiseconds = 0;
			// this.seconds++;
		// }
// //
		// if(this.seconds >= 60) {
			// this.seconds = 0;
			// this.minutes++;
		// }
//
		return;
	}

    update() {
		// console.log(this.seconds);

		this.text = "TIME: " + this.minutes + ":" + this.seconds + ":" + this.centiseconds;

		super.update();
		return;
    }
}
