<template>
	<view class="tui-userinfo-box">

		<tui-list-cell padding="0" :arrow="false">
			<view class="tui-list-cell">
				<view class="">群名称</view>
				<input class="tui-content" v-model="chat_group.nickname" placeholder="请输入群名称"></input>
			</view>
		</tui-list-cell>
		
		
		<view class='pt-lg'></view>
		<view class="rows pt-lg ml mr">
			<button class="btn-primary btn-block" @tap="onSave">保存</button>
		</view>
		
	</view>
</template>

<script>
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiListCell,
		},
		data() {
			return {
				user: {},
				chat_group: {},
			}
		},
		methods: {
			
			onSave(){
				this.app.post('api/chat_group/edit',this.chat_group, json => {
					
					const{code, data} = json
					if(code == 0){
						this.app.toast('保存成功')
						this.app.getPageBack().reLoad()
						this.app.backTime(1000)
					}else{
						this.app.toastNone(data)
					}
				})
			},
		},
		onLoad(options) {
			
			this.app.post('api/chat_group/find', {
				id: options.group_id
			}, json => {
				const{code, data} = json
				if(code == 0){
					this.chat_group = data
					this.app.setTitle(data.nickname)
				}
			
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
		width: 500rpx;
		font-size: 26rpx;
		color: #666;
	}
</style>
