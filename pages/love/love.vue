<template>
	<view>
		
		<view class="top search-top-up-h5">
			
			<view class="status-bar-height" :style="'height:' + app.data.statusBarHeight + 'px'"></view>
			
			
			<view class="top-nav-box text-center-hv relative">
				<view class=" text-center-hv ">
					遇见良人
				</view>
				
				<view class="absolute absolute-0 box text-center-v pl-md pr-md text-color-6 text-sm">
					<view class="">
						<!-- {{me.address_text}} {{me.city_search}} {{me.county_search}}-->
						{{me.province_search}} 
					</view>
					<view class="">
						<ws-region :value_text="[me.province_search, me.city_search, me.county_search]" @change="changeWsRegion" 
						@cancel="cancelWsRegion" :is_show_region="false"  region_dep='3'>
							<view class="text-color-9">
								切换地区
							</view>
						</ws-region>
					</view>
				</view>
				
			</view>
			<vive-search type="left" @click="onSearch"></vive-search>
		</view>
		<view class="search-top-down"></view>
		<view class="" style="height: 80rpx;"></view>
		<view :style="'height:' + app.data.statusBarHeight + 'px'"></view>

		
<!-- 		<view class="mb" v-if="advert_list.length > 0">
			<view class="" v-for="(item,index) in advert_list" :key="index" @tap='onItemAdvert(item)'>
				<image :src="app.upload + item.img" mode="widthFix" class="full-width"></image>
			</view>
		</view> -->
		
		<!-- 轮播图 -->
		<swiper class="shop-slide-image" indicator-dots="true" autoplay="true" interval="4000" duration="500" 
		indicator-color="#eee" circular="true">
			<swiper-item @tap="onAdvert" v-for="(item,index) in advert_list" :key="index" :data-index="index">
				<image :src="app.upload + item.img" class="shop-slide-image" mode="scaleToFill" />
			</swiper-item>
		</swiper>
		
		

		<view class="rows-wrap pl pr">

			<view class="circle-item-cub "  v-for="(item,index) in page.data" :key="index" :data-index='index'
				@longtap="onDetailLong" @tap.stop="onDetailProduct" :data-id='item.id'>
				<view class="relative circle-item-cub-in " >
					<view class="tan-img-pic relative">
						<view class="text-center-h">
							<image :src="item.avatar" mode="aspectFill" class=" avatar-china-big" @tap.stop="onAvatar" :data-id='item.creby'>
							</image>
						</view>
						
						<view class="absolute absolute-0 box-v">
							<view class=""></view>
							<view class="ml-xs pl-xs pt pb text-xs text-color-f box">
								<view class="border-id">
									{{item.online_datetime}}
								</view>
							</view>
						</view>
						
					</view>
					<view class="absolute absolute-0 ">
						<view class="box">
							<view class="pl pt text-xs text-color-f ">
								<view class="border-id">
									ID: {{item.id}}
								</view>
							</view>
							<view class="pr pt  text-sm">
								<view class="" v-if="item.gender == 0"></view>
								<view class="text-gender-tag text-gender-tag-1" v-else-if="item.gender == 1">
									<image src="/static/images/icon_gender_1.png" mode="scaleToFill" class="icon-gender"></image>
								</view>
								<view class="text-gender-tag text-gender-tag-2" v-else-if="item.gender == 2">
									<image src="/static/images/icon_gender_2.png" mode="scaleToFill" class="icon-gender"></image>
								</view>
							</view>
						</view>
						
						
					</view>
					<view class="tan-list-title pt-sm pb-sm " style="padding: 10rpx 10rpx;">
						<view class="box" >
							<view class="text-center-v text-line-1 text-bold ">
								
								<view class="" style="padding-right: 8rpx;">
									<view class="is-online is-online-on" v-if="item.is_online == 1"></view>
									<view class="is-online is-online-out" v-else></view>
								</view>
								
								<view class="">
									{{item.nickname}}
								</view>
								<view class="pl-sm" v-if="item.is_plus == 1" >
									<image src="/static/images/icon_vip.png" mode="heightFix" class="icon-plus-sm"></image>
								</view>
							
							</view>
							
							<view class="icon-like-box-pad" @tap.stop="onAddFollow(item)">
<!-- 								<view class="icon-like-box text-center-hv">
									<image src="/static/images/icon_like_ed.png" v-if="item.is_follow == 1" mode="scaleToFill" class="icon-like"></image>
									<image src="/static/images/icon_like_df.png" v-else mode="scaleToFill" class="icon-like"></image>
								</view>	 -->			
								<view class="icon-like-box text-center-hv">
									<image src="/static/images/icon_love_ed.png" v-if="item.is_follow == 1" mode="scaleToFill" class="icon-like"></image>
									<image src="/static/images/icon_love_df.png" v-else mode="scaleToFill" class="icon-like"></image>
								</view>	
							</view>
							
							
						</view>
						<view class="text-line-1 text-xs text-color-6">{{item.bio}}</view>
						<!-- <view class="text-line-1 text-xs box pt-xs pb-xs" style="font-size: 16rpx;" >
							<text>北京 朝阳</text>
							<text class="">22岁|175cm|模特</text>
						</view> -->
						
						<view class="text-line-1 box text-color-8 pb-xs pt" style="font-size: 22rpx;">
							<view class="">
								<text v-if="item.province">{{item.province}}</text>
								<text class="pl-xs pr-xs" v-if="item.city">{{item.city}}</text>
								<text class="pl-xs pr-xs" v-if="item.county">{{item.county}}</text>
							</view>
							<view class="">
								<text v-if="item.age">{{item.age}}岁</text>
								<text v-if="item.age" class="pl-xs pr-xs">|</text>
								<text v-if="item.height">{{item.height}}cm</text>
								<text v-if="item.height" class="pl-xs pr-xs">|</text>
								<text v-if="item.job">{{item.job}}</text>
							</view>
						</view>
						
						<view class="text-color-5  pb-xs " style="font-size: 22rpx;">
							<view class="text-line-1">
								<text v-if="item.company_desc">{{item.company_desc}}</text>
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
		<tui-loadmore :visible="page.isLoad" :index="3" type="primary"></tui-loadmore>
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
				top_flag: false,
				me: {},
				
				advert_list: [],
				
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
				this.page = new this.app.page('api/user/page_live', {
					search_text: this.search_text
				})
				this.page.next()
				
				this.app.post('api/user/plus', {}, json => {
					let {code, data} = json
					if(code == 0){
						this.me = data
						
					}
				})
				
				//上线下线 提醒
				this.app.data.eventRefOnlineCount = task => {
					// console.log(task)
					// this.page.reload()
					this.app.post('api/user/page_live', {
						page: this.page.param.page,
					}, json => {
						let data = json.data						
						// this.app.toast('0')
						for(let i in data){
							for(let j in data[i]){
								this.page.data[i][j] = data[i][j]
							}
						}
					})
					
				}
				
				this.app.postHtml('api/advert/advert_list', {
				}, json => {
					const {code , data} = json
					if(code == 0){
						this.advert_list = data
					}
				})
				
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
				let user_id = this.app.ed(e).id
				// this.app.go('/pages/index/detail/detail_product', {
				// 	id: id
				// })
				
				this.app.go('/pages/index/detail/detail', {
					user_id: user_id
				})
			},
			onSearch(text) {
				//console.log(text)
				this.search_text = text
				this.onReload()
			},
			onDetailLong(e) {
				return
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
			onAdd() {
				this.app.go('/pages/me/product/me_add_product')
			},
			changeWsRegion(e){
				this.app.post('api/user/plus', {}, json => {
					let {code, data} = json
					if(code == 0){
						this.me = data
						
						this.me.address_json_search = e.json
						
						this.me.province_search = e.province
						this.me.city_search = e.city
						this.me.county_search = e.county
						
						this.app.post('api/user/save', {
							...this.me
						}, json => {
							this.onReload()
							// this.app.toast('保存成功')
							
						})
					}
				})
				
			},
			cancelWsRegion(e){
				this.app.post('api/user/plus', {}, json => {
					let {code, data} = json
					if(code == 0){
						this.me = data
						
						this.me.address_json_search = e.json
						
						this.me.province_search = e.province
						this.me.city_search = e.city
						this.me.county_search = e.county
						
						this.app.post('api/user/save', {
							...this.me
						}, json => {
							this.onReload()
							// this.app.toast('保存成功')
							
						})
					}
				})
			},
			onAddFollow(user) {
				this.app.post('api/chat_follow/add_float_love', {
					user_id: user.id
				}, json => {
					let {code, data, is_follow} = json
					
					if (code == '0') {
						user.is_follow = is_follow
						this.app.toast(data)
					}if (code == '-2') {
						user.is_follow = is_follow
						this.app.toast(data)
					} else {
						this.app.toast(data)
					}
					// this.onReload()
				})
			},
			onAdvert(box) {
				console.log(box)
				if (box.type == '1') {
					this.app.go(box.page)
				} else if (box.type == '2') {
					this.app.goTab(box.page)
				}
			},
			
		},
		onLoad() {
			
			this.app.getUser(user => {
				
				this.onReload()
			})
		},
		onShow() {
			this.app.getUser(user => {
				this.app.checkUser()
			})
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
	page {
		background: #F0F0F0;
	}

	.scroll-view-item-img {
		width: 100%;
		height: 150rpx;
		/* display: block; */
		border-radius: 10%;
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
		/* margin: 0 20rpx; */
		font-size: 30rpx;
		
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
	}
	

	.avatar-circle {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}
	
	
	/* #ifdef H5 */ 

	/* #endif */
	
	.icon-like{
		width: 50rpx;
		height: 50rpx;
	}
	
	.icon-like-box-pad{
		padding: 0 15rpx 0 0;
		margin: -25rpx 0 0 0;
		z-index: 99;
	}

	.icon-like-box{
		padding: 15rpx;
		margin: -15rpx;
		background-color: #fff;
		border-radius: 50%;
		border: 1rpx solid #f0f0f0;
		box-shadow: 5rpx 5rpx 10rpx 5rpx #eee;
	}
	
	/* 喜欢定位 */
	.icon-like{
		width: 80rpx;
		height: 80rpx;
	}
	
	.icon-like-box-pad{
		padding: 0 20rpx 0 0;
		margin: -50rpx -20rpx 0 0;
		z-index: 99;
	}
	
	.icon-like-box{
		padding: 0rpx 0 0rpx 0;
		margin: 0rpx 0 0rpx 0;
		background-color: #fff;
		border-radius: 50%;
		border: 1rpx solid #f0f0f0;
		box-shadow: 5rpx 5rpx 10rpx 5rpx #eee;
	}
	
</style>
