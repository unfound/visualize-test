import Proton from 'proton-engine'
import Stats from 'stats.js'
import RAFManager from 'raf-manager'

export default function protonTest () {
    const canvas = document.createElement('canvas')
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    canvas.style.backgroundColor = '#000'
    document.body.appendChild(canvas)
    const stats = new Stats()
    stats.showPanel(0) // 0: fps, 1: ms, 2:mb, 3+: custom
    document.body.appendChild(stats.dom)
    // const canvas = <HTMLCanvasElement>document.getElementById('canvas')
    function handlerOnresize () {
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
    }
    window.onresize = () => {
        requestAnimationFrame(handlerOnresize)
    }

    const proton = new Proton()
    const emitter = new Proton.Emitter()
    const context = canvas.getContext('2d')

    // set Rate
    emitter.rate = new Proton.Rate(Proton.getSpan(20, 40), 0.1)

    // add Initialize
    emitter.addInitialize(new Proton.Radius(0.5, 3))
    emitter.addInitialize(new Proton.Life(3))
    emitter.addInitialize(new Proton.Velocity(Proton.getSpan(1, 2), Proton.getSpan(0, 360), 'polar'))

    // add Behaviour
    emitter.addBehaviour(new Proton.Gravity(1))
    emitter.addBehaviour(new Proton.Color('random', '#ffffff'))
    emitter.addBehaviour(new Proton.Scale(2, 0))
    emitter.addBehaviour(new Proton.Alpha(1, 0))

    // set emitter position
    emitter.p.x = canvas.width / 2
    emitter.p.y = canvas.height / 2
    emitter.emit(1)

    // add emitter to the proton
    proton.addEmitter(emitter)

    // add canvas renderer
    const renderer = new Proton.CanvasRenderer(canvas)
    renderer.onProtonUpdate = () => {
        context.fillStyle = 'rgba(0,0,0,0.1)'
        context.fillRect(0, 0, canvas.width, canvas.height)
    }

    proton.addRenderer(renderer)

    RAFManager.add(() => {
        stats.begin()
        proton.update()
        stats.end()
    }, 60)

    canvas.onclick = function (e) {
        emitter.p.x = e.clientX
        emitter.p.y = e.clientY
        emitter.emit(1)
        ajaxTest()
    }

    function ajaxTest () {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            console.log('state change')
            console.log(xhr.readyState)
            console.log(xhr.status)
        }
        console.log('before open')
        xhr.open('get', 'https://baidu.com')
        console.log('before send')
        // xhr.send('')
        console.log('after send')
    }
}
