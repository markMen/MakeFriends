(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-me-product-server_add_product"],{1695:function(t,i,a){"use strict";(function(t){a("7a82");var e=a("4ea4").default;Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=e(a("5530"));a("a434"),a("99af"),a("14d9");var o={data:function(){return{app:this.app,model:{},listPhoto:[],listPhotoLocal:[]}},methods:{onInput:function(t){var i=this.app.ed(t).key;this.model[i]=this.app.ev(t)},onDelImg:function(t){var i=this.app.ed(t).index;this.listPhoto.splice(i,1)},onDelImgLocal:function(t){var i=this.app.ed(t).index;this.listPhotoLocal.splice(i,1)},onAddImg:function(){var t=this,i=6-this.listPhoto.length-this.listPhotoLocal.length;i>0?this.app.chooseImage((function(i){var a=t.app.concat(t.listPhotoLocal,i);t.listPhotoLocal=a}),i):this.app.toast("超出上限")},previewImage:function(t){this.app.previewImage(t)},onSave:function(){var i=this;this.model.title?this.model.text?this.listPhotoLocal.length+this.listPhoto.length<=0?this.app.toast("请选择图片"):this.app.uploadFiles("api/product/upload",this.listPhotoLocal,(function(a){var e=[];for(var o in a)e.push(a[o].saveName);var s=i.listPhoto.concat(e);i.model.imgs=i.app.join(s,","),e.length>0&&(i.model.img=e[0]),i.app.postLoad("api/product/save",(0,n.default)({},i.model),(function(a){"0"==a.code&&(i.app.toast("发布成功"),t("log",e," at pages/me/product/server_add_product.vue:158"))}))})):this.app.toast("请输入描述"):this.app.toast("请输入标题")},onDel:function(){var t=this;this.app.msg("确认删除","",(function(i){i&&t.app.postLoad("api/product/del_logic",{id:t.model.id},(function(i){"0"==i.code&&(t.app.toast("删除成功"),t.app.back())}))}))}},onLoad:function(t){var i=this,a=t.id;a&&this.app.post("api/product/find",{id:a},(function(t){i.model=t.data,i.listPhoto=t.imgs_split}))}};i.default=o}).call(this,a("0de9")["log"])},"43f5":function(t,i,a){"use strict";a.r(i);var e=a("1695"),n=a.n(e);for(var o in e)["default"].indexOf(o)<0&&function(t){a.d(i,t,(function(){return e[t]}))}(o);i["default"]=n.a},"811f":function(t,i,a){"use strict";a.r(i);var e=a("d44c"),n=a("43f5");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(i,t,(function(){return n[t]}))}(o);var s=a("f0c5"),l=Object(s["a"])(n["default"],e["b"],e["c"],!1,null,"490ac280",null,!1,e["a"],void 0);i["default"]=l.exports},d44c:function(t,i,a){"use strict";a.d(i,"b",(function(){return e})),a.d(i,"c",(function(){return n})),a.d(i,"a",(function(){}));var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",[a("v-uni-view",{staticClass:"text-center-h text-md"},[t._v("发布信息")]),a("v-uni-view",{staticClass:"pp"},[a("v-uni-view",{staticClass:"rows"},[a("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("标题")]),a("v-uni-view",{staticClass:"form-text-right"},[a("v-uni-input",{attrs:{"data-key":"title",value:t.model.title,type:"text",placeholder:"请输入标题"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.onInput.apply(void 0,arguments)}}})],1)],1),a("v-uni-view",{staticClass:"rows pt"},[a("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("描述")]),a("v-uni-view",{staticClass:"form-text-right"},[a("v-uni-textarea",{staticClass:"text-height-desc",staticStyle:{"max-width":"500rpx"},attrs:{"data-key":"text",value:t.model.text,maxlength:"10240",type:"text",placeholder:"请输入描述"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.onInput.apply(void 0,arguments)}}})],1)],1),a("v-uni-view",{staticClass:"rows pt "},[a("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("图片")]),a("v-uni-view",{staticClass:"form-text-right"},[a("v-uni-input",{attrs:{type:"text",placeholder:"请选择图片"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onAddImg.apply(void 0,arguments)}}})],1)],1),a("v-uni-view",{staticClass:"box-wrap-start"},t._l(t.listPhoto,(function(i,e){return a("v-uni-view",{key:e,staticClass:"col img-box pr pt"},[a("v-uni-image",{staticClass:"img-border",attrs:{src:t.app.upload+i,"data-src":t.app.upload+i},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.previewImage.apply(void 0,arguments)}}}),a("v-uni-button",{staticClass:"btn-danger  full-width text-center-hv",attrs:{"data-index":e},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onDelImg.apply(void 0,arguments)}}},[t._v("x")])],1)})),1),a("v-uni-view",{staticClass:"box-wrap-start"},t._l(t.listPhotoLocal,(function(i,e){return a("v-uni-view",{key:e,staticClass:"col img-box pr pt"},[a("v-uni-image",{staticClass:"img-border",attrs:{src:i,"data-src":i},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.previewImage.apply(void 0,arguments)}}}),a("v-uni-button",{staticClass:"btn-danger  full-width text-center-hv",attrs:{"data-index":e},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onDelImgLocal.apply(void 0,arguments)}}},[t._v("x")])],1)})),1),t.model.id?t._e():a("v-uni-view",{staticClass:"pt-lg"},[a("v-uni-button",{staticClass:"btn-success",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onSave.apply(void 0,arguments)}}},[t._v("发布")])],1),t.model.id?a("v-uni-view",{staticClass:"pt-lg"},[a("v-uni-view",{staticClass:"pt"},[a("v-uni-button",{staticClass:"btn-success",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onSave.apply(void 0,arguments)}}},[t._v("保存")])],1),a("v-uni-view",{staticClass:"pt"},[a("v-uni-button",{staticClass:"btn-danger",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onDel.apply(void 0,arguments)}}},[t._v("删除")])],1)],1):t._e()],1)],1)},n=[]}}]);