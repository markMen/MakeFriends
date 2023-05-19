<template>
	<view class="modal-menu text-center-hv" @tap.stop="onClose" :hidden="hidden">
		<view class="modal-menu-box ">
			<!-- <button class="modal-menu-item"  @tap.stop="onClick">aaaaaaaaaaaaaa</button> -->

			<view class="" @tap.stop="onTap">
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
		},
		data() {
			return {
				status: {
					//上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
					type: String,
					default: 'more'
				},
				model: {
					name:'', 
					ali_user:'', 
				}
			};
		},
		methods: {
			onTap(e){
				
			},
			onClose() {
				// this.hidden = true
				this.$emit('close', {})
			},
			onCancel(e){
				this.onClose()
				this.$emit('cancel', this.model)
			},
			onOk(e){
				this.onClose()
				this.$emit('ok', this.model)
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
		width: 80%;
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
	.in{
		margin: 20rpx;
		padding: 10rpx 20rpx;
	}
	.in-line{
		border-bottom: 1rpx solid #bbb;
	}
	.in-text{
		font-size: 28rpx;
	}
</style>
