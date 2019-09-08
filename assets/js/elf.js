function elf(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
	this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
	this.lastDirection = "down";

    this.update = function() {
        ctx = myGameArea.context;

		if(this.speedY < 0) {
			ctx.drawImage(
				spriteSheet,
				spriteMap["rows"]["up"],
				spriteMap["columns"][this.color],
				spriteMap["source-size"],
				spriteMap["source-size"],
				this.x,
				this.y,
				spriteMap["destination-sizes"]["elf"],
				spriteMap["destination-sizes"]["elf"]
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
				spriteMap["destination-sizes"]["elf"],
				spriteMap["destination-sizes"]["elf"]
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
				spriteMap["destination-sizes"]["elf"],
				spriteMap["destination-sizes"]["elf"]
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
				spriteMap["destination-sizes"]["elf"],
				spriteMap["destination-sizes"]["elf"]
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
				spriteMap["destination-sizes"]["elf"],
				spriteMap["destination-sizes"]["elf"]
			);
		}

        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
		// ctx.strokeStyle = "#000000";
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

	this.updateSpeed = function() {
		this.speedX = 0;
		this.speedY = 0;
		this.speedX = getRndInteger((elfSpeeds[gameDifficulty]*-1),
									elfSpeeds[gameDifficulty]);
		this.speedY = getRndInteger((elfSpeeds[gameDifficulty]*-1),
									elfSpeeds[gameDifficulty]);
	}

    this.updatePosition = function() {
        this.x += this.speedX;
        this.y += this.speedY;
		this.x = this.handleWrapping(this.x, this.width, myGameArea.canvas.width);
		this.y = this.handleWrapping(this.y, this.height, myGameArea.canvas.height);
    }

	this.handleWrapping = function(position, length, canvasLength) {
		// if(position > (canvasLength-length)) {
			// position = (position-canvasLength);
		// } else if(position < 0) {
			// position = (canvasLength+position);
		// }

		if(position > canvasLength) {
			position = (position-canvasLength);
		} else if(position < (0-length)) {
			position = (canvasLength+position);
		}

		return position;
	}

}
