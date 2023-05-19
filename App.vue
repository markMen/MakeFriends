<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')

			//自定义的消息推送
			this.app.loopTask(task => {})

			//#ifdef  APP-PLUS
			let that = this
			// plus.push.createMessage( '通知主要内容', '{"type":"chat","user_id":"31"}', {
			// 	title: '消息标题',
			// })

			// //点击了推送消息
			// plus.push.addEventListener('click', function(message) {
			// 	// that.app.post('api/test/test',{text: that.app.toJson(message) + '123'})
			// 	let payload = message.payload
			// 	if (payload) {
			// 		payload = that.app.toObject(payload)
			// 		if (payload.type == 'chat') { //如果是聊天消息
			// 			that.app.go('/pages/message/chat', {
			// 				user_id: payload.user_id
			// 			})
			// 		} else if (payload.type == 'contact') { //如果是加好友消息
			// 			that.app.go('/pages/friend/verify', {
			// 				user_id: payload.user_id
			// 			})
			// 		}
			// 	}
			// });

			// //接收到了推送消息
			// plus.push.addEventListener('receive', function(message) {
			// 	// that.app.post('api/test/test',{text: that.app.toJson(message) + '456'})				
			// 	//{"__UUID__":"androidPushMsg217650858","title":"我要推送的标题@20200606114139",
			// 	//"appid":"__UNI__1EAAC72","content":"我要推送的通知内容@20200606114139","payload":{"a":"b","c":"d"}}456
			// 	if (message.isLocal) {
			// 		return
			// 	}
			// 	message.isLocal = true
			// 	if (that.app.isUser()) {
			// 		// if(message.payload.type == 'chat'){  //自己的标志推送

			// 		// }
			// 		plus.push.createMessage(message.content, message.payload, {
			// 			title: message.title,
			// 		})

			// 	}

			// });


			//安卓的检测版本
			if (this.app.isAndroid()) {
				//检测新版本
				let ver = plus.runtime.version
				this.app.post('api/version/last', {}, json => {
					let newVer = json.version

					let actionCheck = (newVer, ver) => {
						let newVers = newVer.split('.')
						let vers = ver.split('.')
						for (let i in newVers) {
							if (newVers[i] < vers[i]) {
								break
							} else if (newVers[i] == vers[i]) {
								continue
							} else if (newVers[i] > vers[i]) {
								return true
							}
						}
						return false
					}
					if (actionCheck(newVer, ver)) {
						this.app.msg('检测到新版本是否立即升级', '', is => {
							if (is) {
								plus.runtime.openURL(this.app.upload + json.file);
							}
						})
						this.app.showTabBarRedDot(3)
						this.app.data.is_version = true
					} else {
						this.app.hideTabBarRedDot(3)
						this.app.data.is_version = false

					}
				})
			}
			//#endif

			// uni.$emit('update', e=> {
			// 	console.log('a')
			// })
		},
		onShow: function() {

			// this.app.getOpenid(openid => {
			// 	this.app.checkUser()
			// 	console.log('检查了用户')
			// })

			let app = this.app
			if (app.data.user && app.data.user.del == '2') {
				let nowPageName = url
				let pageSee = [
					'/pages/index/index',
					'/pages/message/message',
					'/pages/message/circle',
					'/pages/me/me',
					'/pages/me/user_info',
					'/pages/me/me_del',
					'/pages/me/user_info',
				]
				let isFind = false
				pageSee.forEach(item => {
					if (nowPageName == item) {
						isFind = true
						return
					}
				})
				if (isFind) { //有权限

				} else { //没有权限
					app.toast('wu')
					return
				}
			}


			//#ifdef H5
			// this.app.data.statusBarHeight = 30
			//#endif

			//#ifdef APP-PLUS
			let h = uni.getSystemInfoSync().statusBarHeight
			this.app.data.statusBarHeight = h
			//#endif
			

			console.log('App Show')
			
			// uni.clearStorageSync()
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		onBackPress(e) {
			return this.app.onBackPress(e)
		},
	}
</script>

<style>
	/*每个页面公共css */
	/* @import "./static/style/thorui.css"; */
	@import "./static/style/bootstrap.css";
	@import "./common/app.css";

	/* color start*/

	.tui-primary {
		background: #5677fc !important;
		color: #fff;
	}

	.tui-light-primary {
		background: #5c8dff !important;
		color: #fff;
	}

	.tui-dark-primary {
		background: #4a67d6 !important;
		color: #fff;
	}

	.tui-dLight-primary {
		background: #4e77d9 !important;
		color: #fff;
	}

	.tui-danger {
		background: #ed3f14 !important;
		color: #fff;
	}

	.tui-warning {
		background: #ff7900 !important;
		color: #fff;
	}

	.tui-green {
		background: #19be6b !important;
		color: #fff;
	}

	.tui-black {
		background: #000 !important;
		color: #fff;
	}

	.tui-white {
		background: #fff !important;
		color: #333 !important;
	}

	.tui-translucent {
		background: rgba(0, 0, 0, 0.7);
	}

	.tui-light-black {
		background: #333 !important;
	}

	.tui-gray {
		background: #80848f;
	}

	.tui-phcolor-gray {
		background: #ccc !important;
	}

	.tui-divider-gray {
		background: #eaeef1 !important;
	}

	.tui-btn-gray {
		background: #ededed !important;
		color: #999 !important;
	}

	.tui-hover-gray {
		background: #f7f7f9 !important;
	}

	.tui-bg-gray {
		background: #fafafa !important;
	}

	.tui-light-blue {
		background: #ecf6fd;
		color: #4dabeb !important;
	}

	.tui-light-brownish {
		background: #fcebef;
		color: #8a5966 !important;
	}

	.tui-light-orange {
		background: #fef5eb;
		color: #faa851 !important;
	}

	.tui-light-green {
		background: #e8f6e8;
		color: #44cf85 !important;
	}

	/* color end*/



	//#ifndef APP-PLUS
	.search-top-up {
		background: #FFFFFF;
		padding-top: 88rpx;
	}

	//#endif
	//#ifdef  APP-PLUS
	.search-top-down {
		height: 120rpx;
	}
	//#endif
	
	.search-top-up-h5 {
		background: #FFFFFF;
		/* padding-top: 0rpx; */
	}


	/* 置顶背景*/
	.top-bg-message {
		background: #eeeeee;
	}

	.top-bg-com-green {
		background: #d2ded2;
		/* border: #d2ded2 solid 2rpx; */
	}

	.top-bg-com-blue {
		background: #dbe4ea;
	}


	.btn-primary[disabled] {
		color: #fff !important;
		background-color: #0069d9 !important;
		border-color: #0062cc !important;
	}

	.btn-success[disabled] {
		color: #fff !important;
		background-color: #218838 !important;
		border-color: #1e7e34 !important;
	}


	.btn-dark[disabled] {
		color: #fff !important;
		background-color: #3f464d !important;
		border-color: #2f353a !important;
	}

	.btn-success-disabled {
		color: #7e7e7e !important;
		background-color: #cccccc !important;
		border-color: #1e7e34 !important;
	}

	/* 订单里面的头像昵称 */
	.goods-img-avatar {
		width: 100rpx;
		height: 100rpx;
		display: block;
		flex-shrink: 0;
	}

	.goods-img-avatar-text {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 10rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.red-order-bg {
		background-color: #e0e0e0;
		border-radius: 20rpx;
	}

	.sale-phone {
		color: #007bff;
	}

	.icon-pay {
		width: 150rpx;
		height: 150rpx;
	}

	/* 退出登录 */
	.btn-logout {
		background-color: #FFFFFF;
		color: #dc3545;
		font-weight: bold;
		font-size: 30rpx;
	}

	.swiper-task {
		width: 100%;
		height: 70rpx;
	}

	.swiper-task-box {
		background: #fafafa;
	}

	.swiper-task-img {
		width: 45rpx;
		height: 45rpx;
	}

	.swiper-task-close {
		width: 30rpx;
		height: 30rpx;
	}

	.avatar-comment-item {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.comment-img-box {
		width: 200rpx;
		height: 200rpx;
		border: 1rpx dotted #666666;
		border-radius: 10rpx;
		margin: 10rpx;
		color: #666666;
		font-size: 24rpx;
		position: relative;
	}

	.comment-image {
		width: 200rpx;
		height: 200rpx;
	}

	.comment-img {
		width: 80rpx;
		height: 80rpx;
	}

	.comment-img-del {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: -20rpx;
		top: -20rpx;
	}

	.bg-comment-box {
		background-color: #FFFFFF;
		border: 1rpx solid #F0F0F0;
	}

	.bg-comment-box-me {
		background-color: #FFFFFF;
		border: 1rpx solid #F0F0F0;
	}

	/* 圆环进度 */
	.circle-per {
		width: 160px;
		height: 160px;
		border: 20px solid red;
		border-radius: 50%;
	}

	.circle-per-text {
		color: #999999;
		font-size: 26rpx;
	}

	.circle-type-sale {
		background-color: #33333333;
		border-radius: 20rpx;
		padding: 5rpx 10rpx;
		color: #4dabeb;
	}

	.circle-type-product {
		background-color: #33333333;
		border-radius: 20rpx;
		padding: 5rpx 10rpx;
		color: #44cf85;
	}

	.text-start {
		color: #50A483;
		/* font-size: 50rpx; */
		overflow: hidden;
	}


	/* 来自有趣测评 */
	.avatar-youqu {
		width: 140rpx;
		height: 140rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	/* 图标 */
	.icon-df {
		width: 30rpx;
		height: 30rpx;
	}

	.icon-menu {
		width: 40rpx;
		height: 40rpx;
		margin: 30rpx 20rpx;
	}

	.menu-box {
		border-top: 1rpx solid #f0f0f0;
		border-bottom: 1rpx solid #f0f0f0;
		margin: 0rpx 30rpx;
		color: #fa5151;
		font-weight: bold;
		font-size: 34rpx;
	}

	.line-step {
		width: 100%;
		background: #F5F5F5;
		height: 16rpx;
	}

	.text-main {
		color: #fa5151;
	}
	
	
	.text-sec {
		color: #ff6b6b;
	}

	.btn-main {
		background-color: #fa5151;
		color: #fff;
	}

	.btn-main-dark {
		background-color: #cf8a8a;
		color: #fff;
	}

	.bg-main {
		background-color: #fa5151;
	}

	.bg-main-text {
		background-color: #fa5151;
	}

	.bg-wx-text {
		background-color: #F5F5F5;
		color: #a0a0a0;
	}

	.avatar-china {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.text-gender-tag {
		background: #007bff;
/* 		width: 45rpx;
		height: 45rpx; */
		border-radius: 50%;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1rpx solid #ffffff11;
	}

	.text-gender-tag-1 {
		background: #007bff33;

	}

	.text-gender-tag-2 {
		background: #fa515133;
	}


	.tui-msg-time {
		width: 100%;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #9397a4;
	}



	.btn-main {
		color: #fff;
		background-color: #fa5151;
		border-color: #fa5151;
	}

	.btn-main:hover {
		color: #fff;
		background-color: #ff6b6b;
		border-color: #ff6b6b;
	}

	.btn-main:focus,
	.btn-main.focus {
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
	}

	.btn-main.disabled,
	.btn-main:disabled {
		color: #fff;
		background-color: #fa5151;
		border-color: #fa5151;
	}

	.btn-image-del {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: #ff6b6b;
		color: #ffffff;
	}

	.avater-chat-me {
		border-radius: 20rpx;
		width: 150rpx;
		height: 150rpx;
	}




	/*
	#317055
	#50A483
	#58B48D
	#4FA598
	#80ADAA
	
	#8A5A8A
	#81487F
	#915B8C
	#9C5C88
	#7A4070
	
	
#E8B5B8
#CD8CA2
#B26896
#fa5151
#ff6b6b
#ff988f
#1B0D45
	*/

	.circle-box {
		/*    display: flex;  
       flex-flow:column wrap; */
		/* height: 200vh; */

		margin: 0 auto;
		/* column-count: 2; */
		/* column-gap: 0; */

		color: #D94D3F;
	}

	.circle-item {
		padding: 10rpx 0;
	}

	.circle-item {
		width: 50%;
		/* margin: 10rpx; */
		/* 		margin: 10rpx;
		width: calc(50vw - 40rpx); */
		/* background-color: #FFFFFF; */
		border-radius: 20px;
		/* overflow: hidden; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* align-items: center; */
	}

	.circle-item-in {
		margin: 10rpx;
		height: 100%;
		background-color: #FFFFFF;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.circle-item-cub {
		padding: 10rpx 0;
	}
	
	.circle-item-cub {
		width: 50%;
		/* margin: 10rpx; */
		/* 		margin: 10rpx;
		width: calc(50vw - 40rpx); */
		/* background-color: #FFFFFF; */
		border-radius: 10px;
		/* overflow: hidden; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* align-items: center; */
	}
	
	.circle-item-cub-in {
		margin: 10rpx;
		height: 100%;
		background-color: #FFFFFF;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
	}
	

	.bg-world-00 {
		background: #ffffff;
		color: #999999;
	}

	.bg-world-01 {
		background: #E8B5B8;
		color: #ff6b6b;
	}

	.bg-world-02 {
		background: #e2acd7;
		color: #ff6b6b;
	}

	.bg-world-03 {
		background: #cd7d7e;
		color: #ff6b6b;
	}

	.bg-world-04 {
		background: #c37997;
		color: #ff6b6b;
	}

	.bg-world-05 {
		background: #B26896;
		color: #ffffff;
	}

	.bg-world-06 {
		background: #aa6390;
		color: #ffffff;
	}

	.bg-world-07 {
		background: #fa5151;
		color: #ffffff;
	}

	.bg-world-08 {
		background: #90458a;
		color: #ffffff;
	}

	.bg-world-09 {
		background: #ff6b6b;
		color: #ffffff;
	}

	.bg-world-10 {
		background: #652c73;
		color: #ffffff;
	}

	.bg-world-11 {
		background: #dd2254;
		color: #ffffff;
	}

	.bg-world-12 {
		background: #c61f49;
		color: #ffffff;
	}

	.bg-world-13 {
		background: #a81b3c;
		color: #ffffff;
	}

	.bg-world-14 {
		background: #84162e;
		color: #ffffff;
	}

	.group-input {
		text-align: right;
	}

	.group-user-box {
		width: 150rpx;
		height: 150rpx;
		overflow: hidden;
	}



	.group-user-box-edit {
		width: 120rpx;
		height: 120rpx;
		border: 1rpx dashed #c0c0c0;
		box-sizing: border-box;
		color: #c0c0c0;
		font-size: 60rpx;
		border-radius: 20rpx;
	}

	.icon-me-box {
		width: 80rpx;
		height: 80rpx;
	}

	.avatar-youqu-slove {
/* 		width: 160rpx;
		height: 160rpx;
		border-radius: 50%; */
		
		width: 160rpx;
		height: 160rpx;
		display: block;
		border-radius: 10%;
	}

	.avatar-wx-slove {
		width: 200rpx;
		height: 200rpx;
		display: block;
		border-radius: 10%;
	}
	
	.icon-arrow-right{
		width: 30rpx;
		height: 30rpx;
	}
	
	
	.cash-box {}
	
	.cash-box .left-text {
		min-width: 200rpx;
		max-width: 200rpx;
		width: 200rpx;
	}
	
	.cash-box .cash-box-item {
		padding: 15rpx 30rpx;
	}
	
	.cash-input {
		text-align: right;
	}
	
	.icon-pay-ali{
		width: 50rpx;
		height: 50rpx;
	}
	.icon-pay-ali-gou{
		width: 40rpx;
		height: 40rpx;
	}
	.btn-main-out{
		background-color: #fa5151;
	}
	
	
	.text-page {
		display: flex;
		/* align-items: center; */
		justify-content: center;
		color: #999999;
		font-size: 26rpx;
		padding: 10rpx 0;
	}
	
	.page-nav-sel{
		border-bottom: 4rpx solid #fa5151;
	}
	.tui-protocol-red{
		color: #fa5151;
	}
	
	.icon-plus{
		/* width: 50rpx; */
		height: 35rpx;
	}
	.icon-plus-sm{
		height: 30rpx;
	}
	
	.top-nav-box{
		background: #F8F8F8;
		height: 88rpx;
		max-height: 88rpx;
	}
	
	.is-online{
		background-color: #9F9D9E;
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
	}
	
	.is-online-on{
		background-color: #28A222;
		
	}
	.is-online-out{
		background-color: #9F9D9E;
	}
	
	.avatar-china-big {
		width:100%;
		height: 450rpx;
		max-height: 450rpx;
		/* border-radius: 20rpx; */
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
	}
	
	.btn-main-chat-private{
		background-color: #ff6b6b;
	}
	
	.in-left-pla{
		padding: 0 0 0 20rpx;
		color: #999;
	}
	
	.border-id{
		padding: 2rpx 15rpx;	
		border-radius: 30rpx;
		background: #00000033;
	}
	
	.msg-item{
		border: 1rpx solid #f0f0f0;
		padding: 30rpx 60rpx;
	}
	
	/* 加入了商城的元素 */
	.shop-slide-image{
		width: 100vw;
		height: 50vw;
	}
	
	.shop-slide-image-advert{
		width: 100%;
		height: 200rpx;
	}
	
	.icon-gender{
		width: 60rpx;
		height: 60rpx;
	}
	
</style>
