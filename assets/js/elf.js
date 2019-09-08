class Elf extends MovableCharacter {

	constructor(color, x, y) {
		// let width = 30;
		// let height = 30;
		super(Elf.width, Elf.height, color, x, y);
	}

	handleWrapping(position, length, canvasLength) {

		if(position > canvasLength) {
			position = position - canvasLength;
		} else if(position < (0 - length)) {
			position = canvasLength + position;
		}

		return position;
	}

	updateSpeed() {
		this.speedX = 0;
		this.speedY = 0;
		this.speedX = getRndInteger((elfSpeeds[gameDifficulty]*-1),
									elfSpeeds[gameDifficulty]);
		this.speedY = getRndInteger((elfSpeeds[gameDifficulty]*-1),
									elfSpeeds[gameDifficulty]);
	}

}

Elf.width = 30;
Elf.height = 30;
