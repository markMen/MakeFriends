<template>
	<view>
		<view class="text-center-h text-md">举报用户ID {{user_info.id}}</view>


		<view class="pp">

			<view class="rows pt">
				<view class="form-text-left form-text-left text-color-6">用户名称</view>
				<view class="form-text-right text-color-6">
					{{user_info.nickname}} {{user_info.company_server_name}}
				</view>
			</view>

			<view class="rows pt pb">
				<view class="form-text-left form-text-left text-color-6">用户公司</view>
				<view class="form-text-right text-color-6">
					{{user_info.company_name}}
				</view>
			</view>

			<view class="rows">
				<view class="form-text-left form-text-left">举报标题*</view>
				<view class="form-text-right">
					<input data-key='title' @input="onInput" :value="model.title" type="text" placeholder="请输入标题">
				</view>
			</view>
			<view class="rows pt">
				<view class="form-text-left form-text-left">举报描述*</view>
				<view class="form-text-right">
					<textarea data-key='text' @input="onInput" :value="model.text" maxlength='10240' type="text" placeholder="请输入举报详细描述"
					 class="text-height-desc" style="max-width: 500rpx;"></textarea>
				</view>
			</view>

			<view class="rows pt ">
				<view class="form-text-left form-text-left">举报图片</view>
				<view class="form-text-right">
					<input type="text" placeholder="请选择举报证据图片" @tap="onAddImg">
				</view>
			</view>
			<view class="box-wrap-start">
				<view class='col img-box pr pt' v-for="(item,index) in listPhoto" :key="index">
					<image class='img-border' :src='app.upload + item' :data-src='app.upload + item' @tap="previewImage"></image>
					<button class='btn-danger  full-width text-center-hv' :data-index='index' @tap='onDelImg'>
						<!-- <image src="/static/logo.png" class="img-del"></image> -->
						x
					</button>
				</view>
			</view>
			<view class="box-wrap-start">
				<view class='col img-box pr pt' v-for="(item,index) in listPhotoLocal" :key="index">
					<image class='img-border' :src='item' :data-src='item' @tap="previewImage"></image>
					<button class='btn-danger  full-width text-center-hv' :data-index='index' @tap='onDelImgLocal'>
						<!-- <image src="/static/logo.png" class="img-del"></image> -->
						x
					</button>
				</view>
			</view>

			<view class="pt-lg mt-lg">
				<button class="btn-danger" @tap="onSave">确认举报</button>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					title:'',
					text:'',
					imgs:'',
				},
				user_info: {},
				app: this.app,

				listPhoto: [],
				listPhotoLocal: [],
			}
		},
		methods: {
			onInput(e) {
				let key = this.app.ed(e).key
				this.model[key] = this.app.ev(e)
			},
			onDelImg(e) {
				let index = this.app.ed(e).index
				this.listPhoto.splice(index, 1)
			},
			onDelImgLocal(e) {
				let index = this.app.ed(e).index
				this.listPhotoLocal.splice(index, 1)
			},
			onAddImg() {
				let count = 6 - this.listPhoto.length - this.listPhotoLocal.length
				if (count > 0) {
					this.app.chooseImage(fs => {
						let UrlFiles = this.app.concat(this.listPhotoLocal, fs)
						this.listPhotoLocal = UrlFiles
					}, count)
				} else {
					this.app.toast('超出上限')
				}
			},
			previewImage(e) {
				this.app.previewImage(e)
			},
			onSave() {
				if(!this.model.title){
					this.app.toast('请输入举报标题')
					return
				}
				if(!this.model.text){
					this.app.toast('请输入举报描述')
					return
				}
				
				
				this.app.msgSys('确认举报', is => {
					if (is) {
						this.app.uploadFiles('api/user_report/upload', this.listPhotoLocal, uploadFiles => { //上传完成后
							let imgs = []
							for (let i in uploadFiles) {
								imgs.push(uploadFiles[i].saveName)
							}
							let imgsAll = this.listPhoto.concat(imgs)
							this.model.imgs = this.app.join(imgsAll, ',')

							this.app.postLoad('api/user_report/save', {
								...this.model,
								user_id: this.user_info.id,
							}, json => {
								if (json.code == '0') {
									
									this.model = {
										title:'',
										text:'',
										imgs:'',
									}
									this.listPhoto = []
									this.listPhotoLocal = []
									
									this.app.toast('举报成功')
									console.log(imgs)
								}
							})
						})
					}
				})

			},
		},
		onLoad(option) {
			let user_id = option.user_id
			if (user_id) {
				this.user_id = user_id

				this.app.post('api/user/user_info', {
					user_id: user_id
				}, userinfo => {
					this.user_info = userinfo
				})
			} else {
				this.app.toast('缺少用户ID')
			}
		},
		onShow() {
			this.app.checkUser()
		},
	}
</script>

<style>

</style>
