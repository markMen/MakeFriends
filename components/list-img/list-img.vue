<template>
	<view>
		<scroll-view scroll-x="true" class="scroll-view">
			<view scroll-x="true" v-for="(item,index) in toArray(imgs)" :key="index" class="scroll-view-item">
				<view @tap="handleClick" class="item-img-padding">
					<image @tap.stop="previewImages" :src="prefix + item" :data-src="prefix + item" :data-srcs="imgs" :data-prefix="prefix"
					 mode="aspectFill" class="scroll-view-item-img img-show-border"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "tuiListImg",
		props: {
			prefix: {
				type: String,
				default: ""
			},
			imgs: {
				type: String,
				default: ""
			},
			imgs_s: {
				type: Array,
				default: function() {
					return []
				}
			},
		},
		computed: {
			toArray: function() {
				return function(imgs) {
					if (imgs == null || imgs == '') {
						return [];
					} else {
						return imgs.split(',')
					}
				}
			},
		},
		methods: {
			handleClick() {
				this.$emit('click', {
					index: this.index
				});
			},
			previewImage: function(e) {
				let currentOne = e.currentTarget.dataset.src
				let current = [currentOne]
				uni.previewImage({
					//  current: current, // 当前显示图片的http链接
					urls: current, // 需要预览的图片http链接列表
					longPressActions: {
						itemList: ['保存图片'],
						success: function(ress) {
							uni.downloadFile({
								url: current[ress.index],
								success: (res) => {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												//uniapp提供的消息提示框。
												uni.showToast({
													title: "保存成功",
													icon: "success"
												});
											},
											fail: function() {
												uni.showToast({
													title: "保存失败，请稍后重试",
													icon: "none"
												});
											}
										});
									}
								}
							})
						},
						fail: function(res) {
							console.log(res.errMsg);
						}
					},
				})
			},
			previewImages: function(e) {
				let current = []
				let list = e.currentTarget.dataset.srcs.split(',')
				let prefix = e.currentTarget.dataset.prefix
				for (let i in list) {
					current.push(prefix + list[i])
				}
				let now = e.currentTarget.dataset.src
				uni.previewImage({
					current: now, // 当前显示图片的http链接
					urls: current ,// 需要预览的图片http链接列表
					longPressActions: {
						itemList: ['保存图片'],
						success: function(ress) {
							uni.downloadFile({
								url: current[ress.index],
								success: (res) => {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												//uniapp提供的消息提示框。
												uni.showToast({
													title: "保存成功",
													icon: "success"
												});
											},
											fail: function() {
												uni.showToast({
													title: "保存失败，请稍后重试",
													icon: "none"
												});
											}
										});
									}
								}
							})
						},
						fail: function(res) {
							console.log(res.errMsg);
						}
					},
				})
			},
		}
	}
</script>

<style>
	.scroll-view {
		width: 100%;
		white-space: nowrap
	}

	.scroll-view-item {
		display: inline-block
	}

	.scroll-view-item-img {
		width: 300rpx;
		height: 240rpx;
		display: block;
		border-radius: 8rpx;
	}

	.item-img-padding {
		padding:8rpx 16rpx 16rpx 0;
	}
</style>
