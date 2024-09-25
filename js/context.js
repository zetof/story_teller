class Context {
    constructor(story) {
        this.story = null
        this.active_tool = null
        this.sentence = null
    }

    load_story(base_dir) {
        this.playgrounds = []
        this.tools = []
        fetch("stories/" + base_dir + "/story.js")
            .then(res => { res.text()
            .then(txt => { 
                (0, eval)(txt)
                for(let i = 0; i < story.playgrounds.number; i++) {
                    this.add_playground()
                    this.load_background(i, story, story.playgrounds.start_poses[i])
                }
                for(let i = 0; i < story.tools.length; i++) {
                    this.add_tool(story.tools[i].picture)
                }
                this.story = story
            })})
    }

    get_story() {
        return this.story
    }

    add_playground() {
        let index = this.playgrounds.length + 1
        const playground = new Playground("playground_" + index.toString(), this.assign_tool.bind(this))
        this.playgrounds.push(playground)
    }

    load_background(playground, character, index) {
        this.playgrounds[playground].load_background(character, index)
    }

    add_tool(picture) {
        let index = this.tools.length + 1
        const tool = new Tool(picture, this.activate_tool.bind(this))
        this.tools.push(tool)
    }

    activate_tool(tool) {
        for(let i = 0; i < this.tools.length; i++) this.tools[i].deactivate()
        this.active_tool = tool
    }

    assign_tool(tool) {
        this.play_sentence()
        return this.active_tool
    }

    load_sentence(base_die, prompts) {
        this.sentence = new Sentence("prompts", prompts)
    }

    play_sentence() {
        this.sentence.play()
    }
}
