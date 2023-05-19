<template>
	<view>

		<view class="box pl pr pt-md pb-sm border-bottom">
			<view class="step-title">币</view>
			<view class="step-more">时间</view>
		</view>
		<view class="ml mr">
			<view class="mt pb border-bottom " v-for="(item,index) in page.data" :key="index">
				<view class="text-color-3">{{item.title}}</view>
				<view class="box text-sm">
					<view class="text-color-9">{{item.coin}} 个</view>
					<view class="text-color-6">{{item.credate}}</view>
				</view>
			</view>
		</view>


		<view class='text-page' v-if="page.isLoad">加载中...</view>
		<view class='text-page' v-if="page.isMore">没有更多了</view>

		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				app: this.app,
				me: {},
				page: {},
			}
		},
		methods: {

		},
		onLoad(options) {
			this.app.post('api/user/me_info', {}, json => {
				let {code, data} = json
				if(code == 0){
					this.me = data
				}
			})

			this.page = new this.app.page('api/coin_order/page_me', {
				state: '2',
			})
			this.page.next()

		},
		onPullDownRefresh() {
			this.page.reload(() => {
				this.app.toast("刷新成功")
			})
		},
		onReachBottom() {
			this.page.next()
		},
		onShareAppMessage() {
			return this.app.onShareAppMessage()
		},
		onShareTimeline() {
			return this.app.onShareTimeline()
		},
	}
</script>

<style>

</style>
