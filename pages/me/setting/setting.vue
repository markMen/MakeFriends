<template>
	<view class="tui-userinfo-box">
	
		<!-- <tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell tui-pr30" @tap="onCleanCatch">
				<view>清除缓存</view>
				<view class="tui-content"></view>
			</view>
		</tui-list-cell> -->
		
		<tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell tui-pr30" @tap="onRestPassword">
				<view>密码重置</view>
				<view class="tui-content"></view>
			</view>
		</tui-list-cell>
		
		<tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell tui-pr30" @tap="onAbout"> 
				<view class="rows">关于遇见良人 <tui-badge v-if="app.data.is_version" class="ml-xs" type="danger" :dot="true" ></tui-badge></view>
				<view class="tui-content"></view>
			</view>
		</tui-list-cell>
		
		<tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell tui-pr30" @tap="onServer">
				<view>遇见良人客服</view>
				<view class="tui-content"></view>
			</view>
		</tui-list-cell>
		
<!-- 		<tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell tui-pr30" @tap="onTaskLog">
				<view>历史公告</view>
				<view class="tui-content"></view>
			</view>
		</tui-list-cell> -->
		
<!-- 		<tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell tui-pr30" @tap="onWx">
				<view>绑定微信</view>
				<view class="tui-content"></view>
			</view>
		</tui-list-cell> -->
		
<!-- 		<view class="rows pt-lg pl pr">
			<button class=" btn-block btn-logout" @tap="onMeDel">注销用户</button>
		</view> -->

		<view class="rows pt-lg pl pr">
			<button class=" btn-block btn-logout text-main" @tap="onLogout">退出登录</button>
		</view>
		
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	import tuiListCell from "@/components/list-cell/list-cell"
	import listImg from "@/components/list-img/list-img"
	import listImgPre from "@/components/list-img-pre/list-img-pre"
	
	import tuiBadge from "@/components/badge/badge"
	
	export default {
		components: {
			tuiListCell,
			listImg,
			listImgPre,
			tuiBadge,
			
		},
		data() {
			return {
				app: this.app,
				user: {},
				fs: [],
				sex_list: ['请选择', '男', '女'],
				sex_index: 0,
				startDate: '',
				endDate: '',
				
				login_config: {},
				
			}
		},
		methods: {
			reload(){
				this.startDate = '1900-01-01'
				this.endDate = this.getDate('end')
				
				this.app.post('api/user/info', {}, json => {
					if (!json.birthday) {
						json.birthday = '1990-01-01'
					}
					if (!json.gender) {
						json.gender = 0
					}
					this.user = json
				})
				
			},
            previewImage(e) {
                this.app.previewImage(e)
            },
			onCompanyDesc(e){
				this.app.go('/pages/me/me_edit/me_edit')				
			},
			onZhifubao(e){
				this.app.go('/pages/me/me_edit/me_edit_ali')				
			},
			onAvatar() {
				this.app.chooseImage(fs => {
					this.fs = fs

					this.app.uploadFiles('api/user/upload_file', this.fs, info => {
						console.log(info[0].saveName)
						this.user.type_avatar = '1'
						this.user.avatar = this.app.upload + info[0].saveName
						this.user.file_avatar = info[0].saveName
						this.onSave()
					})

				}, 1 )
			},
			onNickname() {
				this.app.go('/pages/me/me_edit')
			},
			onSave() {
				this.app.post('api/user/save', { ...this.user
				}, json => {
					this.reload()
					this.app.toast('保存成功')
				})
			},
			onChangeSex(e) {
				let sex = this.app.ev(e)
				console.log(sex)
				this.user.gender = sex
				this.onSave()
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindDateChange(e) {
				this.user.birthday = e.target.value

				this.onSave()
			},
			onLogout() {
				this.app.msgSys('退出登录！', is => {
					if (is) {
						this.app.go('/pages/login/logout')
					}
				})
			},
			onMeDel() {
				this.app.go('/pages/me/me_del')
			},
			onWxUserInfo() {
				this.app.getWxOpenid(auth => {
					this.user.wx_openid = auth.openid
					this.app.getUserInfo(userInfo => {
						// nickName	String	用户昵称
						// openId	String	该服务商唯一用户标识	App
						// avatarUrl	String	用户头像
						/*
						avatarUrl: "http://thirdwx.qlogo.cn/mmopen/vi_32/9icibDC1CiaOaBnWhwEEAHzbtdzBbUovalnB1VokJ5aOzqPfcjpoIZfTDhWmeo0uHsLmucibD8KTysCNPFSsdVVBibg/132"
						city: ""
						country: ""
						gender: 0
						nickName: "胡小花。"
						openId: "oRrdQtwnHc1MbajEkrA8_V3ZM14g"
						province: ""
						unionId: "oU5Yyt5x1Fn9qHVg5jkriCT6b_no"
						*/
						this.user.type_avatar = '2'
						// this.user.avatar = userInfo.avatarUrl
						this.user.wx_avatar = userInfo.avatarUrl
						this.user.wx_nickname = userInfo.nickName
						
						
						this.user.gender = userInfo.gender
						this.user.union_id = userInfo.unionId
						this.user.city = userInfo.city
						this.user.country = userInfo.country
						this.user.province = userInfo.province
					
						this.onSave()
						console.log(userInfo)
					})
				})		
			},
			onAliUserInfo(){
				app.get('payment/wxpayv3/index.php', {
				}, json => {
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: json,
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
							if (invoke) invoke(res)
						},
						fail: function(err) {
							app.toast('取消支付')
							// app.msg('', JSON.stringify(err))
							console.log('fail:' + JSON.stringify(err));
						}
					});
				})
			},
			on_company_imgs(){
				this.app.go('/pages/me/user_img')
			},
			on_product_imgs(){
				this.app.go('/pages/me/user_product_img')
			},
			onRestPassword(){
				if(this.login_config.is_sms == '1'){
					this.app.go('/pages/login/reset_password')
				}else{
					this.app.go('/pages/login/reset_password_by_old')
				}
			},
			onAbout(){
				// this.app.go('/pages/me/about')
				this.app.go('/pages/login/editor', {tag: 'about'})
				
			},
			onServer(){
				// this.app.go('/pages/me/server')
				this.app.go('/pages/me/server/server_list')
			},
			onWx(){
				this.app.getWxOpenid(auth => {
					this.user.wx_openid = auth.openid
					this.onSave()
				})				
			},
			onName(){
				this.app.go('/pages/me/me_edit/me_edit_name')
			},
			onTaskLog(){
				this.app.go('/pages/me/task/task_log')
			},
			goWxBind(){
				this.app.go('/pages/me/wx/wx_user_info')
			},
			
			onCleanCatch(){
				try {
					uni.clearStorageSync();
				} catch (e) {
					// error
					this.app.toastNone('清除错误')
				}
				this.app.toas('清除完成')
			},
		},
		onLoad() {
			//this.reload()
			this.app.postHtml('api/login/login_config', {
			}, json => {
				let {code, data} = json
			    if(code == '0'){
			        this.login_config = data
			    }else{
			        this.app.toast(data)
			    }
			})
		},
		onShow() {
			this.app.checkUser()
			this.reload()
			
		},
	}
</script>

<style>
	.tui-userinfo-box {
		padding-bottom: 20rpx;
		color: #333;
	}

	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 60rpx 24rpx 30rpx;
		font-size: 30rpx;
	}

	.tui-pr30 {
		padding-right: 30rpx;
	}

	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}

	.tui-content {
		font-size: 26rpx;
		color: #666;
	}
	
	.tui-avatar-wx {
		width: 50rpx;
		height: 50rpx;
		display: block;
	}

</style>
