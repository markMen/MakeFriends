<template>
	<view class="tui-page">

		<view class="top search-top-up">
			<vive-search type="left" @click="onSearch"></vive-search>
		</view>
		<view class="search-top-down"></view>

		<!--searchbox-->
		<!--联系人列表-->
		<view class="tui-list city-list cols">

			<!-- <view class="tui-list-cell-divider" :id="list.letter">
						{{list.letter}}
					</view> -->
			<view v-for="(item,index2) in lists" :key="index2" class="" 
			@longtap="onDetailLong" :data-index='index2' @tap.stop="onUserDetail" :data-id="item.user_id">
				<tui-cell :last="last(lists,index2)">
					<image :src="item.avatar" class="avatar-wx-item" mode="scaleToFill"></image>
					<view class="tui-name box">
						<view class="cols" >
							<text>{{item.nickname}}</text>
							<view class="tui-msg-name text-sm text-color-9">
								{{item.bio}}
			<!-- 					{{item.company_name}}
								{{item.company_server_name}} -->
							</view>
						</view>


						<view class="text-center-hv" @tap.stop="">
							<!-- <button class="btn-danger btn-sm mr" @tap.stop="onDel" :data-id="item.id">删除</button> -->
							<view class="rows">
								<button v-if="item.id_me" class="btn-main-dark btn-sm" @tap.stop="">已同意</button>
								<button v-else class="btn-main btn-sm" :data-creby_you="item.creby_you"
									@tap.stop="onOkVerify">同意</button>

								<view class="pl" v-if="menu_text == '多选'">
									<checkbox-group name="is_check" @change="onCheckChat" :data-index="index2">
										<label class="checkbox">
											<checkbox value="1" :checked="item.is_check == '1'" />
										</label>
									</checkbox-group>
								</view>
							</view>

						</view>
					</view>
				</tui-cell>
			</view>

		</view>
		<!--联系人列表-->
		<view class="tui-footer">{{list_count}}位历史好友</view>
		<view class="tui-safearea-bottom"></view>

		<!-- <view class="tui-indexed-list-bar" :style="{height:indexBarHeight+'px'}" @touchstart.stop="touchStart"
			@touchmove.stop="touchMove" @touchend.stop="touchEnd" @touchcancel.stop="touchCancel">
			<view v-for="(items,index3) in lists" :key="index3" class="tui-indexed-list-text"
				:style="{height:indexBarItemHeight+'px'}">
				{{items.letter=="well"?"#":items.letter}}
			</view>
		</view>
		<view class="tui-indexed-list-alert" v-if="touchmove && lists[touchmoveIndex].letter">
			<text>{{lists[touchmoveIndex].letter=="well"?"#":lists[touchmoveIndex].letter}}</text>
		</view>
		 -->

		<!-- 长按弹出菜单 -->
		<view class="bottom text-center-v bg-width" style=" z-index: 1000;height: 100rpx;" v-if="menu_text == '多选'">
			<view class="full-width box-wrap-space-around">
				<button @tap.stop="onAllOk">同意</button>
				<button @tap.stop="onAllDel">删除</button>
				<button @tap.stop="onAllSelect">全选</button>
				<button @tap.stop="onAllCancel">取消</button>
			</view>
		</view>


		<vive-modal-menu :hidden="selected==null" @click="onMenuInvoke" @close="onMenuClose" :menu="modal_menu">
		</vive-modal-menu>

		<vive-back-top :flag="top_flag"></vive-back-top>
	</view>
</template>

<script>
	const cityData = require('../../utils/index.list.js')

	import tuiIcon from "@/components/icon/icon"
	import tuiCell from "@/components/list-cell/list-cell"
	import viveModalMenu from "@/components/vive-modal-menu/vive-modal-menu"
	import viveBackTop from "@/components/vive-back-top/vive-back-top.vue"

	export default {
		components: {
			tuiIcon,
			tuiCell,
			viveModalMenu,
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

				modal_menu: ['删除', '多选', '取消'],
				// modal_menu: ['删除',  '取消'],
				selected: null,
				menu_text: '',

				top_flag: false,
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
			this.app.setTitle('新加入的好友')

		},
		onShow() {
			this.app.checkUser()

			this.onSearch()
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
				this.app.go('/pages/message/chat', {
					user_id: user_id
				})
			},
			onSearch(text = '') {
				this.search_text = text
				//板块
				this.app.post('api/chat_contact/list_group_add', {
					search_text: this.search_text
				}, json => {
					let lists = json.list
					for (let i in lists) {
						lists[i].is_check = '0'
					}
					this.lists = lists
					this.list_count = json.list_count
				})
			},
			onOkVerify(e) {
				let creby_you = this.app.ed(e).creby_you
				this.app.post('api/chat_contact/verify', {
					user_id: creby_you
				}, json => {
					if (json.code == '0') {
						this.app.toast(json.data)
					} else {
						this.app.toast(json.data)
					}
					this.onSearch()

				})
			},
			onUserDetail(e) {
				let id = this.app.ed(e).id
				this.app.go('/pages/index/detail/detail', {
					user_id: id
				})
			},
			onDel(e) { //过期
				let id = this.app.ed(e).id

				this.app.msgSys('确定删除', is => {
					if (is) {
						this.app.post('api/chat_contact/del_verify', {
							id: id
						}, json => {
							this.app.toast(json.data)
							this.onSearch()
						})
					}
				})
			},
			onMenuInvoke(e) {
				let index = e.index
				let menu_text = this.modal_menu[index]
				this.menu_text = menu_text

				if (menu_text == '删除') { //点击了置顶
					// this.app.toast('取消置顶')

					let id = this.selected.id
					let nickname = this.selected.nickname
					this.app.msgSys('确定删除 ' + nickname, is => {
						if (is) {
							this.app.post('api/chat_contact/del_verify', {
								id: id
							}, json => {
								this.app.toast(json.data)
								this.onSearch()
							})
						}
						this.selected = null
					})
				} else if (menu_text == '多选') { //
					this.selected = null
				}
			},
			onDetailLong(e) {
				this.selected = this.lists[this.app.ed(e).index]
			},
			onMenuClose() {
				this.selected = null
			},
			onAllOk(e) { //
				let user_id_list = []
				for (let i in this.lists) {
					let item = this.lists[i]
					if (item.is_check == '1') {
						user_id_list.push({
							user_id: item.creby_you,
						})
					}
				}
				if (user_id_list.length <= 0) {
					this.app.toast('未选中')
					return
				}

				this.app.msgSys('确定同意选中的好友', is => {
					if (is) {



						let creby_you = this.app.ed(e).creby_you
						this.app.post('api/chat_contact/verify_list', {
							json_user_id_list: this.app.toJson(user_id_list)
						}, json => {
							if (json.code == '0') {
								this.app.toast(json.data)
							} else {
								this.app.toast(json.data)
							}
							this.onSearch()
						})
					}
				})

			},
			onAllDel(e) {

				let id_list = []
				for (let i in this.lists) {
					let item = this.lists[i]
					if (item.is_check == '1') {
						id_list.push({
							id: item.id,
						})
					}
				}
				
				if (id_list.length <= 0) {
					this.app.toast('未选中')
					return
				}

				this.app.msgSys('确定删除选中的好友请求', is => {
					if (is) {
						this.app.post('api/chat_contact/del_verify_list', {
							json_id_list: this.app.toJson(id_list),
						}, json => {
							this.app.toast(json.data)
							this.onSearch()
						})
					}
				})
			},
			onAllSelect() { //
				let is = false
				for (let i in this.lists) {
					if (this.lists[i].is_check == '1') {

					} else {
						is = true
						break
					}
				}
				if (is) {
					for (let i in this.lists) {
						this.lists[i].is_check = '1'
					}
				} else {
					for (let i in this.lists) {
						this.lists[i].is_check = '0'
					}
				}
			},
			onAllCancel() { //
				this.selected = null
				this.menu_text = ''
			},
			onCheckChat(e) {
				let val = this.app.ev(e)[0]
				let index = this.app.ed(e).index
				this.lists[index].is_check = val
			},
		},
		onPageScroll(e) { //根据距离顶部距离是否显示回到顶部按钮
			this.top_flag = this.app.isTopFlag(e)
		},
	}
</script>

<style>
	page {
		background: #f5f6fa;
		/* 		height: 100%;
		overflow: hidden; */
	}

	.tui-page {
		/* 		height: 100%;
		overflow: hidden; */
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
</style>
