const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const resolve = dir => path.resolve(__dirname, '..', dir)

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: resolve('dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: resolve('dist'),
        port: 8080,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedChunksPlugin()
    ]
})