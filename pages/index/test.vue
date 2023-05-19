<template>
	<view>
		<button @tap="onTest">asdf</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onTest(){
				this.app.data.webSocket.send({
					type: 'chat',
					from_id: '7f0000010b5600000003',
					to_id: '7f0000010b5600000003',
					data: '啦啦啦',
					
				})
			}
		},
		onLoad() {

		}
	}
</script>

<style>

</style>
