(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-me-product-me_add_product"],{"264d":function(t,i,e){"use strict";(function(t){e("7a82");var a=e("4ea4").default;Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=a(e("5530"));e("a434"),e("99af"),e("14d9");var o={data:function(){return{app:this.app,model:{title:"",text:"",price:"",count:"",img:"",imgs:"",video:""},listPhoto:[],listPhotoLocal:[],is_loading:!1,video:""}},methods:{onInput:function(t){var i=this.app.ed(t).key;this.model[i]=this.app.ev(t)},onDelImg:function(t){var i=this.app.ed(t).index;this.listPhoto.splice(i,1)},onDelImgLocal:function(t){var i=this.app.ed(t).index;this.listPhotoLocal.splice(i,1)},onAddImg:function(){var t=this;if(!this.model.id){var i=6-this.listPhoto.length-this.listPhotoLocal.length;i>0?this.app.chooseImage((function(i){var e=t.app.concat(t.listPhotoLocal,i);t.listPhotoLocal=e}),i):this.app.toast("超出上限")}},previewImage:function(t){this.app.previewImage(t)},onSaveModel:function(){var t=this,i=this;this.app.post("api/product/save",(0,s.default)({},this.model),(function(e){t.app.toastHide(),"0"==e.code?(t.app.toast("发布成功"),i.model={title:"",text:"",price:"",count:"",img:"",imgs:"",video:""},t.video="",i.listPhoto=[],i.listPhotoLocal=[]):t.app.toastNone(e.data),t.is_loading=!1}))},onSave:function(){var t=this;this.model.title?this.model.text?this.model.type?this.model.price?this.model.count?this.listPhotoLocal.length+this.listPhoto.length<=0?this.app.toast("请选择图片"):this.is_loading||(this.is_loading=!0,this.app.toastLoading(),this.app.uploadFiles("api/product/upload",this.listPhotoLocal,(function(i){var e=[];for(var a in i)e.push(i[a].saveName);var s=t.listPhoto.concat(e);t.model.imgs=t.app.join(s,","),e.length>0&&(t.model.img=e[0]),t.onSaveModel()}))):this.app.toast("请输入数量"):this.app.toast("请输入价格"):this.app.toast("选择类型"):this.app.toast("请输入描述"):this.app.toast("请输入标题")},onDel:function(){var t=this;this.app.msg("确认删除","",(function(i){i&&t.app.postLoad("api/product/del_logic",{id:t.model.id},(function(i){"0"==i.code&&(t.app.toast("删除成功"),t.app.back())}))}))},onAddVideo:function(t){var i=this;this.app.chooseVideo((function(t){i.app.toastLoading(),i.app.uploadFile("api/product/upload_video",t,(function(t){i.model.video=t.saveName,i.model.video_img=t.video_img}),(function(t){}),(function(t){i.app.toastHide()}))}))},onChangeType:function(i){var e=this.app.ev(i);this.model.type=e,t("log",e," at pages/me/product/me_add_product.vue:297")}},onLoad:function(t){var i=this,e=t.id;e&&this.app.post("api/product/find",{id:e},(function(t){i.model=t.data,i.listPhoto=t.imgs_split}))}};i.default=o}).call(this,e("0de9")["log"])},"47e6":function(t,i,e){"use strict";e.r(i);var a=e("f168"),s=e("c9fa");for(var o in s)["default"].indexOf(o)<0&&function(t){e.d(i,t,(function(){return s[t]}))}(o);var n=e("f0c5"),l=Object(n["a"])(s["default"],a["b"],a["c"],!1,null,"1cd1c569",null,!1,a["a"],void 0);i["default"]=l.exports},c9fa:function(t,i,e){"use strict";e.r(i);var a=e("264d"),s=e.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(o);i["default"]=s.a},f168:function(t,i,e){"use strict";e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("v-uni-view",{staticClass:"text-center-h text-md"},[t._v("发布信息")]),e("v-uni-view",{staticClass:"pp"},[e("v-uni-view",{staticClass:"rows"},[e("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("标题"),e("v-uni-text",{staticClass:"pl-sm text-start"},[t._v("*")])],1),e("v-uni-view",{staticClass:"form-text-right"},[e("v-uni-input",{attrs:{disabled:t.model.id,"data-key":"title",value:t.model.title,type:"text",placeholder:"请输入标题"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.onInput.apply(void 0,arguments)}}})],1)],1),e("v-uni-view",{staticClass:"rows pt"},[e("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("描述"),e("v-uni-text",{staticClass:"pl-sm text-start"},[t._v("*")])],1),e("v-uni-view",{staticClass:"form-text-right"},[e("v-uni-textarea",{staticClass:"text-height-desc",staticStyle:{"max-width":"500rpx"},attrs:{disabled:t.model.id,"data-key":"text",value:t.model.text,maxlength:"10240",type:"text",placeholder:"请输入描述"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.onInput.apply(void 0,arguments)}}})],1)],1),e("v-uni-view",{staticClass:"rows pt pb-md"},[e("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("类型"),e("v-uni-text",{staticClass:"pl-sm text-start"},[t._v("*")])],1),e("v-uni-view",{staticClass:"form-text-right"},[e("v-uni-radio-group",{staticClass:"cols",attrs:{name:"",disabled:t.model.id},on:{change:function(i){arguments[0]=i=t.$handleEvent(i),t.onChangeType.apply(void 0,arguments)}}},[e("v-uni-label",{staticClass:"pp-sm"},[e("v-uni-radio",{attrs:{value:"1",checked:1==t.model.type}}),e("v-uni-text",[t._v("销售")])],1),e("v-uni-label",{staticClass:"pp-sm"},[e("v-uni-radio",{attrs:{value:"2",checked:2==t.model.type}}),e("v-uni-text",[t._v("采购")])],1)],1)],1)],1),e("v-uni-view",{staticClass:"rows pt"},[e("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("价格"),e("v-uni-text",{staticClass:"pl-sm text-start"},[t._v("*")])],1),e("v-uni-view",{staticClass:"form-text-right"},[e("v-uni-input",{attrs:{disabled:t.model.id,"data-key":"price",value:t.model.price,type:"digit",placeholder:"请输入价格"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.onInput.apply(void 0,arguments)}}})],1)],1),e("v-uni-view",{staticClass:"rows pt"},[e("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("数量"),e("v-uni-text",{staticClass:"pl-sm text-start"},[t._v("*")])],1),e("v-uni-view",{staticClass:"form-text-right"},[e("v-uni-input",{attrs:{disabled:t.model.id,"data-key":"count",value:t.model.count,type:"number",placeholder:"请输入数量"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.onInput.apply(void 0,arguments)}}})],1)],1),e("v-uni-view",{staticClass:"rows pt-lg "},[e("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("视频")]),e("v-uni-view",{staticClass:"form-text-right",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onAddVideo.apply(void 0,arguments)}}},[e("v-uni-input",{attrs:{type:"text",placeholder:"可上传60秒以内的视频介绍产品（选填）",disabled:"disabled"}})],1)],1),t.model.video?e("v-uni-view",{staticClass:"rows pt-lg "},[e("v-uni-view",{staticClass:"form-text-left form-text-left"}),e("v-uni-view",{staticClass:"form-text-right full-width"},[e("v-uni-video",{staticClass:"full-width",attrs:{src:t.app.upload+t.model.video,controls:!0,poster:t.app.upload+t.model.video_img}})],1)],1):t._e(),e("v-uni-view",{staticClass:"rows pt-lg "},[e("v-uni-view",{staticClass:"form-text-left form-text-left"},[t._v("图片"),e("v-uni-text",{staticClass:"pl-sm text-start"},[t._v("*")])],1),e("v-uni-view",{staticClass:"form-text-right",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onAddImg.apply(void 0,arguments)}}},[e("v-uni-input",{attrs:{type:"text",placeholder:"请选择图片(第一张图默认为封面)",disabled:"disabled"}})],1)],1),e("v-uni-view",{staticClass:"box-wrap-start"},t._l(t.listPhoto,(function(i,a){return e("v-uni-view",{key:a,staticClass:"col img-box pr pt"},[e("v-uni-image",{staticClass:"img-border",attrs:{src:t.app.upload+i,"data-src":t.app.upload+i},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.previewImage.apply(void 0,arguments)}}}),t.model.id?t._e():e("v-uni-button",{staticClass:"btn-danger  full-width text-center-hv",attrs:{"data-index":a},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onDelImg.apply(void 0,arguments)}}},[t._v("x")])],1)})),1),e("v-uni-view",{staticClass:"box-wrap-start"},t._l(t.listPhotoLocal,(function(i,a){return e("v-uni-view",{key:a,staticClass:"col img-box pr pt"},[e("v-uni-image",{staticClass:"img-border",attrs:{src:i,"data-src":i},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.previewImage.apply(void 0,arguments)}}}),t.model.id?t._e():e("v-uni-button",{staticClass:"btn-danger  full-width text-center-hv",attrs:{"data-index":a},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onDelImgLocal.apply(void 0,arguments)}}},[t._v("x")])],1)})),1),t.model.id?t._e():e("v-uni-view",{staticClass:"pt-lg"},[e("v-uni-button",{staticClass:"btn-success",attrs:{disabled:t.is_loading},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onSave.apply(void 0,arguments)}}},[t._v("发布")])],1),t.model.id?e("v-uni-view",{staticClass:"pt-lg"},[t.model.id?t._e():e("v-uni-view",{staticClass:"pt"},[e("v-uni-button",{staticClass:"btn-success",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onSave.apply(void 0,arguments)}}},[t._v("保存")])],1),e("v-uni-view",{staticClass:"pt"},[e("v-uni-button",{staticClass:"btn-danger",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onDel.apply(void 0,arguments)}}},[t._v("删除")])],1)],1):t._e()],1)],1)},s=[]}}]);