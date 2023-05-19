<template>
	<view class="">
		<tui-list-cell padding="0px" :arrow="true" class="">
			<navigator url="/pages/me/product/me_add_product" class="tui-list-cell "  v-if="me.user_type=='0'">
				<view>发布新的信息</view>
				<view class="tui-content"></view>
			</navigator>
			<navigator url="/pages/me/product/server_add_product" class="tui-list-cell "  v-if="me.user_type=='1'">
				<view>发布新的信息</view>
				<view class="tui-content"></view>
			</navigator>
			
			
		</tui-list-cell>

		<view class="border pp mm" v-for="(item,index) in page.data" :key="index" @tap="onDetail" :data-index='index' :data-id='item.id'>
			<view class="">
				<view class="pt text-center-h">{{item.title}}</view>
				<view class="pt text-color-6 text-sm">{{item.text}}</view>
				<view class="box pr pt">
					<view class="text-center-hv text-price text-sm text-md">价格: ￥{{item.price}}</view>
					<view class="text-center-hv text-color-6 text-sm">数量: {{item.count}}</view>
				</view>
				<view class="text-color-9 text-sm pt rows" >
					<!-- <view class="pr">
						<image :src="user.avatar" mode="scaleToFill" class="avatar-product"></image>
					</view> -->
					<view class="box-v pt pb">
						<view class="">发布于: {{item.credate}}</view>
					</view>
				</view>
				<!-- <view class="pt">{{item.editor}}</view> -->
			</view>
			<view class="pl pr pt text-color-9">详情图片: </view>
			<list-img :imgs="item.imgs" :prefix="app.upload"></list-img>
		</view>
		



		<!--加载loadding-->
		<tui-loadmore :visible="page.isLoad" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="page.isMore"></tui-nomore>
		<!--加载loadding-->

		<!-- <image class="logo" src="/static/logo.png"></image>
		<text class="text-area" @tap="onTitle">{{title}}</text> -->
	</view>
</template>

<script>
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	import tuiIcon from "@/components/icon/icon"

	import tuiListCell from "@/components/list-cell/list-cell"
	import listImg from "@/components/list-img/list-img"

	export default {
		components: {
			tuiLoadmore,
			tuiNomore,
			tuiIcon,
			tuiListCell,
			listImg,
		},
		data() {
			return {
				app: this.app,
				page: new this.app.page(),
				seatch_text: '',
				title: 'Hello',
				me:{},
			}
		},
		onLoad() {
			this.app.setTitle('我的信息管理')
			this.app.getUser(user => {
				this.me = user
			})
		},
		onShow() {
			this.onSearch()
		},
		methods: {
			cleanKey: function() {
				this.seatch_text = ''
			},
			onTitle() {
				this.app.toast('asdf')
			},
			onSearch() { //搜索
				//构造
				this.page = new this.app.page('api/product/page_me', {
					search_text: this.seatch_text
				})
				this.page.next()

			},
			onDetail(e) {
				let id = this.app.ed(e).id
				// this.app.go('/pages/index/detail/detail',{id: id})
				this.app.go('/pages/me/product/me_add_product', {
					id: id
				})
			},
		},
		onPullDownRefresh() {
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
    .tui-userinfo-box {
        padding-bottom: 20rpx;
        color: #333;
    }

    .tui-list-cell {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20rpx 10rpx 20rpx 10px;
        font-size: 30rpx;
    }

    .tui-pr30 {
        padding-right: 30rpx;
    }

    .tui-avatar {
        width: 100rpx;
        height: 100rpx;
        display: block;
    }

    .tui-content {
        font-size: 26rpx;
        color: #666;
    }
</style>
