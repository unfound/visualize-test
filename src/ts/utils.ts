
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
