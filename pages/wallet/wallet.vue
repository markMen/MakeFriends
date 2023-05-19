<template>
	<view>
		<view class="pp text-sm" style="color: #fa5151;">
			<text>
				当有用户消耗完会员额度后，付费查看你的微信，每次解锁你将得5元收益，所得收益会进入到钱包。你可以随时提现（处理时间为2个工作日），提现支持提现到（微信/支付宝需绑定收款码），提现将收取10%提现手续费。
			</text>
		</view>

		<view class="box-wrap-space-around mt-md mb-md">
			<view class="cols ">
				<view class="text-center-h w-title text-color-3">账户余额</view>
				<view class="text-center-h pt-sm">
					<text class="w-num text-color-1">{{me_wallet.coin}}</text>
					<text class="pb-xs pl-sm w-text text-end text-color-3">社区币</text>
				</view>
			</view>

			<view class="cols ">
				<view class="text-center-h w-title text-color-3">账户余额</view>
				<view class="text-center-h pt-sm">
					<text class="w-num text-color-1">{{me_wallet.price}}</text>
					<text class="pb-xs pl-sm w-text text-end text-color-3">社区币</text>
				</view>
			</view>

		</view>


		<view class="pl-md pt-md pr-md pb-md text-sm text-color-3 ">


			<view class="box  pt-md  pb-md "  @tap="onCashOutUser">
				<view class="">支付宝账号：</view>
				<view class="rows ">
					<view class="">{{user_cash.ali_user}}</view>
					<view class="text-center-v pl-sm">
						<image src="/static/images/icon_arrow_right_a.png" mode="scaleToFill" class="icon-arrow-right">
						</image>
					</view>
				</view>
			</view>

			<view class="box  pt-md  pb-md " @tap="app.go('/pages/wallet/log_pay')">
				<view class="">充值记录</view>
				<view class="rows ">
					<view class=""></view>
					<view class="text-center-v pl-sm">
						<image src="/static/images/icon_arrow_right_a.png" mode="scaleToFill" class="icon-arrow-right">
						</image>
					</view>
				</view>
			</view>

			<view class="box  pt-md  pb-md " @tap="app.go('/pages/wallet/log_cash')">
				<view class="">提现记录：</view>
				<view class="rows ">
					<view class=""></view>
					<view class="text-center-v pl-sm">
						<image src="/static/images/icon_arrow_right_a.png" mode="scaleToFill" class="icon-arrow-right">
						</image>
					</view>
				</view>
			</view>


		</view>


		<view class="" style="height: 200rpx;">

		</view>
		<view class="bottom">
			<view class="box bg-ff mt">
				<view @tap="onIn" class="btn-chongzhi cols-6 text-color-4 page-sel text-center-h pt-md pb-md text-sm text-bold">
					充值
				</view>
				<view @tap="onOut" class="btn-tixian cols-6 text-color-4 text-center-h pt-md pb-md text-sm text-bold">
					提现
				</view>
			</view>
		</view>
		
		<ws-coin-add :hidden="!is_show_coin_add" @ok="onWsCoinAdd" @close="onWsCoinClose" @ref="onWsCoinRef" :coin="me_wallet.coin"></ws-coin-add>
		<ws-ali-user :hidden="!is_show_ali" @ok="onWsAliUser" @close="onWsAliClose"></ws-ali-user>
		<view style="height: 100rpx;"></view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				app: this.app,
				me: {},
				me_wallet: {},
				
				is_show_coin_add:false,
				is_show_ali: false,
				user_cash: {
					name: '',
					ali_user: '',
				},
			}
		},
		methods: {
			reload(){
				this.app.post('api/user/me_info', {}, json => {
					let {code, data} = json
					if(code == 0){
						this.me = data
					}
				})
				
				this.app.post('api/user_wallet/me_wallet', {}, json => {
					let {code, data} = json
					if(code == 0){
						this.me_wallet = data
					}
				})
				
				this.app.post('api/user_cash/find_me', {}, json => {
					let {code, data} = json
					if (code == 0) {
						data.price = ''
						this.user_cash = data
					}
				})
			},
			onIn(){
				this.is_show_coin_add = true
			},
			onWsCoinClose(){
				this.is_show_coin_add = false
			},
			onWsCoinRef(){
				this.reload()
			},
			onWsCoinAdd(coin){
				//调用支付宝
				this.app.post('api/coin_order/cre_order', {coin_id: coin.id}, json => {
					let {code, data} = json
					if(code == 0){
						// #ifdef H5
						this.app.payAliUrl('api/coin_order/cre_order_pay_h5?order_no=' + data.order_no)
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
			onOut(){
				this.app.go('/pages/wallet/cash_out_price')
			},
			
			onCashOutUser(e) {
				// this.app.go('/pages/me/cash_out/cash_out_user')
				this.is_show_ali = true
			},
			onWsAliClose(){
				this.is_show_ali = false
			},
			onWsAliUser(model){
				this.app.post('api/user_cash/add_cash', {
					...model,
				}, json => {
					let {code, data} = json
					if (code == 0) {
						this.user_cash = data
					}
				})
			},
		},
		onLoad() {
			this.reload()
		}
	}
</script>

<style>
	.w-title {
		font-size: 32rpx;
	}

	.w-num {
		font-size: 48rpx;
	}

	.w-text {
		font-size: 32rpx;
	}
	
	.btn-chongzhi{
		background-color: #EEEBFE;
		color: #fa5151;
	}
	.btn-tixian{
		background-color: #fa5151;
		color: #EEEBFE;
	}
</style>
