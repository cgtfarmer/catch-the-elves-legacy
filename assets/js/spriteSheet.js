class SpriteSheet {

	constructor(filepath, spriteWidth, spriteHeight) {
		let spriteSheet = new Image();
		spriteSheet.src = filepath;

		this.image = spriteSheet;
		this.spriteWidth = spriteWidth;
		this.spriteHeight = spriteHeight;
	}

}
