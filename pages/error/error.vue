<template>
	<view>
		<view class="text-center-h text-lg">错误码: {{res.statusCode}}</view>
		<!-- <view class="pt">{{res.data}}</view> -->
		<view class="pt">
			<scroll-view class="scroll-view_H" scroll-x="true">
				<rich-text :nodes="res.data"></rich-text>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				res: {
					data: "123"
				}
			}
		},
		methods: {

		},
		onLoad(option) {
			let res = this.app.data.res
			if (res) {
				let data = res.data + ""
				data = data
					.replace(/<!DOCTYPE html>/g, "")
					.replace(/html/g, "div")
					.replace(/body/g, "div")

				res.data = data
				this.res = res

			} else {
				this.app.toast('无参数')
			}

		}
	}
</script>

<style>

</style>
