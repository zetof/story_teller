class CanvasImage {
    constructor(canvas_name) {
        this.canvas = document.getElementById(canvas_name)
        this.context = this.canvas.getContext("2d")
        this.geometry()
        this.left_down = false
        this.image = new Image()
        this.image.onload = this.display.bind(this)
        this.canvas.addEventListener("mousedown", this.mouse_down.bind(this))
        this.canvas.addEventListener("mousemove", this.mouse_move.bind(this))
        this.canvas.addEventListener("mouseup", this.mouse_up.bind(this))
        this.canvas.addEventListener("mouseout", this.mouse_out.bind(this))
    }

    geometry() {
        var dim = this.canvas.getBoundingClientRect()
        this.c_x = Math.round(dim.left)
        this.c_y = Math.round(dim.top)
        this.c_width = Math.round(dim.width)
        this.c_height = Math.round(dim.height)
        this.canvas.width = this.c_width
        this.canvas.height = this.c_height
    }

    load(character, index) {
        this.step = 0
        this.pose = character.poses[index] 
        this.i_x = this.pose.i_x
        this.i_y = this.pose.i_y
        this.zoom = this.pose.zoom
        this.image.src = "actresses/" + character.base_dir + "/" + this.pose.picture
    }

    display() {
        this.i_width = this.image.width
        this.i_height = this.image.height
        this.context.drawImage(this.image, this.i_x, this.i_y, this.c_width / this.zoom, this.c_height / this.zoom, 0, 0, this.c_width, this.c_height)
    }

    mouse_down(e) {
        this.left_down = true
        this.mouse_x = e.clientX
        this.mouse_y = e.clientY
    }

    mouse_move(e) {
        if(this.left_down) {
            this.i_x += (this.mouse_x - e.clientX)
            this.i_y += (this.mouse_y - e.clientY)
            if(this.i_x < 0) this.i_x = 0
            if(this.i_x > this.i_width - this.c_width / this.zoom) this.i_x = this.i_width - this.c_width / this.zoom
            if(this.i_y < 0) this.i_y = 0
            if(this.i_y > this.i_height - this.c_height / this.zoom) this.i_y = this.i_height - this.c_height / this.zoom
            this.mouse_x = e.clientX
            this.mouse_y = e.clientY
            this.display()
        }
    }
    
    mouse_up(e) {
        this.left_down = false
    }

    mouse_out(e) {
        this.left_down = false
    }
}
