<template>
    <view>
        <view class="text-center-h text-md">发布信息</view>

        <view class="pp">
            <view class="rows">
                <view class="form-text-left form-text-left">标题</view>
                <view class="form-text-right">
                    <input data-key='title' @input="onInput" :value="model.title" type="text" placeholder="请输入标题" >
                </view>
            </view>
            <view class="rows pt">
                <view class="form-text-left form-text-left">描述</view>
                <view class="form-text-right">
                    <textarea data-key='text' @input="onInput" :value="model.text" maxlength='10240' 
					type="text" placeholder="请输入描述" class="text-height-desc" style="max-width: 500rpx;"></textarea>
                </view>
            </view>
<!--            <view class="rows pt">
                <view class="form-text-left form-text-left">价格</view>
                <view class="form-text-right">
                    <input data-key='price' @input="onInput" :value="model.price" type="digit" placeholder="请输入价格" >
                </view>
            </view>
            <view class="rows pt">
                <view class="form-text-left form-text-left">数量</view>
                <view class="form-text-right">
                    <input data-key='count' @input="onInput" :value="model.count" type="number" placeholder="请输入数量" >
                </view>
            </view> -->
            <view class="rows pt ">
                <view class="form-text-left form-text-left">图片</view>
                <view class="form-text-right">
                    <input type="text" placeholder="请选择图片" @tap="onAddImg">
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

            <view class="pt-lg" v-if="!model.id">
                <button class="btn-success" @tap="onSave">发布</button>
            </view>
			
			<view class="pt-lg" v-if="model.id">
				<view class="pt">
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
                model:{},
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
            onSave(){
				if(!this.model.title){
					this.app.toast('请输入标题')
					return 
				}
				
				if(!this.model.text){
					this.app.toast('请输入描述')
					return 
				}
				
				// if(!this.model.price){
				// 	this.app.toast('请输入价格')
				// 	return 
				// }
				
				// if(!this.model.count){
				// 	this.app.toast('请输入数量')
				// 	return 
				// }
				
				if(this.listPhotoLocal.length + this.listPhoto.length <= 0){
					this.app.toast('请选择图片')
					return 
				}
				
				
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
                    
                    //this.model.type = '1'
                    this.app.postLoad('api/product/save', {
                        ...this.model
                    }, json => {
                        if(json.code == '0'){
                            this.app.toast('发布成功')
                            console.log(imgs)                            
                        }
                    })
                    
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
        },
    }
</script>

<style>

</style>
