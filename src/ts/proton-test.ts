import Proton from 'proton-engine'
import Stats from 'stats.js'
import RAFManager from 'raf-manager'
import Modal from './Modal'

export function protonTest () {
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
    // const context = canvas.getContext('2d')

    // set Rate
    emitter.rate = new Proton.Rate(Proton.getSpan(250, 300), 0.8)

    // add Initialize
    emitter.addInitialize(new Proton.Mass(1))
    emitter.addInitialize(new Proton.Radius(0.5, 3))
    emitter.addInitialize(new Proton.Life(3))
    emitter.addInitialize(new Proton.Velocity([1, 2], Proton.getSpan(0, 360), 'polar'))

    console.log(Proton.getSpan(2, 6))
    // add Behaviour
    emitter.addBehaviour(new Proton.Gravity(1))
    emitter.addBehaviour(new Proton.Color('random', '#ffffff'))
    emitter.addBehaviour(new Proton.Scale(2, 0))
    emitter.addBehaviour(new Proton.Alpha(1, 0))
    emitter.addBehaviour(new Proton.RandomDrift(10, 10, 0.5))

    // set emitter position
    emitter.p.x = canvas.width / 2
    emitter.p.y = canvas.height / 2
    emitter.emit(1)

    // add emitter to the proton
    proton.addEmitter(emitter)

    // add canvas renderer
    const renderer = new Proton.CanvasRenderer(canvas)
    // renderer.onProtonUpdate = () => {
    //     context.fillStyle = 'rgba(0,0,0,0.1)'
    //     context.fillRect(0, 0, canvas.width, canvas.height)
    // }

    proton.addRenderer(renderer)

    RAFManager.add(() => {
        stats.begin()
        proton.update()
        proton.stats.update(2)
        stats.end()
    }, 60)

    canvas.onclick = function (e) {
        emitter.p.x = e.clientX
        emitter.p.y = e.clientY
        emitter.emit(1)
        // ajaxTest()
    }

    // function ajaxTest () {
    //     const xhr = new XMLHttpRequest()
    //     xhr.onreadystatechange = function () {
    //         console.log('state change')
    //         console.log(xhr.readyState)
    //         console.log(xhr.status)
    //     }
    //     console.log('before open')
    //     xhr.open('get', 'https://baidu.com')
    //     console.log('before send')
    //     // xhr.send('')
    //     console.log('after send')
    // }
}

export class Firework {
    proton: Proton
    renderer: Proton.CanvasRenderer
    canvas: HTMLCanvasElement
    stats: any
    context: CanvasRenderingContext2D
    colors: Array<string>
    $modal: Modal
    constructor () {
        this.colors = ['#fc5185', '#3fc1c9', '#30e3ca', '#cbf1f5', '#cca8e9', '#b61aae', '#f1c40f', '#00eaff', '#c7ffff', '#3fc5f0']
        this.createCanvas()
        this.initBtn()
        this.initStats()
        this.createProton(this.canvas)
        this.renderProton = this.renderProton.bind(this)
        RAFManager.add(this.renderProton)

        this.$modal = new Modal()
    }

    start () {
        RAFManager.start()
        this.$modal.show()
    }

    stop () {
        RAFManager.stop()
        this.$modal.close()
    }

    initBtn () {
        const start: HTMLElement = document.querySelector('.start-btn')
        const stop: HTMLElement = document.querySelector('.stop-btn')

        start.onclick = () => {
            this.start()
        }

        stop.onclick = () => {
            this.stop()
        }
    }

    initStats () {
        const stats = new Stats()
        stats.showPanel(0) // 0: fps, 1: ms, 2:mb, 3+: custom
        document.body.appendChild(stats.dom)
        this.stats = stats
    }

    createCanvas () {
        const canvas = document.createElement('canvas')
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
        canvas.style.backgroundColor = '#000'
        document.body.appendChild(canvas)
        function handlerOnresize () {
            canvas.height = window.innerHeight
            canvas.width = window.innerWidth
        }
        window.onresize = () => {
            requestAnimationFrame(handlerOnresize)
        }
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        // this.context.shadowColor = 'rgb(255, 255, 255, 0.2)'
        // this.context.shadowBlur = 6
    }

    createProton (canvas: HTMLCanvasElement) {
        const proton = new Proton()
        const emitter = new Proton.Emitter()
        emitter.rate = new Proton.Rate(new Proton.Span(1, 3), 1)

        emitter.addInitialize(new Proton.Mass(1))
        emitter.addInitialize(new Proton.Radius(2, 4))
        emitter.addInitialize(
            new Proton.P(
                new Proton.LineZone(10, canvas.height, canvas.width - 10, canvas.height)
            )
        )
        emitter.addInitialize(new Proton.Life(1, 1.5))
        emitter.addInitialize(
            new Proton.V(new Proton.Span(4, 6), new Proton.Span(0, 0, true), 'polar')
        )

        emitter.addBehaviour(new Proton.Gravity(1))
        emitter.addBehaviour(new Proton.Color(this.colors))
        // emitter.addBehaviour(this.shadowBehaviour())
        emitter.emit()
        proton.addEmitter(emitter)

        const renderer = new Proton.CanvasRenderer(canvas)
        const context = canvas.getContext('2d')
        renderer.onProtonUpdate = function () {
            context.save()
            // context.globalCompositeOperation = 'lighter'
            // this.context.shadowColor = 'rgb(0, 0, 0, 0)'
            // this.context.shadowBlur = 0
            context.fillStyle = 'rgba(0, 0, 0, 0.1)'
            context.fillRect(0, 0, canvas.width, canvas.height)
            context.restore()
        }

        proton.addRenderer(renderer)

        /// / NOTICE :you can only use two emitters do this effect.In this demo I use more emitters want to test the emtter's life
        proton.addEventListener(Proton.PARTICLE_DEAD, (particle: any) => {
            if (Math.random() < 0.7) this.createFirstEmitter(particle)
            else this.createSecondEmitter(particle)
        })

        setInterval(() => {
            this.createCenterEmitter(canvas)
        }, 3000)

        this.proton = proton
        this.renderer = renderer
    }

    createCenterEmitter (canvas: HTMLCanvasElement) {
        const emitter = new Proton.Emitter()
        emitter.rate = new Proton.Rate(1, 1)

        emitter.addInitialize(new Proton.Mass(1))
        emitter.addInitialize(new Proton.Radius(2, 4))
        // emitter.addInitialize(
        //     new Proton.P(
        //         new Proton.LineZone(10, canvas.height, canvas.width - 10, canvas.height)
        //     )
        // )
        emitter.addInitialize(new Proton.Life(1, 1.5))
        emitter.addInitialize(
            new Proton.V(new Proton.Span(4, 6), new Proton.Span(0, 0, true), 'polar')
        )

        emitter.addBehaviour(this.initParticleFlag())
        emitter.addBehaviour(new Proton.Gravity(1))
        emitter.addBehaviour(new Proton.Color(this.colors))
        emitter.emit('once', true)
        emitter.p.x = canvas.width / 2
        emitter.p.y = canvas.height
        this.proton.addEmitter(emitter)
    }

    createFirstEmitter (particle: any) {
        const subemitter = new Proton.Emitter()
        subemitter.rate = new Proton.Rate(new Proton.Span(250, 300), 1)
        subemitter.addInitialize(new Proton.Mass(1))
        subemitter.addInitialize(new Proton.Radius(1, 2))
        subemitter.addInitialize(new Proton.Life(1, 3))
        subemitter.addInitialize(
            new Proton.V(new Proton.Span(2, 4), new Proton.Span(0, 360), 'polar')
        )

        subemitter.addBehaviour(new Proton.RandomDrift(10, 10, 0.05))
        subemitter.addBehaviour(new Proton.Alpha(1, 0))
        subemitter.addBehaviour(new Proton.Gravity(3))
        // const color =
        //   Math.random() > 0.3 ? Proton.MathUtil.randomColor() : 'random'
        subemitter.addBehaviour(new Proton.Color(particle.color))

        subemitter.p.x = particle.p.x
        subemitter.p.y = particle.p.y
        subemitter.emit('once', true)
        this.proton.addEmitter(subemitter)
    }

    createSecondEmitter (particle: any) {
        const subemitter = new Proton.Emitter()
        subemitter.rate = new Proton.Rate(new Proton.Span(100, 120), 1)

        subemitter.addInitialize(new Proton.Mass(1))
        subemitter.addInitialize(new Proton.Radius(4, 8))
        subemitter.addInitialize(new Proton.Life(1, 2))
        subemitter.addInitialize(
            new Proton.V([1, 2], new Proton.Span(0, 360), 'polar')
        )

        subemitter.addBehaviour(new Proton.Alpha(1, 0))
        subemitter.addBehaviour(new Proton.Scale(1, 0.1))
        subemitter.addBehaviour(new Proton.Gravity(1))
        // const color = Proton.MathUtil.randomColor()
        subemitter.addBehaviour(new Proton.Color(particle.color))

        subemitter.p.x = particle.p.x
        subemitter.p.y = particle.p.y
        subemitter.emit('once', true)
        this.proton.addEmitter(subemitter)
    }

    shadowBehaviour () {
        // const _this = this
        return {
            initialize: function (particle: any) {
                // console.log(particle)
            },
            applyBehaviour: function (particle: any) {
                // console.log(particle)
                // _this.context.shadowColor = particle.color
                // _this.context.shadowBlur = 8
            }
        }
    }

    initParticleFlag () {
        return {
            initialize: function (particle: any) {
                particle.flag = 'text-fire'
            },
            applyBehaviour: function () {}
        }
    }

    renderProton () {
        this.stats.begin()
        this.proton.update()
        this.stats.end()
    }
}
