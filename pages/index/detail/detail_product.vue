<template>
	<view class="">
		<view v-if="obj.video">
			
<!-- 			<view @tap.stop="onVideoPlay" class="product-video-img relative"   v-if="obj.video_img">
				<image :src="app.upload + obj.video_img" mode="heightFix" ></image>
				<view class="absolute absolute-0 text-center-hv bg-mask">
					<image src="/static/images/chat_video.png" class=" product-video-img-play"></image>
				</view>
			</view> -->
			
			
			<video :poster="app.upload + obj.video_img"   style="" :src="app.upload + obj.video" class="product-video-img full-width" id="meVideo"></video>
		</view>
		
		
		<view class="pl pr">
			<view class="pt text-center-h">标题: {{obj.title}}</view>
			<view class="pt text-color-6 text-sm">详细: {{obj.text}}</view>

			<view class="pt text-price text-sm text-md" v-if="obj.price > 0">价格: ￥{{obj.price}}</view>
			<view class="pt text-color-6 text-sm" v-if="obj.count > 0">数量: {{obj.count}}</view>
			<view class="pt text-color-6 text-sm rows" v-if="obj.type">
				<view>类型: </view>
				<view v-if="obj.type==0">缺省</view>
				<view v-else-if="obj.type==1">销售</view>
				<view v-else-if="obj.type==2">采购</view>
				<view v-else>未知</view>
				</view>



			<view class="text-color-9 text-sm pt rows" @tap="onUserDetail">
				<view class="pr">
					<image :src="sale_user.avatar" mode="scaleToFill" class="avatar"></image>
				</view>
				<view class="box-v pt pb">
					<view class="">{{sale_user.nickname}}</view>
					<view class="">发布于: {{obj.credate}}</view>
				</view>
			</view>
			<view class="pt">{{obj.editor}}</view>
		</view>

		<view class="pl pr pt text-color-9">详情图片: </view>
		<view class="cols">
			<view class='col img-box ' v-for="(item,index) in listPhoto" :key="index">
				<image class='full-width' mode="widthFix" :src='app.upload + item' :data-src='app.upload + item' @tap="previewImages"
				 :data-srcs='obj.imgs' :data-prefix="app.upload"></image>
			</view>
		</view>

		<view style="height: 200rpx;"></view>

		<!--        <view class="bottom bg-white-bg rows">
            <view class="text-center-v pl-lg" @tap="onMessage">
                <tui-icon name="message" :size="30" color='#666'></tui-icon>
            </view>
            
            <view class="pl pr pb-xs    text-center-hv">
                <view class="border ml-lg mr">
                    <tui-numberbox  :value="obj.product_count" @change="changeCount"></tui-numberbox>
                </view>
            </view>
            <button class="ml-lg btn-warning full-width" @tap="onPay">购买</button>
        </view> -->

		<view class="bottom bg-white-bg rows" v-if="me.id != obj.creby && sale_user.user_type == '0'">

			<button class=" btn-warning full-width" @tap="onPayOrder">我要订货</button>
		</view>

	</view>
</template>


<script>
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import tuiIcon from "@/components/icon/icon"

	export default {
		components: {
			tuiNumberbox,
			tuiIcon,
		},
		data() {
			return {
				app: this.app,
				obj: {},
				spec: [],
				listPhoto: [],
				sale_user: {},

				me: {},
			}
		},
		methods: {
			previewImage(e) {
				this.app.previewImage(e)
				this.videoStop()
			},
			previewImages(e) {
				this.app.previewImages(e)
				this.videoStop()
			},
			onPay(e) {
				/*                this.app.go('/pages/index/submit_order/submit_order', {
				                    // product_id: this.obj.id,
				                    product_spec_id: this.spec[0].id,
				                    product_count: this.obj.product_count,
				                }) */
			},
			changeCount(e) {
				//this.obj.product_count = e.value                
			},
			onMessage(e) {
				this.app.go('/pages/message/chat', {
					user_id: this.sale_user.id
				})
				this.videoStop()
			},
			//订货
			onPayOrder(e) {
				this.app.go('/pages/index/submit_order/user_order', {
					user_id: this.obj.creby,
					type: '1',
				})
				this.videoStop()
			},
			onUserDetail(e) {
				this.app.go('/pages/index/detail/detail', {
					user_id: this.sale_user.id
				})
				this.videoStop()
				
			},
			
			onVideoPlay(){
				// 获取 video 上下文 videoContext 对象
				let meVideo = uni.createVideoContext('meVideo');
				// 进入全屏状态
				meVideo.play();
			},
			videoStop(){
				// 获取 video 上下文 videoContext 对象
				let meVideo = uni.createVideoContext('meVideo');
				// 进入全屏状态
				meVideo.pause();
			},
		},
		onLoad(option) {
			let id = option.id
			if (id) {
				this.app.post('api/product/find', {
					id: id
				}, json => {
					json.data.product_count = 1

					this.obj = json.data

					this.listPhoto = this.obj.imgs.split(',')
					this.spec = json.spec
					this.sale_user = json.sale_user

				})
			} else {
				this.app.toast('缺少ID')
			}

			this.app.post('api/user/info', {}, userinfo => {
				this.me = userinfo
			})
			
			
		},
		onShow() {
			this.app.checkUser()
			
			
		},
		onHide() {
			// 获取 video 上下文 videoContext 对象
			let meVideo = uni.createVideoContext('meVideo');
			// 进入全屏状态
			meVideo.pause();
		},
	}
</script>

<style>
.product-video-img{
	height: 400rpx;
}
.product-video-img-play{
	width: 200rpx;
	height: 200rpx;
}
</style>
