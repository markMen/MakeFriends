<template>
    <view class="">


        <view v-for="(item,index) in page.data" :key="index" @tap="onDetail" :data-index='index' :data-id='item.id'>
            <view class="mm">
                <view class="tui-light-blue com-box  text-center-hv">{{item.title}}</view>
            </view>
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

    export default {
        components: {
            tuiLoadmore,
            tuiNomore,
            tuiIcon,
        },
        data() {
            return {
                app: this.app,
                page: new this.app.page(),
                seatch_text: '',
                title: 'Hello',
            }
        },
        onLoad() {
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
                this.page = new this.app.page('api/product/page_sale_me', {
                    search_text: this.seatch_text
                })
                this.page.next()

            },
            onDetail(e){
                let id = this.app.ed(e).id
                // this.app.go('/pages/index/detail/detail',{id: id})
                this.app.go('/pages/index/sale/sale_add',{id: id})
                
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

</style>
