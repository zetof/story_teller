class CanvasTools {
    constructor(canvas_name, background_canvas, set_tool_callback) {
        this.canvas = document.getElementById(canvas_name)
        this.context = this.canvas.getContext("2d", { willReadFrequently: true })
        this.context.globalAlpha = 1
        this.background_canvas = background_canvas
        this.set_tool_callback = set_tool_callback
        this.tools = [] 
        const dim = this.canvas.getBoundingClientRect()
        this.c_x = Math.round(dim.left)
        this.c_y = Math.round(dim.top)
        this.canvas.width = Math.round(dim.width)
        this.canvas.height = Math.round(dim.height)
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
        this.context.drawImage(this.tool.tool, 0, 0, g.o_width, g.o_height, -g.width / 2, -g.height / 2, g.width, g.height)
        this.context.rotate(-g.angle);
        this.context.translate(-c.x - g.width / 2, -c.y - g.height / 2);
    }

    key_pressed(key) {
        this.key = key
    }

    mouse_down(e) {
        if(this.tool) {
            this.mouse_x = e.clientX
            this.mouse_y = e.clientY
            if(this.tool.mouse_down(e.offsetX, e.offsetY)) this.display(true)
        }
    }

    mouse_wheel(e) {
        if(this.tool) {
            if(this.key == 16) this.tool.change_angle(e.deltaY / 1200)
            else this.tool.change_zoom(e.deltaY / 1200)
            this.display()
        }
    }

    mouse_move(e) {
        if(this.tool) {
            this.tool.mouse_move(this.mouse_x - e.clientX,  this.mouse_y - e.clientY)
            this.mouse_x = e.clientX
            this.mouse_y = e.clientY
            this.display()
        }
    }

    mouse_out(e) {
        if(this.tool) {
            this.canvas.blur()
            if(this.saved_buffer) this.context.putImageData(this.saved_buffer, 0, 0);
            this.tool = null
        }
    }

    mouse_over(e) {
        this.tool = this.set_tool_callback()
        if(this.tool) {
            this.canvas.focus()
            this.mouse_x = e.clientX
            this.mouse_y = e.clientY
            this.canvas.style.cursor = "none"
            this.tool.mouse_over(e.offsetX, e.offsetY)
        }
    }

    key_down(e) {
        this.key = e.keyCode
    }

    key_up(e) {
        this.key = null
    }
}