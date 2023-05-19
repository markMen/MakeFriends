<template>
	<view class="container">
		<!--tabbar-->
		<!-- <view class="tui-tabbar">
			<block v-for="(item,index) in tabbar" :key="index">
				<view class="tui-tabbar-item" :class="[current==index?'tui-item-active':'']" :data-index="index" @tap="tabbarSwitch">
					<tui-icon :name="current==index?(item.icon+'-fill'):item.icon" :color="current==index?'#00C0FB':'#666'" :size="item.size"
					 :class="[index==0?'tui-ptop-4':'']"></tui-icon>
					<view class="tui-scale">{{item.text}}</view>
				</view>
			</block>
		</view> -->
		<!--tabbar-->
		<!--searchbox-->
		<!-- 		<view class="tui-searchbox">
			<view class="tui-search-input" @tap="search">
				<icon type="search" size='15' color='#999'></icon>
				<input class="tui-search-text"></input>
			</view>
		</view> -->
		
		
		<!--searchbox-->
		<view class="top search-top-up">
			<vive-search type="left" @click="onSearch"></vive-search>
		</view>
		<view class="search-top-down"></view>
		
		<view class="mb" v-if="advert_list.length > 0">
			<view class="" v-for="(item,index) in advert_list" :key="index" @tap='onItemAdvert(item)'>
				<image :src="app.upload + item.img" mode="widthFix" class="full-width"></image>
			</view>
		</view>


		<!-- 		<view class="tui-searchbox">
			<view @tap="onSearch" v-if="search_text != null && search_text != ''">
				<tui-icon name="search" :size='16' color='#333'></tui-icon>
			</view>
			<view class="tui-search-input" @tap="search">
				<input class="tui-search-text text-center" placeholder="请输入搜索内容" v-model.trim="search_text"></input>
			</view>
			<view @tap="cleanSearchText" v-show="search_text">
				<tui-icon name="close-fill" :size='16' color='#bcbcbc'></tui-icon>
			</view>
			<view class="tui-cancle" @tap="onSearch" v-if="search_text != null && search_text != ''">搜索</view>
		</view> -->


<!-- 		<tui-list-cell padding="2rpx 30rpx">
			<tui-icon name="addressbook" :size='24' color='#333'></tui-icon>
			<view class="tui-name" @tap="onFriend">通讯录</view>
			<view class="tui-msg-right tui-right-dot mr-lg">
				<view class="tui-msg-time"></view>
				<tui-badge type="danger" v-if="false"></tui-badge>
			</view>
		</tui-list-cell> -->

		<!-- <image src="../../static/image/img_order_received3x.png" class="tui-img"></image> -->

<!-- 		<tui-list-cell padding="2rpx 30rpx">
			<tui-icon name="friendadd" :size='24' color='#333'></tui-icon>
			<view class="tui-name" @tap="onVerify">新的合作商</view>
			<view class="tui-msg-right tui-right-dot mr-lg">
				<view class="tui-msg-time"></view>
				<tui-badge type="danger" v-if="list_count_is > 0">{{list_count_is}}</tui-badge>
			</view>
		</tui-list-cell> -->


		<view v-for="(item,index) in msgList" :key="index" :data-index="index" @longtap="onDetailLong">

			<tui-list-cell @click="detail" :data-id="item.id" :index="index" :bgcolor="item.user_top_id?'#eeeeee':''">
				<view class="box full-width">
					<image :src="item.avatar" class="avatar-wx-item" mode="scaleToFill"></image>
					<view class="tui-msg-item pl  full-width">
						<view class="box">
							<view class="tui-msg-name">{{item.nickname}}</view>
							<view class="tui-msg-right" :class="[item.level==3?'tui-right-dot':'']">
								<view class="tui-msg-time">{{item.chat_credate}}</view>
								<tui-badge :type="item.level==2?'gray':'danger'" :dot="item.level==3?true:false" v-if="item.sum_is_no_read>0">{{item.sum_is_no_read}}</tui-badge>
							</view>
						</view>

						<view class="">
							<view class="tui-msg-content text-line-1" v-if="item.type=='0'">{{item.text}}</view>
							<view class="tui-msg-content text-line-1 tui-msg-content-type" v-if="item.type=='1'">图片</view>
							<view class="tui-msg-content text-line-1 tui-msg-content-type" v-if="item.type=='2'">语音</view>
							<view class="tui-msg-content text-line-1 tui-msg-content-type" v-if="item.type=='3'">短视频</view>
							<view class="tui-msg-content text-line-1 tui-msg-content-type" v-if="item.type=='4'">发起语音通话</view>
							<view class="tui-msg-content text-line-1 tui-msg-content-type" v-if="item.type=='5'">发起视频通话</view>
							<view class="tui-msg-content text-line-1 tui-msg-content-type" v-if="item.type=='6'">位置</view>
						</view>
					</view>
				</view>
				
			</tui-list-cell>
		</view>

		<view class="tui-safearea-bottom"></view>

		<vive-modal-menu :hidden="selected==null" @click="onMenuInvoke" @close="onMenuClose" :menu="modal_menu"></vive-modal-menu>
		
		<vive-back-top :flag="top_flag"></vive-back-top>
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiBadge from "@/components/badge/badge"
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiCell from "@/components/list-cell/list-cell"
	import viveModalMenu from "@/components/vive-modal-menu/vive-modal-menu"
	import viveBackTop from "@/components/vive-back-top/vive-back-top.vue"

	export default {
		components: {
			tuiIcon,
			tuiBadge,
			tuiListCell,
			tuiCell,
			viveModalMenu,
			viveBackTop,

		},
		data() {
			return {
				app: this.app,
				current: 0,
				tabbar: [{
					icon: "community",
					text: "消息",
					size: 24
				}, {
					icon: "people",
					text: "联系人",
					size: 24
				}, {
					icon: "explore",
					text: "发现",
					size: 24
				}],
				msgList: [],
				search_text: '',
				/* msgList: [{
					nickname: "波动星球",
					pic: "avatar_1",
					msg: "兰家双臂初长成！",
					msgNum: 2,
					time: "10:22",
					level: 1
				}], */
				list_count_is: '',
				selected: null,
				modal_menu: ['置顶', '删除', '清空聊天记录', '取消'],

				top_flag:false,
				
				advert_list: [],
				
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.app.getUser(user => {
				// this.app.postAsyncTest('api/chat/chat_list', {});
				
				this.reload()
				
				this.app.checkUser()
				
				this.app.loopTask(task => {
					if (task.red_group_chat_count > 0) { //新的朋友 或 消息推送
						this.onSearchAction()
					}
				})
				
				
			})
			
		},
		methods: {
			reload(invoke) {
				this.onSearchAction(invoke)
				
				this.app.postHtml('api/advert/advert_list', {
				}, json => {
					const {code , data} = json
					if(code == 0){
						this.advert_list = data
					}
				})
				
			},
			tabbarSwitch: function(e) {
				let index = e.currentTarget.dataset.index;
				this.current = index;
				if (index != 0) {
					if (index == 1) {
						uni.navigateTo({
							url: '../friendsList/friendsList'
						})
					} else {
						this.tui.toast("功能开发中~")
					}
				}
			},
			search: function() {
				uni.navigateTo({
					url: '../news-search/news-search'
				})
			},
			detail: function(e) {
				let item = this.msgList[e.index]
				//console.log(item)
				this.app.go('/pages/chat_group/chat_group', {
					group_id: item.id
				})
			},
			onSearch(text) {
				this.search_text = text
				this.onSearchAction()
			},
			onSearchAction(invoke) {
				//板块
				this.app.post('api/chat_group/group_list?XDEBUG_SESSION_START=15329', {
					search_text: this.search_text
				}, json => {
					this.msgList = json.data
				})

				// this.app.post('api/chat_contact/list_group', {
				// 	search_text: this.search_text
				// }, json => {
				// 	// this.lists = json.list
				// 	// this.list_count = json.list_count
				// 	this.list_count_is = json.list_count_is
				// 	if (invoke) invoke()
				// })
			},
			onVerify() {
				this.app.go('/pages/friend/verify')
			},
			onFriend() {
				this.app.go('/pages/friend/friend')
			},
			onDetailLong(e) {
				this.selected = this.msgList[this.app.ed(e).index]
				if (this.selected.user_top_id) {
					this.modal_menu[0] = '取消置顶'
				} else {
					this.modal_menu[0] = '置顶'
				}
			},
			onMenuInvoke(e) {
				let selected = this.selected
				this.selected = null
				let index = e.index
				let menu = this.modal_menu[index]
				
				if (index == 0) { //点击了置顶  ['置顶', '删除', '清空聊天记录', '取消']
					if (selected.user_top_id) { //存在就取消
						let user_id = selected.user_id						
						this.app.post('api/user_top/del_float', {
							user_id: user_id,
						}, json => {
							this.app.toast('取消置顶')
							this.reload()
						})
					} else { //不存在就添加
						let user_id = selected.user_id
						this.app.post('api/user_top/add_float', {
							user_id: user_id,
						}, json => {
							this.app.toast('置顶成功')
							this.reload()
						})
					}
				}else if(index == 1) { //点击了删除
					this.app.msg(selected.nickname, '确定删除消息', is => {
						if(is){
							let user_id = selected.user_id
							this.app.post('api/chat/chat_hidden', {
								user_id: user_id,
							}, json => {
								this.app.toast('删除成功')
								this.reload()
							})
						}
					})
				}else if(index == 2) { //清空聊天记录
					this.app.msg(selected.nickname, '确定清空聊天记录', is => {
						if(is){
							let user_id = selected.user_id
							this.app.post('api/chat/chat_del_message', {
								user_id: user_id,
							}, json => {
								this.app.toast('清空成功')
								this.reload()
							})
						}
					})
				}
			},
			onMenuClose() {
				this.selected = null
			},	
			onItemAdvert(item){
				
				//H5中打开
				//#ifdef H5
				if(item.type_open_h5 == 1){
					window.location.href = item.url
				}else if(item.type_open_h5 == 2){
					window.open(item.url)
				}
				//#endif
				
				//#ifdef APP
				if(item.type_open_app == 1){
					this.app.go('/pages/other/web', {url: item.url})
				}else if(item.type_open_app == 2){
					plus.runtime.openURL(item.url)
				}
				//#endif
			},	
		},
		onPullDownRefresh: function() {
			this.reload(() => {
				uni.stopPullDownRefresh();
			})
		},
		onPageScroll(e) { //根据距离顶部距离是否显示回到顶部按钮
		 this.top_flag = this.app.isTopFlag(e)
		},
		onNavigationBarButtonTap(e) {
			this.app.go('/pages/chat_group/group_add')
			
		}
		// onBackPress(e) { return this.app.onBackPress(e) }, 
	}
</script>

<style>
	page {
		/* background: #f5f6fa; */
	}

	.container {
		padding-bottom: 100upx
	}

	/*tabbar*/

	.tui-tabbar {
		width: 100%;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 99999;
		background: #fff;
		height: 100upx;
		left: 0;
		bottom: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-tabbar::before {
		content: '';
		width: 100%;
		border-top: 1upx solid #d2d2d2;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-tabbar-item {
		flex: 1;
		width: 25%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		font-size: 24upx;
		color: #666;
		height: 80upx;
	}

	.tui-ptop-4 {
		padding-top: 4upx;
	}

	.tui-scale {
		font-weight: bold;
		transform: scale(0.8);
		transform-origin: center 100%;
		line-height: 30upx;
	}

	.tui-item-active {
		color: #00c0fb !important;
	}

	/*tabbar*/

	/*searchbox*/

	.tui-searchbox {
		width: 100%;
		height: 100upx;
		padding: 0 30upx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.tui-search-input {
		width: 100%;
		height: 72upx;
		background: #f5f6fa;
		border-radius: 36upx;
		font-size: 30upx;
		color: #A8ABB8;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-search-text {
		padding-left: 16upx;
	}

	/*searchbox*/


	.tui-msg-box {
		display: flex;
		align-items: center;
	}

	.tui-msg-pic {
		width: 100upx;
		height: 100upx;
		/* border-radius: 50%; */
		display: block;
		margin-right: 24upx;

		border-radius: 10%;
	}

	.tui-msg-item {
		/* max-width: 500upx;
		min-height: 80upx; */
		padding: 6rpx 0rpx 6rpx 20rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 34rpx;
		/* line-height: 1; */
		color: #262b3a;
	}

	.tui-msg-content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 28upx;
		line-height: 1;
		color: #9397a4;
	}

	.tui-msg-content-type {

		color: #5CD492;
	}

	.tui-msg-right {
		/* max-width: 240rpx; */
		/* height: 88rpx; */
		margin-left: auto;
		text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.tui-msg-right.tui-right-dot {
		height: 76upx;
		padding-bottom: 10upx;

	}

	.tui-msg-time {
		width: 100%;
		font-size: 24upx;
		line-height: 24upx;
		color: #9397a4;
	}

	.tui-badge {
		width: auto
	}


	.tui-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.tui-name {
		width: 80%;
		padding-left: 30rpx;
		font-size: 34rpx;
		color: #333;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
