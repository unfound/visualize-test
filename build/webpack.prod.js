// 在配置文件中process.env.NODE_ENV并不会被设置为production，参考https://github.com/webpack/webpack/issues/2537
// 这边直接设置方便webpack.common.js中使用
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const resolve = dir => path.resolve(__dirname, '..', dir)

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[contenthash].js',
        publicPath: '/',
        path: resolve('dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[contenthash].css'
        }),
        new webpack.HashedModuleIdsPlugin()
    ]
    // optimization: {
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all'
    //             }
    //         }
    //     }
    // }
})
