class Player extends MovableCharacter {

	constructor(color, x, y) {
		super(Player.width, Player.height, color, x, y);
	}

	handleWrapping(position, length, canvasLength) {

		if(position > (canvasLength-length)) {
			position = (canvasLength-length);
		} else if(position < 0) {
			position = 0;
		}

		return position;
	}

	attemptCatch() {
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

Player.width = 50;
Player.height = 50;

