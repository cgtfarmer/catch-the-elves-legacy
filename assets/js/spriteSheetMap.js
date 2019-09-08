class SpriteSheetMap {

	constructor(orientations, entities, spriteSheet) {
		this.spriteSheet = spriteSheet;

		this.orientations = {};
		var x = 0;
		for(let orientation of orientations) {
			this.orientations[orientation] = x;
			x += this.spriteSheet.spriteWidth;
		}

		this.entities = {};
		var y = 0;
		for(let entity of entities) {
			this.entities[entity] = y;
			y += this.spriteSheet.spriteHeight;
		}

		return;
	}

	drawEntity(ctx, entity, orientation, x, y, width, height) {
		ctx.drawImage(
			this.spriteSheet.image,
			this.orientations[orientation],
			this.entities[entity],
			this.spriteSheet.spriteWidth,
			this.spriteSheet.spriteHeight,
			x,
			y,
			width,
			height
		);

		return;
	}

}
