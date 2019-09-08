class MovableCharacter {
	constructor(width, height, color, x, y) {
		this.width = width;
		this.height = height;
		this.color = color;
		this.speedX = 0;
		this.speedY = 0;
		this.x = x;
		this.y = y;
		this.lastDirection = "down";
	}

    update() {
        ctx = myGameArea.context;

		// THIS IS THE CATCH HELPER OUTLINE
        // ctx.strokeRect((this.x - 10), (this.y - 10), (this.width + 20), (this.height + 20));

		if(this.speedY < 0) {
			ctx.drawImage(
				spriteSheet,
				spriteMap["columns"]["up"],
				spriteMap["rows"][this.color],
				spriteMap["source-size"],
				spriteMap["source-size"],
				this.x,
				this.y,
				this.width,
				this.height
			);

			this.lastDirection = "up";
		} else if(this.speedY > 0) {
			ctx.drawImage(
				spriteSheet,
				spriteMap["columns"]["down"],
				spriteMap["rows"][this.color],
				spriteMap["source-size"],
				spriteMap["source-size"],
				this.x,
				this.y,
				this.width,
				this.height
			);

			this.lastDirection = "down";
		} else if(this.speedX < 0) {
			ctx.drawImage(
				spriteSheet,
				spriteMap["columns"]["left"],
				spriteMap["rows"][this.color],
				spriteMap["source-size"],
				spriteMap["source-size"],
				this.x,
				this.y,
				this.width,
				this.height
			);

			this.lastDirection = "left";
		} else if(this.speedX > 0) {
			ctx.drawImage(
				spriteSheet,
				spriteMap["columns"]["right"],
				spriteMap["rows"][this.color],
				spriteMap["source-size"],
				spriteMap["source-size"],
				this.x,
				this.y,
				this.width,
				this.height
			);

			this.lastDirection = "right";
		} else {
			ctx.drawImage(
				spriteSheet,
				spriteMap["columns"][this.lastDirection],
				spriteMap["rows"][this.color],
				spriteMap["source-size"],
				spriteMap["source-size"],
				this.x,
				this.y,
				this.width,
				this.height
			);
		}

    }

    updatePosition() {
        this.x += this.speedX;
        this.y += this.speedY;
		this.x = this.handleWrapping(this.x, this.width, myGameArea.canvas.width);
		this.y = this.handleWrapping(this.y, this.height, myGameArea.canvas.height);
    }

}
