(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-me-setting-setting"],{"0dbe":function(t,e,i){"use strict";(function(t){i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("14d9");var n={name:"tuiListImg",props:{prefix:{type:String,default:""},imgs:{type:String,default:""},imgs_s:{type:Array,default:function(){return[]}}},computed:{toArray:function(){return function(t){return null==t||""==t?[]:t.split(",")}}},methods:{handleClick:function(){this.$emit("click",{index:this.index})},previewImage:function(e){var i=e.currentTarget.dataset.src,n=[i];uni.previewImage({urls:n,longPressActions:{itemList:["保存图片"],success:function(t){uni.downloadFile({url:n[t.index],success:function(t){200===t.statusCode&&uni.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(){uni.showToast({title:"保存成功",icon:"success"})},fail:function(){uni.showToast({title:"保存失败，请稍后重试",icon:"none"})}})}})},fail:function(e){t("log",e.errMsg," at components/list-img/list-img.vue:84")}}})},previewImages:function(e){var i=[],n=e.currentTarget.dataset.srcs.split(","),a=e.currentTarget.dataset.prefix;for(var s in n)i.push(a+n[s]);var o=e.currentTarget.dataset.src;uni.previewImage({current:o,urls:i,longPressActions:{itemList:["保存图片"],success:function(t){uni.downloadFile({url:i[t.index],success:function(t){200===t.statusCode&&uni.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(){uni.showToast({title:"保存成功",icon:"success"})},fail:function(){uni.showToast({title:"保存失败，请稍后重试",icon:"none"})}})}})},fail:function(e){t("log",e.errMsg," at components/list-img/list-img.vue:128")}}})}}};e.default=n}).call(this,i("0de9")["log"])},"10b1":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".scroll-view[data-v-724d739d]{width:100%;white-space:nowrap}.scroll-view-item[data-v-724d739d]{display:inline-block}.scroll-view-item-img[data-v-724d739d]{width:%?300?%;height:%?240?%;display:block;border-radius:%?8?%}.item-img-padding[data-v-724d739d]{padding:%?8?% %?16?% %?16?% 0}",""]),t.exports=e},"23a3":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-scroll-view",{staticClass:"scroll-view",attrs:{"scroll-x":"true"}},t._l(t.toArray(t.imgs),(function(e,n){return i("v-uni-view",{key:n,staticClass:"scroll-view-item",attrs:{"scroll-x":"true"}},[i("v-uni-view",{staticClass:"item-img-padding",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleClick.apply(void 0,arguments)}}},[i("v-uni-image",{staticClass:"scroll-view-item-img img-show-border",attrs:{src:t.prefix+e,"data-src":t.prefix+e,"data-srcs":t.imgs,"data-prefix":t.prefix,mode:"aspectFill"},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.previewImages.apply(void 0,arguments)}}})],1)],1)})),1)],1)},a=[]},"3b48":function(t,e,i){"use strict";i.r(e);var n=i("23a3"),a=i("b50f");for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("5b83");var o=i("f0c5"),u=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"724d739d",null,!1,n["a"],void 0);e["default"]=u.exports},5135:function(t,e,i){"use strict";i.r(e);var n=i("e4ff"),a=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},"5b83":function(t,e,i){"use strict";var n=i("ba97"),a=i.n(n);a.a},"680a":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".tui-userinfo-box[data-v-ee1fbd0c]{padding-bottom:%?20?%;color:#333}.tui-list-cell[data-v-ee1fbd0c]{width:100%;display:flex;align-items:center;justify-content:space-between;padding:%?24?% %?60?% %?24?% %?30?%;font-size:%?30?%}.tui-pr30[data-v-ee1fbd0c]{padding-right:%?30?%}.tui-avatar[data-v-ee1fbd0c]{width:%?100?%;height:%?100?%;display:block}.tui-content[data-v-ee1fbd0c]{font-size:%?26?%;color:#666}.tui-avatar-wx[data-v-ee1fbd0c]{width:%?50?%;height:%?50?%;display:block}",""]),t.exports=e},b50f:function(t,e,i){"use strict";i.r(e);var n=i("0dbe"),a=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},ba97:function(t,e,i){var n=i("10b1");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("c530b5c0",n,!0,{sourceMap:!1,shadowMode:!1})},dc55:function(t,e,i){"use strict";var n=i("e136"),a=i.n(n);a.a},decf:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"tui-userinfo-box"},[i("tui-list-cell",{attrs:{padding:"0",arrow:!0}},[i("v-uni-view",{staticClass:"tui-list-cell tui-pr30",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onRestPassword.apply(void 0,arguments)}}},[i("v-uni-view",[t._v("密码重置")]),i("v-uni-view",{staticClass:"tui-content"})],1)],1),i("tui-list-cell",{attrs:{padding:"0",arrow:!0}},[i("v-uni-view",{staticClass:"tui-list-cell tui-pr30",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onAbout.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"rows"},[t._v("关于遇见良人"),t.app.data.is_version?i("tui-badge",{staticClass:"ml-xs",attrs:{type:"danger",dot:!0}}):t._e()],1),i("v-uni-view",{staticClass:"tui-content"})],1)],1),i("tui-list-cell",{attrs:{padding:"0",arrow:!0}},[i("v-uni-view",{staticClass:"tui-list-cell tui-pr30",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onServer.apply(void 0,arguments)}}},[i("v-uni-view",[t._v("遇见良人客服")]),i("v-uni-view",{staticClass:"tui-content"})],1)],1),i("v-uni-view",{staticClass:"rows pt-lg pl pr"},[i("v-uni-button",{staticClass:" btn-block btn-logout text-main",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onLogout.apply(void 0,arguments)}}},[t._v("退出登录")])],1),i("v-uni-view",{staticStyle:{height:"50rpx"}})],1)},a=[]},e136:function(t,e,i){var n=i("680a");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("b50a5466",n,!0,{sourceMap:!1,shadowMode:!1})},e4ff:function(t,e,i){"use strict";(function(t){i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("99af"),i("e9c4");var a=n(i("5530")),s=n(i("9b78")),o=n(i("3b48")),u=n(i("cb1a")),r=n(i("3fa8")),c={components:{tuiListCell:s.default,listImg:o.default,listImgPre:u.default,tuiBadge:r.default},data:function(){return{app:this.app,user:{},fs:[],sex_list:["请选择","男","女"],sex_index:0,startDate:"",endDate:"",login_config:{}}},methods:{reload:function(){var t=this;this.startDate="1900-01-01",this.endDate=this.getDate("end"),this.app.post("api/user/info",{},(function(e){e.birthday||(e.birthday="1990-01-01"),e.gender||(e.gender=0),t.user=e}))},previewImage:function(t){this.app.previewImage(t)},onCompanyDesc:function(t){this.app.go("/pages/me/me_edit/me_edit")},onZhifubao:function(t){this.app.go("/pages/me/me_edit/me_edit_ali")},onAvatar:function(){var e=this;this.app.chooseImage((function(i){e.fs=i,e.app.uploadFiles("api/user/upload_file",e.fs,(function(i){t("log",i[0].saveName," at pages/me/setting/setting.vue:117"),e.user.type_avatar="1",e.user.avatar=e.app.upload+i[0].saveName,e.user.file_avatar=i[0].saveName,e.onSave()}))}),1)},onNickname:function(){this.app.go("/pages/me/me_edit")},onSave:function(){var t=this;this.app.post("api/user/save",(0,a.default)({},this.user),(function(e){t.reload(),t.app.toast("保存成功")}))},onChangeSex:function(e){var i=this.app.ev(e);t("log",i," at pages/me/setting/setting.vue:138"),this.user.gender=i,this.onSave()},getDate:function(t){var e=new Date,i=e.getFullYear(),n=e.getMonth()+1,a=e.getDate();return"start"===t?i-=60:"end"===t&&(i+=2),n=n>9?n:"0"+n,a=a>9?a:"0"+a,"".concat(i,"-").concat(n,"-").concat(a)},bindDateChange:function(t){this.user.birthday=t.target.value,this.onSave()},onLogout:function(){var t=this;this.app.msgSys("退出登录！",(function(e){e&&t.app.go("/pages/login/logout")}))},onMeDel:function(){this.app.go("/pages/me/me_del")},onWxUserInfo:function(){var e=this;this.app.getWxOpenid((function(i){e.user.wx_openid=i.openid,e.app.getUserInfo((function(i){e.user.type_avatar="2",e.user.wx_avatar=i.avatarUrl,e.user.wx_nickname=i.nickName,e.user.gender=i.gender,e.user.union_id=i.unionId,e.user.city=i.city,e.user.country=i.country,e.user.province=i.province,e.onSave(),t("log",i," at pages/me/setting/setting.vue:202")}))}))},onAliUserInfo:function(){app.get("payment/wxpayv3/index.php",{},(function(e){uni.requestPayment({provider:"wxpay",orderInfo:e,success:function(e){t("log","success:"+JSON.stringify(e)," at pages/me/setting/setting.vue:213"),invoke&&invoke(e)},fail:function(e){app.toast("取消支付"),t("log","fail:"+JSON.stringify(e)," at pages/me/setting/setting.vue:219")}})}))},on_company_imgs:function(){this.app.go("/pages/me/user_img")},on_product_imgs:function(){this.app.go("/pages/me/user_product_img")},onRestPassword:function(){"1"==this.login_config.is_sms?this.app.go("/pages/login/reset_password"):this.app.go("/pages/login/reset_password_by_old")},onAbout:function(){this.app.go("/pages/login/editor",{tag:"about"})},onServer:function(){this.app.go("/pages/me/server/server_list")},onWx:function(){var t=this;this.app.getWxOpenid((function(e){t.user.wx_openid=e.openid,t.onSave()}))},onName:function(){this.app.go("/pages/me/me_edit/me_edit_name")},onTaskLog:function(){this.app.go("/pages/me/task/task_log")},goWxBind:function(){this.app.go("/pages/me/wx/wx_user_info")},onCleanCatch:function(){try{uni.clearStorageSync()}catch(t){this.app.toastNone("清除错误")}this.app.toas("清除完成")}},onLoad:function(){var t=this;this.app.postHtml("api/login/login_config",{},(function(e){var i=e.code,n=e.data;"0"==i?t.login_config=n:t.app.toast(n)}))},onShow:function(){this.app.checkUser(),this.reload()}};e.default=c}).call(this,i("0de9")["log"])},ebaa:function(t,e,i){"use strict";i.r(e);var n=i("decf"),a=i("5135");for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("dc55");var o=i("f0c5"),u=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"ee1fbd0c",null,!1,n["a"],void 0);e["default"]=u.exports}}]);