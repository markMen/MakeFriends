<template>
	<view class="">



		<view class="box-wrap-space-around pl pr pt ">
			<view class="cols">
				<view class="text-center-hv">
					<image :src="user.avatar" :data-src="user.avatar" @tap="previewImage" class="avatar-wx"></image>
				</view>
				<view class="text-center-h pt-sm text-color-3"> {{user.nickname}}</view>

			</view>


			<!-- <view class="">
				<view class="text-center-hv" v-if="user.is_show_company_img == '1'">
					<image :src="app.upload + user.company_img" :data-src="app.upload + user.company_img"
						@tap="previewImage" class="avatar-company-img"></image>
				</view>
				<view v-else class="">
					<view class="text-center-hv">
						<view class=" avatar-company-img border">
							<view class="text-center-hv text-color-9 full">
								营业执照
							</view>
						</view>
					</view>
					<view class="text-center-h text-color-9 text-sm pt-sm">用户已关闭公开展示</view>
				</view>
			</view> -->
		</view>










		<view class="pt pl pr">
			<!-- 			<view class="pt">
				{{user.company_name}} {{user.company_server_name}}
			</view> -->

			<!-- 			<view class="pt">
                {{user.id}}
            </view> -->

			<!--            <view class="pt">
                {{user.nickname}}
            </view> -->



			<view class="pt box ">
				<view class="sale-phone" @tap="onPhone" :data-phone="user.phone">
					{{user.phone}}
				</view>
				<view class=" icon-arrow-abs-box">
					<view class="rows text-price" @tap="onComment">
						<view>评论 {{comment_count}}</view>
						<view class="text-center-v">
							<view class="icon-arrow-abs icon-arrow-abs-price" style="width: 30rpx;"></view>
						</view>
					</view>

				</view>

			</view>

			<view class="pt text-color-6" v-if="user.bio != 'null'">
				{{user.bio}}
			</view>


			<view class="box pt  ">
				<view class="rows">
					<view class="text-center-v text-color-6 text-sm">
						ID:({{user.id}})
					</view>

					<view class="pl text-color-6 text-sm ">
						<view class="" v-if="user.gender == 0"></view>
						<view class="text-gender-tag text-gender-tag-1" v-else-if="user.gender == 1">♂</view>
						<view class="text-gender-tag text-gender-tag-2" v-else-if="user.gender == 2">♀</view>
					</view>
				</view>

				<view class="pl text-center-v text-color-6 text-sm">
					{{user.ref_datetime}} 活跃
				</view>
			</view>

			<view class="line-wx mt"></view>




			<view class="" style="padding: 20rpx 0pt 50rpx 0pt ;">

				<view class="pt-md box ">
					<view class="text-color-6">
						群聊
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
				
				<!-- 这是我自己 -->
<!-- 				<view v-if="me.id == user.id">
					
				</view> -->
				
				
				<view v-if="(chat_group_me.is_main == 1 || chat_group_me.is_admin == 1)">
					<view class="pt-md box " >
						<view class="text-color-6">
							禁言
						</view>
						<view class="icon-arrow-abs-box">
							<view class="rows text-color-3">
								<view class="text-center-v">
									<view class="">
										<switch class="pl" checked style="zoom: 0.6;" :checked="chat_group_user.is_chat_dis == 1"
											@change="onSwitchChatDis" />
									</view>
								</view>
								<view class="icon-arrow-abs " style="width: 30rpx;"></view>
							</view>
						</view>
					</view>
					
					<view class="pt-md box ">
						<view class="text-color-6" >
							设置为管理员
						</view>
						<view class="icon-arrow-abs-box">
							<view class="rows text-color-3">
								<view class="text-center-v">
									<view class="">
										<switch class="pl" checked style="zoom: 0.6;" :checked="chat_group_user.is_admin == 1"
											@change="onSwitchAdmin" />
									</view>
								</view>
								<view class="icon-arrow-abs " style="width: 30rpx;"></view>
							</view>
						</view>
					</view>
					
					<view class="pt-md box ">
						<view class="text-color-6" >
							<text v-if="chat_group_user.is_main == 1">群主</text>
							<text v-else>群主转让</text>
						</view>
						<view class="icon-arrow-abs-box">
							<view class="rows text-color-3">
								<view class="text-center-v">
									<view class="" @tap="onSwitchMain">
										<switch class="pl"  style="zoom: 0.6;" :checked="chat_group_user.is_main == 1"
											@change="onSwitchMain" v-model="chat_group_user.is_main_bool" disabled=""/>
									</view>
								</view>
								<view class="icon-arrow-abs " style="width: 30rpx;"></view>
							</view>
						</view>
					</view>
					
					
					<view class="pt-lg box " style="padding: 100rpx 0 0 0;">
						<button class="btn-danger btn-block" @tap="onOutChatGroup" >
							<text>踢出群聊</text>
						</button>
					</view>
				</view>
				


			</view>


			<view class="line-wx mt"></view>

			<view class="pt pb-sm text-color-6" v-if="user.company_imgs">我的写真:</view>
			<list-img :imgs="user.company_imgs" :prefix="app.upload">
			</list-img>


			<view class="pt pb-sm text-color-6" v-if="user.product_imgs">个人展示:</view>
			<list-img :imgs="user.product_imgs" :prefix="app.upload">
			</list-img>

			<!-- <view class="pt pb-sm text-color-6">添加好友后开始聊天</view> -->
			<view class="line-wx mt"></view>
			
			<view class="cols  pt-sm" v-if="false">
				<button class="btn-primary btn-block" @tap="onChatUser" v-if="me.id != user.id">
					<text>聊天</text>
				</button>
			
				<button class="btn-warning btn-block" @tap="onChatUserGroup" v-if="me.id != user.id">
					<text>发起群聊</text>
				</button>
			
				<button class="btn-info btn-block" @tap="onAddFollow" v-if="me.id != user.id">
					<text v-if="chat_follow ">已关注</text>
					<text v-else>加关注</text>
				</button>
			
				<button class="btn-success btn-block" @tap="onAddContact" v-if="me.id != user.id">
					<text v-if="chat_contact && chat_contact_you">已添加好友</text>
					<text v-else-if="chat_contact && !chat_contact_you">已发送好友请求</text>
					<text v-else>添加为好友</text>
				</button>
			
				<button class="btn-danger btn-block" @tap="onReport" v-if="me.id != user.id">
					<text>举报</text>
				</button>
			</view>
			
			<view class="cols  pt-sm">
				<button class="btn-danger btn-block" @tap="onReport" v-if="me.id != user.id">
					<text>举报</text>
				</button>
			</view>
			
			<view class="line-wx mt"></view>

			<!-- <view class="pt text-color-6">动态:</view> -->

			<view :class="[item.new_count > 0?'tui-light-orange':'']" class="border border-radius-20 pp mm"
				v-for="(item,index) in page.data" :key="index" @tap="onDetailProduct" :data-id='item.id'>
				<view class="">
					<view class="pt text-center-h">{{item.title}}</view>
					<view class="pt text-color-6 text-sm">{{item.text}}</view>
					<view class="box pr pt">
						<view class="text-center-hv text-price text-sm text-md">价格: ￥{{item.price}}</view>
						<view class="text-center-hv text-color-6 text-sm">数量: {{item.count}}</view>
					</view>
					<view class="text-color-9 text-sm pt rows">
						<view class="pr">
							<image :src="user.avatar" mode="scaleToFill" class="avatar-product"></image>
						</view>
						<view class="box-v pt pb">
							<view class="">发布于: {{item.credate}}</view>
						</view>
					</view>
					<!-- <view class="pt">{{item.editor}}</view> -->
				</view>
				<view class="pl pr pt text-color-9">详情图片: </view>
				<list-img :imgs="item.imgs" :prefix="app.upload">
				</list-img>
			</view>

		</view>


		<!--加载loadding-->
		<tui-loadmore :visible="page.isLoad" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="page.isMore"></tui-nomore>
		<!--加载loadding-->



		<!-- 
		<view style="height: 200rpx;"></view>
		<view class="bottom bg-white-bg rows">
			<button class=" btn-warning full-width" @tap="onPayOrder" v-if="me.id != user.id">我要订货</button>
		</view> -->


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
				chat_group: {},
				chat_group_user: {},
				chat_group_me: {},
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
				let user_id = this.user_id

				if (user_id) {
					this.app.post('api/user/find_detail', {
						user_id: user_id
					}, json => {
						let user = json.user
						this.user = user
						// this.listPhoto = this.user.imgs.split(',')
						// this.product = json.product
						this.chat_follow = json.chat_follow
						this.chat_contact = json.chat_contact
						this.chat_contact_you = json.chat_contact_you

						// this.comment_count = json.comment_count

						if (user.user_type == '1') { //是客服直接退出
							this.app.back()
							return
						}

						this.page = new this.app.page('api/product/page_user', {
							user_id: this.user_id
						})
						this.page.next()
						this.app.post('api/user/info', {}, userinfo => {
							this.me = userinfo
						})


						if (user.del == '-4') {
							this.app.toast('用户已注销')
							setTimeout(() => {
								this.app.back()
							}, 2000)
						}

					})

					this.app.post('api/chat_group/find', {
						id: this.group_id,
					}, json => {
						const {
							code,
							data
						} = json
						if (code == 0) {
							this.app.setTitle(data.nickname)
							this.chat_group = data
							// this.group_user_list = data.group_user_list
						}

					})
					
					this.app.post('api/chat_group_user/find_user', {
						group_id: this.group_id,
						user_id: this.user_id,
					}, json => {
						const {
							code,
							data
						} = json
						if (code == 0) {
							data.is_main_bool = data.is_main == 1 
							this.chat_group_user = data
						}
					})
					
					this.app.post('api/chat_group_user/find_user_me', {
						group_id: this.group_id,
					}, json => {
						const {
							code,
							data
						} = json
						if (code == 0) {
							data.is_main_bool = data.is_main == 1 
							this.chat_group_me = data
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
			//去评论
			onComment(e) {
				this.app.go('/pages/comment/comment', {
					user_id: this.user.id,
				})
			},
			onChatUserGroup(e) {
				this.app.go('/pages/chat_group/group_add', {
					user_id: this.user.id,
				})
			},
			
			onSaveGroupUser(e){
				this.app.post('api/chat_group_user/edit', this.chat_group_user, json => {
					const {code, data } = json
					if(code == 0){
						this.app.toast('保存成功')
					}else{
						this.app.toastNone(data)
					}
				})
			},
			onSwitchChatDis(e){
				this.chat_group_user.is_chat_dis = this.app.ev(e)
				this.onSaveGroupUser()
			},
			onSwitchAdmin(e){
				this.chat_group_user.is_admin = this.app.ev(e)
				this.onSaveGroupUser()
			},
			onSwitchMain(e){
				this.app.message('系统提示','确定转让', () => {
					this.chat_group_user.is_main = 1
					this.app.post('api/chat_group_user/set_main', this.chat_group_user, json => {
						const {code, data } = json
						if(code == 0){
							// this.chat_group_user.is_main = 1
							this.reLoad()
							this.app.toast('保存成功')
						}else{
							this.app.toastNone(data)
						}
					})
				}, () => {
				})
				
			},
			onOutChatGroup(e){
				this.app.message('系统提示','确定将“'+ this.user.nickname +'”踢出群聊', () => {
					this.app.post('api/chat_group_user/out_user', {
						chat_group_user_id: this.chat_group_user.id,
					}, json => {
						const {code, data } = json
						if(code == 0){
							// this.chat_group_user.is_main = 1
							// this.reLoad()
							this.app.toast('踢出成功')
							this.app.backTime(1000)
						}else{
							this.app.toastNone(data)
						}
					})
				}, () => {
				})
			},
		},
		onLoad(option) {
			this.user_id = option.user_id
			this.group_id = option.group_id

			this.reLoad()
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

			// this.app.post('api/comment/comment_count', {
			// 	user_id: this.user_id,
			// }, json => {
			// 	if (json.code == '0') {
			// 		this.comment_count = json.data
			// 	}
			// })
		},
	}
</script>

<style>

</style>
