<template>
	<view>
		<view class="cash-box bg-ff">
			<view class="box cash-box-item text-sm ">
				<view class=" text-color-3">你可兑消的社区币为：{{me_wallet.coin}} 个</view>
			</view>

			<view class="cols cash-box-item mt ">
				<view class="box text-center-v">
					<view class="rows text-color-3 text-center-v">
						<input type="digit" class="" 
							:placeholder="'可提现 ' + me_wallet.coin" v-model="model.coin">
					</view>
					<view class="text-center-v">
						<view class="">个</view>
					</view>
				</view>
			</view>
			
			<view class="box cash-box-item mt">
				<view class=" text-color-3 text-sm">预计到账</view>
				<view class="">{{(model.price)}}元</view>
			</view>
			
			<view class=" mt mb cash-box-item text-sm text-color-6">
				提现处理时间为周一到周五09：00-18：00.13个工作日到账。<text class="text-color-5" @tap="app.go('/pages/me/server/server_list')">遇到问题请联系客服</text>
			</view>
			
			<view class="box cash-box-item text-sm text-color-6" style="background-color: #EFEFEF; padding: 25rpx 20rpx;">
				我的提现账号
			</view>
			
			<view class="box cash-box-item " @tap="onCashOutUser">
				<view class="rows text-color-3">
					<image src="/static/image/zhifubao/zhifubao_logo.png" mode="scaleToFill" class="icon-pay-ali"></image>
					<view class="text-center-v pl text-sm text-color-3">
						支付宝
					</view>
				</view>
				<view class="text-center-v pl-sm">
					<view class="pr text-color-3">
						{{user_cash.ali_user}}
					</view>
		<!-- 			<image src="/static/images/icon_arrow_right_a.png" mode="scaleToFill" class="icon-arrow-right">
					</image> -->
				</view>
			</view>
			
			<view class="box cash-box-item text-sm text-color-6" style="background-color: #EFEFEF; padding: 25rpx 20rpx;">
				提现方式
			</view>
			
			<view class="box cash-box-item  bg-ff" >
				<view class="rows text-color-3">
					<image src="/static/image/zhifubao/zhifubao_logo.png" mode="scaleToFill" class="icon-pay-ali"></image>
					<view class="text-center-v pl text-sm text-color-3">
						支付宝
					</view>
				</view>
				<view class="text-center-v">
					<image src="/static/images/icon_pay_ali_gou.png" mode="scaleToFill" class="icon-pay-ali-gou"></image>
				</view>
			</view>
			
			

<!-- 			<view class="box cash-box-item " @tap="onCashOutUser">
				<view class="left-text text-color-6">收款信息</view>
				<view class="box">
					<view class=" text-color-3">
						{{user_cash.name}} {{user_cash.phone}}
					</view>
					<view class="text-center-v pl-xs">
						<image src="/static/images/icon_arrow_right.png" class="icon-df"></image>
					</view>
				</view>
			</view> -->
			<view class=" mt mb"></view>



		</view>

		<view class="line-wx-md mt mb"></view>

		<view class="text-center-h " style="padding-top: 60rpx;">
			<button class="btn btn-main " style="width: 90%;" @tap="onCashOutPrice" >提现</button>
			<!-- <button class="btn btn-main btn-main-out" style="width: 90%;" @tap="onCashOutPrice" >提现</button> -->
		</view>


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
				me_menu: {
					state: -1
				},

				me_wallet: {},

				model: {
					price: '',
					user_cash_id: '',
				},

				user_cash: {
					name: '',
					ali_user: '',
					
					phone: '',
					price: '',
					cash_out_id: '',
				},
				config: {
					cash_out_min: 0,
					cash_out_max: 0,
					coin_scale_money: 0.1,
				},
				is_show_ali: false,
			}
		},
		watch: {
			model: {
				handler(newValue, oldValue) {
					this.model.price = this.app.toPrice(this.model.coin * this.config.coin_scale_money)
				},
				deep: true // 深度监听父组件传过来对象变化
			},
		},
		methods: {
			reload(e) {
				this.app.getUser(user => {
					this.app.post('api/user/me_info', {}, json => {
						let {code, data} = json
						if (code == 0) {
							this.me = data
						}
					})
					
					this.app.post('api/user_wallet/me_wallet', {}, json => {
						let {code, data} = json
						if (code == 0) {
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
					
					this.app.post('api/config/config_all', {}, json => {
						this.config = json.data
					})
					
					
				})
			},
			onAll(e) {
				this.model.price = this.me_wallet.price
			},
			onCashOutUser(e) {
				// this.app.go('/pages/me/cash_out/cash_out_user')
				// this.is_show_ali = true
			},
			onCashOutPrice(e) {
				if (!this.user_cash.id) {
					this.app.toast('请填写收款信息')
					return
				}
				if(!this.model.coin){
					this.app.toast('请输入提现币')
					return
				}
				
				this.model.coin  = this.model.coin * 1
				if(this.model.coin <= 0){
					this.app.toast('请输入提现币')
					return
				}

				if (this.model.coin  > this.me_wallet.coin) {
					this.app.toast('余额不足')
					return
				}

				if (this.model.coin < this.config.cash_out_min) {
					this.app.toast('金额过小')
					return
				}

				if (this.model.coin > this.config.cash_out_max) {
					this.app.toast('金额过大')
					return
				}

				this.app.message('确认提现', '', () => {
					this.model.user_cash_id = this.user_cash.id
					this.app.post('api/cash_out/create_order?XDEBUG_SESSION_START=16604', {
						name:this.user_cash.name,
						ali_user: this.user_cash.ali_user,
						...this.model,
					}, json => {
						let {code, data} = json
						if(code == 0){
							this.app.toast('申请提现成功')
							setTimeout(() => {
								this.app.back()
							}, 1000)
						}else{
							this.app.toastNone(data)
						}
						
					})
				})

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
			onWsAliClose(){
				this.is_show_ali = false
			},
		},
		onLoad() {
			this.reload()
		},
		onShow() {
			// this.reload()

		},
	}
</script>

<style>
page{
	background: #EFEFEF;
}
</style>
