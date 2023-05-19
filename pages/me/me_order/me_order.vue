<template>
	<view class="container">

		<tui-tabs :tabs="tabs" :isFixed="scrollTop>=0" :currentTab="currentTab" selectedColor="#4dabeb" sliderBgColor="#4dabeb"
		 @change="change"></tui-tabs>
		<!--选项卡逻辑自己实现即可，此处未做处理-->


		<view :class="{'tui-order-list':scrollTop>=0}">

			<view class="mm pp" :class="[order.is_see == '0'?'red-order-bg':'']" v-for="(order, order_index) in page.data" :key="order_index">
				<view :hover="false" :lineLeft="false" >
					<view class="tui-goods-title ">
						<view>订单号：<text selectable="true">{{order.order_no}}</text></view>
						<view class="tui-order-status">
							{{getStatusText(order.state)}}
						</view>
					</view>
				</view>

				<view padding="0" @tap.stop="detail" :data-index='order_index'>
					<view class="tui-goods-item">
						<image :src="order.you.avatar" class="goods-img-avatar"></image>
						<view class="tui-goods-center ">
							<view class="tui-goods-name">{{order.you.phone}}</view>
							<view class="goods-img-avatar-text">{{order.you.company_name}} {{order.you.company_server_name}}</view>
						</view>
						
						<view class="tui-price-right">
							<view>￥{{order.price}}</view>
							<view>x{{order.product_count}}</view>
						</view>
					</view>
				</view>
				<view :hover="false" :last="true">
					<view class="tui-goods-price">
						<view>共{{order.product_count}}件商品 合计：</view>
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{order.sum_price}}</view>
					</view>
				</view>
				<view class="rows-wrap-reverse mt">
					<view class="tui-btn-ml" @tap="onProductDetail" :data-sale_id='order.sale_id'>
						<tui-button type="danger" :plain="true" width="188rpx" height="56rpx" :size="26" shape="circle">进入商家主页</tui-button>
					</view>
					<view class="tui-btn-ml" v-if="order.state=='3'" :data-index="order_index" @tap="setOrderState">
						<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">完成订单</tui-button>
					</view>
				</view>
			</view>

			<!-- <view class="tui-order-item">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<view>订单号：T201910000</view>
						<view class="tui-order-status">已取消</view>
					</view>
				</tui-list-cell>
				<block v-for="(item,index) in 1" :key="index">
					<tui-list-cell padding="0" @click="detail">
						<view class="tui-goods-item">
							<image :src="`/static/images/mall/product/${index+3}.jpg`" class="tui-goods-img"></image>
							<view class="tui-goods-center">
								<view class="tui-goods-name">欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）</view>
								<view class="tui-goods-attr">黑色，50ml</view>
							</view>
							<view class="tui-price-right">
								<view>￥298.00</view>
								<view>x2</view>
							</view>
						</view>
					</tui-list-cell>
				</block>
				<tui-list-cell :hover="false" :last="true">
					<view class="tui-goods-price">
						<view>共4件商品 合计：</view>
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">596</view>
						<view class="tui-size-24">.00</view>
					</view>
				</tui-list-cell>
				<view class="tui-order-btn">
					<view class="tui-btn-ml">
						<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">删除订单</tui-button>
					</view>
					<view class="tui-btn-ml">
						<tui-button type="danger" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">再次购买</tui-button>
					</view>
				</view>
			</view> -->

		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="page.isLoad" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="page.isMore"></tui-nomore>
		<!--加载loadding-->

	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import tuiButton from "@/components/extend/button/button"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiSticky from "@/components/sticky/sticky"
	export default {
		components: {
			tuiTabs,
			tuiButton,
			tuiLoadmore,
			tuiNomore,
			tuiListCell,
			tuiSticky
		},
		data() {
			return {
				app: this.app,
				page: null,

				tabs: [{
					name: "全部"
				}, {
					name: "待付款"
				}, {
					name: "待发货"
				}, {
					name: "已发货"
				}, {
					name: "已完成"
				}],
				currentTab: 0,
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				scrollTop: 0
			}
		},
		computed: {
			getStatusText() {
				return function(state) {
					return this.app.getStatusText(state)
				}
			},
		},
		methods: {
			onReload() {
				let state = this.currentTab
				if (state == 0) {
					state = ''
				}
				this.page = new this.app.page('api/order/me_order', {
					state: state
				})
				this.page.next()
			},
			change(e) {
				this.currentTab = e.index
				this.onReload()
			},
			detail(e) {
                let index = this.app.ed(e).index
				let item = this.page.data[index]

				this.app.go('/pages/me/me_order/me_order_detail', {
					order_no: item.order_no
				})
			},
			onProductDetail(e) {
				let sale_id = this.app.ed(e).sale_id
				this.app.go('/pages/index/detail/detail', {
					user_id: sale_id
				})
			},
			setOrderState(e) {
				let index = this.app.ed(e).index
				let item = this.page.data[index]

				//`state`'{订单状态}[0:默认状态,1:未支付,2:已支付,3:已发货,4:已完成,5:退款,6:退款完成,7:退款失败,8:错误的订单,9:强制完结]',
				this.app.msgSys('完成订单后，订单款项会立即打入商家账号', is => {
					if (is) {
						this.app.post('api/order/set_order_state', {
							order_no: item.order_no,
							state: '4',
						}, json => {
							if (json.code == '0') {
								this.app.toast('订单完成')
								this.onReload()
							} else {
								this.app.toast(json.data)
							}
						})
					}
				})

			},
			onRef(){
				this.page.refresh(() => {
					this.app.toast("刷新")
				})
			},
		},
		onLoad() {

		},
		onShow() {
			this.onReload()
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
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-order-list {
		margin-top: 80rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-order-status {
		color: #888;
		font-size: 26rpx;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 10rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}

	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
		font-weight: 500;
	}

	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 10rpx 30rpx 20rpx;
		box-sizing: border-box;
	}

	.tui-btn-ml {
		margin-left: 20rpx;
	}
</style>
