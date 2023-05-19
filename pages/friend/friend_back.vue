<template>
	<view class="tui-page">

		<view class="top search-top-up">
			<view class="tui-searchbox">
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
			</view>
		</view>
		<view class="search-top-down"></view>


		<scroll-view :enable-back-to-top="true" class="tui-scrollList" scroll-y :scroll-into-view="scrollViewId"
			:style="{height:winHeight + 'px'}" :refresher-enabled="true" :refresher-triggered="is_triggered"
			@refresherrefresh="onRefreshFriend" :refresher-threshold="50" @refresherpulling="onPulling"
			@refresherrestore="onRestore" @refresherabort="onAbort">

			<!--联系人列表-->
			<view class="tui-list city-list">
				<block v-for="(list,index) in lists" :key="index">
					<view class="tui-list-cell-divider" :id="list.letter">
						{{list.letter}}
					</view>
					<view @click="detail" @touchstart="onDelStart" @touchmove="onDelMove" @touchend="onDelEnd"
						:data-user_id='item.user_id' :data-nickname="item.nickname" v-for="(item,index2) in list.data"
						:key="index2" @longpress="onDelFriend">
						<tui-cell :last="last(list.data,index2)">
							<image :src="item.avatar" class="avatar-wx-item" mode="scaleToFill"></image>
							<view class="tui-msg-item pl">
								<view class="tui-msg-name">{{item.nickname}}</view>
								<view class="tui-msg-name text-sm text-color-9">{{item.company_name}}
									{{item.company_server_name}}
								</view>
								<view class="tui-msg-content" v-if="item.type=='0'">{{item.text}}</view>
								<view class="tui-msg-content tui-msg-content-type" v-if="item.type=='1'">图片</view>
								<view class="tui-msg-content tui-msg-content-type" v-if="item.type=='2'">语音</view>
								<view class="tui-msg-content tui-msg-content-type" v-if="item.type=='3'">短视频</view>
								<view class="tui-msg-content tui-msg-content-type" v-if="item.type=='4'">发起语音通话</view>
								<view class="tui-msg-content tui-msg-content-type" v-if="item.type=='5'">发起视频通话</view>
							</view>
							<view class="tui-msg-right" :class="[item.level==3?'tui-right-dot':'']">
								<view class="tui-msg-time">{{item.time}}</view>
								<tui-badge :type="item.level==2?'gray':'danger'" :dot="item.level==3?true:false"
									v-if="item.sum_is_no_read>0">{{item.sum_is_no_read}}</tui-badge>
							</view>
						</tui-cell>
					</view>
				</block>
			</view>
			<!--联系人列表-->
			<view class="tui-footer">{{list_count}}位联系人</view>
			<view class="tui-safearea-bottom"></view>
			<view style="height: 200rpx;"></view>

		</scroll-view>

		<view class="tui-indexed-list-bar" :style="{height:indexBarHeight+'px'}" @touchstart.stop="touchStart"
			@touchmove.stop="touchMove" @touchend.stop="touchEnd" @touchcancel.stop="touchCancel">
			<view v-for="(items,index3) in lists" :key="index3" class="tui-indexed-list-text"
				:style="{height:indexBarItemHeight+'px'}">
				{{items.letter=="well"?"#":items.letter}}
			</view>
		</view>
		<view class="tui-indexed-list-alert" v-if="touchmove && lists[touchmoveIndex].letter">
			<text>{{lists[touchmoveIndex].letter=="well"?"#":lists[touchmoveIndex].letter}}</text>
		</view>

		<!-- <vive-back-top></vive-back-top> -->

	</view>
</template>

<script>
	const cityData = require('../../utils/index.list.js')

	import tuiIcon from "@/components/icon/icon"
	import tuiCell from "@/components/list-cell/list-cell"
	import tuiBadge from "@/components/badge/badge"
	import viveBackTop from "@/components/vive-back-top/vive-back-top.vue"

	export default {
		components: {
			tuiIcon,
			tuiBadge,
			tuiCell,
			viveBackTop,
		},
		computed: {
			last() {
				return function(data, index) {
					return data.length - 1 == index ? true : false
				}
			}
		},
		data() {
			return {
				lists: [],
				touchmove: false, // 是否在索引表上滑动
				touchmoveIndex: -1,
				titleHeight: 0, // A字距离窗口顶部的高度
				indexBarHeight: 0, // 索引表高度
				indexBarItemHeight: 0, // 索引表子项的高度
				scrollViewId: '', // scroll-view滚动到的子元素的id
				winHeight: 0,

				search_text: '',
				list_count: '',
				list_count_is: '',

				time_del_start: -1,
				time_del_end: -1,
				touch_del_y: -1,
				touch_del_y_end: -1,

				is_triggered: false,
			}
		},
		onLoad: function(options) {
			const that = this;
			setTimeout(() => {
				uni.getSystemInfo({
					success: function(res) {
						let winHeight = res.windowHeight;
						let barHeight = winHeight - uni.upx2px(232);
						that.winHeight = winHeight;
						that.indexBarHeight = barHeight;
						that.indexBarItemHeight = barHeight / 25;
						that.titleHeight = uni.upx2px(132);


						// that.lists = cityData.list
					}
				})
			}, 10)
			this.app.setTitle('合作商')
		},
		onShow() {
			this.app.checkUser()

			this.onSearch()
			this.app.checkDid()

			this.app.loopTask(task => {
				if (task.count > 0) {
					this.onSearch()
				}
			})

		},
		methods: {
			cleanSearchText() {
				this.search_text = ''
				this.onSearch()
			},
			touchStart(e) {
				this.touchmove = true
				let pageY = e.touches[0].pageY
				let index = Math.floor((pageY - this.titleHeight) / this.indexBarItemHeight)
				let item = this.lists[index]
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index
				}
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY;
				let index = Math.floor((pageY - this.titleHeight) / this.indexBarItemHeight)
				let item = this.lists[index]
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index
				}
			},
			touchEnd() {
				this.touchmove = false;
				this.touchmoveIndex = -1
			},
			touchCancel() {
				this.touchmove = false;
				this.touchmoveIndex = -1
			},
			search: function() {
				uni.navigateTo({
					url: '../news-search/news-search'
				})
			},
			detail: function(e) {

				let user_id = this.app.ed(e).user_id
				this.app.go('/pages/index/detail/detail', {
					user_id: user_id
				})
			},
			onSearch(invoke) {
				//板块
				this.app.post('api/chat_contact/list_group?XDEBUG_SESSION_START=15559', {
					search_text: this.search_text
				}, json => {
					this.lists = json.list
					this.list_count = json.list_count
					this.list_count_is = json.list_count_is

					// let newMsg = 0;
					// //是否存在新的消息
					// for(let i in this.lists){
					// 	let item = this.lists[i]
					// 	for(let j in item.data){
					// 		let obj = item.data[j]
					// 		if(obj && obj.sum_is_no_read == '1'){
					// 			newMsg++
					// 		}
					// 	}						
					// }

					// //是否有新用户请求
					// if (this.list_count_is && this.list_count_is > 0 || newMsg > 0) {
					// 	this.app.showTabBarRedDot(1)
					// } else {
					// 	this.app.hideTabBarRedDot(1)
					// }


					if (invoke) invoke()
				})
			},
			onVerify() {
				this.app.go('/pages/friend/verify')

			},
			onDelFriend(e) {
				this.app.message('确定删除', this.app.ed(e).nickname, is => {
					if (is) {
						let user_id = this.app.ed(e).user_id
						//板块
						this.app.post('api/chat_contact/del_float', {
							user_id: user_id
						}, json => {
							if (json.code == '0') {
								this.app.toast(json.data)
								this.onSearch()
							} else {
								this.app.toast(json.data)
							}
						})
					}
				})

			},
			onDelStart(e) {
				this.time_del_start = this.app.newDate().getTime()
				this.touch_del_y = e.changedTouches[0].clientY;
			},
			onDelEnd(e) {
				this.touch_del_y_end = e.changedTouches[0].clientY;
				// console.log(this.touch_del_y + '*' + this.touch_del_y_end)
				if (Math.abs(this.touch_del_y - this.touch_del_y_end) > 30) {
					return
				}

				this.time_del_end = this.app.newDate().getTime()
				if ((this.time_del_end - this.time_del_start) > 500) {


					this.app.message('确定删除', this.app.ed(e).nickname, is => {
						if (is) {
							let user_id = this.app.ed(e).user_id
							//板块
							this.app.post('api/chat_contact/del_float', {
								user_id: user_id
							}, json => {
								if (json.code == '0') {
									this.app.toast(json.data)
									this.onSearch()
								} else {
									this.app.toast(json.data)
								}
							})
						}
					})

				}
			},
			onDelMove(e) {
				this.touch_del_y_end = e.changedTouches[0].clientY;
				// console.log(this.touch_del_y + '*' + this.touch_del_y_end)
			},
			//刷新列表
			onRefreshFriend(e) {
				let that = this


				if (!that.is_triggered) {
					that.is_triggered = true;

					//关闭加载状态 (转动的圈)，需要一点延时才能关闭
					setTimeout(() => {
						that.onSearch(() => {
							this.is_triggered = false;
							this.app.stopPullDownRefresh()
							that.$forceUpdate()
						})
					}, 1000)

				}


			},

			// 自定义下拉刷新控件被下拉
			async onPulling(e) {
				// this.is_triggered = true; // 需要重置
				console.log('onPulling')
			},

			// 自定义下拉刷新被触发
			async onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				if (!this.is_triggered) this.is_triggered = true; //界面下拉触发，is_triggered可能不是true，要设为true  
				const isRefresh = true


				console.log('onRefresh')
				this.triggered = false;
				this._freshing = false;

				//             await this.onSearch(() => {
				//  this.is_triggered = false;
				//  this._freshing = false;

				//  console.log('onRefreshffffff')

				// })

			},
			// 自定义下拉刷新被复位
			onRestore() {
				// this.is_triggered = false; // 需要重置
				console.log('onRestore')

			},
			// 自定义下拉刷新被中止
			onAbort() {
				// this.is_triggered = false;
				console.log('onAbort')

			},
		},
		onPullDownRefresh() {
			this.onSearch(() => {
				this.app.stopPullDownRefresh();
				this.app.toast('刷新成功')
			})
		},
	}
</script>

<style>
	page {
		background: #f5f6fa;
		height: 100%;
		overflow: hidden;
	}

	.tui-page {
		height: 100%;
		overflow: hidden;
	}

	.tui-scrollList {
		flex: 1;
	}

	/*searchbox*/

	.tui-searchbox {
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.tui-search-input {
		width: 100%;
		height: 72rpx;
		background: #f5f6fa;
		border-radius: 36rpx;
		font-size: 30rpx;
		color: #a8abb8;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-search-text {
		padding-left: 16rpx;
	}

	/*searchbox*/

	.tui-cell-class::after {
		left: 140rpx !important;
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

	.tui-list-cell-divider {
		height: 66rpx;
		padding-left: 30rpx;
		font-size: 26rpx;
		color: #555;
		background: #f5f6fa;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		font-weight: bold;
	}

	.tui-indexed-list-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		z-index: 9999;
		position: absolute;
		top: 132rpx;
		right: 0;
		padding-right: 10rpx;
		width: 44rpx;
		color: #555;
		font-weight: bold;
	}

	.tui-indexed-list-text {
		font-size: 22rpx;
	}

	.tui-indexed-list-alert {
		position: absolute;
		z-index: 20;
		width: 120rpx;
		height: 120rpx;
		right: 90rpx;
		top: 50%;
		margin-top: -60rpx;
		border-radius: 24rpx;
		font-size: 50rpx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.65);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
	}

	.tui-indexed-list-alert text {
		line-height: 50rpx;
	}

	.tui-footer {
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #999;
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}


	.tui-msg-item {
		max-width: 500upx;
		min-height: 80upx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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
		max-width: 120upx;
		/* height: 88upx; */
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
</style>
