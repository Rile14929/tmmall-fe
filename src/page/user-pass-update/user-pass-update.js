require('page/common/nav/index.js')
require('page/common/header/index.js')
require('./user-pass-update.css')
var navSide=require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service')
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent:function(){
        var _this = this
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password  : $.trim($('#password').val()),
                passwordNew   : $.trim($('#passwordNew').val()),
                passwordConfirm  : $.trim($('#passwordConfirm').val()), 
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户密码
                _user.updatePassword({
                    passwordOld:userInfo.password,
                    passwordNew:userInfo.passwordNew
                }, function(res, msg){
                    _mm.successTips(msg);
                    // 更新成功后跳转到登录页面
                    window.location.href="./user-login.html"
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证原密码是否为空
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码长度 先验证是否为空
        if(!formData.passwordNew || formData.passwordNew.length<6){
            result.msg = '密码长度不得小于6位';
            return result;
        }
        // 验证两次密码是否一致
        if(formData.passwordNew!==formData.passwordConfirm){
            result.msg = '两次密码输入不一致';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});