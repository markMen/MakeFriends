<template>
	<view>
		<web-view :src="url"></web-view>bv
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
			}
		},
		methods: {
			
		},
		onLoad(options) {
			if(options.url){
				this.url = options.url
			}
		}
	}
</script>

<style>

</style>
