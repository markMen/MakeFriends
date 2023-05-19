<template>
	<view class="">



		<view class="box-wrap-space-around pl pr pt ">
			<view class="cols">
				<view class="text-center-hv">
					<image :src="user.avatar" :data-src="user.avatar" @tap="previewImage" class="avatar-wx-slove">
					</image>
				</view>
				<view class="text-center-hv pt text-color-3 text-bold">
					<view class="">
						{{user.nickname}}
					</view>
					<view class="pl" v-if="user.is_plus == 1">
						<image src="/static/images/icon_vip.png" mode="heightFix" class="icon-plus"></image>
					</view>
				</view>
				  
				<view class="text-sm text-color-6 pt">
					<text>{{user.province}} {{user.city}} {{user.county}}</text>
					<text class="pl-sm pr-sm">|</text>
					<text>{{user.age}}岁</text>
					<text class="pl-sm pr-sm">|</text>
					<text>{{user.height}}cm</text>
					<text class="pl-sm pr-sm">|</text>
					<text>{{user.job}}</text>
				</view>
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




		<view class="pt-md pb-md pl-md pr-md rows text-sm text-color-6" >
			<view class="pr">个性签名: </view>
			<view class="">{{user.bio}}</view>
		</view>
		

		
		<view class="" style="margin: 50rpx 20rpx;" v-if="user_plus_see && user_plus_see.id">
			
			<view class="relative"  @longtap="onPlusSee">
				<image src="/static/images/icon_plus_get_wx_none_copy.png" mode="widthFix" style="width: 100%;"></image>
				<view class="absolute absolute-0 text-center-v text-line-1 text-bold text-color-f box">
					<view class="text-center-v" style="padding: 0 30rpx 10rpx 120rpx;overflow: hidden;">
						<text class="text-color-e pr-sm">我的微信:</text>{{user.wx}}
					</view>
					<view class="text-center-v" style="padding: 10rpx 30rpx;" @tap="app.copy(user.wx)">
						复制
					</view>
				</view>
			</view>
		</view>
		
		<view class="" style="margin: 50rpx 20rpx;" v-else>
			<view class="" @tap="onPlusSee" v-if="me.is_plus != 1">
				<image src="/static/images/icon_plus_get_wx.png" mode="widthFix" style="width: 100%;"></image>
			</view>
			<view class="relative" @tap="onPlusSee" v-if="me.is_plus == 1">
				<image src="/static/images/icon_plus_get_wx_none.png" mode="widthFix" style="width: 100%;"></image>
				<view class="absolute absolute-0 text-center-v">
					<view class="absolute absolute-0 text-center-v text-line-1 text-bold text-color-f"
						style="padding: 0 30rpx 10rpx 120rpx;overflow: hidden;">
						我的微信：******
					</view>
				</view>
			</view>
		</view>
		
		

		


		<list-img :imgs="user.company_imgs" :prefix="app.upload">
		</list-img>

		<view class="box bg-ff mt">
			<view @tap="onShowDetail(0)" :class="[index_show_detail==0?'page-nav-sel':'']"
				class="cols-6 text-color-4  text-center-h pt pb text-sm text-bold">
				信息
			</view>
			<view @tap="onShowDetail(1)" :class="[index_show_detail==1?'page-nav-sel':'']"
				class="cols-6 text-color-4 text-center-h pt pb text-sm text-bold">
				评论
			</view>
		</view>


		<view class="" v-if="index_show_detail == 0">
			<view class="pt-md pb-md pl-md pr-md box text-sm text-color-6" style="background-color: #F7F7F7;">
				<view class="">上次活动时间</view>
				<view class="">{{user.ref_datetime}}</view>
			</view>

			<view class="bg-ff" style="">
				<view class="pl pr text-md pt-lg pb-lg text-color-3" style="font-size: 34rpx;">
					{{user.nickname}}的信息
				</view>

				<view class="bg-ff pb text-color-6" style="font-size: 28rpx;padding: 0 0rpx;">

					<view class="pt pb box msg-item">
						<view class="cols-6">
							<view class="text-color-3">寻找</view>
							<view class="">{{user.text_find}}</view>
						</view>
						<view class="cols-6">
							<view class="text-color-3">期望</view>
							<view class="">{{user.text_hope}}</view>
						</view>
					</view>

					<view class="pt box msg-item">
						<view class="cols-6">
							<view class="text-color-3">职业</view>
							<view class="">{{user.job}}</view>
						</view>
						<view class="cols-6">
							<view class="text-color-3">教育</view>
							<view class="">{{user.edu}}</view>
						</view>
					</view>

					<view class="pt box msg-item">
						<view class="cols-6">
							<view class="text-color-3">身高</view>
							<view class="">{{user.height}}厘米</view>
						</view>


						<view class="cols-6">
							<view class="text-color-3">体型</view>
							<view class="">{{user.figure}}</view>
						</view>
					</view>

					<view class="pt box msg-item">
						<view class="cols-6">
							<view class="text-color-3">收入</view>
							<view class="">{{user.income}}</view>
						</view>
						<view class="cols-6">
							<view class="text-color-3">感情状态</view>
							<view class="">{{user.marriage}}</view>
						</view>

					</view>

					<view class="pt box msg-item">
						<view class="cols-6">
							<view class="text-color-3">抽烟</view>
							<view class="">{{user.smoking}}</view>
						</view>

						<view class="cols-6">
							<view class="text-color-3">饮酒</view>
							<view class="">{{user.wine}}</view>
						</view>
					</view>

					<view class="pt box msg-item">
						<view class="cols-6">
							<view class="text-color-3">主要位置</view>							
							<view class="">{{user.province}} {{user.city}} {{user.county}}</view> 
						</view>
						<view class="cols-6">
							<view class="text-color-3">其他位置</view>
							<view class="">{{user.province2}} {{user.city2}} {{user.county2}}</view> 
						</view>

						<!-- 						<view class="cols-6">
							<view class="text-color-3">辅助位置</view>
							<view class="">{{user.address_text}}</view>
						</view> -->
					</view>

					<view class="pt box ">

					</view>
					<view class="pt box ">
					</view>
				</view>



			</view>


			<view class="" style="background-color: #F7F7F7;">
				<view class="pl pr text-md pt  text-color-3" style="font-size: 34rpx;">
					关于我
				</view>

				<view class="text-color-6" style="font-size: 28rpx;padding: 20rpx 60rpx;">
					{{user.company_desc}}
				</view>
			</view>



		</view>

		<view class="" v-if="index_show_detail == 1">

			<!-- <view class="pt pl pr">
				<view class="box">
					<view class="text-sm text-color-6">
						< !- - ID：{{user.id}} - - >
					</view>
			
					<view class="rows" v-if="me && user && me.id && user.id && me.id != user.id">
						<view class="pl pr-sm text-price" @tap="onCommentInput">
							我要评论
						</view>
					</view>
				</view>
			
				<view class="line-wx mt"></view>
			</view> -->
			<view class="bg-ff">
				
				<view class="pp rows text-center-v">
					<view class="pr">好感度</view>
					<view class="rows text-lg">
						<view class="pr" v-for="(item, index) in rate_list" @tap="onRate" :data-index="index">
							<image v-if="index <= rate_index" src="/static/images/rate_ed.png" class="icon-rate"></image>
							<image v-else src="/static/images/rate_df.png" class="icon-rate"></image>
						</view>
					</view>
				
					<view v-if="rate_index >= 0">{{rate_list[rate_index].text}}</view>
					<!-- <view>☆★</view> -->
				</view>
				
				<view class="line-wx-xs"></view>
				
				<view class="pp">
					<view class="bg-f1 pp" style="border-radius: 10rpx;">
						<textarea class="full-width " value="" placeholder="好感评价" maxlength="2000" style="height: 200rpx;"
							v-model="model.text" />
					</view>
				</view>
				
				<view class="line-wx-xs"></view>
				
				<view class="rows-wrap ml mr">
				
					<view class="col-4 text-center-hv" v-if="video">
						<view class="comment-img-box text-center-hv cols">
							<image class="comment-img" src="/static/images/icon_video.png"></image>
							<view class="">视频</view>
							<image src="/static/images/icon_del_top.png" class="comment-img-del" @tap="onDelVideo"></image>
						</view>
					</view>
				
				
					<view class="col-4 text-center-hv" v-for="(item,index) in img_list">
						<view class="comment-img-box text-center-hv cols">
							<image class="comment-image" :src="app.upload + item.img"></image>
							<image src="/static/images/icon_del_top.png" class="comment-img-del" @tap="onDelImg"
								:data-index="index"></image>
						</view>
					</view>
				
				
					<view class="col-4 text-center-hv" v-if="(9 - this.img_list.length - (this.video?1:0)) > 0">
						<view class="comment-img-box text-center-hv cols " @tap="onAddImg">
							<image class="comment-img" src="/static/images/icon_img_add.png"></image>
							<view class="">添加图片</view>
						</view>
					</view>
				
					<!-- <view class="col-4 text-center-hv" v-if="!video && (9 - this.img_list.length - (this.video?1:0)) > 0">
						<view class="comment-img-box text-center-hv cols" @tap="onAddVideo">
							<image class="comment-img" src="/static/images/icon_video_add.png"></image>
							<view class="">添加视频</view>
						</view>
					</view> -->
				
				
				</view>
				
				<view class="line-wx-xs"></view>
				
				
				<view class="pp rows " hover-class="opcity" :hover-stay-time="150">
					<checkbox-group class="text-center-v" @change="onCheckAnonym">
						<label class="rows ">
							<checkbox class="checkbox checkbox-warning checkbox-main"></checkbox>
							<text class="">匿名评价</text>
						</label>
					</checkbox-group>
				</view>
				
				
				<view class="rows pt-lg pl pr pb">
					<button class="btn-main btn-block" @tap="onComment">提交</button>
				</view>
				
				
			</view>



			<view v-for="(item,index) in page.data" class="bg-comment-box mm" @longtap="onCommentDel"
				:data-index='index' style="border-radius: 20rpx;" :class="[item.creby == me.id?'bg-comment-box-me':'']">

				<view @tap="onCommentUser" :data-index='index'>
					<view class="box pt pl pr">
						<view class="text-center-hv">
							<image :src="item.avatar" :data-src="item.avatar" class="avatar-comment-item">
							</image>

							<view class="pl-sm text-sm " :class="[item.creby == me.id?'text-price':'text-color-6']">
								<view class="">
									<text v-if="item.is_anonym == '1'">******</text>
									<text v-else>{{item.nickname}}</text>
									<!-- <text class="pl-sm">{{maskPhone(item.phone)}}</text> -->
								</view>

								<view class="rows pt-sm">
									<view class="pr-sm" v-for="(it, index) in 5">
										<image v-if="(index + 1) <= item.rate" src="/static/images/rate_ed.png"
											class="icon-rate-sm"></image>
										<image v-else src="/static/images/rate_df.png" class="icon-rate-sm"></image>
									</view>
								</view>

							</view>
						</view>
						<view class=" text-sm" :class="[item.creby == me.id?'text-price-3':'text-color-9']">
							{{(item.credate)}}
						</view>
					</view>

					<view class="ml mr mt-sm mb-sm " :class="[item.creby == me.id?'text-color-3':'text-color-6']"
						style="border-radius: 10rpx;">
						<view class="pp ">
							{{item.text}}
						</view>
					</view>
				</view>


				<view class="rows-wrap ml mr">
					<view class="col-4 text-center-hv" v-if="item.video && item.video != null && item.video != 'null'"
						@tap="previewVideo" :data-url="app.upload + item.video">
						<view class="comment-img-box text-center-hv cols">
							<image class="comment-img" src="/static/images/icon_video.png"></image>
						</view>
					</view>

					<view class="col-4 text-center-hv" v-for="(img,index) in textToArr(item.img)">
						<view class="comment-img-box text-center-hv cols">
							<image class="comment-image" :src="app.upload + img" @tap="previewImages"
								:data-src="app.upload + img" :data-srcs='item.img' :data-prefix='app.upload'></image>
						</view>
					</view>
				</view>

				<view class="box pt" v-if="item.creby == me.id">
					<view></view>
					<view>
						<button class="btn-danger btn-sm" @tap="onCommentDel" :data-index='index'>删除</button>
					</view>
				</view>

				<view class="pt"></view>
				<!-- <view class="mt line-wx"></view> -->
			</view>


			<!--加载loadding-->
			<tui-loadmore :visible="page.isLoad" :index="3" type="primary"></tui-loadmore>
			<tui-nomore :visible="page.isMore"></tui-nomore>
			<!--加载loadding-->

			<view style="height: 200rpx;"></view>
		</view>


		<view class="" style="height: 200rpx;"></view>

		<view class="bottom bg-ff pt-sm pb-sm" v-if="me.id != user.id">
			<view class="box">
				<view class="ml">
					<!-- <button class="btn btn-primary " style="width: 300rpx;" @tap="onChatUser" v-if="me.id != user.id">我们私聊</button> -->
<!-- 					<button class="btn btn-main btn-main-chat-private" style="width: 300rpx;" @tap="onChatUser"
						v-if="me.id != user.id">找我私聊</button> -->
						
						<button class="btn btn-main btn-main-chat-private" style="width: 300rpx;" @tap="onPrivateChat"
							v-if="me.id != user.id">找我私聊</button>
							
				</view>
				<view class="rows ">

					<view class="text-center-hv mr" @tap="onAddContact" v-if="me.id != user.id && false">
						<text v-if="chat_contact && chat_contact_you">
							<image src="/static/images/icon_add_user_ed.png" class="icon-like"></image>
						</text>
						<text v-else-if="chat_contact && !chat_contact_you">
							<image src="/static/images/icon_add_user_ed.png" class="icon-like"></image>
						</text>
						<text v-else>
							<image src="/static/images/icon_add_user_df.png" class="icon-like"></image>
						</text>
					</view>


					<view class="text-center-hv mr" @tap="onAddFollow" v-if="me.id != user.id">
						<image src="/static/images/icon_like_ed.png" v-if="chat_follow" class="icon-like"></image>
						<image src="/static/images/icon_like_df.png" v-else class="icon-like"></image>
					</view>

					<view class="text-center-hv mr" @tap="onMenuShow">
						<image src="/static/images/icon_like_more.png" class="icon-like"></image>
					</view>

				</view>

			</view>

		</view>




		<ws-win-user-wx v-if="is_show_info" @close='onWinUserWxClose' :user_id="user_id"></ws-win-user-wx>
		<!-- <ws-win-right-bottom-menu></ws-win-right-bottom-menu> -->
		<vive-modal-menu :hidden="!is_show_menu" @click="onMenuInvoke" @close="onMenuClose" :menu="modal_menu">
		</vive-modal-menu>


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
		computed: {
			datetimeToDate() {
				return function(datetime) {
					return this.app.datetimeToDate(datetime)
				}
			},
			textToArr() {
				return function(text) {
					if (text) {
						return text.split(',')
					}
					return []
				}
			},
			maskPhone() {
				return function(text) {
					return this.app.maskPhone(text)
				}
			},
		},
		data() {
			return {
				user_id: '',
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

				is_show_info: false,

				modal_menu: ['举报', '取消'],
				is_show_menu: false,

				index_show_detail: '0',


				rate_index: -1,
				rate_list: [{
						rate: 1,
						text: '非常差',
					},
					{
						rate: 2,
						text: '差',
					},
					{
						rate: 3,
						text: '一般',
					},
					{
						rate: 4,
						text: '好',
					},
					{
						rate: 5,
						text: '非常好',
					},
				],

				img_list: [],
				video: '',

				model: {
					sale_id: '',
					rate: '',
					text: '',
					img: '',
					video: '',
					is_anonym: '0',
				},
				
				user_plus_see:{},
				
				see:0,
				see_count:0,

			}
		},
		methods: {
			reLoad(action) {
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

						// this.page = new this.app.page('api/product/page_user', {
						// 	user_id: this.user_id
						// })
						// this.page.next()
						this.app.post('api/user/plus', {}, userinfo => {
							this.me = userinfo.data
						})


						if (user.del == '-4') {
							this.app.toast('用户已注销')
							setTimeout(() => {
								this.app.back()
							}, 2000)
						}

					})


					//用汉语评论
					this.page = new this.app.page('api/comment/page_sale', {
						sale_id: this.user_id
					})
					this.page.next(() => {
						if (action) {
							action()
						}
					})
					
					
					this.app.post('api/comment/comment_count', {
						user_id: this.user_id,
					}, json => {
						if (json.code == '0') {
							this.comment_count = json.data
						}
					})
					
					this.app.post('api/user/plus', {}, json => {
						if (json.code == '0') {
							this.me = json.data
						}
					})
					
					this.app.post('api/user_plus_see/find_see', {
						user_id: this.user_id,
					}, json => {
						if (json.code == '0') {
							this.user_plus_see = json.data
						}
					})
					
					this.app.post('api/user_plus_see/find_see_count_day', {
					}, json => {
						let {code, data} = json
						if(code == 0){
							this.see = data.see
							this.see_count = data.see_count
						}else{
							this.app.toastNone(data)
						}
					})
					

				} else {
					this.app.toast('缺少ID')
				}
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
			onAddContact_back(e) {
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
			onAddContact(e) {
				if (this.me.is_plus != 1) {
					this.app.toastNone('VIP才可以加好友')
					setTimeout(() => {
						this.app.go('/pages/plus/plus_coin')
					}, 1500)
					return
				}
				let user = this.user
				this.app.post('api/chat_contact/add_float_plus', {
					user_id: user.id
				}, json => {
					if (json.code == '0') {
						this.reLoad()
						this.app.toast(json.data)
					} else {
						this.app.toast(json.data)
						setTimeout(() => {
							this.app.toastNone('请解锁后添加')
						}, 1500)
					}
					// 

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
			onPlusSee() {
				this.is_show_info = true
			},
			onWinUserWxClose() {
				this.is_show_info = false
				this.reLoad()
			},

			onMenuShow() {
				this.is_show_menu = true
			},
			onMenuInvoke(e) {
				let index = e.index
				let menu = this.modal_menu[index]

				if (menu == '举报') { //点击了置顶  ['置顶', '删除', '清空聊天记录', '取消']
					this.is_show_menu = false
					this.onReport()
				} else if (menu == '取消') { //清空聊天记录
					this.is_show_menu = false

				}
			},
			onMenuClose() {
				this.is_show_menu = false
			},
			onShowDetail(index) {
				this.index_show_detail = index
			},


			previewImage(e) { //点击图片预览
				this.app.previewImage(e)
			},
			previewImages(e) { //点击图片预览
				this.app.previewImages(e)
			},

			onCommentInput(e) {
				this.app.go('/pages/comment/comment_input', {
					user_id: this.user_id,
				})
			},
			onPayVideo(e) { //点击播放视频
				let url = this.app.upload + this.app.ed(e).text
				this.app.go('/pages/message/video', {
					url: url
				})
			},
			onCommentInput(e) {
				this.app.go('/pages/comment/comment_input', {
					user_id: this.user_id,
				})
			},
			previewVideo(e) { //点击播放视频
				let url = this.app.ed(e).url
				this.app.go('/pages/message/video', {
					url: url
				})
			},
			onCommentUser(e) { //点击播放视频
				let index = this.app.ed(e).index
				let item = this.page.data[index]
				this.app.go('/pages/index/detail/detail', {
					user_id: item.creby,
				})
			},
			onCommentDel(e) { //点击播放视频
				let index = this.app.ed(e).index
				let item = this.page.data[index]
				if (item.creby != this.me.id) {
					return
				}

				this.app.message("确定删除评论?", item.text, () => {

					this.app.post('api/comment/del_logic', {
						id: item.id,
					}, json => {
						if (json.code == '0') {
							this.reLoad()
						} else {
							this.app.tost(json.data)
						}
					})

				})
			},

			//评论的有函数
			onRate(e) {
				let index = this.app.ed(e).index
				let item = this.rate_list[index]
				this.rate_index = index

				this.model.rate = item.rate
			},
			onCheckInter(e) {
				this.check_inter = !this.check_inter
			},
			onAddImg(e) {
				this.app.chooseImage(fs => {
					/* 					for(let i in fs){
											this.img_list.push({
												img: fs[i],
											})
										} */

					/* 					let ufs = []
										for (let i in fs) {
											ufs.push({
												name: 'file',
												path: fs[i],
												data: {
													type: '1',
													user_id: this.user_id,
												}
											})
										}
										uni.toastUpload()
										this.app.uploadFiles('api/chat/chat_send', ufs, () => {
											this.app.toastHide()
										}) */

					this.app.toastUpload()
					this.app.uploadFiles('api/comment/upload', fs, json => {
						this.app.toastHide()
						for (let i in json) {
							this.img_list.push({
								img: json[i].saveName,
							})
						}
					})

				}, 9 - this.img_list.length - (this.video ? 1 : 0))
			},
			onAddVideo(e) {
				this.app.chooseVideo((video, res) => {
					let duration = res.duration

					if (duration > 61) {
						this.app.toast('视频超过60s')
						return
					}

					this.app.toastUpload()
					this.app.uploadFile('api/comment/upload_video?XDEBUG_SESSION_START=13476', video, json => {
						this.app.toastHide()
						this.video = json.saveName
					})


					//this.video = video

					/* let videoUp = {
						name: 'file',
						path: video,
						data: {
							type: '3',
							user_id: this.user_id,
							duration: duration,
						}
					}	
					uni.showToast({
						title: "上传中…",
						icon: "loading",
						duration: 99999
					})
					this.app.uploadFile('api/chat/chat_send?XDEBUG_SESSION_START=11165', videoUp, () => {
						this.app.toastHide()
					}) */
				})
			},
			onComment(e) {




				this.model.img = this.app.join(this.img_list, ',', 'img')
				this.model.video = this.video
				this.model.sale_id = this.user_id
				console.log(this.model)


				// model: {
				// 	sale_id: '',
				// 	rate: '',
				// 	text: '',
				// 	img: '',
				// 	video: '',
				// 	is_anonym: '',
				// },
				if (!this.model.sale_id) {
					this.app.toast('缺少用户')
					return
				}
				if (!this.model.rate) {
					this.app.toast('请选择好感度')
					return
				}
				if (!this.model.text) {
					this.app.toast('请输入评论')
					return
				}
				if (this.model.text.length < 10) {
					this.app.toast('请输入10字及以上评论')
					return
				}



				this.app.msgs('确定进行评价', () => {
					this.app.post('api/comment/comment', {
						...this.model,
					}, json => {
						if (json.code == '0') {
							this.app.toast('评价成功')
							this.reLoad()
							// this.app.backTime(1000, {
							// 	is_reload: 1
							// })
							//this.app.getPageBack().reload()
							this.model = {
								sale_id: '',
								rate: '',
								text: '',
								img: '',
								video: '',
								is_anonym: '0',
							}
							this.img_list = []
							this.video = ''
							this.rate_index = -1
							
						} else {
							this.app.toast(json.data)
						}
					})
				})


			},
			onDelImg(e) {
				let index = this.app.ed(e).index
				this.img_list.splice(index, 1)

			},
			onDelVideo(e) {
				this.video = null
			},
			onCheckAnonym(e) {
				if (this.model.is_anonym == '0') {
					this.model.is_anonym = '1'
				} else {
					this.model.is_anonym = '0'
				}
				// this.model.is_anonym = !this.model.is_anonym
			},

			onPrivateChat(e) {
				
				this.app.post('api/user/is_friend', {
					user_id: this.user_id
				}, json => {
					if (json.code == '0') {  //是好友直接进入
						this.onChatUser()
					} else {//不是好友
					
						this.app.post('api/chat_contact/add_float_plus', {
							user_id: this.user_id
						}, json => {
							if (json.code == '0') {  //是好友了
								this.onChatUser()
							} else {//这里需要购买了
								this.onPlusSee()
							}
						})
					
						// if(this.user_plus_see && this.user_plus_see.id){  //存在解锁
						// 	this.onChatUser()
						// }else{
						// 	if(this.me.is_plus == 1){
						// 		if(this.see_count > 0){
						// 			this.onChatUser()
						// 		}else{
						// 			this.onPlusSee()
						// 		}
						// 	}else{
						// 		this.onPlusSee()
						// 	}
						// }
						
					}
				})
				
				
				
				
			},

		},
		onLoad(option) {
			this.user_id = option.user_id

		},
		onPullDownRefresh() {
			this.reLoad(() => {
				this.app.stopPullDownRefresh()
			})

			// this.page.reload(() => {
			// 	this.app.toast("刷新成功")
			// })
		},
		onReachBottom() {
			if (this.index_show_detail == 1) {
				this.page.next()
			}
		},
		onShow() {
			this.app.checkUser()			
			this.reLoad()

		},
	}
</script>

<style>
	page {
		background: #F0F0F0;
	}

	.icon-like {
		width: 70rpx;
		height: 70rpx;
	}
</style>
