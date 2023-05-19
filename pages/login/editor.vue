<template>
	<view>

		<!-- 		<view class="pp">
			<view class="text-center-h text-lg">{{editor.title}}</view>
		</view> -->

		<view class="pp">
			<rich-text :nodes="editor.editor"></rich-text>
		</view>


		<!-- <view class="text-sm pl pr pt pb text-color-9 bg-wx">页面二维码</view> -->

		<!-- <image @tap="previewImage" :src="app.upload + product.qrcode" mode="aspectFit" class=""  :data-src="app.upload + product.qrcode"/> -->


		<!-- 		<view class="text-center-hv pt pb ">
			<image @tap="previewImage" :src="app.host + 'api/product/qrcode_tag?id=' + product.id" mode="aspectFit" class=""  :data-src="app.upload + product.qrcode"/>
		</view>
		<view class="pt pb"></view> -->



	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				app: this.app,
				tag: '',
				editor: {},
			}
		},
		methods: {
			reload: function(invoke) {
				let that = this
				let tag = this.tag
				this.app.postHtml('api/editor/tag', {
					tag: tag
				}, json => {
					if (json.data.editor) {
						json.data.editor = this.app.toEditor(json.data.editor)
					}

					that.editor = json.data

					that.app.setTitle(json.data.title)

					if (invoke) {
						invoke()
					}

				})
			},
			onHome: function() {
				//this.app.back()
				if (this.scene) {
					this.app.goOne('/pages/index/index')
				} else {
					this.app.back()
				}
			},
			onPhone: function() {
				let phone = this.product.phone
				if (!phone) {
					this.app.toast('手机号错误')
				}

				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			previewImage(e) {
				this.app.previewImage(e)
			},
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id
			} else if (options.scene) { //扫码进来
				this.id = options.scene
				this.scene = options.scene
			}

			if (options.tag) {
				this.tag = options.tag
			}
			this.reload()
		},
		onPullDownRefresh() {
			this.reload(() => {
				this.app.stopPullDownRefresh()
				this.app.toast("刷新成功")

			})
		},
		onShareAppMessage() {

		},
	}
</script>

<style>

</style>
