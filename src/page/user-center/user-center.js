require('page/common/nav/index.js')
require('page/common/header/index.js')
require('./user-center.css')
var navSide=require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service')
var templateIndex   = require('./user-center.string');
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});