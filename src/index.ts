import _ from 'lodash'
import './style/style.css'
import './style/style.less'
// import './ts/time-on-page'
// import './ts/decorators'
// import './ts/three-test'
// import pixiTest from './ts/pixi-test'
import { Firework } from './ts/proton-test'
import { transformPascalToCamelcase, generatorTest } from './ts/utils'
import testKoa2 from './ts/koa2'

// pixiTest()
const firework = new Firework()
firework.start()

_.defer((stamp: number) => {
    console.log(_.now() - stamp)
}, _.now())

const obj = {
    user_name: 'xiexie',
    father: {
        user_name: 'duoxiedxie'
    }
}

console.log(transformPascalToCamelcase(obj))
console.log('=============================')
generatorTest()
testKoa2()
