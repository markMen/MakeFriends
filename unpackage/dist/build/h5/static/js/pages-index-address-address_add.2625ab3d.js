(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-address-address_add"],{"1b06":function(t,i,e){"use strict";e.r(i);var a=e("c97a"),s=e("790c");for(var n in s)["default"].indexOf(n)<0&&function(t){e.d(i,t,(function(){return s[t]}))}(n);e("4845");var l=e("f0c5"),c=Object(l["a"])(s["default"],a["b"],a["c"],!1,null,"50b536ac",null,!1,a["a"],void 0);i["default"]=c.exports},4845:function(t,i,e){"use strict";var a=e("d65d"),s=e.n(a);s.a},"790c":function(t,i,e){"use strict";e.r(i);var a=e("7bc3"),s=e.n(a);for(var n in a)["default"].indexOf(n)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(n);i["default"]=s.a},"7bc3":function(t,i,e){"use strict";(function(t){e("7a82");var a=e("4ea4").default;Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=a(e("5530"));e("14d9");var n=a(e("8c17")),l=a(e("4fa9")),c=a(e("9b78")),d=e("5bed"),r={components:{tuiButton:n.default,tuiListView:l.default,tuiListCell:c.default},data:function(){return{selectList:d,multiArray:[],value:[0,0,0],text:"",address:{user_name:"",province_name:"",city_name:"",county_name:"",detail_info:"",tel_number:"",tag:"",check:"0"},lists:["公司","家","学校","其他"]}},onLoad:function(t){t.address_id;this.multiArray=[this.toArr(this.selectList),this.toArr(this.selectList[0].children),this.toArr(this.selectList[0].children[0].children)]},methods:{picker:function(t){var i=t.detail.value;if(this.value=i,this.selectList.length>0){var e=this.selectList[i[0]].name,a=this.selectList[i[0]].children[i[1]].name,s=this.selectList[i[0]].children[i[1]].children[i[2]].name;this.text=e+" "+a+" "+s}},toArr:function(t){var i=[];for(var e in t)i.push(t[e].name);return i},columnPicker:function(t){var i=t.detail.column,e=t.detail.value;0===i?(this.multiArray=[this.multiArray[0],this.toArr(this.selectList[e].children),this.toArr(this.selectList[e].children[0].children)],this.value=[e,0,0]):1===i&&(this.multiArray=[this.multiArray[0],this.multiArray[1],this.toArr(this.selectList[this.value[0]].children[e].children)],this.value=[this.value[0],e,0])},onAddressTag:function(t){var i=this.app.ed(t).index,e=this.lists[i];this.address.tag=e},onSave:function(){var i=this;if(this.selectList.length>0){var e=this.value,a=this.selectList[e[0]],n=this.selectList[e[0]].children[e[1]],l=this.selectList[e[0]].children[e[1]].children[e[2]],c=a.name,d=n.name,r=l.name,u=a.id,o=n.id,h=l.id;this.app.post("api/address/add",(0,s.default)((0,s.default)({},this.address),{},{province_name:c,city_name:d,county_name:r,provice_id:u,city_id:o,county_id:h}),(function(e){t("log",e," at pages/index/address/address_add.vue:186"),i.app.toast("添加成功"),i.app.back()}))}else this.app.toast("请选择地址")},onInput:function(t){var i=this.app.ed(t).key;this.address[i]=this.app.ev(t)},onChecked:function(){"1"==this.address.check?this.address.check="0":this.address.check="1"}}};i.default=r}).call(this,e("0de9")["log"])},c97a:function(t,i,e){"use strict";e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"tui-addr-box"},[e("v-uni-form",{attrs:{"report-submit":!0}},[e("tui-list-cell",{attrs:{hover:!1,padding:"0"}},[e("v-uni-view",{staticClass:"tui-line-cell"},[e("v-uni-view",{staticClass:"tui-title"},[t._v("收货人")]),e("v-uni-input",{staticClass:"tui-input",attrs:{"placeholder-class":"tui-phcolor","data-key":"user_name",value:t.address.user_name,name:"name",placeholder:"请输入收货人姓名",maxlength:"15",type:"text"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.onInput.apply(void 0,arguments)}}})],1)],1),e("tui-list-cell",{attrs:{hover:!1,padding:"0"}},[e("v-uni-view",{staticClass:"tui-line-cell"},[e("v-uni-view",{staticClass:"tui-title"},[t._v("手机号码")]),e("v-uni-input",{staticClass:"tui-input",attrs:{"placeholder-class":"tui-phcolor","data-key":"tel_number",value:t.address.tel_number,name:"mobile",placeholder:"请输入收货人手机号码",maxlength:"11",type:"text"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.onInput.apply(void 0,arguments)}}})],1)],1),e("tui-list-cell",{attrs:{arrow:!0,padding:"0"}},[e("v-uni-view",{staticClass:"tui-line-cell"},[e("v-uni-view",{staticClass:"tui-title"},[e("v-uni-text",{staticClass:"tui-title-city-text"},[t._v("所在城市")])],1),e("v-uni-picker",{attrs:{value:t.value,mode:"multiSelector",range:t.multiArray},on:{change:function(i){arguments[0]=i=t.$handleEvent(i),t.picker.apply(void 0,arguments)},columnchange:function(i){arguments[0]=i=t.$handleEvent(i),t.columnPicker.apply(void 0,arguments)}}},[e("v-uni-input",{staticClass:"tui-input",attrs:{value:t.text,"placeholder-class":"tui-phcolor",disabled:!0,name:"city",placeholder:"请选择城市",maxlength:"50",type:"text"}})],1)],1)],1),e("tui-list-cell",{attrs:{hover:!1,padding:"0"}},[e("v-uni-view",{staticClass:"tui-line-cell"},[e("v-uni-view",{staticClass:"tui-title"},[t._v("收货地址")]),e("v-uni-input",{staticClass:"tui-input",attrs:{"placeholder-class":"tui-phcolor","data-key":"detail_info",value:t.address.detail_info,name:"address",placeholder:"请输入详细的收货地址",maxlength:"50",type:"text"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.onInput.apply(void 0,arguments)}}})],1)],1),e("tui-list-cell",{attrs:{hover:!1,padding:"0"}},[e("v-uni-view",{staticClass:"tui-line-cell"},[e("v-uni-view",{staticClass:"tui-cell-title"},[t._v("地址类型")]),e("v-uni-view",{staticClass:"tui-addr-label"},t._l(t.lists,(function(i,a){return e("v-uni-text",{key:a,staticClass:"tui-label-item",class:{"tui-label-active":i==t.address.tag},attrs:{"data-index":a},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onAddressTag.apply(void 0,arguments)}}},[t._v(t._s(i))])})),1)],1)],1),e("tui-list-cell",{attrs:{hover:!1,padding:"0"}},[e("v-uni-view",{staticClass:"tui-swipe-cell"},[e("v-uni-view",[t._v("设为默认地址")]),e("v-uni-switch",{staticClass:"tui-switch-small",attrs:{checked:"1"==t.address.check,color:"#30CC67"},on:{change:function(i){arguments[0]=i=t.$handleEvent(i),t.onChecked.apply(void 0,arguments)}}})],1)],1),e("v-uni-view",{staticClass:"tui-addr-save"},[e("tui-button",{attrs:{type:"danger",height:"88rpx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onSave.apply(void 0,arguments)}}},[t._v("保存收货地址")])],1)],1)],1)},s=[]},d65d:function(t,i,e){var a=e("f8a4");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=e("4f06").default;s("45a64938",a,!0,{sourceMap:!1,shadowMode:!1})},f8a4:function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,".tui-addr-box[data-v-50b536ac]{padding:%?20?% 0}.tui-line-cell[data-v-50b536ac]{width:100%;padding:%?24?% %?30?%;box-sizing:border-box;display:flex;align-items:center}.tui-title[data-v-50b536ac]{width:%?180?%;font-size:%?28?%}.tui-title-city-text[data-v-50b536ac]{width:%?180?%;height:%?40?%;display:block;line-height:%?46?%}.tui-input[data-v-50b536ac]{width:%?500?%}.tui-input-city[data-v-50b536ac]{flex:1;height:%?40?%;font-size:%?28?%;padding-right:%?30?%}.tui-phcolor[data-v-50b536ac]{color:#ccc;font-size:%?28?%}.tui-cell-title[data-v-50b536ac]{font-size:%?28?%}.tui-addr-label[data-v-50b536ac]{margin-left:%?70?%}.tui-label-item[data-v-50b536ac]{width:%?76?%;height:%?40?%;border:%?1?% solid #888;border-radius:%?6?%;font-size:%?26?%;text-align:center;line-height:%?40?%;margin-right:%?20?%;display:inline-block;-webkit-transform:scale(.9);transform:scale(.9)}.tui-label-active[data-v-50b536ac]{background:#e41f19;border-color:#e41f19;color:#fff}.tui-swipe-cell[data-v-50b536ac]{width:100%;display:flex;justify-content:space-between;align-items:center;background:#fff;padding:%?10?% %?24?%;border-radius:%?6?%;overflow:hidden;font-size:%?28?%}.tui-switch-small[data-v-50b536ac]{-webkit-transform:scale(.8);transform:scale(.8);-webkit-transform-origin:100% center;transform-origin:100% center}\n[data-v-50b536ac] uni-switch .uni-switch-input{margin-right:0!important}\n.tui-addr-save[data-v-50b536ac]{padding:%?24?%;margin-top:%?100?%}.tui-del[data-v-50b536ac]{padding:%?24?%}",""]),t.exports=i}}]);