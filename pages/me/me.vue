<template>
	<view>
		<view class="box ml-md mr-md text-main " @tap="goSetting">
			<view class="rows ml">
				<view @tap.stop="">
					<image v-if="me.avatar" :src="me.avatar" class="avatar-youqu avatar-youqu-slove" @tap="previewImage" :data-src="me.avatar"></image>
					<image v-else src="/static/images/icon_avatar.png" class="avatar-youqu avatar-youqu-slove"></image>
				</view>
				<view class="ml pt-sm pb-sm text-center-v" >
					<view>
						<view  class="rows text-df text-bold text-center-v ">
							
							<view class="" v-if="me.nickname">
								{{me.nickname}}
							</view>
							<view v-else>未设置昵称</view>
							
							<view class="pl" v-if="me.is_plus == 1" @tap.stop="app.go('/pages/plus/plus_coin')">
								<image src="/static/images/icon_vip.png" mode="heightFix" class="icon-plus"></image>
							</view>
						</view>
	<!-- 					<view class="pt text-18 rows">
							<view class="">
								{{me.address_text}}
							</view>
							<view class="">
								ID: ({{me.id}}) 
							</view>
							<view class="pl">
								用户: {{me.phone}}
							</view>
						</view> -->
						
						
						<view class="text-sm  text-color-6 pt">
							<!-- <text>{{me.address_text}}</text> -->
							<!-- <text>{{me.province}} {{me.city}} {{me.county}}</text> -->
							<!-- <text class="pl-xs pr-xs">|</text> -->
							<text>{{me.age}}岁</text>
							<text class="pl-xs pr-xs">|</text>
							<text>{{me.height}}cm</text>
							<text class="pl-xs pr-xs">|</text>
							<text>{{me.job}}</text>
						</view>
						
						 <view class="pt-sm text-xs text-color-6" >会员到期时间: 
							<text class="pl-sm" v-if="me.plus_time_end == '0000-00-00 00:00:00'">未开通</text>
							<text class="pl-sm" v-else>{{me.plus_time_end}}</text>
						 </view>
						
						<!-- <view class="pt text-18">区块码: {{me.openid}}</view> -->
					</view>
				</view>
			</view>
			<view class="text-center-v">
				<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
			</view>
		</view>
		
		<view style="height: 50rpx;"></view>
		
		<view class="box-wrap-space-around">
			<view class="" @tap="app.go('/pages/wallet/wallet')">
				<view class="text-center-h">
					<image class="icon-me-box" src="/static/images/icon_me_qianbao.png" mode=""></image>
				</view>
				<view class="text-center-h text-color-6 text-sm pt">钱包</view>
			</view>
			
			<view class="" @tap="go_follow_me">
				<view class="text-center-h">
					<image class="text-center-h icon-me-box" src="/static/images/icon_me_guanzhu_me.png" mode=""></image>
				</view>
				<view class="text-center-h text-color-6 text-sm pt">喜欢我的</view>
			</view>
			
			<view class="" @tap="go_me_follow">
				<view class="text-center-h">
					<image class="text-center-h icon-me-box" src="/static/images/icon_me_me_guanzhu.png" mode=""></image>
				</view>
				<view class="text-center-h text-color-6 text-sm pt">我喜欢的</view>
			</view>
		</view>
		
		<view style="height: 50rpx;"></view>
		
		
		<view v-if="me.is_plus != 1" class="" style="padding: 50rpx 20rpx; background-color: #EEEEEE;" @tap="app.go('/pages/plus/plus_coin')">
			<image src="/static/images/icon_vip_push.png" mode="widthFix" style="width: 100%;"></image>
		</view>
		
		
		<view class="line-step "></view>
		
		<view class=" pb">
			<view class="box menu-box pt" @tap="on_company_imgs">
				<view class="rows pb">
					<view class="text-center-v text-df text-color-3">我的相册</view>
				</view>
				<view class="text-center-v">
					<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
				</view>
			</view>
			
			<view class="pt-sm ml-md mr-md" v-if="!me.company_imgs" @tap="on_company_imgs">
				<image src="/static/images/icon_img_upload.png" mode="scaleToFill" style="width: 120rpx;height: 120rpx;"></image>
			</view>
			
			<list-img class="pt-sm ml-md mr-md" :imgs="me.company_imgs" :prefix="app.upload">
			</list-img>
			
<!-- 			<view class="box menu-box pt" @tap="on_product_imgs">
				<view class="rows">
					<view class="text-center-v text-sm">个人展示</view>
				</view>
				<view class="text-center-v">
					<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
				</view>
			</view>
			<list-img class="pt-sm ml-md mr-md" :imgs="me.product_imgs" :prefix="app.upload">
			</list-img> -->
		</view>
		
		
		
		
		<view class="text-bold">
			
			<view class="line-step "></view>
			<view class="box menu-box" @tap="onServer">
				<view class="rows">
					<image src="/static/images/icon_service.png" class="icon-menu"></image>
					<view class="text-center-v">联系客服</view>
				</view>
				<view class="text-center-v">
					<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
				</view>
			</view>
			
			<view class="box menu-box" @tap="onAbout">
				<view class="rows">
					<image src="/static/images/icon_about_me.png" class="icon-menu"></image>
					<view class="text-center-v">关于我们</view>
				</view>
				<view class="text-center-v">
					<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
				</view>
			</view>
			
			<view class="line-step "></view>
			
			
			<view class="box menu-box" @tap="onRestPassword">
				<view class="rows">
					<image src="/static/images/icon_reset_password.png" class="icon-menu"></image>
					<view class="text-center-v">密码重置</view>
				</view>
				<view class="text-center-v">
					<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
				</view>
			</view>
			
			
	<!-- 		<view class="box menu-box" @tap="goSetting">
				<view class="rows">
					<image src="/static/images/icon_edit.png" class="icon-menu"></image>
					<view class="text-center-v">我的资料</view>
				</view>
				<view class="text-center-v">
					<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
				</view>
			</view> -->

<!-- 			<view class="box menu-box" @tap="go_me_follow">
				<view class="rows">
					<image src="/static/images/icon_me_like.png" class="icon-menu"></image>
					<view class="text-center-v">我关注了谁</view>
				</view>
				<view class="text-center-v">
					<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
				</view>
			</view>
			<view class="box menu-box" @tap="go_follow_me">
				<view class="rows">
					<image src="/static/images/icon_like_me.png" class="icon-menu"></image>
					<view class="text-center-v">谁关注了我</view>
				</view>
				<view class="text-center-v">
					<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
				</view>
			</view> -->
			
			
			
			<view class="line-step "></view>
			<view class="box menu-box" @tap="onLogout">
				<view class="rows">
					<image src="/static/images/icon_logout.png" class="icon-menu"></image>
					<view class="text-center-v">退出登录</view>
				</view>
				<view class="text-center-v">
					<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
				</view>
			</view>
			<view class="line-step "></view>
			
<!-- 
			<view class="line-step "></view>
			<view class="box menu-box" @tap="goSettingSetting">
				<view class="rows">
					<image src="/static/images/icon_setting.png" class="icon-menu"></image>
					<view class="text-center-v">设置</view>
				</view>
				<view class="text-center-v">
					<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
				</view>
			</view>
			<view class="line-step "></view> -->
		</view>



		<view style="height: 100rpx;"></view>
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
		data() {
			return {
				app: this.app,
				me: {},
				
				login_config: {},
			}
		},
		methods: {
			reload: function(invoke){
				this.app.post('api/user/info', {}, json => {
					this.me = json
					if(invoke){
						invoke()
					}
				})
			},
			goProfit: function() {
				this.app.go('/pages/me/profit')
			},
			goPaperLog: function() {
				this.app.go('/pages/me/paper_log')
			},
			goSetting: function() {
				// this.app.go('/pages/me/setting')
				this.app.go('/pages/me/user_info')
			},
			goTeam: function() {
				this.app.go('/pages/me/team')
			},
			goQrcode: function() {
				this.app.go('/pages/me/qrcode')
			},
			goProfitMore: function() {
				this.app.go('/pages/me/profit_more')
			},
			
			previewImage(e){
				this.app.previewImage(e)
			},
			goSettingSetting: function() {
				// this.app.go('/pages/me/setting')
				this.app.go('/pages/me/setting/setting')
			},
			
			onRestPassword(){
				if(this.login_config.is_sms == '1'){
					this.app.go('/pages/login/reset_password')
				}else{
					this.app.go('/pages/login/reset_password_by_old')
				}
			},
			onAbout(){
				// this.app.go('/pages/me/about')
				
				this.app.go('/pages/login/editor', {tag: 'about'})
				
				
				
			},
			onServer(){
				// this.app.go('/pages/me/server')
				this.app.go('/pages/me/server/server_list')
			},
			
			on_company_imgs(){
				this.app.go('/pages/me/user_img')
			},
			on_product_imgs(){
				this.app.go('/pages/me/user_product_img')
			},
			go_me_follow () {this.app.go('/pages/friend/me_follow')},
			go_follow_me () {this.app.go('/pages/friend/follow_me')},
			onLogout() {
				this.app.msgSys('退出登录！', is => {
					if (is) {
						this.app.go('/pages/login/logout')
					}
				})
			},
		},
		onLoad() {
			this.app.postHtml('api/login/login_config', {
			}, json => {
				let {code, data} = json
			    if(code == '0'){
			        this.login_config = data
			    }else{
			        this.app.toast(data)
			    }
			})
		},
		onShow() {
			this.reload()
		},
		onShareAppMessage() {
			return this.app.onShareAppMessage()
		},
		onShareTimeline() {
			return this.app.onShareTimeline()
		},
		onPullDownRefresh() {
			this.reload(() => {
				this.app.stopPullDownRefresh()
				this.app.toast("刷新成功")
			})
		},
	}
</script>

<style>

</style>
