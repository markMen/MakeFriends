<template>
	<view class="">
		
		
		
		<view class="row-wrap  pt ">
			<view class="cols group-user-box" v-for="(item,index) in group_user_list" :key="index">
				<view class="text-center-hv">
					<image :src="item.avatar" :data-src="item.avatar" @tap="onGroupUserInfo(item.user_id)" class="avatar-wx-sm"></image>
				</view>
				<view class="text-center-h pt-sm text-color-3 text-xs text-inline pl-xs pr-xs">{{item.nickname}}</view>
			</view>
			
			<view class="group-user-box  text-center-hv" @tap="onGroupAdd">
				<view class="group-user-box-edit text-center-hv ">
					+
				</view>
			</view>
			<view class="group-user-box  text-center-hv" @tap="onGroupDel">
				<view class="group-user-box-edit text-center-hv ">
					-
				</view>
			</view>
		</view>
		
<!-- 		<tui-list-cell padding="0px" :arrow="true" class="tui-light-green">
			<view url="/pages/me/me_order/me_order_sale" @tap="go_me_order_sale" class="tui-list-cell ">
				<view class="rows">我售出的订单 
				</view>
				<view class="tui-content">
					<switch class="pl" checked  style="zoom: 0.5;"
						:checked="true" @change="onSwitchShowCompanyImg" />
					
				</view>
			</view>
		</tui-list-cell> -->
		<view class="line-wx mt-md"></view>
		

		<view class="pl pr mt">
			
			<view class="pt-md box " @tap="onEditNickname">
				<view class="text-color-6" >
					群聊名称
				</view>
				<view class="icon-arrow-abs-box">
					<view class="rows text-color-3">
						<view>
							<input type="text" class="group-input" v-model="chat_group.nickname" disabled="true">
						</view>
						<view class="icon-arrow-abs " style="width: 30rpx;"></view>
					</view>
				</view>
			</view>
			
			<view class="pt-md box ">
				<view class="text-color-6" >
					全员禁言
				</view>
				<view class="icon-arrow-abs-box">
					<view class="rows text-color-3">
						<view class="text-center-v">
							<view class="">
								<switch class="pl" checked  style="zoom: 0.6;"
									:checked="chat_group.is_chat_dis == 1" @change="onSwitchChatDis" />
							</view>
						</view>
						<view class="icon-arrow-abs " style="width: 30rpx;"></view>
					</view>
				</view>
			</view>
			
			<view class="pt-md box ">
				<view class="text-color-6" >
					禁止互相加好友
				</view>
				<view class="icon-arrow-abs-box">
					<view class="rows text-color-3">
						<view class="text-center-v">
							<view class="">
								<switch class="pl" checked  style="zoom: 0.6;"
									:checked="chat_group.is_add_dis == 1" @change="onSwitchAddDis" />
							</view>
						</view>
						<view class="icon-arrow-abs " style="width: 30rpx;"></view>
					</view>
				</view>
			</view>
			
<!-- 			<view class="pt-md box ">
				<view class="text-color-6" >
					设置管理员
				</view>
				<view class="icon-arrow-abs-box">
					<view class="rows text-color-3">
						<view class="text-center-v">
							
						</view>
						<view class="icon-arrow-abs " style="width: 30rpx;"></view>
					</view>
				</view>
			</view>
			
			<view class="pt-md box ">
				<view class="text-color-6" >
					群主转让
				</view>
				<view class="icon-arrow-abs-box">
					<view class="rows text-color-3">
						<view class="text-center-v">
							
						</view>
						<view class="icon-arrow-abs " style="width: 30rpx;"></view>
					</view>
				</view>
			</view> -->
			
			
			<view class="pt-lg box " style="padding: 100rpx 0 0 0;">
				<button class="btn-danger btn-block" @tap="onOutChatGroup" >
					<text>退出群聊</text>
				</button>
			</view>
			
			
			

			
			<view class="line-wx mt"></view>
		
		</view>


		<!--加载loadding-->
		<tui-loadmore :visible="page.isLoad" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="page.isMore"></tui-nomore>
		<!--加载loadding-->

	</view>
</template>

<script>
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import tuiIcon from "@/components/icon/icon"
	import listImg from "@/components/list-img/list-img"

	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"

	export default {
		components: {
			tuiLoadmore,
			tuiNomore,
			tuiNumberbox,
			tuiIcon,
			listImg,
		},
		data() {
			return {
				user_id: '',
				group_id: '',
				chat_group:{},
				group_user_list: [],
				
				app: this.app,
				spec: [{
					id: 0
				}],
				listPhoto: [],
				user: {},
				product: [],
				chat_follow: null,
				chat_contact: null,
				chat_contact_you: null,

				page: new this.app.page(),

				me: {},
				comment_count: '',
			}
		},
		methods: {
			reLoad() {

				if (this.group_id) {
					this.app.post('api/chat_group/info', {
						group_id: this.group_id
					}, json => {
						const{code, data} = json
						if(code == 0){
							this.app.setTitle(data.chat_group.nickname)
							this.chat_group = data.chat_group
							this.group_user_list = data.group_user_list
						}

					})

				} else {
					this.app.toast('缺少ID')
				}
			},

			previewImage(e) {
				this.app.previewImage(e)
			},
			//原来的订货
			onPay(e) {
				this.app.go('/pages/index/submit_order/submit_order', {
					product_spec_id: '0',
					product_count: '1',
				})
			},
			changeCount(e) {
				this.product.product_count = e.value
			},
			onMessage(e) {
				this.app.go('/pages/message/chat', {
					user_id: this.user.id
				})
			},
			onAddContact(e) {
				let user = this.user
				this.app.post('api/chat_contact/add_float', {
					user_id: user.id
				}, json => {
					if (json.code == '0') {
						this.app.toast(json.data)
					} else {
						this.app.toast(json.data)
					}
					this.reLoad()

				})
			},
			onAddFollow(e) {
				let user = this.user
				this.app.post('api/chat_follow/add_float', {
					user_id: user.id
				}, json => {
					if (json.code == '0') {
						this.app.toast(json.data)
					} else {
						this.app.toast(json.data)
					}
					this.reLoad()

				})
			},
			//订货
			onPayOrder(e) {
				this.app.go('/pages/index/submit_order/user_order', {
					user_id: this.user_id,
					type: '1',
				})
			},
			//申请发货
			onRequestOrder(e) {
				this.app.go('/pages/index/submit_order/user_order', {
					user_id: this.user_id,
					type: '2',
				})
			},

			onDetailProduct(e) {
				let id = this.app.ed(e).id
				this.app.go('/pages/index/detail/detail_product', {
					id: id
				})
			},
			onChatUser(e) {
				// let user_id = this.app.ed(e).user_id
				let user_id = this.user_id
				this.app.go('/pages/message/chat', {
					user_id: user_id
				})
			},
			onReport(e) { //举报
				this.app.go('/pages/index/detail/report', {
					user_id: this.user_id
				})

			},
			onPhone(e) { //举报
				let phone = this.app.ed(e).phone
				this.app.makePhoneCall(phone)

			},
			onChatUserGroup(e){
				this.app.go('/pages/chat_group/group_add', {
					user_id: this.user.id,
				})
			},
			
			//退出
			onOutChatGroup(e){
				this.app.message('系统提示', '确认退出群聊', () => {
					this.app.post('api/chat_group/group_del_me', {
						group_id:this.group_id,
					}, json => {
						const {code ,data} = json
						if (code == '0') {
							this.app.toast('退出成功')
							this.app.backTime(1000, {}, 2)
						} else {
							this.app.toastNone(data)
						}
					})
					
				})
				
				
			},
			onGroupUserInfo(user_id){
				this.app.go('/pages/chat_group/group_user_info', {group_id: this.group_id, user_id: user_id})
			},
			
			onEditNickname(e){
				this.app.go('/pages/chat_group/edit_nickname/edit_nickname', {group_id: this.group_id})
			},
			
			onSaveChatGroup(e){
				this.app.post('api/chat_group/edit',this.chat_group, json => {
					const {code, data } = json
					if(code == 0){
						this.app.toast('保存成功')
					}else{
						this.app.toastNone(data)
					}
				})
			},
			
			onSwitchChatDis(e){
				this.chat_group.is_chat_dis = this.app.ev(e)
				this.onSaveChatGroup()
			},
			onSwitchAddDis(e){
				this.chat_group.is_add_dis = this.app.ev(e)
				this.onSaveChatGroup()
			},
			
			onGroupAdd(e){
				this.app.go('/pages/chat_group/group_add', {group_id: this.group_id, type: 'add'})
			},
			onGroupDel(e){
				this.app.go('/pages/chat_group/group_add', {group_id: this.group_id, type: 'del'})
			},
		},
		onLoad(option) {
			this.user_id = option.user_id
			this.group_id = option.group_id

			
		},
		onPullDownRefresh() {
			this.reLoad()

			this.page.reload(() => {
				this.app.toast("刷新成功")
			})
		},
		onReachBottom() {
			this.page.next()
		},
		onShow() {
			this.app.checkUser()
			this.reLoad()
			
		},
	}
</script>

<style>


</style>
