<template>
	<view class="modal-menu text-center-hv" @tap.stop="onClose" :hidden="hidden">
		<view class="modal-menu-box " @tap.stop="onTap">
			<!-- <button class="modal-menu-item"  @tap.stop="onClick">aaaaaaaaaaaaaa</button> -->

			<view class="modal-menu-box-close">
				<view class="pt pr pl pb" @tap.stop="onClose">
					<image src="/static/images/icon_close_y.png" mode="scaleToFill" class="close"></image>
				</view>
			</view>

			<view class="box ">
				<view class="title pl-md pt-md" v-if="me.is_plus == 1">
					会员特权
				</view>
				<view class="title pl-md pt-md" v-else>
					你还不是会员
				</view>

			</view>

			<view class="text-desc-text" style="padding: 30rpx 30rpx 10rpx 30rpx;">
				<view class="">
					<text><text v-if="me.is_plus == 1"></text> <text v-else>成为会员：</text>免费解锁微信</text>
					<text class="text-desc-main pl-xs pr-xs">{{config.dec_user_info_plus}} 个/天</text>
				</view>
				<view class="pt-xs">
					<text>或者直接支付 {{config.dec_user_info_price}} 元购买</text>
				</view>
				<view class="pt-sm " v-if="me.is_plus == 1" >
					<text>{{config.dec_user_info_plus}} 个每日 / 已解锁（ <text class="text-desc-main">{{count_dec}}</text>）个</text>
				</view>
			</view>

			<view class="box box-wx bg-ff" style="margin: 30rpx 30rpx; padding: 16rpx 20rpx;">
				<view class="rows">
					<image src="/static/images/icon_wx_c.png" mode="scaleToFill" class="icon-wx"></image>
					<view class="text-center-v pl text-bold text-color-6" v-if="user_plus_see.id">
						{{you.wx}}
					</view>
					<view class="text-center-v pl text-bold text-color-6" v-else>
						{{mask.wx}}
					</view>
				</view>
				<view class="text-center-v text-opt " @tap="onCopy">
					点击复制
				</view>
			</view>

			<!-- 			<view class="" @tap.stop="onTap">
				<view class="in ">
					<input class="in-text" type="text" placeholder="请输入您的支付宝名字" v-model="model.name">
				</view>
				<view class="in-line"></view>
				<view class="in ">
					<input class="in-text" type="text" placeholder="请输入您的支付宝账号" v-model="model.ali_user">
				</view>
			</view> -->
			<!-- <view class="in-line"></view> -->
			<view class="mb ml mr" >
				<view class="box  ">
					<view @tap.stop="onCancel"
						class="btn btn-cancel cols-6 text-color-4 page-sel text-center-h pt-md pb-md text-sm text-bold">
						直接购买
					</view>
					
					<view class="" v-if="me.is_plus == 1" @tap.stop="onPlusUserDes" class="btn btn-ok cols-6 text-color-4 text-center-h pt-md pb-md text-sm text-bold">
						<view v-if="user_plus_see.id" >
							已经解锁
						</view>
						<view v-else>
							立即解锁
						</view>
					</view>
					
					<view v-else @tap.stop="onOk"
						class="btn btn-ok cols-6 text-color-4 text-center-h pt-md pb-md text-sm text-bold">
						成为会员
					</view>
					
				</view>
			</view>


		</view>


	</view>
</template>

<script>
	export default {
		name: "ws-win-user-wx",
		props: {
			hidden: {
				type: Boolean,
				default () {
					return false
				}
			},
			user_id: {
				type: String,
				default: ''
			},
			wx: {
				type: String,
				default: '******'
			},
		},
		data() {
			return {
				app:this.app,
				me:{},
				mask:{  //过期
					wx: '******'
				},
				you:{
					
				},
				user_plus_see:{
					
				},
				config: {
					dec_user_info_price: 15,
				},
				count_dec: 0,
			};
		},
		created() {
			
			
			this.reload()
			
			
		},
		mounted() {
			// this.app.post('api/user_plus_see/plus_see', {
			// 	user_id: this.user_id
			// }, json => {
			// 	let {code, data} = json
			// 	if(code == 0){
			// 		this.user = data
			// 	}else{
			// 		this.app.toastNone(data)
			// 	}
			// })
			
		},
		methods: {
			reload(){
				this.app.post('api/config/config_all', {}, json => {
					this.config = json.data
				})
				
				this.app.post('api/user/plus', {}, userinfo => {
					this.me = userinfo.data
				})
				
				this.app.post('api/user/plus_user', {
					user_id: this.user_id,
				}, userinfo => {
					this.you = userinfo.data
				})
				
				
				this.app.post('api/user_plus_see/find_see', {
					user_id: this.user_id,
				}, json => {
					let {code, data} = json
					if(code == 0){
						this.user_plus_see = data
					}else{
						// this.app.toastNone(data)
					}
				})
				
				this.app.post('api/user_plus_see/find_see_count_day', {
				}, json => {
					let {code, data} = json
					if(code == 0){
						this.count_dec = data.see
					}else{
						this.app.toastNone(data)
					}
				})
			},
			onTap(e) {

			},
			onClose() {
				// this.hidden = true
				this.$emit('close', {})
			},
			onCancel(e) {
				this.onClose()
				this.$emit('cancel', this.model)
				this.app.post('api/user_plus_see/plus_see_order_cre', {user_id: this.user_id}, json => {
					let {code, data} = json
					if(code == 0){
						// #ifdef H5
						this.app.payAliUrl('api/user_plus_see/plus_see_pay?order_no=' + data.order_no)
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
			onOk(e) {
				this.onClose()
				this.$emit('ok', this.model)
				this.app.go('/pages/plus/plus_coin');
			},
			onCopy(e) {
				this.$emit('copy', this.model)
				
				if(this.user_plus_see && this.user_plus_see.id){
					this.app.copy(this.you.wx)
				}else{
					this.app.toastNone('您还没有解锁')
				}
			},
			onPlusUserDes(e){
				this.app.post('api/user_plus_see/plus_see', {
					user_id: this.user_id
				}, json => {
					let {code, data} = json
					if(code == 0){
						// this.user = data
						this.reload()
						this.user_plus_see = data
					}else{
						this.app.toastNone(data)
					}
				})
			},
		}
	}
</script>

<style>
	.modal-menu {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		z-index: 100;
		background-color: #00000066;
	}

	.modal-menu-box {
		background-color: #f0f0f0;
		box-shadow: 6rpx 6rpx 10rpx #888888;
		width: 86%;
		border-radius: 20rpx;
		position: relative;
	}

	.modal-menu-box-close {
		position: absolute;
		right: 0;
		top: 0;
	}


	.modal-menu-item {
		padding: 20rpx 80rpx;
		border-top: #33333333 solid 1rpx;
	}

	/* 	.btn-chongzhi {
		background-color: #EEEBFE;
		color: #fa5151;
	}

	.btn-tixian {
		background-color: #fa5151;
		color: #EEEBFE;
	} */

	.in {
		margin: 20rpx;
		padding: 10rpx 20rpx;
	}

	.in-line {
		border-bottom: 1rpx solid #bbb;
	}

	.in-text {
		font-size: 28rpx;
	}

	.btn {
		background: linear-gradient(-90deg, #B3B2B2, #B2B2B2);
		border-radius: 50rpx;
		margin: 10rpx 10rpx;
		height: 20rpx;
		display: flex;
		align-items: center;
		font-size: 34rpx;
	}

	.btn-cancel {
		background: linear-gradient(90deg, #B3B2B2, #858485);
		color: #333;
	}

	.btn-ok {
		background: linear-gradient(90deg, #E84C02, #D77402);
		color: #fff;
	}

	.close {
		width: 50rpx;
		height: 50rpx;
	}

	.title {
		color: #B8730B;
		font-weight: bold;
		font-size: 34rpx;
	}

	.text-desc-main {
		color: #FF6117;
	}

	.text-opt {
		color: #FF8400;
		font-size: 28rpx;
	}

	.icon-wx {
		width: 80rpx;
		height: 80rpx;
	}

	.box-wx {
		border: 4rpx solid #FF8400;
		border-radius: 10rpx;
	}

	.text-desc-text {
		color: #333333;
	}
</style>
