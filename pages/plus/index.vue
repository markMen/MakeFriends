<template>
	<view>

		<view v-if="false">

			<view class="pp">开通会员服务（开通12个月及以上享8.5折优惠，年费会员）</view>

			<view class="rows pl pr">
				<view class="plus-box text-center-hv cols" :class="[month=='1'?'plus-box-check':'']" @tap="onMonth" data-month='1'>
					<view class="text-md">1个月</view>
					<view class="text-sm">{{monthToPrice(1)}}元(1个月)</view>
				</view>

				<view class="plus-box text-center-hv cols" :class="[month=='6'?'plus-box-check':'']" @tap="onMonth" data-month='6'>
					<view class="text-md">6个月</view>
					<view class="text-sm">{{monthToPrice(6)}}元(6个月)</view>
				</view>
			</view>

			<view class="rows pl pr">
				<view class="plus-box text-center-hv cols" :class="[month=='12'?'plus-box-check':'']" @tap="onMonth" data-month='12'>
					<view class="text-md">年费会员</view>
					<view class="text-sm">{{monthToPrice(12)}}元(12个月)</view>
				</view>

				<view class="plus-box text-center-hv cols" :class="[month != ''?'plus-box-check-text':'']">

					<view class="rows text-center-hv">
						<view style="margin: 25rpx;">
							<input type="number" class="text-md" v-model="month" @input="onInputMonth" style="text-align: center; width: 100rpx; border: 4rpx solid #ffaa00; padding: 5rpx 15rpx;">
						</view>
						<view>个月</view>
					</view>

					<view class="text-sm">共计{{monthToPrice(month)}}元({{month}}个月)</view>
				</view>

			</view>




			<view class="rows pt-lg mt-lg">
				<button class="btn-primary" style="width: 300rpx;" @tap="btnAliPay">支付宝支付</button>
				<button class="btn-success" style="width: 300rpx;" @tap="btnWxPay">微信支付</button>
			</view>


			<view style="height: 200rpx;"></view>

			<view class="bottom bg-white-bg rows">
				<button class=" btn-warning full-width" @tap="onLogout">更换账号</button>
			</view>

		</view>
		<view v-else class=" mt-lg" v-if="false">
			<view class="text-center-h">账号ID不支持修改，这是您的唯一编号。</view>
			<view class="text-center-h mt-lg">如果编辑账号信息请进入我的=>设置进行编辑</view>
		</view>





	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: {},
				month: '',
				input_month: '',
				system: '',
				system_show: '0',
			}
		},
		computed: {
			monthToPrice: function() {
				return function(month) {
					let price = month * 5;
					if (price >= 12 * 5) {
						price = price * 0.85;
					}
					return price
				}
			},
		},
		methods: {
			reLoad() {
				// this.app.post('api/user/info', {}, json => {
				//     this.user = json
				// })
				this.app.postHtml('api/config/config', {
					key: 'system_vip_show',
				}, json => {
					this.system_show = json.value
				})

				let system = uni.getSystemInfoSync().platform
				this.system = system
				// switch(system){
				//     case 'android':				
				//        console.log('运行Android上')		
				//        break;				
				//     case 'ios':				
				//        console.log('运行iOS上')				
				//        break;				
				//     default:				
				//        console.log('运行在开发者工具上')				
				//        break;				
				// }

			},
			onInputMonth(e) {
				// this.month = this.app.ev(e)
				let month = parseInt(this.app.ev(e))
				this.$nextTick(() => {
					this.month = month
				})
			},
			btnWxPay() {
				let that = this
				that.payPre(() => {
					that.app.wxPay({
						'total': that.order.price,
						'subject': '自定义订单',
						'out_trade_no': that.order.order_no,
					}, res => {
						that.payFinish()
					})
				})
			},
			btnAliPay() {
				let that = this
				that.payPre(() => {
					that.app.aliPay({
						'total': that.order.price,
						'subject': '自定义订单',
						'out_trade_no': that.order.order_no,
					}, res => {
						that.payFinish()
					})
				})
			},
			payPre(invoke) {
				// if (!this.address.user_name) {
				// 	this.app.toast('请选择收获地址')
				// 	return
				// }
				if (!this.month) {
					this.app.toast('请选择输入月份')
					return
				}
				this.app.post('api/plus_order/cre_order_month?XDEBUG_SESSION_START=11841', {
					month: this.month,
				}, json => {
					this.order = json
					if (invoke) {
						invoke()
					}
				})
			},
			payFinish() {
				this.app.post('api/plus_order/order_pay_finish?XDEBUG_SESSION_START=15934', {
					order_no: this.order.order_no, //订单号
				}, json => {
					this.app.toast('支付成功')
					//成功支付后跳转
					this.app.goTab('/pages/index/index')
				})
			},
			onMonth(e) {
				this.month = this.app.ed(e).month
			},
			onLogout() {
				this.app.msgSys('退出登录！', is => {
					if (is) {
						this.app.setUser(null)
						this.app.go('/pages/login/login')
					}
				})
			},

		},
		onShow() {
			this.reLoad()
			
			this.app.goc('/pages/plus/plus')
		}
	}
</script>

<style>
	.plus-box {
		margin: 10rpx;
		width: 50%;
		height: 200rpx;
		border-radius: 20rpx;
		border: 1rpx solid #ffaa00;
		background: #fef5eb;

	}

	.plus-box-check {
		background: #e1d9d1;

	}

	.plus-box-check-text {
		background: #e9c444;

	}
</style>
