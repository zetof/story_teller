class Tool {
	constructor(src, activate_callback) {
		let tools = document.getElementById("tools") 
		this.tool = document.createElement("img")
		this.tool.src = "css/cursors/" + src
		this.tool.classList.add("tool")
		tools.appendChild(this.tool)
		this.activate_callback = activate_callback
		this.active = false
		this.x = 0
		this.y = 0
		this.prev_x = 0
		this.prev_y = 0
		this.zoom = .25
		this.angle = 0
		this.occurence = 0
		this.tool.addEventListener("click", this.activate.bind(this))
		this.tool.addEventListener("load", this.set_dimensions.bind(this))
	}

    get_dom() {
    	return this.tool
    }

	get_coordinates() {
		return { x: this.x, y: this.y, prev_x: this.prev_x, prev_y: this.prev_y }
	}

	get_geometry() {
		return { width: this.zoom * this.width, height: this.zoom * this.height, o_width: this.width, o_height: this.height, angle: this.angle * Math.PI / 180 }
	}

	is_active() {
		return this.active
	}

	change_zoom(inc) {
		this.prev_x = this.x
		this.prev_y = this.y
		this.zoom -= inc / 10
		if(this.zoom < .1) this.zoom = .1
		if(this.zoom > 1) this.zoom = 1
	}

	set_dimensions() {
		var angle = this.angle * Math.PI / 180
		this.width = Math.abs(this.tool.naturalWidth * Math.cos(angle) + this.tool.naturalHeight * Math.sin(angle))
		this.height = Math.abs(this.tool.naturalHeight * Math.cos(angle) + this.tool.naturalWidth * Math.sin(angle))
	}

	change_angle(inc) {
		this.prev_x = this.x
		this.prev_y = this.y
		this.angle -= inc * 100
		if(this.angle < 0) this.angle = 360 + this.angle
		if(this.angle > 360) this.angle = 0
	}

	activate() {
		this.activate_callback(this)
		this.tool.style.border = "2px solid white"
	}

	deactivate() {
		this.tool.style.border = "2px solid transparent"
	}	

	mouse_down(x, y) {
		if(this.unique && this.occurence > 0) return false
		else {
			this.x = x - this.zoom * this.width / 2
			this.y = y - this.zoom * this.height / 2
			this.occurence += 1
			return true
		}
	}

	mouse_move(dx, dy) {
		this.prev_x = this.x
		this.prev_y = this.y
		this.x = this.x -= dx
		this.y = this.y -= dy
	}

	mouse_out(x, y) {
	}

	mouse_over(x, y) {
		this.x = x - this.zoom * this.width / 2
		this.y = y - this.zoom * this.height / 2
		this.prev_x = this.x
		this.prev_y = this.y
	}
}