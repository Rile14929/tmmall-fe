var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlConfig = function(name){
    return {
        template:'./src/view/'+name+'.html',
        filename:'view/'+name+'.html',
        inject:true,
        hash:true,
        chunks:['common',name]
    }
}


var config = {
    entry: {
        'common':['./src/page/common/common.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/login.js']
    },
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    module:{
        loaders:[
            {test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
            {test:/\.(gif|png|jpg|woff|svg|ttf)\??.*$/,loader:'url-loader?limit=100&name=resource/[name].[ext]'}
        ]
    },
    plugins:[
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};
module.exports = config