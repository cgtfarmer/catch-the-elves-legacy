class Elf extends MovableCharacter {

	constructor(width, height, color, x, y) {
		super(width, height, color, x, y);
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
