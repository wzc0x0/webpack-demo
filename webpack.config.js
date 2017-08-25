const webpack = require('webpack'),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
    entry:'./src/js/index.js',
    output: {
        path: path.join(__dirname,'dist'),
        publicPath: "/",
        filename: "js/[name].[hash:7].js"
    },
    module: {
        rules:[{
            // 处理css文件
            /*test: /\.css$/,
            loader: "style-loader!css-loader"*/
            test:/\.(scss|sass|css)$/,
            use:[
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        importLoaders:2
                    }
                },
                "postcss-loader",
                "sass-loader"
            ]

        }, /*{
            // 处理html文件，并处理img 中 src 和 data-src 的引入路径
            test: /\.html$/,
            loader: "html-loader?attrs=img:src img:data-src"
        },*/ {
            // 处理字体文件
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=./fonts/[name].[ext]'
        }, {
            // 处理图片，并将8k以下的图片转为base64编码
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'common'
        }),

        new ExtractTextPlugin("./css/[name].css"),

        new HtmlWebpackPlugin({
            filename:'./view/index.html',
            template:'./src/view/index.html',
            inject:'body',
            minify:{
                removeComments:true,
                collapseWhitespace:false
            }
        })
    ],
    devServer: {
        contentBase:path.join(__dirname,"dist/"),
        host:'localhost',
        port:'9090',
        inline:true
    }
}

module.exports = webpackConfig;