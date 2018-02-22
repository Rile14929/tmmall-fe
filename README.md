# 前端电商平台项目

<h3>项目技术栈:</h3><br/>
    1.原生Javascript<br/>
    2.原生css<br/>
    3.框架:JQuery<br/>
    4.构建工具:webpack<br/>
    5.版本控制工具:git<br/>
    
<br/><h3>本电商项目具体功能及模块:</h3><br/>
    1.商品模块->首页 商品列表 商品详情<br/>
    2.购物车模块->购物车数量 添加删除商品 购物车提交<br/>
    3.订单模块->订单确认(地址管理) 订单提交 订单列表 订单详情<br/>
    4.支付模块->支付<br/>
    5.用户模块->登录 注册 个人信息 找回密码 修改密码 修改个人信息<br/>

<br/><h3>项目预览方法:</h3><br/>
    1.使用git clone 将项目下载到本地<br/>
    2.进入项目文件夹tmmall-fe<br/>
    3.进入命令行 输入npm install 下载项目依赖<br/>
    4.进入命令行 输入webpack 对项目进行打包编译<br/>
    5.进入命令行 输入npm run dev 启动项目<br/>
    6.下载charles 进行代理转发 具体转发配置在下面<br/>
    7.打开浏览器 访问http://localhost:8088/dist/view/index.html即可进行预览<br/>
    
    
<h5>个人博客 :</h5><br/>
   <a>https://www.liuyuxuan6.com/</a>

<br/><br/>
charles转发配置如下:<br/>
http://localhost:8088/cart/get_cart_product_count.do	   -> http://www.happymmall.com:80/cart/get_cart_product_count.do<br/>
http://localhost:8088/product/list.do	                   -> http://happymmall.com:80/product/list.do<br/>
http://localhost:8088/user/*	                           -> http://www.happymmall.com:80/user/<br/>
http://localhost:8088/product/*	                           -> http://www.happymmall.com:80/product/<br/>
http://localhost:8088/cart/*	                           -> http://www.happymmall.com:80/cart/<br/>
http://localhost:8088/order/*	                           -> http://www.happymmall.com:80/order/<br/>
http://localhost:8088/shipping/*	                   -> http://www.happymmall.com:80/shipping/<br/>
http://localhost:8086/manage/*	                           -> http://www.happymmall.com:80/manage/<br/>

