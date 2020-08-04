const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const resolve = dir => path.resolve(__dirname, '..', dir)
const isProduction = process.env.NODE_ENV === 'production'
console.log(process.env.NODE_ENV)

module.exports = {
    entry: {
        app: resolve('src/index.ts')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': resolve('src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'The Three.js case',
            template: resolve('public/index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: resolve('static'), to: '' }
            ]
        }),
        new webpack.DllReferencePlugin({
            manifest: require('../static/lodash-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            manifest: require('../static/three-manifest.json')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }, {
                test: /\.less$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'url-loader'
                ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            }, {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}
