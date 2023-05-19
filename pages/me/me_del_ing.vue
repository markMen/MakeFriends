<template>
	<view class="bg-white">
		<view class="box-wrap-space-around pl pr pt ">
			<view class="cols">
				<image :src="user.avatar" :data-src="user.avatar" @tap="previewImage" class="avatar-wx"></image>
				<!-- <view class="text-center-h">{{user.nickname}}</view> -->
			</view>



			<!--            <view class="text-center-v" @tap="onToUserInfo">
                <view class="cols pl ">
                    <view class="text-bold">{{user.nickname}}</view>
                    <view class="rows pt text-color-6">
                        <view>普通会员</view>
                        <view>|</view>
                        <view>ID:{{user.id}}</view>
                    </view>
                </view>
            </view> -->

			<view class="cols">
				<image :src="app.upload + user.company_img" :data-src="app.upload + user.company_img"
					@tap="previewImage" class="avatar-company-img"></image>
				<view class="text-center-h pt-sm">
					<view class="rows text-center-v">
						<view class="text-color-6 text-sm">公开显示</view>
						<switch class="pl" checked  style="zoom: 0.5;"
						:checked="user.is_show_company_img == '1'" @change="onSwitchShowCompanyImg" />
					</view>
				</view>
			</view>

		</view>

		<view class="pt pl pr">

			<view class="pt">
				{{user.company_name}} {{user.company_server_name}}
			</view>


			<view url="/pages/plus/plus" @tap="go_plus">
				<view class="pt box">
					<view>{{user.id}}</view>
					<view class="text-color-6 rows">
						<!-- <tui-icon name="moments" :size="22" color='#333333'></tui-icon> -->
						<image src="/static/image/vip.png" alt="" mode="scaleToFill"
							style="width: 42rpx; height: 42rpx;"></image>
						<view class="pl-sm">{{plusTime(user.plus_time_end)}}</view>
					</view>
				</view>
			</view>


			<view class="pt">
				{{user.nickname}}
			</view>

			<view class="pt">
				{{user.phone}}
			</view>

			<view class="pt">
				{{user.company_desc}}
			</view>

			<view class="line-wx mt"></view>


			<list-img class="pt" :imgs="user.company_imgs" :prefix="app.upload">
			</list-img>

			<list-img class="pt" :imgs="user.product_imgs" :prefix="app.upload">
			</list-img>
		</view>


		<view class="line-wx mt">
		</view>

		<view class="tui-userinfo-box ">
			<!--            <block v-for="(v,index) in menu_list">
                <tui-list-cell padding="5px" :arrow="true">
                    <view class="tui-list-cell" :data-index="index" @tap.stop='onListItemClick'>
                        <view>{{v.title}}</view>
                        <view class="tui-content"></view>
                    </view>
                </tui-list-cell>
            </block> -->
			<tui-list-cell padding="0px" :arrow="true" class="">
				<view url="/pages/plus/plus" class="tui-list-cell " @tap="go_plus">
					<view>我的会员</view>
					<view class="tui-content"></view>
				</view>
			</tui-list-cell>


			<tui-list-cell padding="0px" margin='0px' :arrow="true" class="tui-light-blue">
				<view url="/pages/me/me_order/me_order" @tap="go_me_order" class="tui-list-cell">
					<view class="rows">我购买的订单 <tui-badge v-if="task.red_order_count > 0" class="ml-sm" type="danger"
							:dot="true"></tui-badge>
					</view>
				</view>
			</tui-list-cell>

			<!--            <tui-list-cell padding="0px" :arrow="true" class="tui-light-blue">
                <navigator url="/pages/index/sale/sale" class="tui-list-cell">
                    <view>经销方</view>
                    <view class="tui-content"></view>
                </navigator>
            </tui-list-cell> -->

			<!-- <view class="line-wx mt"></view> -->


			<tui-list-cell padding="0px" :arrow="true" class="tui-light-green">
				<view url="/pages/me/me_order/me_order_sale" @tap="go_me_order_sale" class="tui-list-cell ">
					<view class="rows">我售出的订单 <tui-badge v-if="task.red_order_sale_count > 0" class="ml-sm"
							type="danger" :dot="true"></tui-badge>
					</view>
					<view class="tui-content"> </view>
				</view>
			</tui-list-cell>

			<tui-list-cell padding="0px" :arrow="true" class="">
				<view url="/pages/me/product/me_product_list" @tap="go_me_product_list" class="tui-list-cell ">
					<view class="rows">我的信息管理</view>
					<view class="tui-content"></view>
				</view>
			</tui-list-cell>

			<!-- 			<tui-list-cell padding="0px" :arrow="true" class="">
			    <navigator url="/pages/me/me_add_product" class="tui-list-cell " >
			        <view>发布产品</view>
			        <view class="tui-content"></view>
			    </navigator>
			</tui-list-cell> -->


			<!--            <tui-list-cell padding="0px" :arrow="true" class="tui-light-green">
                <navigator url="/pages/index/product/product" class="tui-list-cell ">
                    <view>生产方</view>
                    <view class="tui-content"></view>
                </navigator>
            </tui-list-cell> -->

			<!-- <view class="line-wx mt"></view> -->


			<tui-list-cell padding="0px" :arrow="true" class="">
				<view url="/pages/friend/me_follow" @tap="go_me_follow" class="tui-list-cell ">
					<view>我关注了谁</view>

					<view class="tui-content">
						<tui-badge style="margin-right: 50rpx;" type="danger" v-if="task.red_product>0">
							{{task.red_product}}</tui-badge>
					</view>
				</view>
			</tui-list-cell>

			<tui-list-cell padding="0px" :arrow="true" class="">
				<view url="/pages/friend/follow_me" @tap="go_follow_me" class="tui-list-cell ">
					<view>谁关注了我</view>
					<view class="tui-content"></view>
				</view>
			</tui-list-cell>




			<view class="line-wx mt"></view>


			<tui-list-cell padding="0px" :arrow="true" :last="true" class="">
				<navigator url="" class="tui-list-cell " @tap="onToUserInfo">
					<view class="rows">设置 <tui-badge v-if="app.data.is_version" class="ml-sm" type="danger" :dot="true">
						</tui-badge>
					</view>
					<view class="tui-content"></view>
				</navigator>
			</tui-list-cell>



		</view>




	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiListCell from "@/components/list-cell/list-cell"
	import listImg from "@/components/list-img/list-img"
	import tuiBadge from "@/components/badge/badge"

	export default {
		components: {
			tuiIcon,
			tuiListCell,
			listImg,
			tuiBadge,
		},
		data() {
			return {
				app: this.app,
				user: {},
				menu_list: [

					{
						title: '我购买的订单',
						page: '/pages/me/me_order/me_order',
					},
					{
						title: '经销方',
						page: '/pages/index/sale/sale',
					},


					{
						title: '我售出的订单',
						page: '/pages/me/me_order/me_order_sale',
					},
					{
						title: '生产方',
						page: '/pages/index/product/product',
					},


					// {
					// 	title: '我的收藏',						
					// 	page: '/pages/me/me_favorite/me_favorite',
					// },

				],
				task: {},
				system: '',
				system_show: '0',
			}
		},
		computed: {
			plusTime: function() {
				return function(time) {
					if (time) {
						return time.substr(0, 10)
					}
					return time
				}
			},
		},
		methods: {
			onToUserInfo() {
				this.app.go('/pages/me/user_info')
			},
			onListItemClick: function(e) {
				let index = this.app.ed(e).index
				let menu = this.menu_list[index]
				this.app.go(menu.page)
				console.log(index)
			},
			previewImage(e) {
				this.app.previewImage(e)
			},
			onSwitchShowCompanyImg(e){
				let toast = ''
				if(this.user.is_show_company_img == '1'){
					this.user.is_show_company_img = '0'
					toast = '已隐藏显示'
				}else{
					this.user.is_show_company_img = '1'
					toast = '已公开显示'
				}
				this.app.post('api/user/save', {
					...this.user,
				}, json => {
					if(json.code == '0'){
						this.app.toast(toast)
					}else{
						this.app.alert(json.data, '')
					}
				})
			},
			
			go_plus() {this.app.go('/pages/plus/plus')},
			go_me_order  () {this.app.go('/pages/me/me_order/me_order')},
			go_me_order_sale () {this.app.go('/pages/me/me_order/me_order_sale')},
			go_me_product_list () {this.app.go('/pages/me/product/me_product_list')},
			go_me_follow () {this.app.go('/pages/friend/me_follow')},
			go_follow_me () {this.app.go('/pages/friend/follow_me')},

		},
		onLoad() {

		},
		onShow() {
			this.app.loopTask(task => {
				this.task = task
				// if(task.red_product > 0){

				// }
			})

			this.app.post('api/user/info', {}, json => {
				this.user = json
			})
			// this.app.checkDid()
			this.app.checkUser()



			let system = uni.getSystemInfoSync().platform
			this.system = system
			this.app.postHtml('api/config/config', {
				key: 'system_vip_show',
			}, json => {
				this.system_show = json.value
			})

		},
		// onBackPress(e) { return this.app.onBackPress(e) },

	}
</script>

<style>
	page {
		background-color: #F2F2F2;
	}


	.tui-userinfo-box {
		padding-bottom: 20rpx;
		color: #333;
	}

	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 10rpx 20rpx 10px;
		font-size: 30rpx;
	}

	.tui-pr30 {
		padding-right: 30rpx;
	}

	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}

	.tui-content {
		font-size: 26rpx;
		color: #666;
	}
</style>
