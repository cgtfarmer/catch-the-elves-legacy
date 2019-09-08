class MovableCharacter {
	constructor(width, height, color, x, y) {
		this.gamearea = myGameArea;
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

        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
//
		// ctx.strokeStyle = "#000000";
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
//
		// THIS IS THE CATCH HELPER OUTLINE
        // ctx.strokeRect((this.x - 10), (this.y - 10), (this.width + 20), (this.height + 20));

		if(this.speedY < 0) {
			ctx.drawImage(
				spriteSheet,
				spriteMap["rows"]["up"],
				spriteMap["columns"][this.color],
				spriteMap["source-size"],
				spriteMap["source-size"],
				this.x,
				this.y,
				spriteMap["destination-sizes"][this.color],
				spriteMap["destination-sizes"][this.color]
			);

			this.lastDirection = "up";
		} else if(this.speedY > 0) {
			ctx.drawImage(
				spriteSheet,
				spriteMap["rows"]["down"],
				spriteMap["columns"][this.color],
				spriteMap["source-size"],
				spriteMap["source-size"],
				this.x,
				this.y,
				spriteMap["destination-sizes"][this.color],
				spriteMap["destination-sizes"][this.color]
			);

			this.lastDirection = "down";
		} else if(this.speedX < 0) {
			ctx.drawImage(
				spriteSheet,
				spriteMap["rows"]["left"],
				spriteMap["columns"][this.color],
				spriteMap["source-size"],
				spriteMap["source-size"],
				this.x,
				this.y,
				spriteMap["destination-sizes"][this.color],
				spriteMap["destination-sizes"][this.color]
			);

			this.lastDirection = "left";
		} else if(this.speedX > 0) {
			ctx.drawImage(
				spriteSheet,
				spriteMap["rows"]["right"],
				spriteMap["columns"][this.color],
				spriteMap["source-size"],
				spriteMap["source-size"],
				this.x,
				this.y,
				spriteMap["destination-sizes"][this.color],
				spriteMap["destination-sizes"][this.color]
			);

			this.lastDirection = "right";
		} else {
			ctx.drawImage(
				spriteSheet,
				spriteMap["rows"][this.lastDirection],
				spriteMap["columns"][this.color],
				spriteMap["source-size"],
				spriteMap["source-size"],
				this.x,
				this.y,
				spriteMap["destination-sizes"][this.color],
				spriteMap["destination-sizes"][this.color]
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
