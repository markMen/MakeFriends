<template>
	<view>
		<view class="text-center-hv">加载中…</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
        onLoad() {
            this.app.getOpenid(openid => {
                console.log(openid)
                this.app.goTab('/pages/index/index')
            })
        }
	}
</script>

<style>

</style>
