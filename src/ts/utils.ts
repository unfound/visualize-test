
interface CanIndexObject extends Object {
    [key: string]: any
}

export function transformPascalToCamelcase (obj: CanIndexObject): CanIndexObject {
    const res: CanIndexObject = {}
    for (const key in obj) {
        let keyArr = key.split('_')
        keyArr = keyArr.map((char, i) => {
            if (i > 0 && !!char) {
                char = char.replace(char[0], char[0].toUpperCase())
            }
            return char
        })
        if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
            res[keyArr.join('')] = transformPascalToCamelcase(obj[key])
        } else {
            res[keyArr.join('')] = obj[key]
        }
    }
    return res
}

export function generatorTest () {
    const gen = function * () {
        const f1 = yield getAsyncValue()
        const f2 = yield getAsyncValue()
        console.log('f1', f1)
        console.log('f2', f2)
    }

    function getAsyncValue () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Math.random())
            }, 200)
        })
    }

    const g = gen()
    const step1 = g.next()
    console.log(g)
    console.log(step1)
    const step2 = step1.value && step1.value.then((data) => { (g.next(data).value as Promise<any>).then((data) => { g.next(data) }) })
    console.log(step2)
}
