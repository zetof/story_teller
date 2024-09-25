class Sentence {
    constructor(base_dir, prompts, kind="mp3") {
        this.base_dir = base_dir
        this.prompts = []
        this.loading = 0
        this.loaded = false
        this.playing = 0
        prompts.forEach((prompt) => {
            this.prompts.push(new Audio(this.base_dir + "/" + prompt + "." + kind))
            this.prompts[this.prompts.length - 1].addEventListener("canplaythrough", this.check_loaded.bind(this))
            this.prompts[this.prompts.length - 1].addEventListener("ended", this.next.bind(this))
        })
    }

    check_loaded() {
        this.loading++
        if(this.loading == this.prompts.length) this.loaded = true
    }

    play() {
        if(this.loaded) {
            this.prompts[this.playing].play()
        }
    }

    next() {
        this.playing++;
        if(this.playing < this.prompts.length) this.play()
        else this.playing = 0
    }
}