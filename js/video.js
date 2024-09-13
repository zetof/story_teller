class Video {
    constructor(source, target) {
        this.canvas = document.getElementById("movie")
        this.context = this.canvas.getContext("2d")
        this.video = document.createElement("video")
        this.link = document.createElement("a")
        this.infos = document.getElementsByClassName("infos")[0]
        this.video.src = source
        this.target = target
        this.video.muted = true
        const dim = this.canvas.getBoundingClientRect()
        this.c_width = Math.round(dim.width)
        this.c_height = Math.round(dim.height)
        this.canvas.width = this.c_width
        this.canvas.height = this.c_height
        this.x = 0
        this.y = 0
        this.frames_stack = []
        this.zoom = 1
        this.frame = 0
        this.start_frame = 0
        this.key = null
        this.left_down = false
        this.wheel = 0
        this.canvas.focus()
        this.display_infos("Please enter mouse cursor in above rectangle to start")
        this.video.addEventListener("loadeddata", this.video_loaded.bind(this))        
        this.canvas.addEventListener("mousedown", this.mouse_down.bind(this))
        this.canvas.addEventListener("mousemove", this.mouse_move.bind(this))
        this.canvas.addEventListener("mouseup", this.mouse_up.bind(this))
        this.canvas.addEventListener("mouseout", this.mouse_out.bind(this))
        this.canvas.addEventListener("mouseover", this.mouse_over.bind(this))
        this.canvas.addEventListener("wheel", this.mouse_wheel.bind(this))
        this.canvas.addEventListener("keydown", this.key_down.bind(this))
        this.canvas.addEventListener("keyup", this.key_up.bind(this))
    }

    video_loaded() {
        this.v_width = this.video.videoWidth
        this.v_height = this.video.videoHeight
        this.video.currentTime = 0
        this.max_frame = Math.floor(24 * this.video.duration)
        this.end_frame = this.max_frame
        this.display_frame()
    }

    display_frame() {
        this.context.drawImage(this.video, this.x, this.y, this.c_width / this.zoom, this.c_height / this.zoom, 0, 0, this.c_width, this.c_height)
    }

    save_frame() {
        if(this.frame - this.start_frame > 0) {
            let frame_file = this.target + "_" + (this.frame - this.start_frame).toString() + ".jpg"
            this.link.setAttribute("download", frame_file);
            this.link.setAttribute("href", this.canvas.toDataURL("image/jpeg", .9));
            this.link.click()
        }
        this.frame++
        this.video.currentTime = this.frame / 25
        this.display_frame()
        if(this.frame <= this.end_frame) setTimeout(this.save_frame.bind(this), 200)
    }

    display_infos(infos=null) {
        if(infos) this.infos.innerHTML = infos
        else {
            let infos = "Frame: " + this.frame + "<br/>"
            infos += "Start Frame: " + this.start_frame + "<br/>"
            infos += "End Frame: " + this.end_frame + "<br/>"
            this.infos.innerHTML = infos
        }
        
    }

    mouse_down(e) {
        //console.log("test")
        this.left_down = true
        this.mouse_x = e.clientX
        this.mouse_y = e.clientY
    }

    mouse_move(e) {
       if(this.left_down) {
            this.x += this.mouse_x - e.clientX
            this.y += this.mouse_y - e.clientY
            if(this.x < 0) this.x = 0
            if(this.x > this.v_width - this.c_width / this.zoom) this.x = this.v_width - this.c_width / this.zoom
            if(this.y < 0) this.y = 0
            if(this.y > this.v_height - this.c_height / this.zoom) this.y = this.v_height - this.c_height / this.zoom
            this.mouse_x = e.clientX
            this.mouse_y = e.clientY
            this.display_frame()
        }        
    }
    
    mouse_up(e) {
        this.left_down = false
    }

    mouse_out(e) {
        this.canvas.blur()
        this.left_down = false
    }

    mouse_over(e) {
        this.canvas.focus()
        this.display_frame()
        this.display_infos()
    }

    mouse_wheel(e) {
        switch(this.key) {
            case 16:
                let current_zoom = this.zoom
                this.zoom -= e.deltaY / 12000
                if((this.v_width - this.x) * this.zoom < this.c_width || (this.v_height - this.y) * this.zoom < this.c_height) this.zoom = current_zoom
                else this.display_frame()
                break
            default:
                let frame = this.frame - Math.sign(e.deltaY)
                if(frame >= this.start_frame && frame <= this.end_frame) {
                    clearTimeout(this.display_timeout);
                    this.frame = frame
                    this.video.currentTime = this.frame / 25
                    this.display_infos()
                    this.display_timeout = setTimeout(this.display_frame.bind(this), 200)
                }
        }
    }
    
    key_down(e) {
        this.key = e.keyCode
        console.log(this.key)
        switch(this.key) {
            case 81:
                this.start_frame = 0
                this.end_frame = this.max_frame
                break;
            case 83:
                this.frame = this.start_frame
                this.video.currentTime = this.frame / 25
                this.display_frame()
                setTimeout(this.save_frame.bind(this), 200)
                break;
            case 87:
                this.start_frame = this.frame
                break;
            case 88:
                this.end_frame = this.frame
        }
        this.display_infos()
    }

    key_up(e) {
        this.key = null
    }
}