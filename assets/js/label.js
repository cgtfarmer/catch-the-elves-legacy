class Label {
	constructor(text, fontSize, fontFamily, alignment, x, y) {
		this.text = text;
		this.fontSize = fontSize;
		this.fontFamily = fontFamily;
		this.alignment = alignment;
		this.x = x;
		this.y = y;
	}

    update() {
		let ctx = myGameArea.context;
		ctx.font = this.fontSize + "px " + this.fontFamily;
		ctx.fillStyle = "#000000";
		ctx.textAlign = this.alignment;
		ctx.fillText(this.text, this.x, this.y);
    }

}
