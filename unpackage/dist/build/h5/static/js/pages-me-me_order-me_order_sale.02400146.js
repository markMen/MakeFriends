(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-me-me_order-me_order_sale"],{"0162":function(t,e,a){"use strict";a.r(e);var i=a("b831"),o=a("2064");for(var n in o)["default"].indexOf(n)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("f9c7");var s=a("f0c5"),r=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"1aa1c6c0",null,!1,i["a"],void 0);e["default"]=r.exports},2064:function(t,e,a){"use strict";a.r(e);var i=a("3a43"),o=a.n(i);for(var n in i)["default"].indexOf(n)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a},2291:function(t,e,a){var i=a("3940");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=a("4f06").default;o("757743f8",i,!0,{sourceMap:!1,shadowMode:!1})},3940:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".container[data-v-1aa1c6c0]{padding-bottom:env(safe-area-inset-bottom)}.tui-order-list[data-v-1aa1c6c0]{margin-top:%?80?%}.tui-order-item[data-v-1aa1c6c0]{margin-top:%?20?%;border-radius:%?10?%;overflow:hidden}.tui-goods-title[data-v-1aa1c6c0]{width:100%;font-size:%?28?%;display:flex;align-items:center;justify-content:space-between}.tui-order-status[data-v-1aa1c6c0]{color:#888;font-size:%?26?%}.tui-goods-item[data-v-1aa1c6c0]{width:100%;padding:%?20?% %?30?%;box-sizing:border-box;display:flex;justify-content:space-between}.tui-goods-img[data-v-1aa1c6c0]{width:%?180?%;height:%?180?%;display:block;flex-shrink:0}.tui-goods-center[data-v-1aa1c6c0]{flex:1;padding:%?20?% %?8?%;box-sizing:border-box}.tui-goods-name[data-v-1aa1c6c0]{max-width:%?310?%;word-break:break-all;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:%?26?%;line-height:%?32?%}.tui-goods-attr[data-v-1aa1c6c0]{font-size:%?22?%;color:#888;line-height:%?32?%;padding-top:%?20?%;word-break:break-all;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.tui-price-right[data-v-1aa1c6c0]{text-align:right;font-size:%?24?%;color:#888;line-height:%?30?%;padding-top:%?20?%}.tui-color-red[data-v-1aa1c6c0]{color:#e41f19;padding-right:%?30?%}.tui-goods-price[data-v-1aa1c6c0]{width:100%;display:flex;align-items:flex-end;justify-content:flex-end;font-size:%?24?%}.tui-size-24[data-v-1aa1c6c0]{font-size:%?24?%;line-height:%?24?%}.tui-price-large[data-v-1aa1c6c0]{font-size:%?32?%;line-height:%?30?%;font-weight:500}.tui-order-btn[data-v-1aa1c6c0]{width:100%;display:flex;align-items:center;justify-content:flex-end;background:#fff;padding:%?10?% %?30?% %?20?%;box-sizing:border-box}.tui-btn-ml[data-v-1aa1c6c0]{margin-left:%?20?%}",""]),t.exports=e},"3a43":function(t,e,a){"use strict";a("7a82");var i=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(a("1c68")),n=i(a("8c17")),s=i(a("1304")),r=i(a("a196")),d=i(a("9b78")),c=i(a("9274")),u={components:{tuiTabs:o.default,tuiButton:n.default,tuiLoadmore:s.default,tuiNomore:r.default,tuiListCell:d.default,tuiSticky:c.default},data:function(){return{app:this.app,page:null,tabs:[{name:"全部"},{name:"待付款"},{name:"待发货"},{name:"已发货"},{name:"已完成"}],currentTab:0,pageIndex:1,loadding:!1,pullUpOn:!0,scrollTop:0}},computed:{getStatusText:function(){return function(t){return this.app.getStatusText(t)}}},methods:{onReload:function(){var t=this.currentTab;0==t&&(t=""),this.page=new this.app.page("api/order/me_order_sale",{state:t}),this.page.next()},change:function(t){this.currentTab=t.index,this.onReload()},detail:function(t){var e=this.app.ed(t).index,a=this.page.data[e];this.app.go("/pages/me/me_order/me_order_detail_sale",{order_no:a.order_no})},onProductDetail:function(t){var e=this.app.ed(t).sale_id;this.app.go("/pages/index/detail/detail",{user_id:e})},setOrderState:function(t){var e=this,a=this.app.ed(t).index,i=this.page.data[a];this.app.post("api/order/set_order_state",{order_no:i.order_no,state:"3"},(function(t){"0"==t.code?(e.app.toast("发货成功"),e.onReload()):e.app.toast(t.data)}))}},onLoad:function(){},onShow:function(){this.onReload()},onPullDownRefresh:function(){var t=this;this.page.reload((function(){uni.stopPullDownRefresh(),t.app.toast("刷新成功")}))},onReachBottom:function(){this.page.next()},onPageScroll:function(t){this.scrollTop=t.scrollTop}};e.default=u},b831:function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}));var i={tuiTabs:a("1c68").default},o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"container"},[a("tui-tabs",{attrs:{tabs:t.tabs,isFixed:t.scrollTop>=0,currentTab:t.currentTab,selectedColor:"#5CD492",sliderBgColor:"#5CD492"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)}}}),a("v-uni-view",{class:{"tui-order-list":t.scrollTop>=0}},t._l(t.page.data,(function(e,i){return a("v-uni-view",{key:i,staticClass:"mm pp",class:["0"==e.is_see_sale?"red-order-bg":""]},[a("v-uni-view",{attrs:{hover:!1,lineLeft:!1}},[a("v-uni-view",{staticClass:"tui-goods-title"},[a("v-uni-view",[t._v("订单号："),a("v-uni-text",{attrs:{selectable:"true"}},[t._v(t._s(e.order_no))])],1),a("v-uni-view",{staticClass:"tui-order-status"},[t._v(t._s(t.getStatusText(e.state)))])],1)],1),a("v-uni-view",{attrs:{padding:"0","data-index":i},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.detail.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"tui-goods-item"},[a("v-uni-image",{staticClass:"goods-img-avatar",attrs:{src:e.you.avatar}}),a("v-uni-view",{staticClass:"tui-goods-center "},[a("v-uni-view",{staticClass:"tui-goods-name"},[t._v(t._s(e.you.phone))]),a("v-uni-view",{staticClass:"goods-img-avatar-text"},[t._v(t._s(e.you.company_name)+" "+t._s(e.you.company_server_name))])],1),a("v-uni-view",{staticClass:"tui-price-right"},[a("v-uni-view",[t._v("￥"+t._s(e.price))]),a("v-uni-view",[t._v("x"+t._s(e.product_count))])],1)],1)],1),a("v-uni-view",{attrs:{hover:!1,last:!0}},[a("v-uni-view",{staticClass:"tui-goods-price"},[a("v-uni-view",[t._v("共"+t._s(e.product_count)+"件商品 合计：")]),a("v-uni-view",{staticClass:"tui-size-24"},[t._v("￥")]),a("v-uni-view",{staticClass:"tui-price-large"},[t._v(t._s(e.sum_price))])],1)],1),a("v-uni-view",{staticClass:"rows-wrap-reverse mt"},[a("v-uni-view",{staticClass:"tui-btn-ml",attrs:{"data-sale_id":e.creby},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onProductDetail.apply(void 0,arguments)}}},[a("tui-button",{attrs:{type:"danger",plain:!0,width:"188rpx",height:"56rpx",size:26,shape:"circle"}},[t._v("进入买家主页")])],1)],1)],1)})),1),a("tui-loadmore",{attrs:{visible:t.page.isLoad,index:3,type:"primary"}}),a("tui-nomore",{attrs:{visible:t.page.isMore}})],1)},n=[]},f9c7:function(t,e,a){"use strict";var i=a("2291"),o=a.n(i);o.a}}]);