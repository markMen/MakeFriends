<template>
	<view>



		<view class="cols text-color-6 mt-lg mb-lg">
			<view class="text-center-h">
				<image v-if="me.wx_avatar" :src="me.wx_avatar" class="avatar-wx" style=""></image>
				<image v-else src="/static/images/icon_wx.png" class="avatar-wx" style=""></image>


			</view>
			<view class="text-center-h pt" v-if="me.wx_nickname">{{me.wx_nickname}}</view>
			<view class="text-center-h pt text-color-9" v-else>绑定微信用于收款</view>
		</view>

		<view class="box ml mr">
			<view class="text-center-h">微信ID (用于收款)</view>
			<view class="text-center-h cols">
				<view v-if="me.wx_openid" class="text-center-h text-color-9 text-xs">
					{{me.wx_openid}}
				</view>
				<view v-else class="text-center-h text-color-9 text-sm">
					绑定后生成微信开放ID
				</view>
			</view>
		</view>

		<view class="box" style="padding: 100rpx 20rpx 0 20rpx;">
			<button v-if="me.wx_openid" class="btn-danger" style="width: 40vw;" @tap="onDelWx">解除绑定</button>
			<button v-else class="btn-disabled" style="width: 40vw;">解除绑定</button>

			<button v-if="me.wx_openid" class=" btn-disabled" style="width: 40vw;">微信绑定</button>
			<button v-else class="btn-success " style="width: 40vw;" @tap="onWxUserInfo">微信绑定</button>
		</view>

		<!-- 		<view class="rows" style="padding: 100rpx 20rpx 0 20rpx;">
		</view> -->


	</view>
</template>

<script>
	export default {
		data() {
			return {
				app: this.app,
				me: {},
			}
		},
		methods: {
			reload() {
				this.app.post('api/user/info', {}, json => {
					this.me = json
				})
			},
			onSave(invoke) {
				this.app.post('api/user/save', {
					...this.me,
				}, json => {
					this.reload()
					if (invoke) {
						invoke()
					} else {
						this.app.toast('保存成功')
					}
				})
			},
			onDelWx(e) {
				this.me.wx_openid = ''
				this.me.wx_avatar = ''
				this.me.wx_nickname = ''
				this.onSave(() => {
					this.app.toast('已解除绑定')
				})
			},

			onWxUserInfo() {
				this.app.getWxOpenid(auth => {
					this.me.wx_openid = auth.openid
					this.app.getUserInfo(userInfo => {

						this.me.type_avatar = '2'
						// this.me.avatar = userInfo.avatarUrl
						this.me.wx_avatar = userInfo.avatarUrl
						this.me.wx_nickname = userInfo.nickName


						this.me.gender = userInfo.gender
						this.me.union_id = userInfo.unionId
						this.me.city = userInfo.city
						this.me.country = userInfo.country
						this.me.province = userInfo.province

						this.onSave(() => {
							this.app.toast('微信绑定成功')
						})
						console.log(userInfo)
					})
				})
			},

			// onBindWx(e){
			// 	this.app.getWxOpenid(auth => {
			// 		this.me.wx_openid = auth.openid
			// 		this.onSave()
			// 	})	
			// },
		},
		onLoad() {
			this.reload()
		}
	}
</script>

<style>
	.avatar-wx {
		width: 200rpx;
		height: 200rpx;
		display: block;
		border-radius: 10%;
	}
</style>
