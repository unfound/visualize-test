import * as pixi from 'pixi.js'

export default function pixiTest () {
    let type = 'WebGL'
    if (!pixi.utils.isWebGLSupported()) {
        type = 'canvas'
    }

    pixi.utils.sayHello(type)

    const option = {
        width: 400,
        height: 300,
        transparent: true
    }

    const app = new pixi.Application(option)
    const renderer = app.renderer
    const playground = document.getElementById('myCanvas')
    let preview: pixi.Sprite
    let displacementSprite:pixi.Sprite
    let displacementFilter: pixi.filters.DisplacementFilter
    let stage: pixi.Container

    function setScene (url: string) {
        playground.appendChild(renderer.view)
        stage = new pixi.Container()
        preview = pixi.Sprite.from(url)
        displacementSprite = pixi.Sprite.from('image/filter.png')
        displacementSprite.texture.baseTexture.wrapMode = pixi.WRAP_MODES.REPEAT
        displacementFilter = new pixi.filters.DisplacementFilter(displacementSprite)
        stage.addChild(preview)
        stage.addChild(displacementSprite)
        app.stage.addChild(stage)
    }

    const velocity = 1
    let raf: number

    function animate () {
        raf = requestAnimationFrame(animate)
        displacementSprite.x += velocity
        displacementSprite.y += velocity
    }

    setScene('image/wave.png')

    const start: HTMLElement = document.querySelector('.start-btn')
    const stop: HTMLElement = document.querySelector('.stop-btn')

    start.onclick = function () {
        stage.filters = [displacementFilter]
        animate()
    }

    stop.onclick = function () {
        stage.filters = []
        cancelAnimationFrame(raf)
    }
}
