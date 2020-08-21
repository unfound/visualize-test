import _ from 'lodash'
import './style/style.css'
import './style/style.less'
// import './ts/time-on-page'
// import './ts/decorators'
// import './ts/three-test'
// import pixiTest from './ts/pixi-test'
import protonTest from './ts/proton-test'

// pixiTest()
protonTest()

_.defer((stamp: number) => {
    console.log(_.now() - stamp)
}, _.now())
