<template>
	<view>
		<view class="top search-top-up">
			<vive-search type="left" @click="onSearch"></vive-search>
		</view>
		<view class="search-top-down"></view>

		<view class="pl pr">
			<view v-for="(item,index) in page.data" :key="index" class="m-item" :data-index='index' @longtap="onDetailLong"
			 :class="[item.product_top_id?'top-bg-message':'']">
				<view class="rows pb pt">
					<image :src="item.avatar" class="avatar-chat " @tap.stop="onAvatar" :data-id='item.creby'></image>
					<view class="cols pl full-width" @tap.stop="onDetailProduct" :data-id='item.id'>
						<view class="text-color-6 text-sm" @tap.stop="onAvatar" :data-id='item.creby'>{{item.nickname}}</view>
						<view class="text-md text-bold text-color-3">{{item.title}}</view>

						<!-- <list-img :imgs="item.imgs" :prefix="app.upload"></list-img> -->
						<view class="rows-wrap" style="width: 100%;">
							<view v-for="(item,index) in toArray(item.imgs)" :key="index" class="" style="width: 30%; margin: 5rpx;">
								<!-- <image @tap.stop="previewImage" :src="app.upload + item" :data-src="app.upload + item" mode="  widthFix" class="scroll-view-item-img "></image> -->
								<image :src="app.upload + item" :data-src="app.upload + item" mode="  widthFix" class="scroll-view-item-img "></image>
							</view>
						</view>

						<view class="text-color-9 text-sm">发布于：{{item.credate}}</view>
					</view>
				</view>
				<view class="line-wx-sm"></view>
			</view>
		</view>

		<!--加载loadding-->
		<tui-loadmore :visible="page.isLoad" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="page.isMore"></tui-nomore>
		<!--加载loadding-->

		<vive-modal-menu :hidden="selected==null" @click="onMenuInvoke" @close="onMenuClose" :menu="modal_menu"></vive-modal-menu>
		<vive-back-top></vive-back-top>

	</view>
</template>

<script>
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	import tuiIcon from "@/components/icon/icon"

	import listImg from "@/components/list-img/list-img"
	import viveSearch from "@/components/vive-search/vive-search"
	import viveModalMenu from "@/components/vive-modal-menu/vive-modal-menu"
	import viveBackTop from "@/components/vive-back-top/vive-back-top.vue"

	export default {
		components: {
			tuiLoadmore,
			tuiNomore,
			tuiIcon,
			listImg,
			viveSearch,
			viveModalMenu,
			viveBackTop,

		},
		data() {
			return {
				app: this.app,
				page: new this.app.page(),
				search_text: '',
				selected: null,
				modal_menu: ['置顶', '取消'],
			}
		},
		computed: {
			toArray: function() {
				return function(imgs) {
					return imgs.split(',')
				}
			},
		},
		methods: {
			onReload() {
				this.page = new this.app.page('api/circle/page', {
					search_text: this.search_text
				})
				this.page.next()
			},
			previewImage: function(e) {
				this.app.previewImage(e)
			},
			onAvatar(e) {
				let id = this.app.ed(e).id
				this.app.go('/pages/index/detail/detail', {
					user_id: id
				})
			},
			onDetailProduct(e) {
				let id = this.app.ed(e).id
				this.app.go('/pages/index/detail/detail_product', {
					id: id
				})
			},
			onSearch(text) {
				//console.log(text)
				this.search_text = text
				this.onReload()
			},
			onDetailLong(e) {
				this.selected = this.page.data[this.app.ed(e).index]
				/*let id = this.app.ed(e).id
				this.app.post('api/user_top/add_float', {
					user_id: id,
				}, json => {
			
				})*/
				if (this.selected.product_top_id) {
					this.modal_menu = ['取消置顶', '取消']
				} else {
					this.modal_menu = ['置顶', '取消']
				}
			},
			onMenuInvoke(e) {
				if (this.selected.product_top_id) { //存在就取消
					let product_id = this.selected.product_id
					this.selected = null
					let index = e.index
					if (index == 0) { //点击了置顶
						this.app.post('api/product_top/del_float', {
							product_id: product_id,
						}, json => {
							this.app.toast('取消置顶')
							this.onReload()
						})
					}
				} else { //不存在就添加
					let product_id = this.selected.product_id
					this.selected = null
					let index = e.index
					if (index == 0) { //点击了置顶
						this.app.post('api/product_top/add_float', {
							product_id: product_id,
						}, json => {
							this.app.toast('置顶成功')
							this.onReload()
						})
					}
				}
			},
			onMenuClose() {
				this.selected = null
			},
		},
		onLoad() {
			this.onReload()
		},
		onShow() {
			this.app.checkUser()
			

		},
		onPullDownRefresh() {
			this.page.reload(() => {
				this.app.toast("刷新成功")
			})
		},
		onReachBottom() {
			this.page.next()
		},
		// onBackPress(e) { return this.app.onBackPress(e) }, 

	}
</script>

<style>
	.scroll-view-item-img {
		width: 100%;
		height: 150rpx;
		/* display: block; */
		border-radius: 10%;
	}
</style>
