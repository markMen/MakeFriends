<template>
	<view>

<!-- 		<view class="text-center-h pt-lg">
			<view class="rows">
				<tui-icon name="circle-fill"  ></tui-icon>
			</view>
		</view> -->
		
		
		<view class="text-center-v text-lg pl-md pt-lg">最后一步，完善资料</view>
		
		
		<view class="mt-lg pt-md" @tap="onAvatar">
			<view class="cols">
				<view class="text-center-h">
					<image :src="me.avatar" class="avater-chat-me"></image>
				</view>
				<view class="text-center-h pt-sm text-sm" style="color: #7F7F7F;">
					上传头像
				</view>
			</view>
		</view>
		
		<view class="text-center-h pt text-sm" style="color: #7F7F7F;">好的个人形象更容易找到你的那个（她/他）</view>
		
		
		<view style="padding: 20rpx 0pt 20rpx 0pt;">
			<view class="rows input-box-item">
				<view class="input-box-item-title">昵称</view>
				<input class="input-box-item-in flex-grow-1 input-class" v-model="me.nickname" placeholder="请输入"/>
			</view>
			
			<view class="rows input-box-item">
				<view class="input-box-item-title">年龄</view>
<!-- 				<view class="input-box-item-in flex-grow-1" >
					<picker id="birthday" mode="date" :value="me.birthday" :start="startDate" :end="endDate"
						@change="bindDateChange">
						<view class="uni-input" v-if="me.birthday">{{me.birthday}}</view>
						<view class="text-color-6 " v-else>请选择生日</view>
					</picker>					
					
					<picker mode="selector" :value="me.age" @change="bindDateChange">
						<view class="uni-input" v-if="me.birthday">{{me.birthday}}</view>
						<view class="text-color-6 " v-else>请选择生日</view>
					</picker>		
				</view> -->
				
				<ws-picker-selector class="in-right input-box-item-in " v-if="select_mode_group.age_list"
				@change="changePickerSelector" :range='select_mode_group.age_list.list' range_key="title"  
				:model_text='me.age' data_key="age" input_class='input-class' :is_show_region="false">
					<view class="input-class">
						<view class="" v-if="me.age">{{me.age}}</view>
						<view class="text-color-9" v-else>请选择</view>
					</view>
				</ws-picker-selector>
				
			</view>
			
			<view class="rows input-box-item">
				<view class="input-box-item-title">身高</view>
				<!-- <input class="input-box-item-in flex-grow-1" v-model="me.height" placeholder="" type="number"/> -->
				
				<ws-picker-selector class="in-right input-box-item-in" v-if="select_mode_group.height_list"
				@change="changePickerSelector" :range='select_mode_group.height_list.list' range_key="title"  
				:model_text='me.height' data_key="height" input_class='input-class' :is_show_region="false">
					<view class="input-class">
						<view class="" v-if="me.height">{{me.height}}</view>
						<view class="text-color-9" v-else>请选择</view>
					</view>
				</ws-picker-selector>
				
			</view>
			
			<view class="rows input-box-item">
				<view class="input-box-item-title">寻找</view>
				
				
				<ws-picker-selector class="in-right input-box-item-in" v-if="select_mode_group.find_men && me.gender == 1"
				@change="changePickerSelector" :range='select_mode_group.find_men.list' range_key="title"  
				:model_text='me.text_find' data_key="text_find" input_class='input-class' :is_show_region="false">
					<view class="input-class">
						<view class="" v-if="me.text_find">{{me.text_find}}</view>
						<view class="text-color-9" v-else>请选择</view>
					</view>
				</ws-picker-selector>
				
				<ws-picker-selector class="in-right input-box-item-in" v-if="select_mode_group.find_women && me.gender == 2"
				@change="changePickerSelector" :range='select_mode_group.find_women.list' range_key="title"  
				:model_text='me.text_find' data_key="text_find" input_class='input-class' :is_show_region="false">
					<view class="input-class">
						<view class="" v-if="me.text_find">{{me.text_find}}</view>
						<view class="text-color-9" v-else>请选择</view>
					</view>
				</ws-picker-selector>
				
				
				<!-- <input class="input-box-item-in flex-grow-1" v-model="me.text_find" placeholder="" /> -->
			</view>
			
			<view class="rows input-box-item text-center-v">
				<view class="input-box-item-title">期望</view>
				<!-- <input class="input-box-item-in flex-grow-1" v-model="me.text_hope" placeholder="" /> -->
				
				<ws-picker-selector class="in-right input-box-item-in flex-grow-1" v-if="select_mode_group.expect"
				@change="changePickerSelector" :range='select_mode_group.expect.list' range_key="title"  
				:model_text='me.text_hope' data_key="text_hope" input_class='input-class' :is_show_region="false">
					<view class="input-class">
						<view class="" v-if="me.text_hope">{{me.text_hope}}</view>
						<view class="text-color-9" v-else>请选择</view>
					</view>
				</ws-picker-selector>
				
			</view>
			
		</view>
		
		
		
		
			
		<!-- <view class="text-center-h pt-lg">
			<view>
				使用时间 {{me_user.credate}} 至 {{me_user.end_date}}
			</view>
		</view> -->

		<!-- <view class="text-center-h pt-lg">
			<view>
				欢迎使用！
			</view>
		</view> -->
		
		<view class="" style="padding: 100rpx 0pt 0rpx 0rpx;">
		</view>
		
		<view class="rows pt-lg pl pr ">
			<button class="btn-main btn-block" @tap="onLogin">立即进入</button>
		</view>
		
		<view class="" style="height: 100rpx;">
			
		</view>

	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	
	
	export default {
		components:{
			tuiIcon,
		},
		data() {
			return {
				me: {},
				startDate: '',
				endDate: '',
				
				select_mode_group:{},
				
				config:{},
				age_list:['18','19','20'],
			}
		},
		methods: {
			reload(){
				this.startDate = '1900-01-01'
				this.endDate = this.getDate('end')
				
				this.app.postHtml('api/user_select_mode/all', {}, json => {
					let{code, data} = json
					if(code == 0){
						this.select_mode_group = data
					}
				})
				
				
				//这个页面主要年龄
				// this.app.postHtml('api/config/config_all', {}, json => {
				// 	let{code, data} = json
				// 	if(code == 0){
				// 		this.config = data
				// 		let age_list = []
				// 		for(let i = data.userinfo_age_min; i <= data.userinfo_age_max; i++){
				// 			age_list.push(i)
				// 		}
				// 		this.age_list = age_list
						
				// 	}
				// })
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
				this.me.birthday = e.target.value
			},
			onLogin(){
				
				if(!this.me.file_avatar){
					this.app.toastNone('请上传头像')
					return
				}
				
				this.app.postHtml('api/user/me_info_edit', {
					...this.me,
				}, json => {
					let {code, data} = json
					if(code == 0){
						this.app.goOne('/pages/love/love')
					}else{
						this.app.toastNone(data)
					}
				})
				
			},
			onGender(g){
				this.me.gender = g
				this.$forceUpdate()
			},
			onAvatar() {
				this.app.chooseImage(fs => {
					this.app.uploadFile('api/user/upload_file', fs[0], info => {
						console.log(info.saveName)
						this.me.type_avatar = '1'
						this.me.avatar = this.app.upload + info.saveName
						this.me.file_avatar = info.saveName
					})
			
				}, 1)
			},
			
			changePickerSelector(e){
				console.log(e)
				this.me[e.data_key] = e.text
			}
			
		},
		onLoad(options) {
			if(options.openid){
				this.app.postHtml('api/user/me_info', {
					openid:options.openid,
				}, json => {
					let {code, data} = json
					if(code == 0){
						this.me = data
					}else{
						this.app.toastNone(data)
					}
					
					this.reload()
				})
			}else{
				this.app.post('api/user/me_info', {
				}, json => {
					let {code, data} = json
					if(code == 0){
						this.me = data
					}else{
						this.app.toastNone(data)
					}
					this.reload()
					
				})
			}
			
				
			
			
		},
	}
</script>

<style>

.gender-img{
	width: 150rpx;
	height: auto;
}

.gender-box-item{
	padding: 0 50rpx 0 0rpx;
}

.input-box-item{
	border-radius: 15rpx;
	border: 4rpx solid #232323;
	margin: 30rpx 50rpx;
	/* padding: 20rpx 20rpx; */
}
.input-box-item-title{
	width: 80rpx;
	min-width: 80rpx;
	padding: 20rpx 20rpx;
}
.input-box-item-in{
/* 	padding: 20rpx 0 ;
	margin: -20rpx 0; */
/* 	height: 80rpx;
 */}
 
 .input-class{
 	 padding: 20rpx 0;
 }

</style>
