<template>
	<view>
		<view style="height: 100rpx;"></view>
		<view class="text-center text-md">
			审核未通过
		</view>
		
		<view class=" pl pr pt text-color-6">
			以下是未通过的原因
		</view>
		
		<view class=" pl pr pt pb text-color-6 border mt-lg mb-lg">
			{{user.check_text}}
		</view>
		
		<view style="height: 100rpx;"></view>
		
		<view class="text-center  pp btn-warning" @tap="changeUserEdit">
			编辑资料
		</view>
		
		<view class="text-center mt-lg pp btn-success" @tap="changeUser">
			重新注册
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
			
			changeUserEdit(){
				// this.app.go('/pages/login/register')
				this.app.go('/pages/login/register_back')
			},
		},
		onShow() {
			this.app.post('api/user/info', {}, json => {
			    this.user = json
			})			
		},
	}
</script>

<style>

</style>
