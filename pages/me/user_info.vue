<template>
	<view class="tui-userinfo-box">

		<!-- 	<view class="rows  ">
		 	<view class=" text-width text-sm  full-width pt pb text-center" @tap="onAliUserInfo" style="background-color: #0C7AD7;">从支付宝获取头像昵称及手机号</view>
		 </view> -->

		<!--     <view class="rows  ">
        	<view class=" text-width text-sm  full-width pt pb text-center" @tap="onWxUserInfo" style="background-color: #44B549;">从微信获取头像昵称</view>
        </view> -->

		<!-- 		<tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell" @tap="onAvatar">
				<view>头像</view>
				<image v-if="user.avatar" :src="user.avatar" class="avater-chat-me"></image>
			</view>
		</tui-list-cell> -->


		<view class="text-center-hv mt mb"  >
			<view class="" @tap="onAvatar">
				<view class="text-center-h">
					<image v-if="user.avatar" :src="user.avatar" class="avater-chat-me"></image>
				</view>
				<view class="text-center-h text-color-6 pt-sm text-sm">
					编辑头像
				</view>
			</view>
		</view>

		<!-- 		<tui-list-cell padding="0" :hover="false">
			<view class="tui-list-cell tui-pr30">
				<view>手机</view>
				<view class="tui-content">{{user.phone}}</view>
			</view>
		</tui-list-cell> -->

		<tui-list-cell padding="0" :arrow="false">
			<view class="tui-list-cell">
				<view class="in-left rows">昵称<view class="in-left-pla text-center-v text-sm" v-if="!user.nickname">请输入</view></view>
				<input class="in-right " v-model="user.nickname" >
			</view>
		</tui-list-cell>

		<tui-list-cell padding="0" :arrow="false">
			<view class="tui-list-cell">
				<view class="in-left rows">微信<view class="in-left-pla text-center-v text-sm" v-if="!user.wx">请输入</view></view>
				<input class="in-right" v-model="user.wx" @input="onInWx">
			</view>
		</tui-list-cell>

		<view class="line-info"></view>
		
		
		<view class="">
			<ws-picker-selector class="" v-if="select_mode_group.find_men && user.gender == 1"
			@change="changePickerSelector" :range='select_mode_group.find_men.list' range_key="title"  
			:model_text='user.text_find' data_key="text_find" :is_show_region="false">
				<tui-list-cell padding="0" :arrow="true">
					<view class="tui-list-cell">
						<view class="in-left rows">寻找<view class="in-left-pla text-center-v text-sm" v-if="!user.text_find">请选择</view></view>
						<view class="">{{user.text_find}}</view>
					</view>
				</tui-list-cell>
			</ws-picker-selector>
			
			<ws-picker-selector class="" v-if="select_mode_group.find_women && user.gender == 2"
			@change="changePickerSelector" :range='select_mode_group.find_women.list' range_key="title"  
			:model_text='user.text_find' data_key="text_find" :is_show_region="false">
				<tui-list-cell padding="0" :arrow="true">
					<view class="tui-list-cell">
						<view class="in-left rows">寻找<view class="in-left-pla text-center-v text-sm" v-if="!user.text_find">请选择</view></view>
						<view class="">{{user.text_find}}</view>
					</view>
				</tui-list-cell>
			</ws-picker-selector>
		</view>
		
		
		<ws-picker-selector class="" v-if="select_mode_group.expect"
		@change="changePickerSelector" :range='select_mode_group.expect.list' range_key="title"  
		:model_text='user.text_hope' data_key="text_hope" :is_show_region="false">
			<tui-list-cell padding="0" :arrow="true">
				<view class="tui-list-cell">
					<view class="in-left rows">期望<view class="in-left-pla text-center-v text-sm" v-if="!user.text_hope">请选择</view></view>
					<view class="">{{user.text_hope}}</view>
				</view>
			</tui-list-cell>
		</ws-picker-selector>
		
		
		<tui-list-cell padding="0" :arrow="false">
			<view class="tui-list-cell">
				<view class="in-left rows">自我介绍<view class="in-left-pla text-center-v text-sm" v-if="!user.company_desc">请输入</view></view>
				<input class="in-right" v-model="user.company_desc" @input="onInDesc">
			</view>
		</tui-list-cell>

		<view class="line-info"></view>

		
		
		<ws-picker-selector class=" " v-if="select_mode_group.age_list"
		@change="changePickerSelector" :range='select_mode_group.age_list.list' range_key="title"  
		:model_text='user.age' data_key="age"  :is_show_region="false">
			<tui-list-cell padding="0" :arrow="true" >
				<view class="tui-list-cell">
					<view class="in-left rows">年龄<view class="in-left-pla text-center-v text-sm" v-if="!user.age">请选择</view></view>
					<view class="in-right">{{user.age}}</view>
				</view>
			</tui-list-cell>
		</ws-picker-selector>
		
		<ws-picker-selector class=" " v-if="select_mode_group.height_list"
		@change="changePickerSelector" :range='select_mode_group.height_list.list' range_key="title"  
		:model_text='user.height' data_key="height" :is_show_region="false">
			<tui-list-cell padding="0" :arrow="true">
				<view class="tui-list-cell">
					<view class="in-left rows">身高（cm）<view class="in-left-pla text-center-v text-sm" v-if="!user.height">请选择</view></view>
					<!-- <input class="in-right" v-model="user.height"> -->
					<view class="in-right">{{user.height}}</view>
				</view>
			</tui-list-cell>
		</ws-picker-selector>
		
		<ws-picker-selector class=" " v-if="select_mode_group.weight_list"
		@change="changePickerSelector" :range='select_mode_group.weight_list.list' range_key="title"  
		:model_text='user.weight' data_key="weight" :is_show_region="false">
			<tui-list-cell padding="0" :arrow="true">
				<view class="tui-list-cell">
					<view class="in-left rows">体重（kg）<view class="in-left-pla text-center-v text-sm" v-if="!user.weight">请选择</view></view>
					<!-- <input class="in-right" v-model="user.weight"> -->
					<view class="in-right">{{user.weight}}</view>
				</view>
			</tui-list-cell>
		</ws-picker-selector>
		

		<view class="">
			<ws-picker-selector class="" v-if="select_mode_group.shape_men && user.gender == 1"
			@change="changePickerSelector" :range='select_mode_group.shape_men.list' range_key="title"  
			:model_text='user.figure' data_key="figure" :is_show_region="false">
				<tui-list-cell padding="0" :arrow="true">
					<view class="tui-list-cell">
						<view class="in-left rows">体型<view class="in-left-pla text-center-v text-sm" v-if="!user.figure">请选择</view></view>
						<view class="in-right">{{user.figure}}</view>
					</view>
				</tui-list-cell>
			</ws-picker-selector>
			
			<ws-picker-selector class="in-right" v-if="select_mode_group.shape_women && user.gender == 2"
			@change="changePickerSelector" :range='select_mode_group.shape_women.list' range_key="title"  
			:model_text='user.figure' data_key="figure" :is_show_region="false">
				<tui-list-cell padding="0" :arrow="true">
					<view class="tui-list-cell">
						<view class="in-left rows">体型<view class="in-left-pla text-center-v text-sm" v-if="!user.figure">请选择</view></view>
						<view class="in-right">{{user.figure}}</view>
					</view>
				</tui-list-cell>
			</ws-picker-selector>
		</view>
		

		<view class="">
			<ws-picker-selector class="" v-if="select_mode_group.job_men && user.gender == 1"
			@change="changePickerSelector" :range='select_mode_group.job_men.list' range_key="title"  
			:model_text='user.job' data_key="job" :is_show_region="false">
				<tui-list-cell padding="0" :arrow="true">
					<view class="tui-list-cell">
						<view class="in-left rows">职业<view class="in-left-pla text-center-v text-sm" v-if="!user.job">请选择</view></view>
						<view class="in-right">{{user.job}}</view>
					</view>
				</tui-list-cell>
			</ws-picker-selector>
			
			<ws-picker-selector class="" v-if="select_mode_group.job_women && user.gender == 2"
			@change="changePickerSelector" :range='select_mode_group.job_women.list' range_key="title"  
			:model_text='user.job' data_key="job" :is_show_region="false">
				<tui-list-cell padding="0" :arrow="true">
					<view class="tui-list-cell">
						<view class="in-left rows">职业<view class="in-left-pla text-center-v text-sm" v-if="!user.job">请选择</view></view>
						<view class="in-right">{{user.job}}</view>
					</view>
				</tui-list-cell>
			</ws-picker-selector>		
		</view>
		
		
		<ws-picker-selector class="" v-if="select_mode_group.edu"
		@change="changePickerSelector" :range='select_mode_group.edu.list' range_key="title"  
		:model_text='user.edu' data_key="edu" :is_show_region="false">
			<tui-list-cell padding="0" :arrow="true">
				<view class="tui-list-cell">
					<view class="in-left rows">学历<view class="in-left-pla text-center-v text-sm" v-if="!user.edu">请选择</view></view>
					<view class="in-right">{{user.edu}}</view>
				</view>
			</tui-list-cell>
		</ws-picker-selector>
		
		<ws-picker-selector class="" v-if="select_mode_group.smoking"
		@change="changePickerSelector" :range='select_mode_group.smoking.list' range_key="title"  
		:model_text='user.smoking' data_key="smoking" :is_show_region="false">
			<tui-list-cell padding="0" :arrow="true">
				<view class="tui-list-cell">
					<view class="in-left rows">抽烟<view class="in-left-pla text-center-v text-sm" v-if="!user.smoking">请选择</view></view>
					<view class="in-right">{{user.smoking}}</view>
				</view>
			</tui-list-cell>
		</ws-picker-selector>
		
		
		<ws-picker-selector class="" v-if="select_mode_group.drink"
		@change="changePickerSelector" :range='select_mode_group.drink.list' range_key="title"  
		:model_text='user.wine' data_key="wine" :is_show_region="false">
			<tui-list-cell padding="0" :arrow="true">
				<view class="tui-list-cell">
					<view class="in-left rows">饮酒<view class="in-left-pla text-center-v text-sm" v-if="!user.wine">请选择</view></view>
					<view class="in-right">{{user.wine}}</view>
				</view>
			</tui-list-cell>
		</ws-picker-selector>
		
		<ws-picker-selector class="in-right" v-if="select_mode_group.emotion"
		@change="changePickerSelector" :range='select_mode_group.emotion.list' range_key="title"  
		:model_text='user.marriage' data_key="marriage" :is_show_region="false">
			<tui-list-cell padding="0" :arrow="true">
				<view class="tui-list-cell">
					<view class="in-left rows">婚姻<view class="in-left-pla text-center-v text-sm" v-if="!user.marriage">请选择</view></view>
					<view class="in-right">{{user.marriage}}</view>
				</view>
			</tui-list-cell>
		</ws-picker-selector>
		
		<ws-picker-selector class="in-right" v-if="select_mode_group.income"
		@change="changePickerSelector" :range='select_mode_group.income.list' range_key="title"  
		:model_text='user.income' data_key="income" :is_show_region="false">
			<tui-list-cell padding="0" :arrow="true">
				<view class="tui-list-cell">
					<view class="in-left rows">收入<view class="in-left-pla text-center-v text-sm" v-if="!user.income">请选择</view></view>
					<view class="in-right">{{user.income}}</view>
				</view>
			</tui-list-cell>
		</ws-picker-selector>
		

		<view class="line-info"></view>

		<tui-list-cell :arrow="true" padding="0">
			<view class="tui-list-cell">
				<view class="in-left rows">家乡城市<view class="in-left-pla text-center-v text-sm" v-if="!user.address_json">请选择</view></view>
				<view class="in-right">
					<ws-region :value_json="user.address_json" @change="changeWsRegion"></ws-region>
				</view>
			</view>
		</tui-list-cell>
		
		<tui-list-cell :arrow="true" padding="0">
			<view class="tui-list-cell">
				<view class="in-left rows">工作城市<view class="in-left-pla text-center-v text-sm" v-if="!user.address_sec_json">请选择</view></view>
				<view class="in-right">
					<ws-region :value_json="user.address_sec_json" @change="changeWsRegionSec"></ws-region>
				</view>
			</view>
		</tui-list-cell>

		<!-- <tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell" @tap="goWxBind">
				<view>微信ID (用于收款)</view>
				<view class="text-xs cols">
					<view class="text-xs text-color-9" >
						{{user.wx_openid}}
					</view>
				
					<view class="box text-color-6">
						<view></view>
						<view class="rows">
							<view class=" text-xs">
								<image v-if="user.avatar" :src="user.wx_avatar" class="tui-avatar-wx"></image>
							</view>
							<view class="text-center-v">{{user.wx_nickname}}</view>
						</view>
					</view>
				</view>				
				
			</view>			
		</tui-list-cell> -->

		<!-- <tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell" @tap="onZhifubao">
				<view>支付宝账号 (用于收款)</view>
				<view class=" text-xs">{{user.zhifubao}}</view>
			</view>
		</tui-list-cell> -->

		<!-- <tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell" @tap="onName">
				<view>真实姓名 (用于收款)</view>
				<view class=" tui-content">{{user.name}}</view>
			</view>
		</tui-list-cell> -->

		<!-- 		<picker :range="sex_list" :value="user.gender" @change="onChangeSex">
			<tui-list-cell padding="0" :arrow="true">
				<view class="tui-list-cell">
					<view>性别</view>
					<view class="tui-content">
						<view class="uni-input">{{sex_list[user.gender]}}</view>
					</view>
				</view>

			</tui-list-cell>
		</picker> -->

		<!-- 		<picker id="birthday" mode="date" :value="user.birthday" :start="startDate" :end="endDate"
			@change="bindDateChange">
			<tui-list-cell padding="0" :arrow="true" :last="true">
				<label for="birthday" class="tui-list-cell">
					<view>出生日期</view>
					<view class="tui-content">
						<view class="uni-list-cell-db">
							<view class="uni-input">{{user.birthday}}</view>
						</view>
					</view>
				</label>
			</tui-list-cell>
		</picker> -->

		<!-- 		<tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell" @tap="onCompanyDesc" data-field="company_desc" data-field_title="公司简介">
				<view style="min-width: 200rpx;">自我介绍</view>
				<view class="tui-content ">{{user.company_desc}}</view>
			</view>
		</tui-list-cell> -->

		<!-- 		<tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell" @tap="on_company_imgs">
				<view style="min-width: 200rpx;">我的写真:</view>
				<view class="full-width" style="width: 500rpx;">
					<list-img-pre :imgs="user.company_imgs" :prefix="app.upload">
					</list-img-pre>
				</view>
			</view>
		</tui-list-cell> -->
		<!-- 		<tui-list-cell padding="0" :arrow="true">
			<view class="tui-list-cell" @tap="on_product_imgs">
				<view style="min-width: 200rpx;">个人展示:</view>
				<view class="full-width" style="width: 500rpx;">
					<list-img-pre :imgs="user.product_imgs" :prefix="app.upload">
					</list-img-pre>
				</view>
			</view>
		</tui-list-cell> -->

		<view class='pt-lg'></view>
		<view class="rows pt-lg ml mr">
			<button class="btn-main btn-block" @tap="onSave">保存</button>
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
				
				select_mode_group:{},
			}
		},
		methods: {
			reload() {
				
				

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
				
				this.app.post('api/user_select_mode/all', {}, json => {
					let{code, data} = json
					if(code == 0){
						this.select_mode_group = data
					}
				})	
				
				
			},
			previewImage(e) {
				this.app.previewImage(e)
			},
			onCompanyDesc(e) {
				this.app.go('/pages/me/me_edit/me_edit')
			},
			onZhifubao(e) {
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

				}, 1)
			},
			onNickname() {
				this.app.go('/pages/me/me_edit')
			},
			onSave() {
				if(!this.user.wx){
					this.app.toastNone('请填写微信')
					return
				}
				this.app.post('api/user/save', {
					...this.user
				}, json => {
					this.reload()
					this.app.toast('保存成功')
				})
			},
			onChangeSex(e) {
				let sex = this.app.ev(e)
				console.log(sex)
				this.user.gender = sex
				// this.onSave()
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

				// this.onSave()
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
			onAliUserInfo() {
				app.get('payment/wxpayv3/index.php', {}, json => {
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
			on_company_imgs() {
				this.app.go('/pages/me/user_img')
			},
			on_product_imgs() {
				this.app.go('/pages/me/user_product_img')
			},
			onRestPassword() {
				this.app.go('/pages/login/reset_password')
			},
			onAbout() {
				this.app.go('/pages/me/about')
			},
			onServer() {
				// this.app.go('/pages/me/server')
				this.app.go('/pages/me/server/server_list')
			},
			onWx() {
				this.app.getWxOpenid(auth => {
					this.user.wx_openid = auth.openid
					this.onSave()
				})
			},
			onName() {
				this.app.go('/pages/me/me_edit/me_edit_name')
			},
			onTaskLog() {
				this.app.go('/pages/me/task/task_log')
			},
			goWxBind() {
				this.app.go('/pages/me/wx/wx_user_info')
			},
			changeWsRegion(e) {
				this.user.address = e.address
				this.user.address_json = e.json
				if(e.province == e.city){
					this.user.address_text = e.city + ' ' + e.county
				}else{
					this.user.address_text = e.province + ' ' + e.city
				}
				
				this.user.province = e.province
				this.user.city = e.city
				this.user.county = e.county
				
			},
			changeWsRegionSec(e) {
				this.user.address_sec = e.address
				this.user.address_sec_json = e.json
				if(e.province == e.city){
					this.user.address_sec_text = e.city + ' ' + e.county
				}else{
					this.user.address_sec_text = e.province + ' ' + e.city
				}
				
				this.user.province2 = e.province
				this.user.city2 = e.city
				this.user.county2 = e.county
			},
			
			changePickerSelector(e){
				// console.log(e)
				this.user[e.data_key] = e.text

			},
			onInWx(){
				this.$nextTick(()=>{
					this.user.wx = this.user.wx.replace(/[^\w\.\/]/ig,'')
				})
			},
			onInDesc(){
				this.$nextTick(()=>{
					this.user.company_desc = this.user.company_desc.replace(/[^\u4E00-\u9FA5\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g,'')
				})
			},

		},
		onLoad(options) {
			if(options.is_task == '1'){
				this.app.alertSys('如需完整功能，请完善你的资料。')
			}
			
			this.reload()
		},
		onShow() {

		},
	}
</script>

<style>
	page {
		background: #f8f8f8;
	}

	.line-info {
		background: #ffffff;
		height: 10rpx;
		width: 100%;
	}

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

		background: #f8f8f8;

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

	.in-left {
		width: 280rpx;
		min-width: 280rpx;
	}

	.in-right {
		text-align: right;
		color: #333;
		width: 100%;
	}
</style>
