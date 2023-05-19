import Vue from 'vue'
import App from './App'
import apps from './common/app.js'  //核心工具类 
import tui from './common/tui.js'  //核心工具类 

Vue.config.productionTip = false
// 添加全局变量
Vue.prototype.app = apps
Vue.prototype.tui = tui


//#ifdef  APP-PLUS
try{
	let main = plus.android.runtimeMainActivity();
	//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
	plus.runtime.quit = function() {
	    main.moveTaskToBack(false);
	};
	//重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast 
	plus.nativeUI.toast = (function(str) {
	    // if (str =='再次返回退出应用') {
	    //     plus.runtime.quit();
	    // } else {
	    //     uni.showToast({
	    //         title: '再次返回退出应用',
	    //         icon: 'none'
	    //     })
	    // }
		plus.runtime.quit();
	});
}catch(e){
	
}
//#endif							

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
