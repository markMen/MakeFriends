<template>
	<view>
		<view class="top search-top-up">
			<view class="box">
				<vive-search class="full-width" type="left" @click="onSearch"></vive-search>
				<view class="text-center-hv" @tap="onAdd">
					<image src="/static/images/icon_product_add.png" 
					style="width: 50rpx;height: 50rpx;padding: 0 20rpx 0 0;"></image>
				</view>
			</view>
		</view>
		<view class="search-top-down"></view>

		<view class="circle-box box ">
			<view class="cols col-6">
				<view class="circle-item" v-for="(item,index) in page.data" :key="index" :data-index='index'
					@longtap="onDetailLong" @tap.stop="onDetailProduct" :data-id='item.id' v-if="index % 2 == 0">
					<view class="cols">
						<view class="tan-img-pic relative">

							<block v-for="(item,index) in toArray(item.imgs)" :key="index" class="" v-if="index == 0">
								<image :src="app.upload + item" :data-src="app.upload + item" mode="widthFix"
									class="tan-img-pic-image "></image>
							</block>
							
							<view class="absolute absolute-0 box" >
								<view></view>
								<view class="pr pt " style="font-size: 30rpx;">
									<text v-if="item.type == '1'" class="circle-type-product">销售</text>
									<text v-if="item.type == '2'" class="circle-type-sale">采购</text>
								</view>
							</view>

							<!-- <image class="tan-img-pic-image" src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089874897,1268118658&fm=26&gp=0.jpg" mode="widthFix"></image> -->
						</view>
						<view class="tan-list-title">
							<view>{{item.title}}</view>
							<view class="text-line-1">{{item.text}}</view>

							<view class="box">
								<view class="box-v">
									<view></view>
									<view>￥:{{item.price}}</view>
								</view>
								<view class="cols">
									<view class="box">
										<view></view>
										<image :src="item.avatar" class="avatar-circle " @tap.stop="onAvatar"
											:data-id='item.creby'></image>
									</view>
									<view class="text-xs">{{item.nickname}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="cols col-6">
				<view class="circle-item" v-for="(item,index) in page.data" :key="index" :data-index='index'
					@longtap="onDetailLong" @tap.stop="onDetailProduct" :data-id='item.id' v-if="(index + 1) % 2 == 0">
					<view class="cols">
						<view class="tan-img-pic relative">

							<block v-for="(item,index) in toArray(item.imgs)" :key="index" class="" v-if="index == 0">
								<image :src="app.upload + item" :data-src="app.upload + item" mode="widthFix"
									class="tan-img-pic-image "></image>
							</block>
							
							<view class="absolute absolute-0 box" >
								<view></view>
								<view class="pr pt " style="font-size: 30rpx;">
									<text v-if="item.type == '1'" class="circle-type-product">销售</text>
									<text v-if="item.type == '2'" class="circle-type-sale">采购</text>
								</view>
							</view>

							<!-- <image class="tan-img-pic-image" src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089874897,1268118658&fm=26&gp=0.jpg" mode="widthFix"></image> -->
						</view>
						<view class="tan-list-title">
							<view>{{item.title}}</view>
							<view class="text-line-1">{{item.text}}</view>
						
							<view class="box">
								<view class="box-v">
									<view></view>
									<view>￥:{{item.price}}</view>
								</view>
								<view class="cols">
									<view class="box">
										<view></view>
										<image :src="item.avatar" class="avatar-circle " @tap.stop="onAvatar"
											:data-id='item.creby'></image>
									</view>
									<view class="text-xs">{{item.nickname}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>


		</view>


		<!-- 		<view class="pl pr">
			<view v-for="(item,index) in page.data" :key="index" class="m-item" :data-index='index' @longtap="onDetailLong"
			 :class="[item.product_top_id?'top-bg-message':'']">
				<view class="rows pb pt">
					<image :src="item.avatar" class="avatar-chat " @tap.stop="onAvatar" :data-id='item.creby'></image>
					<view class="cols pl full-width" @tap.stop="onDetailProduct" :data-id='item.id'>
						<view class="text-color-6 text-sm" @tap.stop="onAvatar" :data-id='item.creby'>{{item.nickname}}</view>
						<view class="text-md text-bold text-color-3">{{item.title}}</view>
						<view class="rows-wrap" style="width: 100%;">
							<view v-for="(item,index) in toArray(item.imgs)" :key="index" class="" style="width: 30%; margin: 5rpx;">
								<image :src="app.upload + item" :data-src="app.upload + item" mode="  widthFix" class="scroll-view-item-img "></image>
							</view>
						</view>
						<view class="text-color-9 text-sm">发布于：{{item.credate}}</view>
					</view>
				</view>
				<view class="line-wx-sm"></view>
			</view>
		</view> -->

		<!--加载loadding-->
		<tui-loadmore :visible="page.isLoad" :index="3" type="primary" ></tui-loadmore>
		<tui-nomore :visible="page.isMore" bgcolor="none"></tui-nomore>
		<!--加载loadding-->

		<vive-modal-menu :hidden="selected==null" @click="onMenuInvoke" @close="onMenuClose" :menu="modal_menu">
		</vive-modal-menu>
		<vive-back-top :flag="top_flag"></vive-back-top>

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
				top_flag:false,
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
			onAdd(){
				this.app.go('/pages/me/product/me_add_product')
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
		onPageScroll(e) { //根据距离顶部距离是否显示回到顶部按钮
		 this.top_flag = this.app.isTopFlag(e)
		},
		// onBackPress(e) { return this.app.onBackPress(e) }, 

	}
</script>

<style>
	page{
		background: #F0F0F0;
	}
	
	
	.scroll-view-item-img {
		width: 100%;
		height: 150rpx;
		/* display: block; */
		border-radius: 10%;
	}



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
		margin: 10rpx;
		width: calc(100vw / 2 - 20rpx);
		background-color: #FFFFFF;
		border-radius: 20px;
		/* overflow: hidden; */

		display: flex;
		flex-direction: column;
		justify-content: center;
		/* align-items: center; */
	}

	.tan-img-pic {
		width: 100%;
	}

	.tan-img-pic-image {
		width: 100%;
		/* height: 100%; */
		max-height: 500rpx;
		
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.tan-list-title {
		margin: 20rpx;
		font-size: 30rpx;
	}
	
	.avatar-circle{
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}
</style>
