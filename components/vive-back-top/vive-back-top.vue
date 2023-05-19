<template>
	<view>
		<view class="top-box" :style="{'display':(flag===true? 'block':'none')}" >
			<!-- <uni-icons class="top-box-icon" type="arrowthinup" size="50" @click="top"></uni-icons> -->
			<view class="top-box-icon" @tap.stop="top">
				<tui-icon name="top" :size='32' color='#007AFF33'></tui-icon>
				
			</view>
		</view>
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	
	
	export default {
		components: {
			tuiIcon,
		},
		
		name: "vive-back-top",
		props: {
			flag: {
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
				if (index == this.menu.length - 1) {
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
			top() { //回到顶部
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			onPageScroll(e) { //根据距离顶部距离是否显示回到顶部按钮
				if (e.scrollTop > 600) { //当距离大于600时显示回到顶部按钮
					this.flag = true
				} else { //当距离小于600时隐藏回到顶部按钮
					this.flag = false
				}
			},
		}
	}
</script>

<style>
	.top-box {
/* 		width: 100%;
		height: 100%;
		position: fixed;
		top: 0; */
		z-index: 100;
		display: none; /* 先将元素隐藏 */
	}
 
	.top-box-icon {
		position: fixed;
		right: 30rpx;
		background: #19be6b11;
		border-radius: 50%;
		bottom: 150rpx;
		padding: 10rpx;
	}
</style>
