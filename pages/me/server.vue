<template>
	<view class="container">
		<view class="text-center-h">
			<image src="../../static/logo_bandu.png" mode="scaleToFill" style="width: 200rpx;height: 200rpx;"></image>
		</view>
		
		<!-- <image src="https://www.thorui.cn/img/wait.gif" mode="widthFix" class="tui-banner"></image>
		<view class="tui-text">---我知道你会来，所以我会等。</view> -->

		<view class="tui-view">
				

			
			<view class="tui-cell">
				<view class="tui-title">客服电话：</view>
				<view class="tui-link" >13688886666</view>
			</view>
			
			<view class="tui-cell">
				<view class="tui-title">客服微信：</view>
				<view class="tui-link" >13688886666</view>
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

	</view>
</template>

<script>
	const thorui = require("@/components/utils/clipboard.thorui.js")
	export default {
		data() {
			return {
				list: [],
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
			}
		},
		onLoad() {
			this.app.post('api/user/info', {}, json => {
			    this.list = json
			})		
		}
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
