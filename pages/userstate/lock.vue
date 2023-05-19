<template>
	<view>
		<view style="height: 100rpx;"></view>

		<view class="text-center" >
			账号已经禁用！
		</view>
		
		<view class="text-center pl pr pt-lg">
			{{user.lock_text}}
		</view>
		
		<view class="mt-lg pt-lg"></view>
		
		<view class="text-center  pp btn-success" @tap="changeUser">
			更换账号
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
			}
		},
		methods: {
			changeUser(){
				this.app.setUser(null)
				//this.app.data.user = null
				this.app.goOne(this.app.loginPage)
			},
			onDelUserCancel(){
				
				this.app.msg('确定取消注销','' , is => {
					if(is){
						this.app.post('api/user/edit_user_del_cancel', {
							del: '0',
						}, json => {
							if(json.code == '0'){
								this.app.toast('取消成功')
								this.app.goTab('/pages/index/index')
							}else{
								this.app.toast(json.data)
							}
						})
					}
				})
				
				
			},
		},
		onShow() {
			if(this.app.data.user && this.app.data.user.openid){
				this.app.post('api/user/info', {}, json => {
				    this.user = json
				})			
			}
			
		},
	}
</script>

<style>

</style>
