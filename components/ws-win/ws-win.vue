<template>
	<view class="modal-menu text-center-hv" @tap.stop="onClose" :hidden="hidden">
		<view class="modal-menu-box ">
			<!-- <button class="modal-menu-item"  @tap.stop="onClick">aaaaaaaaaaaaaa</button> -->

			<view class="modal-menu-box-close" @tap.stop="onClose">
				<view class="pt pr pl pb" @tap.stop="onClose">
					<image src="/static/images/icon_close_y.png" mode="scaleToFill" class="close"></image>
				</view>
			</view>

			<view class="box ">
				<view class="title pl-md pt-md">
					你还不是会员
				</view>

			</view>

			<view class="text-desc-text" style="padding: 30rpx 30rpx;">
				<text>成为会员：免费解锁微信</text>
				<text class="text-desc-main pl-xs pr-xs">5个/天</text>
				<text>或者直接支付15元购买</text>
			</view>

			<view class="box box-wx" style="margin: 30rpx 30rpx; padding: 16rpx 20rpx;">
				<view class="">
					<image src="/static/images/icon_wx_c.png" mode="scaleToFill" class="icon-wx"></image>
					<view class="">

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
			<view class="mb ml mr">
				<view class="box  ">
					<view @tap.stop="onCancel"
						class="btn btn-cancel cols-6 text-color-4 page-sel text-center-h pt-md pb-md text-sm text-bold">
						直接购买
					</view>
					<view @tap.stop="onOk"
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
		name: "ws-win",
		props: {
			hidden: {
				type: Boolean,
				default () {
					return true
				}
			},
			status: {
				//上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
				type: String,
				default: 'more'
			},
			model: {
				name: '',
				ali_user: '',
			}
		},
		data() {
			return {

			};
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
				this.$emit('cancel', this.model)
			},
			onOk(e) {
				this.onClose()
				this.$emit('ok', this.model)
			},
			onCopy(e) {

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
		background-color: #00000033;
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
