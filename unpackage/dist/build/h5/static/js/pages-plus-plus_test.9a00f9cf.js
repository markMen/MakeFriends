(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-plus-plus_test"],{"44b4":function(t,n,i){"use strict";i.r(n);var s=i("98c2"),e=i("883a");for(var o in e)["default"].indexOf(o)<0&&function(t){i.d(n,t,(function(){return e[t]}))}(o);i("a9ab");var a=i("f0c5"),c=Object(a["a"])(e["default"],s["b"],s["c"],!1,null,"43a9e7e4",null,!1,s["a"],void 0);n["default"]=c.exports},"883a":function(t,n,i){"use strict";i.r(n);var s=i("9ed6"),e=i.n(s);for(var o in s)["default"].indexOf(o)<0&&function(t){i.d(n,t,(function(){return s[t]}))}(o);n["default"]=e.a},"98c2":function(t,n,i){"use strict";i.d(n,"b",(function(){return s})),i.d(n,"c",(function(){return e})),i.d(n,"a",(function(){}));var s=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",[t.user.plus_time_end?i("v-uni-view",{staticClass:"pt pl pr pb-lg"},[i("v-uni-view",{staticClass:"pt rows"},[i("v-uni-view",[t._v("会员到期时间：")]),i("v-uni-view",{staticClass:"text-color-6 rows"},[i("v-uni-image",{staticStyle:{width:"42rpx",height:"42rpx"},attrs:{src:"/static/image/vip.png",alt:"",mode:"scaleToFill"}}),i("v-uni-view",{staticClass:"pl-sm"},[t._v(t._s(t.plusTime(t.user.plus_time_end)))])],1)],1)],1):t._e(),i("v-uni-view",{staticClass:"pp"},[t._v("开通会员服务（开通12个月及以上享8.5折优惠，年费会员）")]),"android"==t.system?i("v-uni-view",{staticClass:"rows pl pr"},[i("v-uni-view",{staticClass:"plus-box text-center-hv cols",class:["1"==t.month?"plus-box-check":""],attrs:{"data-month":"1"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onMonth.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"text-md"},[t._v("1个月")]),i("v-uni-view",{staticClass:"text-sm"},[t._v(t._s(t.monthToPrice(1))+"元(1个月)")])],1),i("v-uni-view",{staticClass:"plus-box text-center-hv cols",class:["6"==t.month?"plus-box-check":""],attrs:{"data-month":"6"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onMonth.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"text-md"},[t._v("6个月")]),i("v-uni-view",{staticClass:"text-sm"},[t._v(t._s(t.monthToPrice(6))+"元(6个月)")])],1)],1):t._e(),"android"==t.system?i("v-uni-view",{staticClass:"rows pl pr"},[i("v-uni-view",{staticClass:"plus-box text-center-hv cols",class:["12"==t.month?"plus-box-check":""],attrs:{"data-month":"12"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onMonth.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"text-md"},[t._v("年费会员")]),i("v-uni-view",{staticClass:"text-sm"},[t._v(t._s(t.monthToPrice(12))+"元(12个月)")])],1),i("v-uni-view",{staticClass:"plus-box text-center-hv cols",class:[""!=t.month?"plus-box-check-text":""]},[i("v-uni-view",{staticClass:"rows text-center-hv"},[i("v-uni-view",{staticStyle:{margin:"25rpx"}},[i("v-uni-input",{staticClass:"text-md",staticStyle:{"text-align":"center",width:"100rpx",border:"4rpx solid #ffaa00",padding:"5rpx 15rpx"},attrs:{type:"digit"},on:{input:function(n){arguments[0]=n=t.$handleEvent(n),t.onInputMonth.apply(void 0,arguments)}},model:{value:t.month,callback:function(n){t.month=n},expression:"month"}})],1),i("v-uni-view",[t._v("个月")])],1),i("v-uni-view",{staticClass:"text-sm"},[t._v("共计"+t._s(t.monthToPrice(t.month))+"元("+t._s(t.month)+"个月)")])],1)],1):t._e(),"ios"==t.system?i("v-uni-view",{staticClass:"rows pl pr"},[i("v-uni-view",{staticClass:"plus-box text-center-hv cols",class:["1"==t.month?"plus-box-check":""],attrs:{"data-month":"1"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onMonth.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"text-md"},[t._v("1个月")]),i("v-uni-view",{staticClass:"text-sm"},[t._v(t._s(t.monthToPrice(1))+"元(1个月)")])],1),i("v-uni-view",{staticClass:"plus-box text-center-hv cols",class:["3"==t.month?"plus-box-check":""],attrs:{"data-month":"3"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onMonth.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"text-md"},[t._v("3个月")]),i("v-uni-view",{staticClass:"text-sm"},[t._v(t._s(t.monthToPrice(3))+"元(3个月)")])],1)],1):t._e(),"ios"==t.system?i("v-uni-view",{staticClass:"rows pl pr"},[i("v-uni-view",{staticClass:"plus-box text-center-hv cols",class:["6"==t.month?"plus-box-check":""],attrs:{"data-month":"6"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onMonth.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"text-md"},[t._v("6个月")]),i("v-uni-view",{staticClass:"text-sm"},[t._v(t._s(t.monthToPrice(6))+"元(6个月)")])],1),i("v-uni-view",{staticClass:"plus-box text-center-hv cols",class:["12"==t.month?"plus-box-check":""],attrs:{"data-month":"12"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onMonth.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"text-md"},[t._v("年费会员")]),i("v-uni-view",{staticClass:"text-sm"},[t._v(t._s(t.monthToPrice(12))+"元(12个月)")])],1)],1):t._e(),i("v-uni-view",{staticClass:"box-wrap-space-around pt-lg mt-lg"},["android"==t.system?i("v-uni-view",[i("v-uni-button",{staticClass:"btn-primary",staticStyle:{width:"400rpx !important"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.btnAliPay.apply(void 0,arguments)}}},[t._v("支付宝支付")])],1):t._e(),"android"==t.system?i("v-uni-view",[i("v-uni-button",{staticClass:"btn-success",staticStyle:{width:"400rpx !important"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.btnWxPay.apply(void 0,arguments)}}},[t._v("微信支付")])],1):t._e(),"ios"==t.system?i("v-uni-view",[i("v-uni-button",{staticClass:"btn-dark",staticStyle:{width:"400rpx !important"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.btnApplePay.apply(void 0,arguments)}}},[t._v("苹果支付")])],1):t._e()],1),i("v-uni-view",{staticStyle:{height:"200rpx"}}),t.user.openid?i("v-uni-view",{staticClass:"bottom bg-white-bg rows"},[i("v-uni-button",{staticClass:" btn-warning full-width",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onLogout.apply(void 0,arguments)}}},[t._v("更换账号")])],1):t._e()],1)},e=[]},"9ed6":function(t,n,i){"use strict";i("7a82");var s=i("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=s(i("5530"));i("e25e");var o={data:function(){return{user:{},order:{},month:"",input_month:"",system:"",system_show:"0"}},computed:{monthToPrice:function(){return function(t){var n=5*t;return n>=60&&(n*=.85),"android"==this.system||("1"==t?n="6":"3"==t?n="18":"6"==t?n="30":"12"==t&&(n="50")),n}},plusTime:function(){return function(t){return t?t.substr(0,10):t}}},methods:{reLoad:function(){var t=this;this.app.post("api/user/info",{},(function(n){t.user=n})),this.app.postHtml("api/config/config",{key:"system_vip_show"},(function(n){t.system_show=n.value}));var n=uni.getSystemInfoSync().platform;this.system=n},onInputMonth:function(t){var n=this,i=parseInt(this.app.ev(t));this.$nextTick((function(){n.month=i}))},btnWxPay:function(){var t=this;t.payPre((function(){t.app.wxPay({total:t.order.price,subject:"自定义订单",out_trade_no:t.order.order_no},(function(n){t.payFinish()}))}),{pay_type:"2"})},btnAliPay:function(){var t=this;t.payPre((function(){t.app.aliPay({total:t.order.price,subject:"自定义订单",out_trade_no:t.order.order_no},(function(n){t.payFinish()}))}),{pay_type:"1"})},btnApplePay:function(){var t=this;t.payPre((function(){t.app.ApplePay({total:t.order.price,subject:"自定义订单",out_trade_no:t.order.order_no,apple_product_list:t.order.apple_product_list,apple_product:t.order.apple_product},(function(n){t.payFinish()}))}),{pay_type:"3"})},payPre:function(t,n){var i=this;this.month?this.app.post("api/plus_order/cre_order_month?XDEBUG_SESSION_START=11841",(0,e.default)({month:this.month},n),(function(n){i.order=n,t&&t()})):this.app.toast("请选择月份")},payFinish:function(){var t=this;this.app.post("api/plus_order/order_pay_finish?XDEBUG_SESSION_START=15934",{order_no:this.order.order_no},(function(n){t.app.toast("支付成功"),t.reLoad()}))},onMonth:function(t){this.month=this.app.ed(t).month},onLogout:function(){var t=this;this.app.msgSys("退出登录！",(function(n){n&&(t.app.setUser(null),t.app.go("/pages/login/login"))}))}},onLoad:function(){this.app.setTitle("我的会员")},onShow:function(){this.reLoad()}};n.default=o},a9ab:function(t,n,i){"use strict";var s=i("b627"),e=i.n(s);e.a},b627:function(t,n,i){var s=i("b91c");s.__esModule&&(s=s.default),"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var e=i("4f06").default;e("406b565c",s,!0,{sourceMap:!1,shadowMode:!1})},b91c:function(t,n,i){var s=i("24fb");n=s(!1),n.push([t.i,".plus-box[data-v-43a9e7e4]{margin:%?10?%;width:50%;height:%?200?%;border-radius:%?20?%;border:%?1?% solid #fa0;background:#fef5eb}.plus-box-check[data-v-43a9e7e4]{background:#e1d9d1}.plus-box-check-text[data-v-43a9e7e4]{background:#e9c444}",""]),t.exports=n}}]);