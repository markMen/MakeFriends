<template>
	<view >
        <view class="video-wrap" @longtap="onShowMenuLong" >		
            <video :src="url" class="" autoplay='true' style="height:100vh; width: 100vh;"></video>
        </view>
        
        <vive-modal-menu :hidden="selected==null" @click="onMenuInvoke" @close="onMenuClose" :menu="modal_menu"></vive-modal-menu>
        
	</view>
</template>

<script>
	import viveModalMenu from "@/components/vive-modal-menu/vive-modal-menu"
	
	export default {
		components: {
			viveModalMenu,
		},
		data() {
			return {
				url:'',
				selected: null, //长按
				modal_menu: ['保存', '取消'],
				
			}
		},
		methods: {
			onShowMenuLong(){
				this.selected = '';
			},
			onMenuInvoke(e) { //菜单点击回调
				let selected = this.selected
				let id = this.selected.id
				let index = e.index
				let menu_text = this.modal_menu[index]
			
				if (menu_text == '保存') { //点击了撤回			
					this.selected = null
					this.app.downloadFile(this.url, res => {
						console.log(res)
					})

				} else {
					this.selected = null
				}
			},
			onMenuClose() { //菜单取消
				this.selected = null
			},
		},
        onLoad(option) {
            let url = option.url
            if(url){
                this.url = url
            }else{
                this.app.toast('缺少地址参数')
            }
        },
		onNavigationBarButtonTap(e) {
			//console.log(e)
			let that = this
			this.app.msg('确定保存到本地','' , is => {
				if(is){
					uni.showToast({
						title: "下载中…",
						icon: "loading",
						duration: 99999
					})
					
					this.app.downloadFile(this.url, file => {
						console.log(file)
						
						uni.saveImageToPhotosAlbum({
						    filePath:file, 
						    success: res => {
						        //下载完成后在相册里压根找不到
								that.app.toastHide()
								that.app.toast('已保存到本地')

						    }
						});
															
															
					})
				}
			})
		},
	}
</script>

<style>
    .video-wrap {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
	},
	.btn-wrap{
		position: fixed;
		right:20rpx;
		bottom: 20vh;
	},
	.list{
		height:2000rpx;
		background-color:#336699;
		text-align: center;
		margin-top:200rpx;
	}
</style>
