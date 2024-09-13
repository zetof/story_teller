class Palette {
	constructor(palette_name, canvas) {
        this.palette = document.getElementById(palette_name)
        this.canvas = canvas
	}

	add_tool(tool) {
		this.palette.appendChild(tool.cursor)
		this.canvas.add_tool(tool)
	}
}