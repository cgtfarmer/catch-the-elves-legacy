
class Elf extends MovableCharacter {

	constructor(color, x, y) {
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
		this.speedX = getRndInteger((Elf.speeds[gameDifficulty] * -1),
									Elf.speeds[gameDifficulty]);
		this.speedY = getRndInteger((Elf.speeds[gameDifficulty] * -1),
									Elf.speeds[gameDifficulty]);
	}

}

Elf.width = 30;
Elf.height = 30;
Elf.speeds = {
	easy : 1,
	medium : 2,
	hard : 5,
	insane : 7,
	legendary : 11,
	impossible : 15
};
