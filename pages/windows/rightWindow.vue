<template>
	<view>
		<detail ref="/pages/message/message" :text="detail"></detail>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: 'asf '

			}
		},
		methods: {

		},
		created(e) {
			//监听自定义事件，该事件由左侧列表页的点击触发
			uni.$on('updateDetail', (e) => {
				this.detail = decodeURIComponent(e.detail)
				// 执行 detailPage组件，即：/pages/detail/detail.vue 页面的load方法
				this.$refs.detailPage.load(e.detail);
			})
		}

	}
</script>

<style>

</style>
