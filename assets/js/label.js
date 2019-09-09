class Label {
	constructor(text, fontSize, fontFamily, x, y) {
		this.text = text;
		this.fontSize = fontSize;
		this.fontFamily = fontFamily;
		this.x = x;
		this.y = y;
	}

    update() {
		ctx = myGameArea.context;
		ctx.font = this.fontSize + "px " + this.fontFamily;
		ctx.fillStyle = "#000000";
		ctx.textAlign = "center";
		ctx.fillText(this.text, this.x, this.y);
    }

}
