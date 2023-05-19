<template>
	<view>
		
		<view class="top search-top-up-h5">
			<view class="top-nav-box text-center-hv relative">
				
				<view class=" text-center-hv">
					星球
				</view>
				
				<view class="absolute absolute-0 box text-center-v pl-md pr-md text-color-6 text-sm">
					<view class="">
						{{me.address_text}}
					</view>
					<view class="">
						<ws-region :value_json="me.address_json" @change="changeWsRegion" :is_show_region="false" >
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
		<view class="" style="height: 80rpx;">
		</view>

		<view class="rows-wrap pl pr">

			<view class="circle-item "  v-for="(item,index) in page.data" :key="index" :data-index='index'
				@longtap="onDetailLong" @tap.stop="onDetailProduct" :data-id='item.id'>
				<view class=" relative circle-item-in" :class="app.toBirthdayClass(item.birthday, item.id)">
					<view class="tan-img-pic relative">
						<view class="text-center-h pl pr pt">
							<image :src="item.avatar" class="avatar-china" @tap.stop="onAvatar" :data-id='item.creby'>
							</image>
						</view>
					</view>
					<view class="absolute absolute-0">
						<view class="box">
							<view class="pl pt text-xs ">
								({{item.id}}) 
							</view>
							<view class="pr pt  text-sm">
								<view class="" v-if="item.gender == 0"></view>
								<view class="text-gender-tag text-gender-tag-1" v-else-if="item.gender == 1">♂</view>
								<view class="text-gender-tag text-gender-tag-2" v-else-if="item.gender == 2">♀</view>
							</view>
						</view>
					</view>
					<view class="tan-list-title pt-sm pb-sm" style="margin: 0 10rpx;">
						<view class="text-center-hv text-line-1 text-bold">
							<view class="">
								{{item.nickname}}
							</view>
							<view class="pl-sm" v-if="item.is_plus == 1" >
								<image src="/static/images/icon_vip.png" mode="heightFix" class="icon-plus-sm"></image>
							</view>
						
						</view>
						<!-- <view class="text-line-1 text-xs ">{{item.bio}}</view> -->
						<!-- <view class="text-line-1 text-xs box pt-xs pb-xs" style="font-size: 16rpx;" >
							<text>北京 朝阳</text>
							<text class="">22岁|175cm|模特</text>
						</view> -->
						
						<view class=" box text-color-6 pt-xs pb-xs" style="font-size: 22rpx;">
							<view class="">
								<text v-if="item.address_text">{{item.address_text}}</text>
							</view>
							<view class="">
								<text v-if="item.age">{{item.age}}岁</text>
								<text v-if="item.age" class="pl-xs pr-xs">|</text>
								<text v-if="item.height">{{item.height}}cm</text>
								<text v-if="item.height" class="pl-xs pr-xs">|</text>
								<text v-if="item.job">{{item.job}}</text>
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
				this.me.address = e.address
				this.me.address_json = e.json
				if(e.province == e.city){
					this.me.address_text = e.city + ' ' + e.county
				}else{
					this.me.address_text = e.province + ' ' + e.city
				}
				
				this.me.province = e.province
				this.me.city = e.city
				this.me.county = e.county
				
				this.app.post('api/user/save', {
					...this.me
				}, json => {
					this.onReload()
					// this.app.toast('保存成功')
					
				})
				
			}
		},
		onLoad() {
			
			this.app.getUser(user => {
				
				this.onReload()
				
				this.app.checkUser()
				
			})
		},
		onShow() {
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
		margin: 0 20rpx;
		font-size: 30rpx;
	}
	

	.avatar-circle {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}
	
	
	/* #ifdef H5 */ 

	/* #endif */

</style>
