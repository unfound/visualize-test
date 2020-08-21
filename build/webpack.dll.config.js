const path = require('path')
const webpack = require('webpack')

const resolve = dir => path.resolve(__dirname, '..', dir)

module.exports = {
    mode: 'production',
    entry: {
        lodash: ['lodash'],
        three: ['three'],
        pixi: ['pixi.js']
    },
    output: {
        path: resolve('static'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: resolve('static/[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
}
