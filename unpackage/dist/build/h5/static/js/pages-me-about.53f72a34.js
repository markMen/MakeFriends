(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-me-about"],{"122e":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"text-center-h mt"},[i("v-uni-image",{staticStyle:{width:"200rpx",height:"200rpx"},attrs:{src:n("179a"),mode:"scaleToFill"}})],1),i("v-uni-view",{staticClass:"tui-view"},[i("v-uni-view",{staticClass:"tui-cell",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onVer.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"tui-title box"},[i("v-uni-view",{staticClass:"text-color-9"},[t._v("当前版本：")])],1),i("v-uni-view",{staticClass:"tui-link box",staticStyle:{color:"#333"}},[i("v-uni-view",[t._v("遇见良人 V"+t._s(t.version_local))]),i("v-uni-view",[t.is_new?i("v-uni-text",[t._v("有新版可以使用，点击升级")]):i("v-uni-text",[t._v("已经是最新版本")])],1)],1)],1),t.is_new?i("v-uni-view",[i("v-uni-view",{staticClass:"tui-cell",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onVer.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"tui-title box"},[i("v-uni-view",{staticClass:"text-color-9"},[t._v("最新版本：")]),i("v-uni-view",{staticClass:"text-color-9",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.onShop()}}},[t._v("点击下方直接更新")])],1),i("v-uni-view",{staticClass:"tui-link box"},[i("v-uni-view",[t._v("遇见良人 V"+t._s(t.version.version))]),i("v-uni-view",[t._v(t._s(t.version.upddate))])],1)],1)],1):t._e()],1),i("v-uni-view",{staticClass:"bottom",staticStyle:{"padding-bottom":"100rpx"}},[i("v-uni-view",{staticClass:"text-center-h"},[i("v-uni-view",[i("v-uni-text",{staticClass:"tui-protocol-red",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.protocol.apply(void 0,arguments)}}},[t._v("《用户协议》")]),i("v-uni-text",{staticClass:"tui-protocol-red",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.privacy_policy.apply(void 0,arguments)}}},[t._v("《隐私政策》")])],1)],1),i("v-uni-view",{staticClass:"text-center-h pt-lg"},[i("v-uni-view",[i("v-uni-text",{},[t._v("星科公司")]),i("v-uni-text",{staticClass:"pl"},[t._v("版权所有")])],1)],1)],1)],1)},o=[]},"179a":function(t,e,n){t.exports=n.p+"static/img/logo_bandu.3fba5f05.png"},"249b":function(t,e,n){"use strict";n.r(e);var i=n("316e"),o=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"270f":function(t,e,n){"use strict";var i=n("4ea4").default,o=i(n("3a3c")),r={getClipboardData:function(t,e){var n=window.event||{},i=new o.default("",{text:function(){return t}});i.on("success",(function(t){"function"==typeof e&&e(!0),i.off("success"),i.off("error"),i.destroy()})),i.on("error",(function(t){"function"==typeof e&&e(!1),i.off("success"),i.off("error"),i.destroy()})),i.onClick(n)}};t.exports={getClipboardData:r.getClipboardData}},"316e":function(t,e,n){"use strict";n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("270f"),o={data:function(){return{version_local:{},version:{},is_new:!1}},methods:{getLink:function(t){var e=this;i.getClipboardData(t,(function(t){t?e.tui.toast("链接复制成功"):e.tui.toast("链接复制失败")}))},onVer:function(){var t=this;this.app.isAndroid()?this.app.post("api/version/last",{},(function(e){t.version=e,t.checkVer(e.version,t.version_local)?t.app.msg("检测到新版本是否立即升级","",(function(n){n&&plus.runtime.openURL(t.app.upload+e.file)})):t.app.toast("已经是最新版本")})):this.app.isIos()&&this.app.post("api/version_ipa/last",{},(function(e){t.version=e,t.checkVer(e.version,t.version_local)?t.app.msg("检测到新版本是否立即升级","",(function(t){t&&plus.runtime.openURL(e.ios_url)})):t.app.toast("已经是最新版本")}))},protocol:function(){this.app.go("/pages/login/editor",{tag:"user_agreement"})},privacy_policy:function(){this.app.go("/pages/login/editor",{tag:"privacy_policy"})},checkVer:function(t,e){var n=this.app.checkVer(t,e);return this.is_new=!!n,n},onShop:function(t,e){plus.runtime.openURL("http://m3w.cn/bandu")}},onShow:function(){var t=this;this.app.isAndroid()?this.app.post("api/version/last",{},(function(e){t.version=e;try{t.version_local=plus.runtime.version,t.checkVer(e.version,t.version_local)}catch(n){t.version_local=e.version,t.checkVer(e.version,t.version_local)}})):this.app.isIos()&&this.app.post("api/version_ipa/last",{},(function(e){t.version=e;try{t.version_local=plus.runtime.version,t.checkVer(e.version,t.version_local)}catch(n){t.version_local=e.version,t.checkVer(e.version,t.version_local)}}))}};e.default=o},"318c":function(t,e,n){"use strict";n.r(e);var i=n("122e"),o=n("249b");for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("55fc");var a=n("f0c5"),c=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,"5f3e156e",null,!1,i["a"],void 0);e["default"]=c.exports},"3a3c":function(t,e,n){(function(t){var i,o,r,a=n("7037").default;n("7a82"),n("a4d3"),n("e01a"),n("d3b7"),n("944a"),n("0c47"),n("23dc"),n("d28b"),n("3ca3"),n("ddb0"),n("d9e2"),n("d401"),n("3410"),n("131a"),n("159b"),n("25f0"),n("14d9"),n("fb6a"),n("d81d"),function(n,c){"object"==a(e)&&"object"==a(t)?t.exports=c():(o=[],i=c,r="function"===typeof i?i.apply(e,o):i,void 0===r||(t.exports=r))}(0,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==a(t)&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";var i="function"==typeof Symbol&&"symbol"==a(Symbol.iterator)?function(t){return a(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":a(t)},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=u(n(1)),c=u(n(3)),s=u(n(4));function u(t){return t&&t.__esModule?t:{default:t}}var l=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=a(e)&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.resolveOptions(n),i.listenClick(t),i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+a(e));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,c.default),o(e,[{key:"resolveOptions",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===i(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,s.default)(t,"click",(function(t){return e.onClick(t)}))}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new r.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return f("action",t)}},{key:"defaultTarget",value:function(t){var e=f("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return f("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach((function(t){n=n&&!!document.queryCommandSupported(t)})),n}}]),e}();function f(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}t.exports=l},function(t,e,n){"use strict";var i,o="function"==typeof Symbol&&"symbol"==a(Symbol.iterator)?function(t){return a(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":a(t)},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),c=n(2),s=(i=c)&&i.__esModule?i:{default:i},u=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.resolveOptions(t),this.initSelection()}return r(e,[{key:"resolveOptions",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,s.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,s.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":o(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),e}();t.exports=u},function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var i=window.getSelection(),o=document.createRange();o.selectNodeContents(t),i.removeAllRanges(),i.addRange(o),e=i.toString()}return e}},function(t,e){function n(){}n.prototype={on:function(t,e,n){var i=this.e||(this.e={});return(i[t]||(i[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var i=this;function o(){i.off(t,o),e.apply(n,arguments)}return o._=e,this.on(t,o,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),i=0,o=n.length;i<o;i++)n[i].fn.apply(n[i].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),i=n[t],o=[];if(i&&e)for(var r=0,a=i.length;r<a;r++)i[r].fn!==e&&i[r].fn._!==e&&o.push(i[r]);return o.length?n[t]=o:delete n[t],this}},t.exports=n},function(t,e,n){var i=n(5),o=n(6);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!i.string(e))throw new TypeError("Second argument must be a String");if(!i.fn(n))throw new TypeError("Third argument must be a Function");if(i.node(t))return d=e,p=n,(f=t).addEventListener(d,p),{destroy:function(){f.removeEventListener(d,p)}};if(i.nodeList(t))return s=t,u=e,l=n,Array.prototype.forEach.call(s,(function(t){t.addEventListener(u,l)})),{destroy:function(){Array.prototype.forEach.call(s,(function(t){t.removeEventListener(u,l)}))}};if(i.string(t))return r=t,a=e,c=n,o(document.body,r,a,c);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var r,a,c,s,u,l,f,d,p}},function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"==typeof t||t instanceof String},e.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e,n){var i=n(7);function o(t,e,n,o,r){var a=function(t,e,n,o){return function(n){n.delegateTarget=i(n.target,e),n.delegateTarget&&o.call(t,n)}}.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}t.exports=function(t,e,n,i,r){return"function"==typeof t.addEventListener?o.apply(null,arguments):"function"==typeof n?o.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,(function(t){return o(t,e,n,i,r)})))}},function(t,e){if("undefined"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}t.exports=function(t,e){for(;t&&9!==t.nodeType;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}}])}))}).call(this,n("62e4")(t))},"55fc":function(t,e,n){"use strict";var i=n("7a9b"),o=n.n(i);o.a},"7a9b":function(t,e,n){var i=n("8b9c");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("03f572b8",i,!0,{sourceMap:!1,shadowMode:!1})},"8b9c":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".container[data-v-5f3e156e]{padding-bottom:%?80?%}.tui-banner[data-v-5f3e156e]{width:100%;height:%?375?%}.tui-text[data-v-5f3e156e]{width:100%;padding:%?20?% %?30?%;box-sizing:border-box;color:#b3b3b3;font-size:%?26?%;text-align:right}.tui-view[data-v-5f3e156e]{width:100%;padding:%?20?% %?30?%;box-sizing:border-box}.tui-cell[data-v-5f3e156e]{padding:%?24?% 0;color:#555}.tui-title[data-v-5f3e156e]{width:100%;padding:0 %?8?%;box-sizing:border-box}.tui-link[data-v-5f3e156e]{width:100%;padding:%?30?%;box-sizing:border-box;background:#fff;box-shadow:0 %?3?% %?20?% hsla(0,0%,71.8%,.1);border-radius:%?10?%;color:#06c;margin-top:%?20?%;word-break:break-all}",""]),t.exports=e}}]);