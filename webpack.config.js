
var config = {
    entry: {
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/login.js']
    },
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'
    }
};
module.exports = config