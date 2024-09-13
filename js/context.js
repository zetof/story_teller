class Context {
    constructor(story) {
        this.story = null
        this.tool = null
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
        const playground = new Playground("playground_" + index.toString())
        this.playgrounds.push(playground)
    }

    load_background(playground, character, index) {
        this.playgrounds[playground].load_background(character, index)
    }

    add_tool(picture) {
        let index = this.tools.length + 1
        const tool = new Tool(picture)
        this.tools.push(tool)
    }
}
