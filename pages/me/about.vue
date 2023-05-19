<template>
	<view class="container">
		<view class="text-center-h mt">
			<image src="../../static/logo_bandu.png" mode="scaleToFill" style="width: 200rpx;height: 200rpx;"></image>
		</view>
		
		<!-- <image src="https://www.thorui.cn/img/wait.gif" mode="widthFix" class="tui-banner"></image>
		<view class="tui-text">---我知道你会来，所以我会等。</view> -->

		<view class="tui-view">
				

			
<!-- 			<view class="tui-cell" @tap="onVer">
				<view class="tui-title">当前版本：
					<text v-if="is_new">已经是最新版本</text>
					<text v-else>有新版可以使用</text>
				</view>
				<view class="tui-link" >当前版本： V{{version_local}}</view>
			</view>		 -->	


			<view class="tui-cell" @tap="onVer">
				<view class="tui-title box">
					<view class="text-color-9">当前版本：</view>
					<!-- <view @tap.stop="onShop()" class="text-color-9" style="color: #19be6b;">去应用商店</view> -->
				</view>
				<view class="tui-link box" style="color:#333;">
					<view>遇见良人 V{{version_local}}</view>
					<view>
						<text v-if="is_new">有新版可以使用，点击升级</text>
						<text v-else>已经是最新版本</text>
					</view>
				</view>
			</view>			
			
			<view v-if="is_new">
				<view class="tui-cell" @tap="onVer" >
					<view class="tui-title box">
						<view class="text-color-9">最新版本：</view>
						<view @tap.stop="onShop()" class="text-color-9" >点击下方直接更新</view>
					</view>
					<view class="tui-link box" >
						<view>遇见良人 V{{version.version}}</view>
						<view>{{version.upddate}}</view>
					</view>
				</view>	
			</view>

			
<!-- 			<view class="tui-cell">
				<view class="tui-title">组件文档地址：</view>
				<view class="tui-link" @tap="getLink('http://www.donarui.com')">http://www.donarui.com</view>
			</view>
			<view class="tui-cell">
				<view class="tui-title">uni-app版本GitHub地址：</view>
				<view class="tui-link" @tap="getLink('https://github.com/dingyong0214/ThorUI-uniapp')">https://github.com/dingyong0214/ThorUI-uniapp</view>
			</view>
			<view class="tui-cell">
				<view class="tui-title">uni-app版本插件市场地址：</view>
				<view class="tui-link" @tap="getLink('https://ext.dcloud.net.cn/plugin?id=556')">https://ext.dcloud.net.cn/plugin?id=556</view>
			</view>
			<view class="tui-cell">
				<view class="tui-title">小程序版本GitHub地址：</view>
				<view class="tui-link" @tap="getLink('https://github.com/dingyong0214/ThorUI')">https://github.com/dingyong0214/ThorUI</view>
			</view>
			<view class="tui-cell">
				<view class="tui-title">小程序版本插件市场地址：</view>
				<view class="tui-link" @tap="getLink('https://ext.dcloud.net.cn/plugin?id=569')">https://ext.dcloud.net.cn/plugin?id=569</view>
			</view> -->
		</view>
		
		
		<view class="bottom" style="padding-bottom: 100rpx;">
			
<!-- 			<view class="tui-cell ml-md mr-md" style="padding-bottom: 200rpx;" >
				<view class="tui-title box">
					<view class="text-color-9">去应用商店查看：</view>
				</view>
				<view class="tui-link text-center-h" >
					<button @tap.stop="onShop()" class="btn btn-success full-width" >去应用商店</button>
				</view>
			</view>	 -->
			
			
			
			<view class="text-center-h" >
				<view>
					<text class="tui-protocol-red" @tap="protocol">《用户协议》</text>
					<text class="tui-protocol-red" @tap="privacy_policy">《隐私政策》</text>
				</view>
			</view>
			
			<view class="text-center-h pt-lg">
				<view>
					<text class="" >星科公司</text>
					<text class="pl" >版权所有</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	const thorui = require("@/components/utils/clipboard.thorui.js")
	export default {
		data() {
			return {
				version_local: {},
				version: {},
				is_new : false,
			}
		},
		methods: {
			getLink: function(link) {
				thorui.getClipboardData(link, (res) => {
					// #ifdef H5
					if (res) {
						this.tui.toast("链接复制成功")
					} else {
						this.tui.toast("链接复制失败")
					}
					// #endif
				})
			},
			onVer:function(){
				
				if(this.app.isAndroid()){
					this.app.post('api/version/last', {} , json=> {
						this.version = json
						if(this.checkVer(json.version, this.version_local)){
							this.app.msg('检测到新版本是否立即升级', '', is => {
								if(is){
									plus.runtime.openURL(this.app.upload + json.file); 
								}
							})
						}else{
							this.app.toast('已经是最新版本')
						}
					})
				}else if(this.app.isIos()){
					this.app.post('api/version_ipa/last', {} , json=> {
						this.version = json
						if(this.checkVer(json.version, this.version_local)){
							this.app.msg('检测到新版本是否立即升级', '', is => {
								if(is){
									plus.runtime.openURL(json.ios_url); 
								}
							})
						}else{
							this.app.toast('已经是最新版本')
						}
						
					})
					
				}

			},
			protocol: function() {
				this.app.go('/pages/login/editor', {tag: 'user_agreement'})
			},
			privacy_policy: function() {
				this.app.go('/pages/login/editor', {tag: 'privacy_policy'})
			},
			
			checkVer:function(newVer, ver){
				let is = this.app.checkVer(newVer, ver)
				if(is){  //是否有新版本
					this.is_new = true
				}else{
					this.is_new = false
				}
				return is
			},
			onShop:function(newVer, ver){
				plus.runtime.openURL('http://m3w.cn/bandu');
			},
		},
		onShow: function() {
			if(this.app.isAndroid()){
				this.app.post('api/version/last', {} , json=> {
					this.version = json
					try{
						this.version_local = plus.runtime.version
						this.checkVer(json.version, this.version_local)
					}catch(e){
						this.version_local = json.version
						this.checkVer(json.version, this.version_local)
					}
					
				})
			}else if(this.app.isIos()){
				this.app.post('api/version_ipa/last', {} , json=> {
					this.version = json
					
					
					try{
						this.version_local = plus.runtime.version
						this.checkVer(json.version, this.version_local)					
					}catch(e){
						this.version_local = json.version
						
						// this.version_local = '1.0.0' //测试使用
						this.checkVer(json.version, this.version_local)
					}
					
				})
				
			}
		},
		
	}
</script>

<style>
	.container {
		padding-bottom: 80rpx;
	}

	.tui-banner {
		width: 100%;
		height: 375rpx
	}

	.tui-text {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		color: #B3B3B3;
		font-size: 26rpx;
		text-align: right;
	}

	.tui-view {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}


	.tui-cell {
		padding: 24rpx 0;
		color: #555;
	}

	.tui-title {
		width: 100%;
		padding: 0 8rpx;
		box-sizing: border-box;
	}

	.tui-link {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0px 3rpx 20rpx rgba(183, 183, 183, 0.1);
		border-radius: 10rpx;
		color: #0066cc;
		margin-top: 20rpx;
		word-break: break-all;
	}
</style>
