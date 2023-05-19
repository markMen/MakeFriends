<template>
	<view class="modal-menu box-v" @tap.stop="onClose" :hidden="hidden">
		<view class="">

		</view>
		<view class="modal-menu-box ">
			<!-- <button class="modal-menu-item"  @tap.stop="onClick">aaaaaaaaaaaaaa</button> -->

			<!-- <view class="" @tap.stop="onTap">
				<view class="in ">
					<input class="in-text" type="text" placeholder="请输入您的支付宝名字" v-model="model.name">
				</view>
				<view class="in-line"></view>
				<view class="in ">
					<input class="in-text" type="text" placeholder="请输入您的支付宝账号" v-model="model.ali_user">
				</view>
			</view>
			<view class="in-line"></view>
			<view class="">
				<view class="box bg-ff ">
					<view @tap.stop="onCancel"
						class="btn-chongzhi cols-6 text-color-4 page-sel text-center-h pt-md pb-md text-sm text-bold">
						取消
					</view>
					<view @tap.stop="onOk"
						class="btn-tixian cols-6 text-color-4 text-center-h pt-md pb-md text-sm text-bold">
						确认
					</view>
				</view>
			</view> -->


			<view class="box text-coin " @tap.stop="onTap"
				style="padding: 20rpx 30rpx; #EEEBFE;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;">
				<view class="text-bold text-center-v" style="font-size: 30rpx;">支付</view>
				<view class="text-sm rows text-center-v">
					<view class="text-color-3">可用余额：</view>
					<view>{{coin}} 个</view>
					<view class="pl pr">|</view>
					<view class="text-center-v" @tap.stop="onRef">
						<image src="/static/images/icon_coin_ref.png" mode="scaleToFill" class="img-coin-ref"></image>
					</view>
				</view>
			</view>
			
			<view class="border-bottom">
			</view>

			<view class="pt pb-lg pl-md pr-md " @tap.stop="onTap">
				<view class="border-bottom" v-for="(item,index) in coin_list" :key="index" @tap.stop="onOk(item)">
					<view class="box pt pb ">
						<view class="rows text-center-v">
							<image src="/static/images/icon-coin.png?v=2" mode="scaleToFill" class="img-coin-add"></image>
							<view class="pl-sm">
								{{item.coin}} 个
							</view>
						</view>
						<view class="text-coin text-coin-bg">
							￥{{item.price}}
						</view>
					</view>
				</view>
			</view>


		</view>


	</view>
</template>

<script>
	export default {
		name: "ws-ali-user",
		props: {
			hidden: {
				type: Boolean,
				default () {
					return false
				}
			},
			coin: {
				//上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
				type: String,
				default () {
					return '0'
				}
			},

		},
		data() {
			return {
				coin_list: [],
			};
		},
		created() {
			this.app.post('api/coin/lists', {}, json => {
				let {
					code,
					data
				} = json
				if (code == 0) {
					this.coin_list = data
				}
			})
		},
		methods: {
			onTap(e) {

			},
			onClose() {
				// this.hidden = true
				this.$emit('close', {})
			},
			onCancel(e) {
				this.onClose()
				this.$emit('cancel')
			},
			onOk(item) {
				this.onClose()
				this.$emit('ok', item)
			},
			onRef(item) {
				this.$emit('ref', item)
			},
		}
	}
</script>

<style>
	.modal-menu {
		height: 100%;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		background-color: #00000066;
	}

	.modal-menu-box {
		background-color: #FFFFFF;
		box-shadow: 6rpx 6rpx 10rpx #888888;
		border-radius: 20rpx;
	}

	.modal-menu-item {
		padding: 20rpx 80rpx;
		border-top: #33333333 solid 1rpx;
	}

	.btn-chongzhi {
		background-color: #EEEBFE;
		color: #fa5151;
	}

	.btn-tixian {
		background-color: #fa5151;
		color: #EEEBFE;
	}

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

	.img-coin-add {
		width: 50rpx;
		height: 50rpx;
	}
	.img-coin-ref{
		width: 30rpx;
		height: 30rpx;
	}
	.text-coin{
		color: #fa5151;
	}
	
	.text-coin-bg{
		background-color: #EEEBFE;
		padding: 5rpx 30rpx;
		border-radius: 10rpx;
	}
</style>
