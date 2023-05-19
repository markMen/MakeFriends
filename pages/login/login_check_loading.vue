<template>
	<view>
		<view style="height: 100rpx;"></view>
		<view class="cols ">
			<view class="text-center-h text-color-9">审核状态</view>
			
			<view class="text-center-h text-color-6 pt">
				<view  v-if="user.del == '0'" >
					审核通过
				</view>
				<view  v-else >
					正在等待审核...
				</view>
			</view>
			
		</view>
		
<!-- 		<view class="text-center pl pr pt">
			审核时间在24小时内完成，经后台审核完成后，即可正常使用。
		</view> -->
		
		<view style="height: 100rpx;"></view>
		
		<button v-if="user.del == '0'" class="text-center btn-success " @tap="checkUser">
			立即进入
		</button>
		<button  v-else class="text-center btn-success btn-success-disabled"  @tap="reload">
			立即进入
		</button>
		
		
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
			reload(){
				this.app.post('api/user/info', {}, json => {
					this.user = json
					let user = json
					if (user.del == '-2') {//审核不通过
						this.app.goc('/pages/login/login_check_no')
					}
					
				})
			},
			changeUser(){
				this.app.setUser(null)
				//this.app.data.user = null
				this.app.goOne(this.app.loginPage)
			},
			changeUserEdit(){
				this.app.go('/pages/login/register')
			},
			checkUser(){
				this.app.post('api/user/info', {}, json => {
					if(this.user.del == '0'){
						this.app.goTab('/pages/index/index')
					}
				})
			},
		},
		onLoad() {
			this.reload()
		}
	}
</script>

<style>

</style>
