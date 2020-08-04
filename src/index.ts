import _ from 'lodash'
import './style/style.css'
import './style/style.less'

const THREE = require('three')

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(100, 100, 100)
const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const point = new THREE.PointLight(0xffffff)
point.position.set(400, 200, 300)
scene.add(point)

const ambient = new THREE.AmbientLight(0x444444)
scene.add(ambient)

const width = window.innerWidth
const height = window.innerHeight
const k = width / height
const s = 200
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
camera.position.set(200, 300, 200)
camera.lookAt(scene.position)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.setClearColor(0xb9d3ff, 1)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

_.defer((stamp: number) => {
    console.log(_.now() - stamp)
}, _.now())
