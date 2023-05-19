<template>
	<view class="">
		
		<view class="box bg-ff ">
			<view @tap="onUserDetail" class="cols-6 text-color-4  text-center-h pt pb text-sm text-bold">
				信息
			</view>
			<view  class="cols-6 page-nav-sel text-color-4 text-center-h pt pb text-sm text-bold">
				评论
			</view>
		</view>
		
		<view class="box-wrap-space-around pl pr pt-md ">
			<view class="cols">
				<view class="text-center-hv">
					<image :src="user.avatar" :data-src="user.avatar" @tap="previewImage" class="avatar-wx-sm"></image>
				</view>
				<view class="text-center-h pt-sm text-color-6"> {{user.nickname}}</view>
			</view>
			<!-- <view class="">
				<view class="text-center-hv" v-if="user.is_show_company_img == '1'">
					<image :src="app.upload + user.company_img" :data-src="app.upload + user.company_img"
						@tap="previewImage" class="avatar-company-img-sm"></image>
				</view>
				<view v-else class="">
					<view class="text-center-hv">
						<view class=" avatar-company-img-sm border">
							<view class="text-center-hv  text-color-9 full text-sm">
								营业执照
							</view>
						</view>
					</view>
					<view class="text-center-h text-color-9 text-sm pt-sm">用户已关闭公开展示</view>
				</view>
			</view> -->
		</view>

		<view class="pt pl pr">
			<view class="box">
				<view class="text-sm text-color-6">
					ID：{{user.id}} <!-- {{user.phone}} -->
				</view>

				<view class="rows" v-if="me && user && me.id && user.id && me.id != user.id">
					<view class="pl pr-sm text-price" @tap="onCommentInput">
						我要评论
					</view>
					<!-- <view class="text-price pr-sm" @tap="onComment">
						评论 0
					</view> -->
				</view>
			</view>

			<view class="line-wx mt"></view>
		</view>

		<view v-for="(item,index) in page.data" class="bg-comment-box mm" @longtap="onCommentDel" :data-index='index'
			style="border-radius: 20rpx;" :class="[item.creby == me.id?'bg-comment-box-me':'']">

			<view @tap="onCommentUser" :data-index='index'>
				<view class="box pt pl pr">
					<view class="text-center-hv">
						<image :src="item.avatar" :data-src="item.avatar" class="avatar-comment-item">
						</image>

						<view class="pl-sm text-sm " :class="[item.creby == me.id?'text-price':'text-color-6']">
							<view class="" >
								<text v-if="item.is_anonym == '1'">******</text>
								<text v-else>{{item.nickname}}</text>
								<text class="pl-sm">{{maskPhone(item.phone)}}</text>
							</view>
							
							<view class="rows pt-sm">
								<view class="pr-sm" v-for="(it, index) in 5" >
									<image v-if="(index + 1) <= item.rate" src="/static/images/rate_ed.png" class="icon-rate-sm"></image>
									<image v-else src="/static/images/rate_df.png" class="icon-rate-sm"></image>
								</view>
							</view>
							
						</view>
					</view>
					<view class=" text-sm" :class="[item.creby == me.id?'text-price-3':'text-color-9']">
						{{(item.credate)}}</view>
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
				is_reload: 1,
			}
		},
		methods: {
			reloadFloat(){
				if(this.is_reload == 0){
				}else{
					this.reLoad()
					this.is_reload = 0
				}
			},
			reLoad(action ) {
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

						if (user.user_type == '1') { //是客服直接退出
							this.app.back()
							return
						}
						if (user.del == '-4') {
							this.app.toast('用户已注销')
							setTimeout(() => {
								this.app.back()
							}, 2000)
						}
					})

					this.page = new this.app.page('api/comment/page_sale', {
						sale_id: this.user_id
					})
					this.page.next( () => {
						if(action) {
							action()
						}
					})

					this.app.post('api/user/info', {}, userinfo => {
						this.me = userinfo
					})

				} else {
					this.app.toast('缺少ID')
				}
			},
			onPhone(e) { //
				let phone = this.app.ed(e).phone
				this.app.makePhoneCall(phone)
			},
			send(e) { //点击发送
				this.app.post('api/chat/chat_send?XDEBUG_SESSION_START=13656', {
					user_id: this.user_id,
					text: this.input_text
				}, json => {
					this.input_text = ''
				})
			},
			onAddImg(e) { //点击添加图片
				this.app.chooseImage(fs => {
					let ufs = []
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
					uni.showToast({
						title: "上传中…",
						icon: "loading",
						duration: 99999
					})
					this.app.uploadFiles('api/chat/chat_send', ufs, () => {
						this.app.toastHide()

					})
				}, 9)
			},
			onAddVideo(e) { //点击添加视频
				this.app.chooseVideo((video, res) => {
					let duration = res.duration
					let videoUp = {
						name: 'file',
						path: video,
						data: {
							type: '3',
							user_id: this.user_id,
							duration: duration,
						}
					}
					if (duration > 61) {
						this.app.toast('视频超过60s')
						return
					}


					uni.showToast({
						title: "上传中…",
						icon: "loading",
						duration: 99999
					})
					this.app.uploadFile('api/chat/chat_send?XDEBUG_SESSION_START=11165', videoUp, () => {
						this.app.toastHide()
					})
				})
			},
			previewImage(e) { //点击图片预览
				this.app.previewImage(e)
			},
			previewImages(e) { //点击图片预览
				this.app.previewImages(e)
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
			
			onUserDetail(e){
				// this.app.goc('/pages/index/detail/detail', {
				// 	user_id: this.user.id,
				// })
				this.app.back()
			}
		},
		onLoad(option) {
			this.user_id = option.user_id
			
			this.reloadFloat()
		},
		onShow() {
			this.reloadFloat()
		},
		onPullDownRefresh() {
			//  this.reLoad(() => {
			// 	this.app.toast("刷新成功")
			// })
			this.page.reload(() => {
				this.app.toast("刷新成功")
			})
		},
		onReachBottom() {
			this.page.next()
		},
	}
</script>

<style>

</style>
