import _ from 'lodash'
import './style/style.css'
import './style/style.less'
// import './ts/time-on-page'
// import './ts/decorators'
// import './ts/three-test'
// import pixiTest from './ts/pixi-test'
import { protonTest, Firework } from './ts/proton-test'
import { transformPascalToCamelcase } from './ts/utils'

// pixiTest()
// protonTest()
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
