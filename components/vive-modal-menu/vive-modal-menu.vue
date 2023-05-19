<template>
	<view class="modal-menu text-center-hv" @tap.stop="onClose" :hidden="hidden">
		<view class="modal-menu-box ">
			<button class="modal-menu-item" v-for="(item, index) in menu" :key="index" :data-index='index' @tap.stop="onClick">{{item}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "vive-modal-menu",
		props: {
			hidden: {
				type: Boolean,
				default () {
					return false
				}
			},
			status: {
				//上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
				type: String,
				default: 'more'
			},
			menu: {
				type: Array,
				default () {
					return ['置顶', '取消']
				}
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
		    onClick(e) {
				let index = e.currentTarget.dataset.index;
				if(index == this.menu.length - 1){
					this.hidden = true
					console.log("误报错：Avoid mutating a prop directly since the value will be overwritten ")
				}
		        this.$emit('click', {
		            index: index
		        })
		    },
		    onClose() {
				this.hidden = true
				console.log("误报错：Avoid mutating a prop directly since the value will be overwritten ")
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
.modal-menu-box{
	background-color: #f0f0f0;
	box-shadow: 6rpx 6rpx 10rpx #888888;
}
.modal-menu-item{
	padding: 20rpx 80rpx;
	border-top: #33333333 solid 1rpx ;
}
</style>
