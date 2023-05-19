<template>
	<view>
		<view style="height: 100rpx;"></view>
		<view class="text-center">
			正在等待审核...
		</view>
		
		<view class="text-center pl pr pt">
			审核时间在24小时内完成，经后台审核完成后，即可正常使用。
		</view>
		
		<view class="text-center mt-lg pp btn-primary" @tap="checkLoading">
			查看审核进度
		</view>
		
		
		<view style="height: 100rpx;"></view>
		
<!-- 		<view class="text-center  pp btn-warning" @tap="changeUserEdit">
			编辑资料
		</view> -->
		
		<view class="text-center mt-lg pp btn-success" @tap="changeUser">
			更换账号
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			changeUser(){
				this.app.setUser(null)
				//this.app.data.user = null
				this.app.goOne(this.app.loginPage)
			},
			changeUserEdit(){
				this.app.go('/pages/login/register')
			},
			checkLoading(){
				this.app.go('/pages/login/login_check_loading')
			},
		}
	}
</script>

<style>

</style>
