<template>
	<view class="container">
		
		<view v-for="(item,index) in list" :key="index">
			<tui-list-cell @click="detail" :last="true" :data-id="item.id" :index="index">
				<view class="tui-msg-box">
					<image :src="item.avatar" class="avatar-wx-item" mode="scaleToFill"></image>
					<view class="tui-msg-item pl">
						<view class="tui-msg-name">{{item.nickname}}</view>
		                
						<view class="tui-msg-content" v-if="item.type=='0'">{{item.text}}</view>
						<view class="tui-msg-content tui-msg-content-type" v-if="item.type=='1'">图片</view>
						<view class="tui-msg-content tui-msg-content-type" v-if="item.type=='2'">语音</view>
		                <view class="tui-msg-content tui-msg-content-type" v-if="item.type=='3'">短视频</view>
		                <view class="tui-msg-content tui-msg-content-type" v-if="item.type=='4'">发起语音通话</view>
		                <view class="tui-msg-content tui-msg-content-type" v-if="item.type=='5'">发起视频通话</view>
		                
					</view>
				</view>
				<view class="tui-msg-right" :class="[item.level==3?'tui-right-dot':'']">
					<view class="tui-msg-time">{{item.chat_credate}}</view>
					<tui-badge type="danger"   v-if="item.new_count>0">{{item.new_count}}</tui-badge>
				</view>
			
			</tui-list-cell>
		</view>
		
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiBadge from "@/components/badge/badge"
	import tuiListCell from "@/components/list-cell/list-cell"
	
	export default {
		components: {
			tuiIcon,
			tuiBadge,
			tuiListCell
		},
		data() {
			return {
				list: [],
			}
		},
		methods: {

			detail: function(e) {
				let user_id = this.list[e.index].id
				
				this.app.post('api/server/server_add', {
					server_id: user_id
				}, json => {
				    this.app.go('/pages/message/chat', {
				    	user_id: user_id
				    })
				})		
				
			},
		},
		onLoad() {
			
		},
		onShow() {
			this.app.post('api/server/server_list', {}, json => {
			    this.list = json
			})		
		},
	}
</script>

<style>
	page {
		background: #f5f6fa;
	}

	.container {
		padding-bottom: 100upx
	}

	/*tabbar*/

	.tui-tabbar {
		width: 100%;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 99999;
		background: #fff;
		height: 100upx;
		left: 0;
		bottom: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-tabbar::before {
		content: '';
		width: 100%;
		border-top: 1upx solid #d2d2d2;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-tabbar-item {
		flex: 1;
		width: 25%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		font-size: 24upx;
		color: #666;
		height: 80upx;
	}

	.tui-ptop-4 {
		padding-top: 4upx;
	}

	.tui-scale {
		font-weight: bold;
		transform: scale(0.8);
		transform-origin: center 100%;
		line-height: 30upx;
	}

	.tui-item-active {
		color: #00c0fb !important;
	}

	/*tabbar*/

	/*searchbox*/

	.tui-searchbox {
		width: 100%;
		height: 100upx;
		padding: 0 30upx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.tui-search-input {
		width: 100%;
		height: 72upx;
		background: #f5f6fa;
		border-radius: 36upx;
		font-size: 30upx;
		color: #A8ABB8;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-search-text {
		padding-left: 16upx;
	}

	/*searchbox*/


	.tui-msg-box {
		display: flex;
		align-items: center;
	}

	.tui-msg-pic {
		width: 100upx;
		height: 100upx;
		/* border-radius: 50%; */
		display: block;
		margin-right: 24upx;
		
		border-radius: 10%;
	}

	.tui-msg-item {
		max-width: 500upx;
		min-height: 80upx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 34upx;
		line-height: 1;
		color: #262b3a;
	}

	.tui-msg-content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 28upx;
		line-height: 1;
		color: #9397a4;
	}
    
    .tui-msg-content-type {
    	
    	color: #5CD492;
    }

	.tui-msg-right {
		max-width: 240rpx;
		height: 88upx;
		margin-left: auto;
		text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.tui-msg-right.tui-right-dot {
		height: 76upx;
		padding-bottom: 10upx;

	}

	.tui-msg-time {
		width: 100%;
		font-size: 24upx;
		line-height: 24upx;
		color: #9397a4;
	}

	.tui-badge {
		width: auto
	}
</style>

