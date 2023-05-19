<template>
	<view class="container">
		<view class="tui-bg-box">
			<!-- <image src="/static/images/login/bg_login.png" class="tui-bg-img"></image> -->
			<!-- <image src="/static/images/my/mine_def_touxiang_3x.png" class="tui-photo"></image> -->
			<!-- <image src="/static/images/avater_def_ff.png" class="tui-photo"></image> -->
			<view class="text-center-h">
				<image src="/static/images/logo.png?v=5" class="icon-login-avatar" mode="heightFix"></image>
				<!-- <image src="/static/images/avater_def_sl.png?v=4" class="icon-login-avatar" mode="heightFix"></image> -->
				<!-- <image src="/static/images/avater_def_sl_back.png" class="icon-login-avatar" mode="heightFix"></image> -->
			</view>
			<view class="text-center-h pl">
				<view class="tui-login-name">欢迎回来！</view>
			</view>
		</view>
			<view class="tui-login-from">
				<view class="tui-line-cell">
					<tui-icon name="mobile" :size="20" color='#fa5151'></tui-icon>
					<input placeholder-class="phcolor" class="tui-input" placeholder="请输入手机号码/账号" maxlength="64" v-model="model.phone"
					 type="text"  />
				</view>
				<view class="tui-line-cell pt" v-show="login_type == '0'">
					<tui-icon name="pwd" :size="20" color='#fa5151'></tui-icon>
					<input placeholder-class="phcolor" class="tui-input" v-model="model.code"  placeholder="请输入验证码" maxlength="64" 
					 type="number" @confirm="onLogin"/>
					<tui-button size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</tui-button>
				</view>
				
				<view class="tui-line-cell pt" v-show="login_type == '1'">
					<tui-icon name="pwd" :size="20" color='#fa5151'></tui-icon>
					<input placeholder-class="phcolor" class="tui-input" placeholder="请输入密码" maxlength="64" 
					 password v-model="model.password" @confirm="onLogin"/>
				</view>
				
				<view class="tui-line-cell box">
					<text class="text-main text-sm" @tap="onLoginTypePassword">密码登录</text>
					<text class="text-main text-sm" @tap="onLoginTypeSms">短信登录</text>
				</view>
                
				<button class="btn-main tui-btn-submit" hover-class="btn-hover" @tap="onLogin">登录</button>
                
                <view class="tui-line-cell box mt-lg">
					<text class="text-main text-sm" @tap="onResetPasswordAll">找回密码</text>
					
					<!--0000 <text class="text-main text-sm" @tap="onResetPassword">找回密码</text> -->
                	<!--0000 <text class="text-main text-sm" @tap="onResetPassword">找回密码</text> -->
                	<text class="text-main text-sm" @tap="onRegister">注册账号</text>
                </view>
                
				<view class="tui-protocol rows" hover-class="opcity" :hover-stay-time="150">
					<checkbox-group class="text-center-v" @change="onCheckInter" >
						<label class="rows ">
							<checkbox class="checkbox checkbox-danger checkbox-warning checkbox-main"  :checked='check_inter'></checkbox>
							<text class="">阅读并同意</text>
						</label>
					</checkbox-group>
					<text class="text-sec" @tap="protocol">《用户协议》</text>
					<text class="text-sec" @tap="privacy_policy">《隐私政策》</text>
				</view>
				
				<!-- <view @tap="onLoginWx">微信</view> -->
                

			</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import tuiIcon from "@/components/icon/icon"
	import tuiButton from "@/components/button/button"
	const util = require('../../utils/util.js')
	export default {
		components: {
			tuiIcon,
			tuiButton
		},
		data() {
			return {
				app: this.app,
				model:{
					phone:'',
					code:'',
					password:'',
				},
				login_type:'1',
				
				disabled: false,
				btnText: "获取验证码",
				type: "main",
				
				check_inter: false,
				
				login_config: {},
			}
		},
		methods: {
			...mapMutations(['login']),
			onCheckInter:function(e){
				this.check_inter = !this.check_inter
				uni.setStorageSync('check_inter', this.check_inter?'1':'0');
			},
			onInput(e) {
			    this.model[this.app.ed(e).key] = this.app.ev(e)
			},
			onLoginTypePassword(){
				this.model.code = ''
				this.login_type = '1'
			},	
			onLoginTypeSms(){
				this.model.password = ''
				this.login_type = '0'
			},			
            onRegister(){
				if(this.login_config.is_sms == '1'){
					this.app.go('/pages/login/register')
				}else{
					this.app.go('/pages/login/register_username')
				}
            },
			onResetPassword(){
				if(this.login_config.is_sms == '1'){
					this.app.go('/pages/login/reset_password')
				}else{
					this.app.go('/pages/login/reset_password_by_old')
				}
            },
			onResetPasswordAll(){
				if(this.login_config.is_sms == '1'){
					this.app.go('/pages/login/reset_password_all')
				}else{
					this.app.go('/pages/login/reset_password_by_old')
				}
			},
			getRandom: function(u) {
				let rnd = "";
				u = u || 6;
				for (var i = 0; i < u; i++) {
					rnd += Math.floor(Math.random() * 10);
				}
				return Number(rnd);
			},
			doLoop: function(seconds) {
				//let code = this.getRandom(6);
				//this.tui.toast('您本次的验证码是：' + code, 5000);
				seconds = seconds ? seconds : 60;
				this.btnText = seconds + "s后获取";
				// this.code = code
				let countdown = setInterval(() => {
					if (seconds > 0) {
						this.btnText = seconds + "s后获取"
							--seconds;
					} else {
						this.btnText = "获取验证码";
						this.disabled = false;
						this.type = "primary";
						clearInterval(countdown);
					}
				}, 1000);
			},
			btnSend: function() {
				let phone = this.model.phone
				let code = this.model.code
				let password = this.model.password
				
				if (util.isNullOrEmpty(phone)) {
					this.app.toast('请输入手机号码');
					return
				} else if (!util.isMobile(phone)) {
					this.app.toast('请输入正确的手机号码');
					return
				}
				this.disabled = true;
				this.btnText = "请稍候...";
				this.type = "gray"
                
                
                this.app.postHtml('api/login/login_send_code', {
                    phone: phone
                }, json => {
                    if(json.code == '0'){
                        //this.code = json.data.code
                        //this.app.toast(this.code + '')
                        this.doLoop(60)
                    }else{
                        this.app.toast(json.data)
                    }
                })
			},
			//弃用
			formLogin: function(e) {
				let phone = e.detail.value.phone;
				let code = e.detail.value.code;
				let password = e.detail.value.password;
				if (util.isNullOrEmpty(phone)) {
					this.app.toast('请输入手机号码');
					return
				} 
				 if (!util.isMobile(phone)) {
					this.app.toast('请输入正确的手机号码');
					return
				} 
				if(this.login_type == '0'){
					if (util.isNullOrEmpty(code)) {
						this.app.toast('请输入验证码');
						return
					} 
				}else{
					if (util.isNullOrEmpty(password)) {
						this.app.toast('请输入密码');
						return
					} 
				}
				
				if(!this.check_inter){
					this.app.toast('请同意协议');
					return
				}


				uni.setStorageSync("thorui_mobile", util.formatNum(mobile));
				uni.setStorageSync("phone", util.formatNum(mobile));
				let state = {
					mobile: util.formatNum(mobile),
					isLogin: true,
					memberId: 0
				};
				//this.login(state);
				
				let actionCheck = () => {
					const did = uni.getStorageSync('did')
					
					let param = {}
					//#ifdef APP-PLUS
					// if(plus && plus.push && plus.push.getClientInfo()){
					// 	let info = plus.push.getClientInfo()
					// 	param.push_id = info.id
					// 	param.push_token = info.token
					// 	param.push_client_id = info.clientid
					// 	param.push_app_id = info.appid
					// 	param.push_app_key = info.appkey
					// }
					//#endif  
					this.app.postHtml('api/login/login_phone', {
					    phone: mobile,
					    code: loginCode,
					    password: password,
						did: did,
						...param,
					}, json => {
					    if(json.code == '0'){
					        this.app.setUser(json.data)
					        this.app.toast("登录成功");
					        // this.app.goOne('/pages/index/index')
					        this.app.goOne('/pages/love/love')
					    }else{
					        this.app.toast(json.data);
					    }
					})
				}
				//uni.setStorageSync('did', '')
				
				const did = uni.getStorageSync('did')
				if(did){
					actionCheck()
				}else{  //get_did
					this.app.postHtml('api/login/get_did', {}, json => {
						if(json.code == '0'){
							uni.setStorageSync('did', json.data)
							actionCheck()
						}else{
							this.app.toast('获取did失败')
						}
						
					})
				}
                

                
			},
			protocol: function() {
				this.app.go('/pages/login/editor', {tag: 'user_agreement'})
			},
			privacy_policy: function() {
				this.app.go('/pages/login/editor', {tag: 'privacy_policy'})
			},
			onLogin(){
				
				let phone = this.model.phone
				let code = this.model.code
				let password = this.model.password
				if (util.isNullOrEmpty(phone)) {
					this.app.toast('请输入手机/账号');
					return
				} 
				//  if (!util.isMobile(phone)) {
				// 	this.app.toast('请输入正确的手机号码');
				// 	return
				// } 
				if(this.login_type == '0'){
					if (util.isNullOrEmpty(code)) {
						this.app.toast('请输入验证码');
						return
					} 
				}else{
					if (util.isNullOrEmpty(password)) {
						this.app.toast('请输入密码');
						return
					} 
				}
				
				if(!this.check_inter){
					this.app.toast('请同意协议');
					return
				}
				
				
				uni.setStorageSync('phone', phone);
				let actionCheck = () => {
					const did = uni.getStorageSync('did')
					
					let param = {}
					//#ifdef APP-PLUS
					// if(plus && plus.push && plus.push.getClientInfo()){
					// 	let info = plus.push.getClientInfo()
					// 	param.push_id = info.id
					// 	param.push_token = info.token
					// 	param.push_client_id = info.clientid
					// 	param.push_app_id = info.appid
					// 	param.push_app_key = info.appkey
					// }
					//#endif  
					this.app.postHtml('api/login/login_phone_username', {
					    phone: phone,
					    code: code,
					    password: password,
						did: did,
						...param,
					}, json => {
					    if(json.code == '0'){
					        this.app.setUser(json.data)
					        this.app.toast("登录成功");
					        // this.app.goOne('/pages/index/index')
							this.app.goOne('/pages/love/love')
							
					    }else{
					        this.app.toast(json.data);
					    }
					})
				}
				
				const did = uni.getStorageSync('did')
				if(did){
					actionCheck()
				}else{  //get_did
					this.app.postHtml('api/login/get_did', {}, json => {
						if(json.code == '0'){
							uni.setStorageSync('did', json.data)
							actionCheck()
						}else{
							this.app.toast('获取did失败')
						}
						
					})
				}
				
			},
			onLoginWx(){				
				this.app.oneLogin(actionLogin => {
					this.app.getWx(wx => {
						this.app.goOne('/pages/index/index')
					})
				})
			},
			onLoginAli(){
				this.app.oneLogin(actionLogin => {
					this.app.getWx(wx => {
						this.app.goOne('/pages/index/index')
					})
				})
			},
		},
		onLoad() {
			this.model.phone = uni.getStorageSync('phone', '');
			this.check_inter = uni.getStorageSync('check_inter', '') == '1'?true:false
			
		},
		onShow() {
			this.app.postHtml('api/login/login_config', {
			}, json => {
				let {code, data} = json
			    if(code == '0'){
			        this.login_config = data
			    }else{
			        this.app.toast(data)
			    }
			})
			
			
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.tui-bg-box {
		width: 100%;
		box-sizing: border-box;
		position: relative;
		padding-top: 60rpx;
	}

	.tui-photo {
		height: 138rpx;
		width: 138rpx;
		display: block;
		margin: 10rpx auto 0 auto;
		border-radius: 50%;
		position: relative;
		z-index: 2;
	}

	.tui-login-name {
		height: 40rpx;
		font-size: 30rpx;
		color: #999;
		margin: 36rpx auto 0 auto;
		text-align: center;
		position: relative;
		z-index: 2;
	}

	.tui-bg-img {
		width: 100%;
		height: 346rpx;
		display: block;
		position: absolute;
		top: 0;
	}

	.tui-login-from {
		width: 100%;
		padding: 128rpx 104rpx 0 104rpx;
		box-sizing: border-box;
	}

	.tui-input {
		font-size: 32rpx;
		flex: 1;
		display: inline-block;
		padding-left: 32rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-line-cell {
		padding: 27rpx 0;
		display: -webkit-flex;
		display: flex;
		-webkiit-align-items: center;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
	}

	.tui-line-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #e0e0e0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tui-top28 {
		margin-top: 28rpx;
	}

	.tui-btn-class {
		width: 196rpx !important;
		height: 54rpx !important;
		border-radius: 27rpx !important;
		font-size: 28rpx !important;
		padding: 0 !important;
		line-height: 54rpx !important;
	}

	.tui-btn-submit {
		margin-top: 100rpx;
	}

	.tui-protocol {
		color: #333;
		font-size: 24rpx;
		text-align: center;
		width: 100%;
		margin-top: 29rpx;
	}

.icon-login-avatar{
	height: 150rpx;
	border-radius: 10rpx;
}

</style>
