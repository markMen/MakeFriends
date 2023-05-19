<template>
	<view class="pp">
		<view class="text-center-h">注销</view>
		<view class="">您的宝贵建议</view>
		<textarea value="" placeholder="您的宝贵建议"  class="full-width" data-key='del_text' @input="onInput"/>
		
		
		

		<view class="rows pt">
		    <view class="form-text-left form-text-left">默认的手机号</view>
		    <view class="form-text-right">
		        <text data-key='price' >{{user.phone}}</text>
		    </view>
		</view>
		
		<view class="rows pt">
			<view class="form-text-left form-text-left">验证码</view>
		    <view class="form-text-right">
		        <input data-key='phone_code' @input="onInput" value="" type="digit" placeholder="请输入验证码" maxlength="6">
		    </view>
			<view class="form-text-left form-text-left" @tap="phoneCode.onCode()">{{phoneCode.text}}</view>
		</view>
		
		<view class="rows pt">
		    <view class="form-text-left form-text-left">密码</view>
		    <view class="form-text-right">
		        <input data-key='password' @input="onInput" value="" type="password" placeholder="请输入密码" >
		    </view>
		</view>

		
		<view class="box pt-lg mt-lg">
			<button class="btn btn-dark" style="width: 250rpx;" @tap="app.back()">返回</button>
			<button class="btn btn-danger" style="width: 250rpx;" @tap="onDelUser()">提交</button>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				app: this.app,
				user: {},
				phoneCode: null,
				model:{},
			}
		},
		methods: {
			onInput(e) {
			    this.model[this.app.ed(e).key] = this.app.ev(e)
			},
			onDelUser(){
				this.app.msg('确定注销','注销后将会删除此账号的数据' , is => {
					if(is){
						this.app.post('api/user/edit_user_del', {
							del: '-3',
							phone_code: this.model.phone_code,
							del_text: this.model.del_text,
							password: this.model.password,
						}, json => {
							if(json.code == '0'){
							    //this.code = json.data.code
							    // this.app.toast(this.code + '')
								this.app.toast('注销成功')
								this.app.goc('/pages/me/me_del_ing')
							}else{
							    this.app.toast(json.data)
							}
							
						})
					}
				})
				

			},
		},
		onShow() {
			this.phoneCode = new this.app.PhoneCode( () =>  {
				this.app.postHtml('api/login/login_send_code', {
				    phone: this.user.phone
				}, json => {
				    if(json.code == '0'){
				        //this.code = json.data.code
				        // this.app.toast(this.code + '')
						this.app.toast('发送成功')
				    }else{
				        this.app.toast(json.data)
				    }
				})
				console.log('发送验证码')
			})
			
			this.app.post('api/user/info', {}, json => {
				this.user = json
			})
		},
		
	}
</script>

<style>

</style>
