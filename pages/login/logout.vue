<template>
	<view>
		
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
		onShow() {
			this.app.post('api/login/logout_phone', {
			}, json => {
			    if(json.code == '0'){
			       this.app.data.user = null
			       this.app.setUser(null)
			       // this.app.goc('/pages/login/login')
			       this.app.goOne('/pages/login/login')
			    }else{
			        this.app.toast(json.data)
			    }
			})
			
			
		}
	}
</script>

<style>

</style>
