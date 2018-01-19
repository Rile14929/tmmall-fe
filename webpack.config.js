var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量的配置 判断是线上环境还是开发环境
var WEBPACK_ENV = process.env.WEBPACK_ENV||'dev'

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
    return {
        template:'./src/view/'+name+'.html',
        filename:'view/'+name+'.html',
        title:title,
        inject:true,
        hash:true,
        chunks:['common',name]
    }
}


var config = {
    entry: {
        'common':['./src/page/common/common.js'],
        'index':['./src/page/index/index.js'],
        'list':['./src/page/list/list.js'],
        'detail':['./src/page/detail/detail.js'],
        'cart':['./src/page/cart/cart.js'],
        'order-confirm':['./src/page/order-confirm/order-confirm.js'],
        'order-list':['./src/page/order-list/order-list.js'],
        'order-detail':['./src/page/order-detail/order-detail.js'],
        'user-login':['./src/page/user-login/login.js'],
        'user-register':['./src/page/user-register/register.js'],
        'user-center':['./src/page/user-center/user-center.js'],
        'user-center-update':['./src/page/user-center-update/user-center-update.js'],
        'user-pass-reset':['./src/page/user-pass-reset/pass-reset.js'],
        'user-pass-update':['./src/page/user-pass-update/user-pass-update.js'],
        'result':['./src/page/result/result.js']
    },
    output: {
        path: './dist',
        publicPath:'/dist',
        filename: 'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    module:{
        loaders:[
            {test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
            {test:/\.(gif|png|jpg|woff|svg|ttf|eot)\??.*$/,loader:'url-loader?limit=5000&name=resource/[name].[ext]'},
            {test:/\.string$/,loader:'html-loader'}
        ]
    },
    resolve:{
        alias:{
            // 配置路径
            modules:__dirname+'/node_modules',
            util:__dirname+'/src/util',
            image:__dirname+'/src/image',
            service:__dirname+'/src/service',
            page:__dirname+'/src/page'
        }
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
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
    ]
};

if('dev' ===WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config