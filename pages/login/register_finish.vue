<template>
	<view>

<!-- 		<view class="text-center-h pt-lg">
			<view class="rows">
				<tui-icon name="circle-fill"  ></tui-icon>
			</view>
		</view> -->
		
		
		<view class="text-center-v text-lg pl-md pt-lg">恭喜您完成注册</view>
		<view class="text-center-v pt pl-md " style="color: #7F7F7F;">极速找到你的爱</view>
		
		<view class="text-center-v" style="padding: 100rpx 0pt 80rpx 30rpx;">请问您的性别是？</view>
		
		<view class="pl-md ml-md rows-wrap">
			<view class="gender-box-item" @tap="onGender(1)">
				<image v-if="me.gender == 1" src="/static/images/icon_boy_ed.png" mode="widthFix" class="gender-img"></image>
				<image v-else src="/static/images/icon_boy_df.png" mode="widthFix" class="gender-img"></image>
			</view>
			
			<view class="gender-box-item" @tap="onGender(2)">
				<image v-if="me.gender == 2" src="/static/images/icon_girl_ed.png" mode="widthFix" class="gender-img"></image>
				<image v-else src="/static/images/icon_girl_df.png" mode="widthFix" class="gender-img"></image>
			</view>
			
		</view>
			
		<!-- <view class="text-center-h pt-lg">
			<view>
				使用时间 {{me_user.credate}} 至 {{me_user.end_date}}
			</view>
		</view> -->

		<!-- <view class="text-center-h pt-lg">
			<view>
				欢迎使用！
			</view>
		</view> -->
		
		<view class="" style="padding: 100rpx 0pt 0rpx 0rpx;">
		</view>
		
		<view class="rows pt-lg pl pr ">
			<button class="btn-main btn-block" @tap="onLogin">立即进入</button>
		</view>

	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	
	
	export default {
		components:{
			tuiIcon,
		},
		data() {
			return {
				me: {}
			}
		},
		methods: {
			onLogin(){
				
				this.app.postHtml('api/user/me_info_edit', {
					...this.me,
				}, json => {
					let {code, data} = json
					if(code == 0){
						this.app.goc('/pages/login/register_finish_info')
					}else{
						this.app.toastNone(data)
					}
				})
				
			},
			onGender(g){
				this.me.gender = g
				this.$forceUpdate()
			},
		},
		onLoad(options) {
			if(options.openid){
				this.app.postHtml('api/user/me_info', {
					openid:options.openid,
				}, json => {
					let {code, data} = json
					if(code == 0){
						this.me = data
					}else{
						this.app.toastNone(data)
					}
				})
			}else{
				this.app.post('api/user/me_info', {
				}, json => {
					let {code, data} = json
					if(code == 0){
						this.me = data
					}else{
						this.app.toastNone(data)
					}
				})
			}
			
		},
	}
</script>

<style>

.gender-img{
	width: 150rpx;
	height: auto;
}

.gender-box-item{
	padding: 0 50rpx 0 0rpx;
}
</style>
