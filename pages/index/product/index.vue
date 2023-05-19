<template>
	<view class="container">

		<view class="top search-top-up">
			<view class="tui-searchbox ml mr">
				<view class="tui-search-input">
					<view @tap="onSearch">
						<tui-icon name="search" :size='16' color='#333'></tui-icon>
					</view>
					<input confirm-type="text" placeholder="请输入搜索内容" placeholder-class="tui-input-plholder" class="tui-input "
					 v-model.trim="search_text" />
					<view @tap="cleanSearchText" v-show="search_text">
						<tui-icon name="close-fill" :size='16' color='#bcbcbc'></tui-icon>
					</view>
				</view>
				<view class="tui-cancle" @tap="onSearch" v-if="search_text != null && search_text != ''">搜索</view>
			</view>
		</view>
		<view class="search-top-down"></view>


		<view class="line-wx"></view>

		<view class="rows">
			<view class="col-12">
				<view v-for="(item,index) in page.data" :key="index" @tap="onDetail" :data-index='index' :data-id='item.id'
				 @longtap="onDetailLong">
					<view class="tui-light-green com-box com-box-left text-center-hv com-box-12">
						<image v-if="item.company_imgs && item.company_imgs != 'null '" :src="app.upload + toArrayFirst(item.company_imgs)" mode="scaleToFill" class="com-box-img"></image>
						<image v-else :src="app.upload + def_img.img" mode="scaleToFill"
								class="com-box-img"></image>
						
						<view class="com-box-text-bg text-center-h cols">
							<view class="text-sm com-box-text text-center">{{item.nickname}} {{item.company_server_name}}</view>
							<view class="text-sm com-box-text text-center">{{item.company_name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!--加载loadding-->
		<tui-loadmore :visible="page.isLoad || page_sale.isLoad" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="page.isMore  || page_sale.isMore"></tui-nomore>
		<!--加载loadding-->

		<!-- <image class="logo" src="/static/logo.png"></image>
		<text class="text-area" @tap="onTitle">{{title}}</text> -->
		<vive-modal-menu :hidden="selected==null" @click="onMenuInvoke" @close="onMenuClose" :menu="modal_menu"></vive-modal-menu>
		<vive-back-top :flag="top_flag"></vive-back-top>
	</view>
</template>

<script>
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	import tuiIcon from "@/components/icon/icon"
	import viveModalMenu from "@/components/vive-modal-menu/vive-modal-menu"
	import viveBackTop from "@/components/vive-back-top/vive-back-top.vue"

	export default {
		components: {
			tuiLoadmore,
			tuiNomore,
			tuiIcon,
			viveModalMenu,
			viveBackTop,
		},
		computed: {
			toArrayFirst: function() {
				return function(imgs) {
					if (imgs) {
						let list = imgs.split(',')
						if (list.length > 0) {
							return list[0]
						}
					} else {
						return ''
					}
				}
			},
		},
		data() {
			return {
				app: this.app,
				page: new this.app.page(),
				page_sale: new this.app.page(),
				search_text: '',
				title: 'Hello',
				selected: null,
				modal_menu: ['置顶', '取消'],
				
				top_flag:false,
				def_img:{
					img:'',
					img_sale:'',
				},
			}
		},
		onLoad() {
			this.app.setTitle('生产方')

		},
		onShow() {
			   this.app.checkUser()
			//this.app.toastLoading()
			this.app.getOpenid(openid => {
				//this.app.toastHide()
				this.onSearch()
				
				this.app.post('api/default_image/def', {}, json => {
					if (json.code == '0') {
						this.def_img = json.data
					}
				})
				
			})
		},
		methods: {
			reload() {
				this.page.reload(() => {
					this.app.toast("刷新成功")
				})
			},
			cleanSearchText() {
				this.search_text = ''
				this.onSearch()
			},
			onTitle() {
				this.app.toast('asdf')
			},
			onSearch() { //搜索

				//构造
				this.page = new this.app.page('api/user/page_product', {
					search_text: this.search_text
				})
				this.page.next()

				// this.page_sale = new this.app.page('api/user/page_sale', {
				//     search_text: this.search_text
				// })
				//this.page_sale.next()

			},
			onDetail(e) {
				let id = this.app.ed(e).id
				this.app.go('/pages/index/detail/detail', {
					user_id: id
				})
			},



			onDetailLong(e) {
				this.selected = this.page.data[this.app.ed(e).index]
				/*let id = this.app.ed(e).id
				this.app.post('api/user_top/add_float', {
					user_id: id,
				}, json => {
			
				})*/
				if (this.selected.user_top_id) {
					this.modal_menu = ['取消置顶', '取消']
				} else {
					this.modal_menu = ['置顶', '取消']
				}
			},
			onDetailLong_sale(e) {
				this.selected = this.page_sale.data[this.app.ed(e).index]
				if (this.selected.user_top_id) {
					this.modal_menu = ['取消置顶', '取消']
				} else {
					this.modal_menu = ['置顶', '取消']
				}
			},
			onMenuInvoke(e) {
				if (this.selected.user_top_id) { //存在就取消
					let user_id = this.selected.user_id
					this.selected = null
					let index = e.index
					if (index == 0) { //点击了置顶
						this.app.post('api/user_top/del_float', {
							user_id: user_id,
						}, json => {
							this.app.toast('取消置顶')
							this.reload()
						})
					}
				} else { //不存在就添加
					let user_id = this.selected.user_id
					this.selected = null
					let index = e.index
					if (index == 0) { //点击了置顶
						this.app.post('api/user_top/add_float', {
							user_id: user_id,
						}, json => {
							this.app.toast('置顶成功')
							this.reload()
						})
					}
				}
			},
			onMenuClose() {
				this.selected = null
			},
		},
		onPullDownRefresh() {
			this.page.reload(() => {
				this.app.stopPullDownRefresh();
				this.app.toast("刷新成功")
			})
		},
		onReachBottom() {
			this.page.next()
			//this.page_sale.next()

		},
		onPageScroll(e) { //根据距离顶部距离是否显示回到顶部按钮
		 this.top_flag = this.app.isTopFlag(e)
		},
	}
</script>

<style>


</style>
