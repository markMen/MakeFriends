<template>
	<view>



		<view class="pt pl pr pb-lg" v-if="user.plus_time_end">
			<view class="pt rows">
				<view>会员到期时间：</view>
				<view class="text-color-6 rows">
					<!-- <tui-icon name="moments" :size="22" color='#333333'></tui-icon> -->
					<image src="/static/image/vip.png" alt="" mode="scaleToFill" style="width: 42rpx; height: 42rpx;">
					</image>
					<view class="pl-sm">{{plusTime(user.plus_time_end)}}</view>
				</view>
			</view>
		</view>



		<view class="pp">开通会员服务（开通12个月及以上享8.5折优惠，年费会员）</view>

		<view >
			<view class="rows-wrap ml-sm mr-sm">
				<view class="plus-box-w" v-for="(item,index) in plus_product">
					<view class="plus-box text-center-hv cols " :class="[month==item.month?'plus-box-check':'']" @tap="onMonth"
						:data-month='item.month'>
						<view class="text-md">{{item.month}}个月</view>
						<view class="text-sm">{{item.price}}元({{item.month}}个月)</view>
					</view>					
				</view>
				
				<!-- <view class="plus-box-w">
					<view class="plus-box text-center-hv cols " :class="[month=='1'?'plus-box-check':'']" @tap="onMonth"
						data-month='1'>
						<view class="text-md">1个月</view>
						<view class="text-sm">{{monthToPrice(1)}}元(1个月)</view>
					</view>					
				</view>
				<view class="plus-box-w">
					<view class="plus-box text-center-hv cols" :class="[month=='6'?'plus-box-check':'']" @tap="onMonth"
						data-month='6'>
						<view class="text-md">6个月</view>
						<view class="text-sm">{{monthToPrice(6)}}元(6个月)</view>
					</view>
				</view>
				<view class="plus-box-w">
					<view class="plus-box text-center-hv cols" :class="[month=='12'?'plus-box-check':'']" @tap="onMonth"
						data-month='12'>
						<view class="text-md">年费会员</view>
						<view class="text-sm">{{monthToPrice(12)}}元(12个月)</view>
					</view>
				</view> -->
				<view class="plus-box-w" v-if="system == 'android'">
					<view class="plus-box text-center-hv cols" :class="[month != ''?'plus-box-check-text':'']">
						<view class="rows text-center-hv">
							<view style="margin: 25rpx;">
								<input type="digit" class="text-md" v-model="month" @input="onInputMonth"
									style="text-align: center; width: 100rpx; border: 4rpx solid #ffaa00; padding: 5rpx 15rpx;">
							</view>
							<view>个月</view>
						</view>
						<view class="text-sm">共计{{monthToPrice(month)}}元({{month}}个月)</view>
					</view>
				</view>
				
			</view>
		</view>

<!-- 		<view v-if="system == 'ios'">
			<view class="rows pl pr">
				<view class="plus-box text-center-hv cols" :class="[month=='1'?'plus-box-check':'']" @tap="onMonth"
					data-month='1'>
					<view class="text-md">1个月</view>
					<view class="text-sm">{{monthToPrice(1)}}元(1个月)</view>
				</view>

				<view class="plus-box text-center-hv cols" :class="[month=='3'?'plus-box-check':'']" @tap="onMonth"
					data-month='3'>
					<view class="text-md">3个月</view>
					<view class="text-sm">{{monthToPrice(3)}}元(3个月)</view>
				</view>
			</view>

			<view class="rows pl pr">
				<view class="plus-box text-center-hv cols" :class="[month=='6'?'plus-box-check':'']" @tap="onMonth"
					data-month='6'>
					<view class="text-md">6个月</view>
					<view class="text-sm">{{monthToPrice(6)}}元(6个月)</view>
				</view>

				<view class="plus-box text-center-hv cols" :class="[month=='12'?'plus-box-check':'']" @tap="onMonth"
					data-month='12'>
					<view class="text-md">年费会员</view>
					<view class="text-sm">{{monthToPrice(12)}}元(12个月)</view>
				</view>
			</view>
		</view> -->


<!-- 		<view class="box-wrap-space-around pt-lg mt-lg">
			<view v-if="system == 'android'">
				<button :loading="ali_loading" :disabled="ali_loading" class="btn-primary" style="width: 400rpx !important;" @tap="btnAliPay">支付宝支付</button>
			</view>
			<view v-if="system == 'android'">
				<button :loading="wx_loading" :disabled="wx_loading" class="btn-success" style="width: 400rpx !important;" @tap="btnWxPay">微信支付</button>
			</view>
			<view v-if="system == 'ios'">
				<button :loading="ios_loading" :disabled="ios_loading" class="btn-dark" style="width: 400rpx !important;" @tap="btnApplePay">立即开通</button>
			</view>
		</view> -->
		
		<view class="box-wrap-space-around pt-lg mt-lg pl-lg pr-lg">
			<view v-if="system == 'android'">
				<image src="/static/image/icon_pay_ali.jpg" mode="" @tap="btnAliPay" class="icon-pay"></image>
			</view>
			<view v-if="system == 'android'">
				<image src="/static/image/icon_pay_wx.jpg" mode="" @tap="btnWxPay" class="icon-pay"></image>
			</view>
			<view v-if="system == 'ios'">
				<button :loading="ios_loading" :disabled="ios_loading" class="btn-dark" style="width: 400rpx !important;" @tap="btnApplePay">立即开通</button>
			</view>
		</view>
		

		<view style="height: 200rpx;"></view>
		<view class="bottom bg-white-bg rows" v-if="user.openid">
			<button class=" btn-warning full-width" @tap="onLogout">更换账号</button>
		</view>

		<!--<view style="height: 200rpx;"></view>
		<view class="bottom bg-white-bg rows">
			<button class=" btn-dark full-width" @tap="onLogout">更换账号</button>
		</view> -->


	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				order: {},
				month: '',
				input_month: '',
				system: '',
				system_show: '0',

				plus_product: [],
				
				ali_loading: false,
				wx_loading: false,
				ios_loading: false,
			}
		},
		computed: {
			monthToPrice: function() {
				return function(month) {
					let price = month * 5;
					if (price >= 12 * 5) {
						price = price * 0.85;
					}
					// if (this.system == 'android') {
					// } else {
					// 	if (month == '1') {
					// 		price = '6'
					// 	} else if (month == '3') {
					// 		price = '18'
					// 	} else if (month == '6') {
					// 		price = '30'
					// 	} else if (month == '12') {
					// 		price = '50'
					// 	}
					// }
					return price
				}
			},
			plusTime: function() {
				return function(time) {
					if (time) {
						return time.substr(0, 10)
					}
					return time
				}
			},
		},
		methods: {
			reLoad() {
				this.app.post('api/user/info', {}, json => {
					this.user = json
				})

				this.app.postHtml('api/config/config', {
					key: 'system_vip_show',
				}, json => {
					this.system_show = json.value
				})

				let system = uni.getSystemInfoSync().platform
				this.system = system


				if(system == 'ios'){
					this.app.postLoad('api/plus_product/ios', {}, json => {
						this.plus_product = json
					})
				}else{
					this.app.postLoad('api/plus_product/android', {}, json => {
						this.plus_product = json
					})
				}

			},
			onInputMonth(e) {
				// this.month = this.app.ev(e)
				let month = parseInt(this.app.ev(e))
				if(!month){
					month = ''
				}
				this.$nextTick(() => {
					this.month = month
				})
			},
			btnWxPay() {
				let that = this
				that.payPre(() => {
					this.wx_loading = true
					that.app.wxPay({
						'total': that.order.price,
						'subject': '自定义订单',
						'out_trade_no': that.order.order_no,
					}, res => {
						that.payFinish()
					}, co => {
						this.wx_loading = false
					})
				}, {
					pay_type: '2'
				})
			},
			btnAliPay() {
				let that = this
				that.payPre(() => {
					this.ali_loading = true
					that.app.aliPay({
						'total': that.order.price,
						'subject': '自定义订单',
						'out_trade_no': that.order.order_no,
					}, res => {
						that.payFinish()
					}, co => {
						this.ali_loading = false
					})
				}, {
					pay_type: '1'
				})
			},
			btnApplePay() {
				let that = this
				that.payPreIos(() => {
					this.ios_loading = true
					that.app.ApplePay({
						'total': that.order.price,
						'subject': '自定义订单',
						'out_trade_no': that.order.order_no,
						'apple_product_list': that.order.apple_product_list,
						'apple_product': that.order.apple_product,
					}, res => {
						that.payFinish()
					}, co => {
						this.ios_loading = false
					})
				}, {
					pay_type: '3'
				})
			},
			payPre(invoke, order) {
				// if (!this.address.user_name) {
				// 	this.app.toast('请选择收获地址')
				// 	return
				// }

				if (!this.month) {
					this.app.toast('请选择月份')
					return
				}
				this.app.post('api/plus_order/cre_order_month?XDEBUG_SESSION_START=11841', {
					month: this.month,
					...order,
				}, json => {
					this.order = json
					if (invoke) {
						invoke()
					}
				})
			},
			payPreIos(invoke, order) {
			
				if (!this.month) {
					this.app.toast('请选择月份')
					return
				}
				this.app.post('api/plus_order/cre_order_month_ios?XDEBUG_SESSION_START=11841', {
					month: this.month,
					...order,
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
					//this.app.goTab('/pages/index/index')
					this.reLoad()
				})
			},
			onMonth(e) {
				let month = this.app.ed(e).month
				this.month = month
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
		onLoad() {
			this.app.setTitle('我的会员')
		},
		onShow() {
			this.reLoad()
		}
	}
</script>

<style>
	.plus-box-w {
		width: 50%;
	}
	
	.plus-box {
		margin: 10rpx;
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
