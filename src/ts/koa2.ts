class Koa {
    context: object = {}
    middlewares: Array<Function> = []

    use (fn: Function) {
        this.middlewares.push(fn)
    }

    compose () {
        const _this = this
        return dispatch(0)
        function dispatch (i:number) {
            const fn = _this.middlewares[i]
            return Promise.resolve(
                fn(_this.context, function next () {
                    dispatch(i + 1)
                })
            )
        }
    }
}

export default function testKoa2 () {
    const app = new Koa()
    app.use(async (ctx: any, next: Function) => {
        console.log('1 start')
        await next()
        console.log('1 end')
    })

    app.use(async (ctx: any, next: Function) => {
        console.log('2 start')
        await next()
        console.log('2 end')
    })

    app.use(async () => {
        console.log('3 start')
        console.log('3 end')
    })

    app.compose()
}
