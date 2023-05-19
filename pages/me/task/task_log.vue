<template>
	<view>
		<view class="pl pr">


			<view class="icon-arrow-abs-box" v-for="(item,index) in page.data">
				<view class="icon-arrow-abs box text-center-v pl pr pt-md pb-md" style="" @tap="onTask" :data-index="index">

					<view class="rows ">
						<view class="pr-sm">
							<image src="/static/images/icon_task.png" mode="" class="swiper-task-img"></image>
						</view>
						<view class="text-color-6 " style="font-size: 32rpx;font-weight: bold;">
							{{item.title}}
						</view>
					</view>


					<view class="text-sm text-color-9 pr-sm">
						{{item.create_date}}
					</view>
				</view>
				<view class="full-width" style="height: 2rpx; background-color: #f8f8f8;"></view>
			</view>


		</view>

		<!--加载loadding-->
		<tui-loadmore :visible="page.isLoad" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="page.isMore"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"

	export default {
		components: {
			tuiLoadmore,
			tuiNomore,

		},
		data() {
			return {
				page: new this.app.page(),

			}
		},
		methods: {
			onTask(e) {
				let index = this.app.ed(e).index
				let item = this.page.data[index]
				// if(item.editor){
				// 	this.app.go('/pages/login/editor_task', {
				// 		id: item.id
				// 	})
				// }
				this.app.go('/pages/login/editor_task', {
					id: item.id
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
		onLoad() {
			this.page = new this.app.page('api/task_list/page', {})
			this.page.next()
		}
	}
</script>

<style>


	
</style>
