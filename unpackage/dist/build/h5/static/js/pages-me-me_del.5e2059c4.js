(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-me-me_del"],{"7add":function(t,e,n){"use strict";n.r(e);var i=n("7c20"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"7c20":function(t,e,n){"use strict";(function(t){n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{app:this.app,user:{},phoneCode:null,model:{}}},methods:{onInput:function(t){this.model[this.app.ed(t).key]=this.app.ev(t)},onDelUser:function(){var t=this;this.app.msg("确定注销","注销后将会删除此账号的数据",(function(e){e&&t.app.post("api/user/edit_user_del",{del:"-3",phone_code:t.model.phone_code,del_text:t.model.del_text,password:t.model.password},(function(e){"0"==e.code?(t.app.toast("注销成功"),t.app.goc("/pages/me/me_del_ing")):t.app.toast(e.data)}))}))}},onShow:function(){var e=this;this.phoneCode=new this.app.PhoneCode((function(){e.app.postHtml("api/login/login_send_code",{phone:e.user.phone},(function(t){"0"==t.code?e.app.toast("发送成功"):e.app.toast(t.data)})),t("log","发送验证码"," at pages/me/me_del.vue:94")})),this.app.post("api/user/info",{},(function(t){e.user=t}))}};e.default=i}).call(this,n("0de9")["log"])},"84f1":function(t,e,n){"use strict";n.r(e);var i=n("bfcc"),a=n("7add");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var s=n("f0c5"),u=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"16d9ed04",null,!1,i["a"],void 0);e["default"]=u.exports},bfcc:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"pp"},[n("v-uni-view",{staticClass:"text-center-h"},[t._v("注销")]),n("v-uni-view",{},[t._v("您的宝贵建议")]),n("v-uni-textarea",{staticClass:"full-width",attrs:{value:"",placeholder:"您的宝贵建议","data-key":"del_text"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"rows pt"},[n("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("默认的手机号")]),n("v-uni-view",{staticClass:"form-text-right"},[n("v-uni-text",{attrs:{"data-key":"price"}},[t._v(t._s(t.user.phone))])],1)],1),n("v-uni-view",{staticClass:"rows pt"},[n("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("验证码")]),n("v-uni-view",{staticClass:"form-text-right"},[n("v-uni-input",{attrs:{"data-key":"phone_code",value:"",type:"digit",placeholder:"请输入验证码",maxlength:"6"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticClass:"form-text-left form-text-left",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.phoneCode.onCode()}}},[t._v(t._s(t.phoneCode.text))])],1),n("v-uni-view",{staticClass:"rows pt"},[n("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("密码")]),n("v-uni-view",{staticClass:"form-text-right"},[n("v-uni-input",{attrs:{"data-key":"password",value:"",type:"password",placeholder:"请输入密码"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)}}})],1)],1),n("v-uni-view",{staticClass:"box pt-lg mt-lg"},[n("v-uni-button",{staticClass:"btn btn-dark",staticStyle:{width:"250rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.app.back()}}},[t._v("返回")]),n("v-uni-button",{staticClass:"btn btn-danger",staticStyle:{width:"250rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onDelUser()}}},[t._v("提交")])],1)],1)},a=[]}}]);