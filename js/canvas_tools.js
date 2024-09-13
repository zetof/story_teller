class CanvasTools {
    constructor(canvas_name, background_canvas) {
        this.canvas = document.getElementById(canvas_name)
        this.context = this.canvas.getContext("2d")
        this.context.globalAlpha = 1
        this.background_canvas = background_canvas
        this.tools = [] 
        const dim = this.canvas.getBoundingClientRect()
        this.c_x = Math.round(dim.left)
        this.c_y = Math.round(dim.top)
        this.canvas.width = Math.round(dim.width)
        this.canvas.height = Math.round(dim.height)
        this.active = false
        this.key = null
        this.saved_buffer = null
        this.canvas.addEventListener("mousedown", this.mouse_down.bind(this))
        this.canvas.addEventListener("wheel", this.mouse_wheel.bind(this))
        this.canvas.addEventListener("mousemove", this.mouse_move.bind(this))
        this.canvas.addEventListener("mouseout", this.mouse_out.bind(this))
        this.canvas.addEventListener("mouseover", this.mouse_over.bind(this))
        this.canvas.addEventListener("keydown", this.key_down.bind(this))
        this.canvas.addEventListener("keyup", this.key_up.bind(this))
    }

    display(permanent=false) {
        var c = this.tool.get_coordinates()
        var g = this.tool.get_geometry()
        if(!permanent && this.saved_buffer) this.context.putImageData(this.saved_buffer, 0, 0);
        else this.saved_buffer = null
        this.saved_buffer = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.context.translate(c.x + g.width / 2, c.y + g.height / 2);
        this.context.rotate(g.angle);
        this.context.drawImage(this.tool.image, 0, 0, g.o_width, g.o_height, -g.width / 2, -g.height / 2, g.width, g.height)
        this.context.rotate(-g.angle);
        this.context.translate(-c.x - g.width / 2, -c.y - g.height / 2);
    }

    activate_tool(tool) {
        this.tool = tool
    }

    deactivate_tool(tool) {
        this.tool = null
    }

    key_pressed(key) {
        this.key = key
    }

    mouse_down(e) {
        if(this.tool && this.tool.is_active()) {
            this.mouse_x = e.clientX
            this.mouse_y = e.clientY
            if(this.tool.mouse_down(e.clientX - this.c_x,  e.clientY - this.c_y)) this.display(true)
        }
    }

    mouse_wheel(e) {
        if(this.tool && this.tool.is_active()) {
            if(this.key == 16) this.tool.change_angle(e.deltaY / 1200)
            else this.tool.change_zoom(e.deltaY / 1200)
            this.display()
        }
    }

    mouse_move(e) {
        if(this.tool && this.tool.is_active()) {
            this.tool.mouse_move(this.mouse_x - e.clientX,  this.mouse_y - e.clientY)
            this.mouse_x = e.clientX
            this.mouse_y = e.clientY
            this.display()
        }
    }

    mouse_out(e) {
        if(this.tool && this.tool.is_active()) {
            this.canvas.blur()
            if(this.saved_buffer) this.context.putImageData(this.saved_buffer, 0, 0);
            this.tool.deactivate()
        }
    }

    mouse_over(e) {
        console.log(this.canvas)
        if(this.tool && this.tool.is_active()) {
            this.canvas.focus()
            this.mouse_x = e.clientX
            this.mouse_y = e.clientY
            this.canvas.style.cursor = "none"
            this.tool.mouse_over(e.clientX - this.c_x,  e.clientY - this.c_y)
        }
    }

    key_down(e) {
        this.key = e.keyCode
    }

    key_up(e) {
        this.key = null
    }
}