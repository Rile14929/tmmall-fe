require('page/common/nav/index.js')
require('page/common/header/index.js')
require('./list.css')
var _mm = require('util/mm.js')
var _product = require('service/product-service')
var templateIndex   = require('./list.string');
var Pagination = require('util/pagination/index.js')

var page = {
    data:{
        listParam:{
            keyword:_mm.getUrlParam('keyword')||'',
            categoryId:_mm.getUrlParam('categoryId')||'',
            orderBy:_mm.getUrlParam('orderBy')||'default',
            pageNum:_mm.getUrlParam('pageNum')||1,
            pageSize:_mm.getUrlParam('pageSize')||20
        }
    },
    init:function(){
        this.onLoad();
        this.bindEvent()
    },
    onLoad:function(){
        this.loadList()
    },
    bindEvent:function(){
        var _this = this;
        // 排序点击事件
        $('.sort-item').click(function(){
            var $this = $(this)
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type')==='price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                // 升序降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc')
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc')
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList()
        })
    },
    // 加载list
    loadList:function(){
        var listParam = this.data.listParam
        var listHtml = ''
        var _this = this
        var $pListCon = $('.p-list-con')

        $pListCon.html('<div class="loading"></div>')
        // 删除参数不必要的字段
        listParam.categoryId ?(delete listParam.keyword):(delete listParam.categoryId)
        // 请求接口
        _product.getProductList(listParam,function(res){
            listHtml = _mm.renderHtml(templateIndex,{list:res.list});
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        },function(errMsg){
            _mm.errorTips(errMsg)
        })
    },
    // 加载分页信息
    loadPagination:function(pageInfo){
        var _this =this
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({},pageInfo,{
            container:$('.pagination'),
            onSelectPage:function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }))
    }
}
$(function(){
    page.init()
})