class CanvasBackground {
    constructor(canvas_name) {
        this.canvas = document.getElementById(canvas_name)
        this.context = this.canvas.getContext("2d")
        const dim = this.canvas.getBoundingClientRect()
        this.c_width = Math.round(dim.width)
        this.c_height = Math.round(dim.height)
        this.canvas.width = this.c_width
        this.canvas.height = this.c_height
        this.movie = []
        this.loaded = 0
        this.current = 0
        this.inc = 1
    }

    get_frame() {
        if(this.frames == 1) return this.picture
        else {
            let parts = this.picture.split(".")
            let index = this.movie.length
            return parts[0] + "_" + index.toString() + "." + parts[1]
        }
    }

    load(character, index) {
        let pose = character.poses[index]
        this.picture = pose.picture
        this.i_x = pose.i_x
        this.i_y = pose.i_y
        this.zoom = pose.zoom
        this.frames = pose.frames || 1
        this.speed = pose.speed || 1
        this.reverse = pose.reverse || false
        while(this.frames > this.movie.length) {
            this.movie.push(new Image())
            this.movie[this.movie.length - 1].src = "stories/" + character.base_dir + "/" + this.get_frame()
            this.movie[this.movie.length - 1].addEventListener("load", this.check_loaded.bind(this))
        }
    }

    check_loaded() {
        this.loaded++
        if(this.loaded == this.frames) this.display()
    }

    display() {
        this.context.drawImage(this.movie[this.current], this.i_x, this.i_y, this.c_width / this.zoom, this.c_height / this.zoom, 0, 0, this.c_width, this.c_height)
        if(this.frames > 1) {
            this.current += this.inc
            if(this.reverse) {
                if(this.current >= this.frames || this.current < 1) {
                    this.inc = -this.inc
                    this.current += this.inc
                }
            }
            else if(this.current >= this.frames) this.current = 0
            setTimeout(this.display.bind(this), 40 / this.speed)
        }
    }
}
