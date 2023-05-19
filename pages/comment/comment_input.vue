<template>
	<view>
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
				<textarea class="full-width " value="" placeholder="好感评价" maxlength="2000" 
				style="height: 200rpx;" v-model="model.text"/>
			</view>
		</view>

		<view class="line-wx-xs"></view>

		<view class="rows-wrap ml mr">
			
			<view class="col-4 text-center-hv" v-if="video">
				<view class="comment-img-box text-center-hv cols" >
					<image class="comment-img" src="/static/images/icon_video.png"></image>
					<view class="">视频</view>
					<image src="/static/images/icon_del_top.png" class="comment-img-del" @tap="onDelVideo"></image>
				</view>
			</view>
			
			
			<view class="col-4 text-center-hv" v-for="(item,index) in img_list">
				<view class="comment-img-box text-center-hv cols" >
					<image class="comment-image" :src="app.upload + item.img"></image>
					<image src="/static/images/icon_del_top.png" class="comment-img-del"
					 @tap="onDelImg" :data-index="index"></image>
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
					<checkbox class="checkbox checkbox-danger"></checkbox>
					<text class="">匿名评价</text>
				</label>
			</checkbox-group>
		</view>


		<view class="rows pt-lg ml mr">
			<button class="btn-danger btn-block" @tap="onComment">提交</button>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				app: this.app,
				user_id: '',
				user: {},
				me: {},

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
			}
		},
		methods: {
			reLoad() {
				let user_id = this.user_id

				if (user_id) {
					this.app.post('api/user/find_detail', {
						user_id: user_id
					}, json => {
						this.user = json.user
					})

					this.app.post('api/user/info', {}, userinfo => {
						this.me = userinfo
						if(userinfo.id == user_id){
							this.app.toast('不能评论自己')
							this.app.backTime(1000)
						}
					})

				} else {
					this.app.toast('缺少ID')
				}
			},
			onRate(e) {
				let index = this.app.ed(e).index
				let item = this.rate_list[index]
				this.rate_index = index
				
				this.model.rate = item.rate
			},
			onCheckInter(e) {
				this.check_inter = !this.check_inter
			},
			onAddImg(e){
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
						for(let i in json){
							this.img_list.push({
								img: json[i].saveName,
							})
						}
					})
					
				}, 9 - this.img_list.length - (this.video?1:0))
			},
			onAddVideo(e){
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
			onComment(e){
		

				
				
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
				if(!this.model.sale_id){
					this.app.toast('缺少用户')
					return
				}
				if(!this.model.rate){
					this.app.toast('请选择好感度')
					return
				}
				if(!this.model.text){
					this.app.toast('请输入评论')
					return
				}
				if(this.model.text.length < 10){
					this.app.toast('请输入10字及以上评论')
					return
				}
				
				
				
				this.app.msgs('确定进行评价', () => {
					this.app.post('api/comment/comment', {
						...this.model,
					}, json => {
						if(json.code == '0'){
							this.app.toast('评价成功')
							this.app.backTime(1000, {is_reload: 1})
							//this.app.getPageBack().reload()
						}else{
							this.app.toast(json.data)
						}
					})
				})
				
				
			},
			onDelImg(e){
				let index = this.app.ed(e).index
				this.img_list.splice(index, 1)
				
			},
			onDelVideo(e){
				this.video = null
			},
			onCheckAnonym(e){
				if(this.model.is_anonym == '0'){
					this.model.is_anonym = '1'
				}else{
					this.model.is_anonym = '0'					
				}
				// this.model.is_anonym = !this.model.is_anonym
			},
		},
		onLoad(option) {
			this.user_id = option.user_id
			this.reLoad()
		},
	}
</script>

<style>

</style>
