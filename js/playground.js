class Playground {
    constructor(name) {
        let playgrounds = document.getElementById("playgrounds")
        let playground = document.createElement("div")
        let background = document.createElement("canvas")
        let tools = document.createElement("canvas")
        playground.classList.add("playground")
        background.classList.add("background")
        tools.classList.add("foreground")
        background.id = name + "_background"
        tools.id = name + "_tools"
        tools.tabIndex = 1
        playgrounds.appendChild(playground)
        playground.appendChild(background)
        playground.appendChild(tools)
        this.background = new CanvasBackground(name + "_background")
        this.tools = new CanvasTools(name + "_tools", this.background)
    }

    load_background(character, index) {
        this.background.load(character, index)
    }
}