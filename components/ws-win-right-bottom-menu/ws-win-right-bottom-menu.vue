<template>
	<view class="modal-menu text-center-hv" @tap.stop="onClose" :hidden="hidden">
		
		<view class="modal-menu-box " @tap.stop="onTap">
			<view class="">
				啊撒打发
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
			};
		},
		created() {
			
		},
		mounted() {

			
		},
		methods: {
			onTap(e) {

			},
			onClose() {
				// this.hidden = true
				this.$emit('close', {})
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
		position: relative;
		background-color: #f0f0f0;
		box-shadow: 6rpx 6rpx 10rpx #888888;
		width: 60%;
		border-radius: 20rpx;
		padding: 20rpx;

	}

</style>
