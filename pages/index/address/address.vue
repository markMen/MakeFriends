<template>
	<view class="tui-safe-area">
		<view class="tui-address">
			<block v-for="(item,index) in page.data" :key="index">
				<tui-list-cell padding="0">
					<view class="tui-address-flex" @tap.stop="onAddressItem" :data-id="item.id" :data-index="index">
						<view class="tui-address-left">
							<view class="tui-address-main">
								<view class="tui-address-name tui-ellipsis">{{item.user_name}}</view>
								<view class="tui-address-tel">{{item.tel_number}}</view>
							</view>
							<view class="tui-address-detail">
								<view class="tui-address-label" v-if="item.check=='1'">默认</view>
								<view class="tui-address-label" v-if="item.tag">{{item.tag}}</view>
								<text>{{item.detail_info}}</text>
							</view>
						</view>
						<view class="tui-address-imgbox pr">
							<image @tap.stop="edit_address" :data-id="item.id" class="tui-address-img" src="/static/images/my/mine_icon_bianji_3x.png" />
						</view>
					</view>
				</tui-list-cell>
			</block>
		</view>
		<!-- 新增地址 -->
		<view class="tui-address-new">
			<tui-button type="danger" height="88rpx" @click="addAddr">+ 新增收货地址</tui-button>
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="page.isLoad" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="page.isMore"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
	import tuiButton from "@/components/extend/button/button"
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"


	export default {
		components: {
			tuiButton,
			tuiListCell,
			tuiLoadmore,
			tuiNomore
		},
		data() {
			return {
				app: this.app,
				page: null,
				addressList: []
			}
		},
		onLoad: function(options) {
			// this.page = new this.app.page('api/address/me_address', {})
			// this.page.next()
		},
		onShow: function() {
			//this.page.reload()
			this.page = new this.app.page('api/address/me_address', {})
			this.page.next()
		},
		methods: {
			addAddr() {
                this.app.go("./address_add")
			},
			edit_address(e) {
				let id = this.app.ed(e).id
				this.app.go("./address_edit", {
					address_id: id
				})
			},
			onAddressItem(e) {
				let id = this.app.ed(e).id
				let index = this.app.ed(e).index
				
				this.app.post('api/address/select', {
					id: id
				}, json => {
					this.app.back()
				})
				
				// let item = this.page.data[index]				
				// let pages = this.app.getPages()
				// let page = pages[pages.length - 1]
				// page.address = item
				// this.app.back()

			}

		},
		onPullDownRefresh() {
			this.page.reload(() => {
				uni.stopPullDownRefresh();
				this.app.toast("刷新成功")
			})
		},
		onReachBottom() {
			this.page.next()
		},
	}
</script>

<style>
	.tui-address {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 160rpx;
	}

	.tui-address-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-address-main {
		width: 600rpx;
		height: 70rpx;
		display: flex;
		font-size: 30rpx;
		line-height: 86rpx;
		padding-left: 30rpx;
	}

	.tui-address-name {
		width: 120rpx;
		height: 60rpx;
	}

	.tui-address-tel {
		margin-left: 10rpx;
	}

	.tui-address-detail {
		font-size: 24rpx;
		word-break: break-all;
		padding-bottom: 25rpx;
		padding-left: 25rpx;
		padding-right: 120rpx;
	}

	.tui-address-label {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #e41f19;
		border-radius: 6rpx;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: center center;
		margin-right: 6rpx;
	}

	.tui-address-imgbox {
		width: 80rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 10rpx;
	}

	.tui-address-img {
		width: 72rpx;
		height: 72rpx;
	}

	.tui-address-new {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 20rpx 25rpx 30rpx;
		box-sizing: border-box;
		background: #fafafa;
	}

	.tui-safe-area {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
