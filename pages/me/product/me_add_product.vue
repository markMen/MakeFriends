<template>
    <view>
        <view class="text-center-h text-md">发布信息</view>

        <view class="pp">
            <view class="rows">
                <view class="form-text-left form-text-left">标题 <text class="pl-sm text-start">*</text></view>
                <view class="form-text-right">
                    <input :disabled="model.id" data-key='title' @input="onInput" :value="model.title" type="text" placeholder="请输入标题" >
                </view>
            </view>
            <view class="rows pt">
                <view class="form-text-left form-text-left">描述 <text class="pl-sm text-start">*</text></view>
                <view class="form-text-right">
                    <textarea :disabled="model.id" data-key='text' @input="onInput" 
					:value="model.text" maxlength='10240' type="text" placeholder="请输入描述"
					 class="text-height-desc" style="max-width: 500rpx;"></textarea>
                </view>
            </view>
			
			<view class="rows pt pb-md">
			    <view class="form-text-left form-text-left">类型 <text class="pl-sm text-start">*</text></view>
			    <view class="form-text-right">
					<radio-group name="" :disabled="model.id" class="cols" @change="onChangeType">
						<label class="pp-sm">
							<radio value="1" :checked="model.type==1"/><text>销售</text>
						</label>
						<label class="pp-sm">
							<radio value="2" :checked="model.type==2"/><text>采购</text>
						</label>
					</radio-group>
			        <!-- <radio :disabled="model.id" data-key='price' @input="onInput" :value="model.price" type="digit" placeholder="请输入价格" > -->
			    </view>
			</view>
			
			
            <view class="rows pt">
                <view class="form-text-left form-text-left">价格 <text class="pl-sm text-start">*</text></view>
                <view class="form-text-right">
                    <input :disabled="model.id" data-key='price' @input="onInput" :value="model.price" type="digit" placeholder="请输入价格" >
                </view>
            </view>
            <view class="rows pt">
                <view class="form-text-left form-text-left">数量 <text class="pl-sm text-start">*</text></view>
                <view class="form-text-right">
                    <input :disabled="model.id" data-key='count' @input="onInput" :value="model.count" type="number" placeholder="请输入数量" >
                </view>
            </view>
			
			<view class="rows pt-lg ">
			    <view class="form-text-left form-text-left">视频</view>
			    <view class="form-text-right" @tap="onAddVideo">
			        <input type="text" placeholder="可上传60秒以内的视频介绍产品（选填）" disabled="disabled">
			    </view>
			</view>
			
<!-- 			<view class="rows pt-lg " v-if="video">
			    <view class="form-text-left form-text-left"></view>
			    <view class="form-text-right full-width" >
			        <video :src="video" controls class="full-width" :poster="video_img"></video>
			    </view>
			</view> -->
			
			<view class="rows pt-lg " v-if="model.video">
			    <view class="form-text-left form-text-left"></view>
			    <view class="form-text-right full-width" >
			        <video :src="app.upload+model.video" controls class="full-width" :poster="app.upload+model.video_img"></video>
			    </view>
			</view>
			
            <view class="rows pt-lg ">
                <view class="form-text-left form-text-left">图片 <text class="pl-sm text-start">*</text></view>
                <view class="form-text-right" @tap="onAddImg">
                    <input type="text" placeholder="请选择图片(第一张图默认为封面)" disabled="disabled">
                </view>
            </view>
            <view class="box-wrap-start">
                <view class='col img-box pr pt' v-for="(item,index) in listPhoto" :key="index">
                    <image class='img-border' :src='app.upload + item' :data-src='app.upload + item' @tap="previewImage"></image>
                    <button v-if="!model.id" class='btn-danger  full-width text-center-hv' :data-index='index' @tap='onDelImg'>
                        <!-- <image src="/static/logo.png" class="img-del"></image> -->
                        x
                    </button>
                </view>
            </view>
            <view class="box-wrap-start">
                <view class='col img-box pr pt' v-for="(item,index) in listPhotoLocal" :key="index">
                    <image class='img-border' :src='item' :data-src='item' @tap="previewImage"></image>
                    <button v-if="!model.id" class='btn-danger  full-width text-center-hv' :data-index='index' @tap='onDelImgLocal'>
                        <!-- <image src="/static/logo.png" class="img-del"></image> -->
                        x
                    </button>
                </view>
            </view>

            <view class="pt-lg" v-if="!model.id">
                <button class="btn-success" @tap="onSave" :disabled="is_loading">发布</button>
            </view>
			
			<view class="pt-lg" v-if="model.id">
				<view class="pt" v-if="!model.id">
				    <button class="btn-success" @tap="onSave">保存</button>
				</view>
				<view class="pt">
				    <button class="btn-danger" @tap="onDel">删除</button>
				</view>
			</view>

			
        </view>


    </view>
</template>

<script>
    export default {
        data() {
            return {
				app: this.app,
                model:{
					title: '',
					text: '',
					price: '',
					count: '',
					img: '',
					imgs: '',
					
					video:'',
				},
                listPhoto: [],
                listPhotoLocal: [],
				
				is_loading:false,
				
				video:'',
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
				if(this.model.id){  //存在则弹出
					return
				}
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
			onSaveModel(){
				let that = this
				this.app.post('api/product/save', {
				    ...this.model
				}, json => {
					this.app.toastHide()
				    if(json.code == '0'){
				        this.app.toast('发布成功')
						that.model = {
							title: '',
							text: '',
							price: '',
							count: '',
							img: '',
							imgs: '',
							video:'',
						}
						this.video = ''
						that.listPhoto = []
						that.listPhotoLocal =[]
				        // console.log(imgs)                            
				    }else{
						this.app.toastNone(json.data)
					}
					this.is_loading = false
				})
			},
            onSave(){				
				let that = this
				if(!this.model.title){
					this.app.toast('请输入标题')
					return 
				}
				
				if(!this.model.text){
					this.app.toast('请输入描述')
					return 
				}
				
				if(!this.model.type){
					this.app.toast('选择类型')
					return 
				}
				
				if(!this.model.price){
					this.app.toast('请输入价格')
					return 
				}
				
				if(!this.model.count){
					this.app.toast('请输入数量')
					return 
				}
				
				if(this.listPhotoLocal.length + this.listPhoto.length <= 0){
					this.app.toast('请选择图片')
					return 
				}
				
				
				if(this.is_loading){
					return 
				}
				this.is_loading = true
				
				this.app.toastLoading()				
                this.app.uploadFiles('api/product/upload', this.listPhotoLocal, uploadFiles => { //上传完成后 
                    let imgs = []
                    for(let i in uploadFiles){
                        imgs.push(uploadFiles[i].saveName)
                    }
                    let imgsAll = this.listPhoto.concat(imgs)                

                    this.model.imgs = this.app.join(imgsAll, ',')
                    if(imgs.length > 0){
                        this.model.img = imgs[0]
                    }
     //                if(this.video){
					// 	this.app.uploadFile('api/product/upload_video', this.video, upVideo => { //上传完成后
					// 	    this.model.video = upVideo.saveName
					// 	    this.model.video_img = upVideo.video_img
					// 	    this.onSaveModel()
					// 	})
					// }else{
					// 	this.onSaveModel()
					// }
					
					this.onSaveModel()
                    
                    
                })
            },
			onDel(){
				this.app.msg('确认删除', '', is => {
					if(is){
						this.app.postLoad('api/product/del_logic', {
							id:this.model.id
						}, json => {
						    if(json.code == '0'){
						        this.app.toast('删除成功')
								this.app.back()
						    }
						})
					}
				})
			},
			onAddVideo(e){
				this.app.chooseVideo(fs => {
				    // this.video = fs
					// console.log(fs)
					this.app.toastLoading()
					this.app.uploadFile('api/product/upload_video', fs, upVideo => { //上传完成后
						
					    this.model.video = upVideo.saveName
					    this.model.video_img = upVideo.video_img					    
					}, 
					fail => {},
					com => {
						this.app.toastHide()
					})
				})
			},
			onChangeType(e){
				let type = this.app.ev(e)
				this.model.type = type
				console.log(type)
			},
        },
        onLoad(option) {
            let id = option.id
            if(id){
               this.app.post('api/product/find', {
                   id: id
               }, json => {
                   this.model = json.data
                   this.listPhoto = json.imgs_split

               }) 
            }
			
			// let list = [];
			// list['2'] = '222'
			// list['0'] = '000'
			// list[1] = '111'
			// for(let i in list){
			// 	console.log(list[i])
			// }
        },
    }
</script>

<style>

</style>
