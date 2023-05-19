<template>
	<view class="tui-userinfo-box">

		<tui-list-cell padding="0" :arrow="false">
			<view class="tui-list-cell">
				<view>手机号</view>
				<input class="tui-content" :value="user.phone" @input="onInput" placeholder="请输入手机号"></input>
			</view>
		</tui-list-cell>
		
		<view class='pt-lg'></view>
		<view class="rows pt-lg ml mr">
			<button class="btn-main btn-block" @tap="onSave">保存</button>
		</view>
		
	</view>
</template>

<script>
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiListCell
		},
		data() {
			return {
				user: {},
			}
		},
		methods: {
			onInput(e){
				this.user.phone = this.app.ev(e)
			},
			onSave(){
				this.app.post('api/user/save', {...this.user}, json => {
					this.app.toast('保存成功')
				})
			},
		},
		onLoad() {
			this.app.post('api/user/info', {}, json => {
				this.user = json
			})
		}
	}
</script>

<style>
	.tui-userinfo-box {
		padding-bottom: 20rpx;
		color: #333;
	}

	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 60rpx 24rpx 30rpx;
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
