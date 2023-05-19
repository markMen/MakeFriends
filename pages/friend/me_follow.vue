<template>
	<view class="container">
		<!--tabbar-->
		<!-- <view class="tui-tabbar">
			<block v-for="(item,index) in tabbar" :key="index">
				<view class="tui-tabbar-item" :class="[current==index?'tui-item-active':'']" :data-index="index" @tap="tabbarSwitch">
					<tui-icon :name="current==index?(item.icon+'-fill'):item.icon" :color="current==index?'#00C0FB':'#666'" :size="item.size"
					 :class="[index==0?'tui-ptop-4':'']"></tui-icon>
					<view class="tui-scale">{{item.text}}</view>
				</view>
			</block>
		</view> -->
		<!--tabbar-->
		<!--searchbox-->
<!-- 		<view class="tui-searchbox">
			<view class="tui-search-input" @tap="search">
				<icon type="search" size='15' color='#999'></icon>
				<input class="tui-search-text"></input>
			</view>
		</view> -->
		<!--searchbox-->       
       
<!--       <view class="tui-searchbox">
           <view @tap="onSearch" v-if="search_text != null && search_text != ''">
               <tui-icon name="search" :size='16' color='#333'></tui-icon>
           </view>
           <view class="tui-search-input" @tap="search">
               <input class="tui-search-text text-center" placeholder="请输入搜索内容"  
			   v-model.trim="search_text"></input>
           </view>
           <view @tap="cleanSearchText" v-show="search_text">
               <tui-icon name="close-fill" :size='16' color='#bcbcbc'></tui-icon>
           </view>
           <view class="tui-cancle" @tap="onSearch" v-if="search_text != null && search_text != ''">搜索</view>
       </view> -->   
				 
				 <view class="top search-top-up">
				 	<vive-search type="left" @click="onSearch"></vive-search>
				 </view>
				 <view class="search-top-down"></view>
				 

		<block v-for="(item,index) in msgList" :key="index">			
			<tui-list-cell @click="detail" :last="true" :data-id="item.id" :index="index">
				<view class="tui-msg-box">
					<image :src="item.avatar" class="avatar-wx-item" mode="scaleToFill"></image>
					<view class="tui-msg-item pl">
						<view class="tui-msg-name">{{item.nickname}}</view>
                        
	<!-- 					<view class="tui-msg-content" v-if="item.type=='0'">{{item.text}}</view>
						<view class="tui-msg-content tui-msg-content-type" v-if="item.type=='1'">图片</view>
						<view class="tui-msg-content tui-msg-content-type" v-if="item.type=='2'">语音</view>
                        <view class="tui-msg-content tui-msg-content-type" v-if="item.type=='3'">短视频</view>
                        <view class="tui-msg-content tui-msg-content-type" v-if="item.type=='4'">发起语音通话</view>
                        <view class="tui-msg-content tui-msg-content-type" v-if="item.type=='5'">发起视频通话</view> -->
                        
					</view>
				</view>
				<view class="tui-msg-right" :class="[item.level==3?'tui-right-dot':'']">
					<view class="tui-msg-time">{{item.time}}</view>
					<tui-badge type="danger"   v-if="item.new_count>0">{{item.new_count}}</tui-badge>
				</view>
	
			</tui-list-cell>
		</block>
		<view class="tui-safearea-bottom"></view>
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
				app:this.app,
				current: 0,
				tabbar: [{
					icon: "community",
					text: "消息",
					size: 24
				}, {
					icon: "people",
					text: "联系人",
					size: 24
				}, {
					icon: "explore",
					text: "发现",
					size: 24
				}],
                msgList: [],      
                search_text:'',
				/* msgList: [{
					nickname: "波动星球",
					pic: "avatar_1",
					msg: "兰家双臂初长成！",
					msgNum: 2,
					time: "10:22",
					level: 1
				}], */
			}
		},
		onLoad(){
			this.app.setTitle('我喜欢的')
		},
        onShow() {
			this.app.checkUser()
			
            //板块
            // this.app.post('api/chat_follow/me_follow', {}, json => {
            // 	this.msgList = json
            // })
			this.onSearch()
        },
		methods: {
            cleanSearchText() {
                this.search_text = ''
                this.onSearch()
            },
			tabbarSwitch: function(e) {
				let index = e.currentTarget.dataset.index;
				this.current = index;
				if (index != 0) {
					if (index == 1) {
						uni.navigateTo({
							url: '../friendsList/friendsList'
						})
					} else {
						this.tui.toast("功能开发中~")
					}
				}
			},
			search: function() {
				uni.navigateTo({
					url: '../news-search/news-search'
				})
			},
			detail: function(e) {
				let item = this.msgList[e.index]
				// this.app.go( './chat', {user_id: item.user_id})
				this.app.go('/pages/index/detail/detail',{user_id: item.id})
			},
            onSearch(text = ''){
				this.search_text = text
                //板块
                this.app.post('api/chat_follow/me_follow', {
                    search_text: this.search_text
                }, json => {
                	this.msgList = json
                })
            },
		},
		onPullDownRefresh: function() {
			uni.stopPullDownRefresh();
		}
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
		max-width: 120upx;
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
