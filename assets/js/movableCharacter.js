class MovableCharacter {
	constructor(width, height, entity, x, y) {
		this.width = width;
		this.height = height;
		this.entity = entity;
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
			spriteSheetMap.drawEntity(ctx, this.entity, "up",
				this.x, this.y, this.width, this.height);

			this.lastDirection = "up";

		} else if(this.speedY > 0) {
			spriteSheetMap.drawEntity(ctx, this.entity, "down",
				this.x, this.y, this.width, this.height);

			this.lastDirection = "down";

		} else if(this.speedX < 0) {
			spriteSheetMap.drawEntity(ctx, this.entity, "left",
				this.x, this.y, this.width, this.height);

			this.lastDirection = "left";

		} else if(this.speedX > 0) {
			spriteSheetMap.drawEntity(ctx, this.entity, "right",
				this.x, this.y, this.width, this.height);

			this.lastDirection = "right";

		} else {
			spriteSheetMap.drawEntity(ctx, this.entity, this.lastDirection,
				this.x, this.y, this.width, this.height);

		}

    }

    updatePosition() {
        this.x += this.speedX;
        this.y += this.speedY;
		this.x = this.handleWrapping(this.x, this.width, myGameArea.canvas.width);
		this.y = this.handleWrapping(this.y, this.height, myGameArea.canvas.height);
    }

}
