(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-about"],{1629:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"tui-flex"},[i("v-uni-view",{staticClass:"tui-cube-box",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.log.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"tui-cube tui-cube-1"},[t._v("TH❤R UI")]),i("v-uni-view",{staticClass:"tui-cube tui-cube-2"},[t._v("V"+t._s(t.version))]),i("v-uni-view",{staticClass:"tui-cube tui-cube-3"},[t._v("TH❤R UI")]),i("v-uni-view",{staticClass:"tui-cube tui-cube-4"},[t._v("V"+t._s(t.version))]),i("v-uni-view",{staticClass:"tui-cube tui-cube-5"},[t._v("TH❤R UI")]),i("v-uni-view",{staticClass:"tui-cube tui-cube-6"},[t._v("V"+t._s(t.version))])],1)],1),i("v-uni-view",{staticClass:"tui-content-box"},[i("v-uni-view",{staticClass:"tui-content"},[t._v("尊敬的开发者，欢迎体验Thor UI！")]),i("v-uni-view",{staticClass:"tui-content"},[t._v("该项目主要是一些uni-app代码片段的分享，以及基础组件的封装。项目免费开源，源码可在"),i("v-uni-text",{staticClass:"tui-content-email",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copy("https://github.com/dingyong0214/ThorUI-uniapp")}}},[t._v("GitHub")]),t._v("上下载，欢迎Watch\n\t\t\t& Star ★。")],1),i("v-uni-view",{staticClass:"tui-content"},[t._v("项目可能存在缺陷或者bug，如果您在使用过程中发现问题或者有更好的建议，可反馈给我。")]),i("v-uni-view",{staticClass:"tui-content"},[t._v("您可以通过反馈或者以下方式联系我！")]),i("v-uni-view",{staticClass:"tui-content tui-content-email",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copy("1062884167@qq.com")}}},[t._v("邮箱：1062884167@qq.com")]),i("v-uni-view",{staticClass:"tui-content tui-content-email",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copy("881906325")}}},[t._v("QQ交流群：881906325")]),i("v-uni-view",{staticClass:"tui-footer"},[i("v-uni-image",{staticClass:"tui-applets",attrs:{src:n("18d1"),mode:"widthFix"}}),i("v-uni-view",{staticClass:"tui-footer-text"},[t._v("扫描二维码，您的朋友也可以体验Thor UI！")])],1)],1)],1)},o=[]},"18d1":function(t,e,n){t.exports=n.p+"static/img/applets.b60b32b5.jpg"},"270f":function(t,e,n){"use strict";var i=n("4ea4").default,o=i(n("3a3c")),r={getClipboardData:function(t,e){var n=window.event||{},i=new o.default("",{text:function(){return t}});i.on("success",(function(t){"function"==typeof e&&e(!0),i.off("success"),i.off("error"),i.destroy()})),i.on("error",(function(t){"function"==typeof e&&e(!1),i.off("success"),i.off("error"),i.destroy()})),i.onClick(n)}};t.exports={getClipboardData:r.getClipboardData}},"3a3c":function(t,e,n){(function(t){var i,o,r,a=n("7037").default;n("7a82"),n("a4d3"),n("e01a"),n("d3b7"),n("944a"),n("0c47"),n("23dc"),n("d28b"),n("3ca3"),n("ddb0"),n("d9e2"),n("d401"),n("3410"),n("131a"),n("159b"),n("25f0"),n("14d9"),n("fb6a"),n("d81d"),function(n,c){"object"==a(e)&&"object"==a(t)?t.exports=c():(o=[],i=c,r="function"===typeof i?i.apply(e,o):i,void 0===r||(t.exports=r))}(0,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==a(t)&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";var i="function"==typeof Symbol&&"symbol"==a(Symbol.iterator)?function(t){return a(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":a(t)},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=s(n(1)),c=s(n(3)),u=s(n(4));function s(t){return t&&t.__esModule?t:{default:t}}var l=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=a(e)&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.resolveOptions(n),i.listenClick(t),i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+a(e));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,c.default),o(e,[{key:"resolveOptions",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===i(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,u.default)(t,"click",(function(t){return e.onClick(t)}))}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new r.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return f("action",t)}},{key:"defaultTarget",value:function(t){var e=f("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return f("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach((function(t){n=n&&!!document.queryCommandSupported(t)})),n}}]),e}();function f(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}t.exports=l},function(t,e,n){"use strict";var i,o="function"==typeof Symbol&&"symbol"==a(Symbol.iterator)?function(t){return a(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":a(t)},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),c=n(2),u=(i=c)&&i.__esModule?i:{default:i},s=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.resolveOptions(t),this.initSelection()}return r(e,[{key:"resolveOptions",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,u.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,u.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":o(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),e}();t.exports=s},function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var i=window.getSelection(),o=document.createRange();o.selectNodeContents(t),i.removeAllRanges(),i.addRange(o),e=i.toString()}return e}},function(t,e){function n(){}n.prototype={on:function(t,e,n){var i=this.e||(this.e={});return(i[t]||(i[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var i=this;function o(){i.off(t,o),e.apply(n,arguments)}return o._=e,this.on(t,o,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),i=0,o=n.length;i<o;i++)n[i].fn.apply(n[i].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),i=n[t],o=[];if(i&&e)for(var r=0,a=i.length;r<a;r++)i[r].fn!==e&&i[r].fn._!==e&&o.push(i[r]);return o.length?n[t]=o:delete n[t],this}},t.exports=n},function(t,e,n){var i=n(5),o=n(6);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!i.string(e))throw new TypeError("Second argument must be a String");if(!i.fn(n))throw new TypeError("Third argument must be a Function");if(i.node(t))return d=e,p=n,(f=t).addEventListener(d,p),{destroy:function(){f.removeEventListener(d,p)}};if(i.nodeList(t))return u=t,s=e,l=n,Array.prototype.forEach.call(u,(function(t){t.addEventListener(s,l)})),{destroy:function(){Array.prototype.forEach.call(u,(function(t){t.removeEventListener(s,l)}))}};if(i.string(t))return r=t,a=e,c=n,o(document.body,r,a,c);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var r,a,c,u,s,l,f,d,p}},function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"==typeof t||t instanceof String},e.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e,n){var i=n(7);function o(t,e,n,o,r){var a=function(t,e,n,o){return function(n){n.delegateTarget=i(n.target,e),n.delegateTarget&&o.call(t,n)}}.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}t.exports=function(t,e,n,i,r){return"function"==typeof t.addEventListener?o.apply(null,arguments):"function"==typeof n?o.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,(function(t){return o(t,e,n,i,r)})))}},function(t,e){if("undefined"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}t.exports=function(t,e){for(;t&&9!==t.nodeType;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}}])}))}).call(this,n("62e4")(t))},"5f1c":function(t,e,n){"use strict";var i=n("c1f6"),o=n.n(i);o.a},"6fab":function(t,e,n){"use strict";n.r(e);var i=n("f3af"),o=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"97f5":function(t,e,n){"use strict";n.r(e);var i=n("1629"),o=n("6fab");for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("5f1c");var a=n("f0c5"),c=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,"08e6ca60",null,!1,i["a"],void 0);e["default"]=c.exports},ace41:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".container[data-v-08e6ca60]{padding:0 %?50?% %?40?% %?50?%;box-sizing:border-box}.tui-flex[data-v-08e6ca60]{display:flex;align-items:center;justify-content:center;padding-top:40px}.tui-cube-box[data-v-08e6ca60]{width:60px;height:60px;position:relative;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-animation:tui-go-data-v-08e6ca60 4s linear infinite;animation:tui-go-data-v-08e6ca60 4s linear infinite}@-webkit-keyframes tui-go-data-v-08e6ca60{0%{-webkit-transform:rotateX(0) rotateY(0);transform:rotateX(0) rotateY(0)}100%{-webkit-transform:rotateX(1turn) rotateY(1turn);transform:rotateX(1turn) rotateY(1turn)}}@keyframes tui-go-data-v-08e6ca60{0%{-webkit-transform:rotateX(0) rotateY(0);transform:rotateX(0) rotateY(0)}100%{-webkit-transform:rotateX(1turn) rotateY(1turn);transform:rotateX(1turn) rotateY(1turn)}}.tui-cube[data-v-08e6ca60]{width:60px;height:60px;position:absolute;display:flex;align-items:center;justify-content:center;padding:5px;box-sizing:border-box;font-size:%?24?%;color:#fff;text-align:center;word-break:break-all;word-wrap:break-word}.tui-cube-1[data-v-08e6ca60]{background:#fff;-webkit-transform:rotateY(90deg) translateZ(-30px);transform:rotateY(90deg) translateZ(-30px);color:#333!important}.tui-cube-2[data-v-08e6ca60]{background:#8a5966;-webkit-transform:rotateY(90deg) translateZ(30px);transform:rotateY(90deg) translateZ(30px)}.tui-cube-3[data-v-08e6ca60]{background:linear-gradient(-90deg,#5677fc,#5c8dff);-webkit-transform:rotateX(90deg) translateZ(30px);transform:rotateX(90deg) translateZ(30px)}.tui-cube-4[data-v-08e6ca60]{background:#ed3f14;-webkit-transform:rotateX(90deg) translateZ(-30px);transform:rotateX(90deg) translateZ(-30px)}.tui-cube-5[data-v-08e6ca60]{background:#ff7900;-webkit-transform:translateZ(30px);transform:translateZ(30px)}.tui-cube-6[data-v-08e6ca60]{background:#19be6b;-webkit-transform:translateZ(-30px);transform:translateZ(-30px)}.tui-content-box[data-v-08e6ca60]{width:100%;margin-top:50px;padding:%?30?%;box-sizing:border-box;background:#fff;border-radius:%?10?%;box-shadow:0 0 %?10?% #eee}.tui-content[data-v-08e6ca60]{color:#333;font-size:%?30?%;line-height:%?44?%;padding:%?10?% 0;text-align:justify}.tui-content-email[data-v-08e6ca60]{color:#5677fc!important}.tui-footer[data-v-08e6ca60]{display:flex;align-items:center;padding-top:%?30?%}.tui-applets[data-v-08e6ca60]{width:80px;height:80px;display:block}.tui-footer-text[data-v-08e6ca60]{font-size:%?24?%;color:#999;padding-left:%?20?%;width:%?300?%}",""]),t.exports=e},c1f6:function(t,e,n){var i=n("ace41");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("1f78b07a",i,!0,{sourceMap:!1,shadowMode:!1})},f3af:function(t,e,n){"use strict";n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("26cb"),o=n("270f"),r={computed:(0,i.mapState)(["version"]),data:function(){return{}},methods:{copy:function(t){var e=this;o.getClipboardData(t,(function(t){t?e.tui.toast("链接复制成功"):e.tui.toast("链接复制失败")}))},log:function(){uni.navigateTo({url:"../log/log"})}}};e.default=r}}]);