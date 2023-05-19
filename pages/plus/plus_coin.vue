<template>
	<view>

		<view class="" style="padding: 30rpx 50rpx 10rpx 50rpx;">
			<image src="/static/images/icon_plus_top2.png" mode="widthFix" class="full-width"></image>
		</view>

		<view class="pp text-sm" style="color: #DFB68B;">选择套餐</view>

		<view>
			<scroll-view scroll-x="true" class="scroll-view-h">
				<view class="scroll-view-h-item mm" v-for="(item,index) in plus_product">
					<view class="plus-box-w" >
						<view class="plus-box text-center-hv cols " :class="[item.id==coin.id?'plus-box-check':'']"
							@tap="onCion(item)" >
							<view class="text-sm" style="padding: 60rpx 0 0 0;">{{item.discount}}</view>
							<view class="text-df" style="padding: 30rpx 0 30rpx 0;">{{item.title}}</view>
							<view class="text-df text-bold text-color-f" >{{item.price}}元</view>
							<view class="text-sm text-color-e" style="padding:10rpx 0 60rpx 0;">{{item.text}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>

		<view class="box-wrap-space-around pt-lg mt-lg pl-lg pr-lg">
			<button  class="btn " style="width:90% !important; background-color: #D6AC82;border-radius: 100rpx;"
				@tap="btnAliPay">立即开通</button>
		</view>

		<view style="height: 200rpx;"></view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				order: {},

				coin:{},
				plus_product: [],
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
				this.app.postLoad('api/plus_product/coin', {}, json => {
					this.plus_product = json.data
				})

			},
			onInputMonth(e) {
				// this.month = this.app.ev(e)
				let month = parseInt(this.app.ev(e))
				if (!month) {
					month = ''
				}
				this.$nextTick(() => {
					this.month = month
				})
			},
			btnAliPay() {
				if (!this.coin || !this.coin.id) {
					this.app.toast('请选择')
					return
				}
				this.app.post('api/plus_order/cre_order_coin', {
					coin_id: this.coin.id,
				}, json => {
					let {code, data} = json
					if(code == 0){
						// #ifdef H5
						this.app.payAliUrl('api/plus_order/cre_order_pay_h5?order_no=' + data.order_no)
						// #endif
						// #ifdef APP
						this.app.payAliApp(data.order_no, success => {
							this.app.toast('支付成功')
							this.reload()
						})
						// #endif		
					}else{
						this.app.toastNone(data)
					}
				})
			},
			payCoin(invoke, order) {
				if (!this.coin || !this.coin.id) {
					this.app.toast('请选择')
					return
				}
				
				this.app.message('确认购买', this.coin.title, () => {
					this.app.post('api/plus_order/cre_order_coin_pay', {
						coin_id: this.coin.id,
					}, json => {
						let {code, data} = json
						if(code == 0){
							this.app.toast('支付成功')
							this.app.backTime(1500)
							
						}else{
							this.app.toastNone(data)
						}
						if (invoke) {
							invoke()
						}
					})
				})
				
			},
			payFinish() {
				this.app.post('api/plus_order/order_pay_finish', {
					order_no: this.order.order_no, //订单号
				}, json => {
					this.app.toast('支付成功')
					//this.app.goTab('/pages/index/index')
					this.reLoad()
				})
			},
			onCion(item){
				this.coin = item
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
			this.app.setTitle('开通会员')
			this.reLoad()
		},
		onShow() {}
	}
</script>

<style>
	page {
		background-color: #242329;
	}

	.plus-box-w {
		/* width: 40%; */
		width: 280rpx;
	}

	.plus-box {
		margin: 10rpx;
		/* height: 200rpx; */
		border-radius: 10rpx;
		border: 6rpx solid #1D1C20;
		background: #242329;
		color: #DFB587;
	}

	.plus-box-check {
		border: 6rpx solid #DFB587;

	}

	.plus-box-check-text {
		background: #e9c444;

	}
</style>
