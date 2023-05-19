<template>
	<view class="pl pr">
		<view class="rows pt pb">
		    <view class="form-text-left form-text-left text-center-v">上传图片：</view>
		    <view class="form-text-right" @tap="onAddImg">
		        <!-- <input type="text" placeholder="请选择图片" @tap="onAddImg"> -->
				
				<image src="/static/images/icon_img_upload.png" mode="scaleToFill" style="width: 120rpx;height: 120rpx;"></image>
		    </view>
		</view>
		
		<view class="box-wrap-start">
		    <view class='col img-box pr pt' v-for="(item,index) in listPhoto" :key="index">
		        <image mode="aspectFit" class='img-border' :src='app.upload + item' :data-src='app.upload + item' @tap="previewImage"></image>
		        <button class='btn-image-del  full-width text-center-hv' :data-index='index' @tap='onDelImg'>
		            ×
		        </button>
		    </view>
		</view>
		<view class="box-wrap-start">
		    <view class='col img-box pr pt' v-for="(item,index) in listPhotoLocal" :key="index">
		        <image mode="aspectFit" class='img-border' :src='item' :data-src='item' @tap="previewImage"></image>
		        <button class='btn-image-del  full-width text-center-hv' :data-index='index' @tap='onDelImgLocal'>
		            ×
		        </button>
		    </view>
		</view>
		
		<view class="pt-lg">
		    <button class="btn-main" @tap="onSave">保存</button>
		</view>
		
		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				app: this.app,
				user: {},
				listPhoto: [],
				listPhotoLocal: [],
			}
		},
		methods: {
			previewImage(e) {
			    this.app.previewImage(e)
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
			            // let UrlFiles = this.app.concat(this.listPhotoLocal, fs)
			            // this.listPhotoLocal = UrlFiles
						
						this.app.uploadFiles('api/user/upload_file', fs, uploadFiles => { //上传完成后
						    for(let i in uploadFiles){
						        this.listPhoto.push(uploadFiles[i].saveName)
						    }
						    
						})
						
			        }, count)
			    } else {
			        this.app.toast('超出上限')
			    }
			},
			onSave(){
			    // this.app.uploadFiles('api/user/upload_file', this.listPhotoLocal, uploadFiles => { //上传完成后 
			    //     let imgs = []
			    //     for(let i in uploadFiles){
			    //         imgs.push(uploadFiles[i].saveName)
			    //     }
			    //     let imgsAll = this.listPhoto.concat(imgs)
			    //     let imgs_text = this.app.join(imgsAll, ',')
			    //     this.user.company_imgs = imgs_text
			    //     this.app.post('api/user/save', {
			    //         ...this.user
			    //     }, json => {
			    //         if(json.code == '0'){
			    //             this.app.toast('发布成功')
			    //             console.log(imgs)                            
			    //         }
			    //     })
			    // })
				
				let imgs_text = this.app.join(this.listPhoto, ',')
				this.user.company_imgs = imgs_text
				this.app.post('api/user/save', {
				    ...this.user
				}, json => {
				    if(json.code == '0'){
				        this.app.toast('发布成功')
				    }
				})
				
			},
		},
		onLoad() {

			this.app.post('api/user/info', {}, json => {
				this.user = json
				if(json.company_imgs){
					this.listPhoto = json.company_imgs.split(',')
				}
				
			})
			
			
		}
	}
</script>

<style>

</style>
