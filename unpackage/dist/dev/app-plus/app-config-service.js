
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/love/love","pages/index/index","pages/index/launch/launch","pages/friend/friend","pages/message/message","pages/me/me","pages/message/chat","pages/me/me_edit","pages/me/user_info","pages/error/error","pages/index/product/product","pages/index/sale/sale","pages/index/product/product_add","pages/index/sale/sale_add","pages/index/product/product_list","pages/index/sale/sale_list","pages/me/me_order/me_order","pages/me/me_order/me_order_detail","pages/index/detail/detail","pages/index/address/address","pages/index/address/address_add","pages/index/address/address_edit","pages/index/submit_order/submit_order","pages/index/submit_order/pay_finish","pages/me/me_order/me_order_sale","pages/message/video","pages/login/login","pages/login/about","pages/login/register","pages/login/login_finish","pages/login/register_finish","pages/index/readme/readme","pages/friend/verify","pages/friend/me_follow","pages/friend/follow_me","pages/index/submit_order/user_order","pages/index/submit_order/order_finish","pages/index/detail/detail_product","pages/message/message_all","pages/login/login_check","pages/login/reset_password","pages/index/sale/index","pages/index/product/index","pages/me/user_img","pages/me/server","pages/me/about","pages/me/me_order/me_order_detail","pages/me/me_order/me_order_detail_sale","pages/me/user_product_img","pages/plus/index","pages/me/product/me_product_list","pages/me/product/me_add_product","pages/message/circle","pages/plus/plus","pages/login/logout","pages/me/server/server_list","pages/index/detail/report","pages/me/me_del","pages/me/me_del_ing","pages/login/login_check_no","pages/login/edit_register","pages/me/me_edit/me_edit","pages/me/me_edit/me_edit_ali","pages/me/me_edit/me_edit_name","pages/login/editor","pages/me/product/server_add_product","pages/index/submit_order/apple_pay","pages/plus/plus_test","pages/message/chat_back","pages/login/login_check_loading","pages/login/editor_task","pages/me/task/task_log","pages/comment/comment","pages/comment/comment_input","pages/friend/friend_back","pages/friend/friend_back_view","pages/message/chat","pages/message/circle_back","pages/me/wx/wx_user_info","pages/userstate/lock","pages/login/register_back","pages/me/me_edit/me_edit_info","pages/me/setting/setting","pages/login/reset_password_all","pages/index/test","pages/other/web","pages/login/register_username","pages/login/reset_password_by_old","pages/chat_group/group_list","pages/chat_group/group_add","pages/chat_group/chat_group","pages/chat_group/setting","pages/chat_group/group_user_info","pages/chat_group/edit_nickname/edit_nickname","pages/me/me_edit/me_edit_phone","pages/windows/rightWindow","pages/login/register_finish_info","pages/wallet/wallet","pages/wallet/cash_out_price","pages/wallet/log_cash","pages/wallet/log_pay","pages/plus/plus_coin","pages/love/love_back"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"91ai","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#666666","selectedColor":"#fa9c3e","borderStyle":"black","backgroundColor":"#F8F8F8","list":[{"pagePath":"pages/love/love","iconPath":"static/navi/icon_world_df.png","selectedIconPath":"static/navi/icon_world_ed.png","text":"星球"},{"pagePath":"pages/index/index","iconPath":"static/navi/icon_msg_df.png","selectedIconPath":"static/navi/icon_msg_ed.png","text":"消息"},{"pagePath":"pages/message/message","iconPath":"static/navi/icon_contact_df.png","selectedIconPath":"static/navi/icon_contact_ed.png","text":"通讯录"},{"pagePath":"pages/me/me","iconPath":"static/navi/icon_me_df.png","selectedIconPath":"static/navi/icon_me_ed.png","text":"我"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"91ai","compilerVersion":"3.6.4","entryPagePath":"pages/love/love","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/love/love","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"91ai","enablePullDownRefresh":true,"titleNView":false}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true}},{"path":"/pages/index/launch/launch","meta":{},"window":{}},{"path":"/pages/friend/friend","meta":{},"window":{"navigationBarTitleText":"通讯录","enablePullDownRefresh":false}},{"path":"/pages/message/message","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"通讯录"}},{"path":"/pages/me/me","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":true}},{"path":"/pages/message/chat","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/me/me_edit","meta":{},"window":{}},{"path":"/pages/me/user_info","meta":{},"window":{}},{"path":"/pages/error/error","meta":{},"window":{}},{"path":"/pages/index/product/product","meta":{},"window":{}},{"path":"/pages/index/sale/sale","meta":{},"window":{}},{"path":"/pages/index/product/product_add","meta":{},"window":{}},{"path":"/pages/index/sale/sale_add","meta":{},"window":{}},{"path":"/pages/index/product/product_list","meta":{},"window":{}},{"path":"/pages/index/sale/sale_list","meta":{},"window":{}},{"path":"/pages/me/me_order/me_order","meta":{},"window":{"navigationBarTitleText":"我购买的订单"}},{"path":"/pages/me/me_order/me_order_detail","meta":{},"window":{}},{"path":"/pages/index/detail/detail","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/pages/index/address/address","meta":{},"window":{}},{"path":"/pages/index/address/address_add","meta":{},"window":{}},{"path":"/pages/index/address/address_edit","meta":{},"window":{}},{"path":"/pages/index/submit_order/submit_order","meta":{},"window":{}},{"path":"/pages/index/submit_order/pay_finish","meta":{},"window":{}},{"path":"/pages/me/me_order/me_order_sale","meta":{},"window":{"navigationBarTitleText":"我售出的订单"}},{"path":"/pages/message/video","meta":{},"window":{"titleNView":{"buttons":[{"text":"保存","fontSize":"14px","float":"right"}]}}},{"path":"/pages/login/login","meta":{},"window":{}},{"path":"/pages/login/about","meta":{},"window":{}},{"path":"/pages/login/register","meta":{},"window":{}},{"path":"/pages/login/login_finish","meta":{},"window":{}},{"path":"/pages/login/register_finish","meta":{},"window":{}},{"path":"/pages/index/readme/readme","meta":{},"window":{}},{"path":"/pages/friend/verify","meta":{},"window":{}},{"path":"/pages/friend/me_follow","meta":{},"window":{}},{"path":"/pages/friend/follow_me","meta":{},"window":{}},{"path":"/pages/index/submit_order/user_order","meta":{},"window":{}},{"path":"/pages/index/submit_order/order_finish","meta":{},"window":{}},{"path":"/pages/index/detail/detail_product","meta":{},"window":{}},{"path":"/pages/message/message_all","meta":{},"window":{}},{"path":"/pages/login/login_check","meta":{},"window":{}},{"path":"/pages/login/reset_password","meta":{},"window":{}},{"path":"/pages/index/sale/index","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/pages/index/product/index","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/pages/me/user_img","meta":{},"window":{}},{"path":"/pages/me/server","meta":{},"window":{}},{"path":"/pages/me/about","meta":{},"window":{}},{"path":"/pages/me/me_order/me_order_detail_sale","meta":{},"window":{}},{"path":"/pages/me/user_product_img","meta":{},"window":{}},{"path":"/pages/plus/index","meta":{},"window":{}},{"path":"/pages/me/product/me_product_list","meta":{},"window":{}},{"path":"/pages/me/product/me_add_product","meta":{},"window":{}},{"path":"/pages/message/circle","meta":{},"window":{"navigationBarTitleText":"商品中心","enablePullDownRefresh":true}},{"path":"/pages/plus/plus","meta":{},"window":{}},{"path":"/pages/login/logout","meta":{},"window":{}},{"path":"/pages/me/server/server_list","meta":{},"window":{}},{"path":"/pages/index/detail/report","meta":{},"window":{}},{"path":"/pages/me/me_del","meta":{},"window":{}},{"path":"/pages/me/me_del_ing","meta":{},"window":{}},{"path":"/pages/login/login_check_no","meta":{},"window":{}},{"path":"/pages/login/edit_register","meta":{},"window":{}},{"path":"/pages/me/me_edit/me_edit","meta":{},"window":{}},{"path":"/pages/me/me_edit/me_edit_ali","meta":{},"window":{}},{"path":"/pages/me/me_edit/me_edit_name","meta":{},"window":{}},{"path":"/pages/login/editor","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/me/product/server_add_product","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/submit_order/apple_pay","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/plus/plus_test","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/message/chat_back","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/login/login_check_loading","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/login/editor_task","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/me/task/task_log","meta":{},"window":{"navigationBarTitleText":"历史公告","enablePullDownRefresh":false}},{"path":"/pages/comment/comment","meta":{},"window":{"navigationBarTitleText":"评论列表","enablePullDownRefresh":true}},{"path":"/pages/comment/comment_input","meta":{},"window":{"navigationBarTitleText":"评论","enablePullDownRefresh":false}},{"path":"/pages/friend/friend_back","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/friend/friend_back_view","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/message/circle_back","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/me/wx/wx_user_info","meta":{},"window":{"navigationBarTitleText":"绑定微信","enablePullDownRefresh":false}},{"path":"/pages/userstate/lock","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/login/register_back","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/me/me_edit/me_edit_info","meta":{},"window":{"navigationBarTitleText":"商家认证","enablePullDownRefresh":false}},{"path":"/pages/me/setting/setting","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/login/reset_password_all","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/test","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/other/web","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/login/register_username","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/login/reset_password_by_old","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat_group/group_list","meta":{},"window":{"navigationBarTitleText":"群聊","enablePullDownRefresh":false,"onReachBottomDistance":100,"titleNView":{"buttons":[{"text":"新建","fontSize":"30rpx","color":"#28a745","width":"auto"}]}}},{"path":"/pages/chat_group/group_add","meta":{},"window":{"navigationBarTitleText":"选择好友","enablePullDownRefresh":false,"onReachBottomDistance":100,"titleNView":{"buttons":[{"text":"完成","fontSize":"30rpx","color":"#28a745","width":"auto"}]}}},{"path":"/pages/chat_group/chat_group","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"onReachBottomDistance":100,"titleNView":{"buttons":[{"text":"设置","fontSize":"30rpx","color":"#28a745","width":"auto"}]}}},{"path":"/pages/chat_group/setting","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat_group/group_user_info","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat_group/edit_nickname/edit_nickname","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/me/me_edit/me_edit_phone","meta":{},"window":{"navigationBarTitleText":"手机号","enablePullDownRefresh":false}},{"path":"/pages/windows/rightWindow","meta":{},"window":{"width":"calc(100vw - 390px)"}},{"path":"/pages/login/register_finish_info","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/wallet/wallet","meta":{},"window":{"navigationBarTitleText":"钱包","enablePullDownRefresh":false}},{"path":"/pages/wallet/cash_out_price","meta":{},"window":{"navigationBarTitleText":"提现","enablePullDownRefresh":false}},{"path":"/pages/wallet/log_cash","meta":{},"window":{"navigationBarTitleText":"提现记录","enablePullDownRefresh":false}},{"path":"/pages/wallet/log_pay","meta":{},"window":{"navigationBarTitleText":"充值记录","enablePullDownRefresh":false}},{"path":"/pages/plus/plus_coin","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/love/love_back","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
