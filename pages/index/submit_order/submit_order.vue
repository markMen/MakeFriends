<template>
    <view class="container">
        <view class="tui-box">
            <tui-list-cell :arrow="true" :last="true" :radius="true" @click="chooseAddr">
                <view class="tui-address">
                    <view v-if="address.user_name">
                        <view class="tui-userinfo">
                            <text class="tui-name">{{address.user_name}}</text> {{address.tel_number}}
                        </view>
                        <view class="tui-addr">
                            <view class="tui-addr-tag" v-if="address.check=='1'">默认</view>
                            <view class="tui-addr-tag">{{address.tag}}</view>
                            <text>{{address.detail_info}}</text>
                        </view>
                    </view>
                    <view class="tui-none-addr" v-else>
                        <image src="../../../static/images/index/map.png" class="tui-addr-img" mode="widthFix"></image>
                        <text>选择收货地址</text>
                    </view>
                </view>
                <view class="tui-bg-img"></view>
            </tui-list-cell>
            <view class="tui-top tui-goods-info">
                <tui-list-cell :hover="false" :lineLeft="false">
                    <view class="tui-goods-title">
                        商品信息
                    </view>
                </tui-list-cell>
                <block v-for="(item,index) in list" :key="index">
                    <tui-list-cell :hover="false" padding="0">
                        <view class="tui-goods-item">
                            <image :src="app.upload + item.img" class="tui-goods-img"></image>
                            <view class="tui-goods-center">
                                <view class="tui-goods-name">{{item.title}}</view>
                                <view class="tui-goods-attr">{{item.spec_name}}</view>
                            </view>
                            <view class="tui-price-right">
                                <view>￥{{item.price}}</view>
                                <view>x{{item.product_count}}</view>
                            </view>
                        </view>
                    </tui-list-cell>
                </block>
                <tui-list-cell :hover="false">
                    <view class="tui-padding tui-flex">
                        <view>商品总额</view>
                        <!-- <view>￥{{sum.sum_price_int}}.{{sum.sum_price_float}}</view> -->
                        <view>￥{{sum.sum_price}}</view>
                    </view>
                </tui-list-cell>
                <!-- <tui-list-cell :arrow="hasCoupon" :hover="hasCoupon" >
					<view class="tui-padding tui-flex">
						<view>优惠券</view>
						<view :class="{'tui-color-red':hasCoupon}">{{hasCoupon?"满5减1":'没有可用优惠券'}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="true" :arrow="true">
					<view class="tui-padding tui-flex">
						<view>发票</view>
						<view class="tui-invoice-text">不开发票</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-padding tui-flex">
						<view>配送费</view>
						<view>￥0.00</view>
					</view>
				</tui-list-cell> -->
                <tui-list-cell :hover="false" :lineLeft="false" padding="0">
                    <view class="tui-remark-box tui-padding tui-flex">
                        <view>订单备注</view>
                        <input data-key='order_remark' @input="onInputAddress" type="text" class="tui-remark" placeholder="选填: 请先和商家协商一致" placeholder-class="tui-phcolor"></input>
                    </view>
                </tui-list-cell>
                <tui-list-cell :hover="false" :last="true">
                    <view class="tui-padding tui-flex tui-total-flex">
                        <view class="tui-flex-end tui-color-red">
                            <view class="">合计： </view>
                            <view class="tui-size-26">￥</view>
                            <view class="tui-price-large">{{sum.sum_price}}</view>
                            <!-- 	<view class="tui-price-large">{{sum.sum_price}}</view>
							<view class="tui-size-26">.{{sum.sum_price_float}}</view> -->
                        </view>
                    </view>
                </tui-list-cell>
            </view>

            <!-- <view class="tui-top">
				<tui-list-cell :last="true" :hover="insufficient" :radius="true" :arrow="insufficient">
					<view class="tui-flex">
						<view class="tui-balance">余额支付<text class="tui-gray">(￥0.00)</text></view>
						<switch color="#30CC67" class="tui-scale-small" v-show="!insufficient" />
						<view class="tui-pr-30 tui-light-dark" v-show="insufficient">余额不足, 去充值</view>
					</view>
				</tui-list-cell>
			</view> -->
        </view>
        <view class="tui-safe-area"></view>
        <view class="tui-tabbar">
            <view class="tui-flex-end tui-color-red tui-pr-20">
                <view class="">实付金额: </view>
                <view class="tui-size-26">￥</view>
                <view class="tui-price-large">{{sum.sum_price}}</view>
                <!-- <view class="tui-price-large">{{sum.sum_price_int}}</view>
				<view class="tui-size-26">.{{sum.sum_price_float}}</view> -->
            </view>
            <view class="tui-pr25">
                <tui-button width="200rpx" height="70rpx" type="danger" shape="circle" @click="btnPay">确认支付</tui-button>
            </view>
        </view>

    </view>
</template>

<script>
    import tuiButton from "@/components/extend/button/button"
    import tuiListCell from "@/components/list-cell/list-cell"
    import tuiBottomPopup from "@/components/bottom-popup/bottom-popup"
    export default {
        components: {
            tuiButton,
            tuiListCell,
            tuiBottomPopup
        },
        data() {
            return {
                app: this.app,
                list: [],
                sum: {},

                order_no: '', //如果存在订单号 则直接预览
                product_id: '', //如果传递 物品规格
                product_spec_id: '', //如果传递 物品规格
                product_count: 1, //如果传递 物品数量

                address: {},
                hasCoupon: true,
                insufficient: false
            }
        },

        methods: {
            onInputAddress: function(e) {
                let key = this.app.ed(e).key
                this.address[key] = this.app.ev(e)
            },
            chooseAddr() {
                uni.navigateTo({
                    url: "../address/address"
                })
            },
            btnPay() {
                if(!this.address.user_name){
                    this.app.toast('请选择收获地址')
                    return
                }

                if (this.order_no) { //存在订单号
                    this.pay() //
                } else {
                    this.app.post('api/order/cre_order', {
                        json: this.app.toJson(this.list),
                        address: this.app.toJson(this.address),
                    }, json => {
                        this.list = json.list
                        this.sum = json.sum
                        this.order_no = json.order_no
                        this.address = json.address

                        this.pay()
                    })
                }
            },
            pay() {
                console.log('调用支付')
				let sum_price = sum.sum_price
	
                this.app.post('api/order/pay_finish', {
                    order_no: this.order_no, //订单号
                    // is_clean: this.product_spec_id?'0':'1',
                    is_clean: '0',
                }, json => {
                    this.app.toast('支付成功')
                    //成功支付后跳转
                    this.app.go('./pay_finish', {order_no: json.order_no})
                })

            }
        },
        onLoad(option) {
            if (option.order_no) {
                this.order_no = option.order_no
            }
            if (option.product_spec_id) { //存在商品 规格
                this.product_spec_id = option.product_spec_id
            }
            if (option.product_id) { //存在商品 规格
                this.product_id = option.product_id
            }
            if (option.product_count) { //传递过来商品 数量
                this.product_count = option.product_count
            }

        },
        onShow() {
            if (this.order_no) { //存在订单号
                //构造
                this.app.post('api/order/find_order', {
                    order_no: this.order_no
                }, json => {
                    this.list = json.list
                    this.sum = json.sum
                    if(json.address){
                        this.address = json.address
                    }
                })
            } else {
                if (this.product_spec_id) { //如果是的单独的商品
                    this.app.post('api/order/pre_order_float', {
                        product_spec_id: this.product_spec_id,
                        product_count: this.product_count,
                    }, json => {
                        this.list = json.list
                        this.sum = json.sum
                        if(json.address){
                            this.address = json.address
                        }
                    })
                } else if (this.product_id) { //如果是的单独的商品
                    this.app.post('api/order/pre_order_float', {
                        product_id: this.product_id,
                        product_count: this.product_count,
                    }, json => {
                        this.list = json.list
                        this.sum = json.sum
                        if(json.address){
                            this.address = json.address
                        }
                    })
                } else { //否则 是从五购物车提取商品 预览
                    //构造
                    this.app.post('api/order/pre_order', {}, json => {
                        this.list = json.list
                        this.sum = json.sum
                        if(json.address){
                            this.address = json.address
                        }
                    })
                }


            }
        },
    }
</script>

<style>
    .container {
        padding-bottom: 98rpx;
    }

    .tui-box {
        padding: 20rpx 0 118rpx;
        box-sizing: border-box;
    }

    .tui-address {
        min-height: 80rpx;
        padding: 10rpx 0;
        box-sizing: border-box;
        position: relative;
    }

    .tui-userinfo {
        font-size: 30rpx;
        font-weight: 500;
        line-height: 30rpx;
        padding-bottom: 12rpx;
    }

    .tui-name {
        padding-right: 40rpx;
    }

    .tui-addr {
        font-size: 24rpx;
        word-break: break-all;
        padding-right: 25rpx;
    }

    .tui-addr-tag {
        padding: 5rpx 8rpx;
        flex-shrink: 0;
        background: #EB0909;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 25rpx;
        line-height: 25rpx;
        transform: scale(0.8);
        transform-origin: 0 center;
        border-radius: 6rpx;
    }

    .tui-bg-img {
        position: absolute;
        width: 100%;
        height: 8rpx;
        left: 0;
        bottom: 0;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAAECAMAAADszM6/AAAAOVBMVEUAAAAVqfH/fp//vWH/vWEVqfH/fp8VqfH/fp//vWEVqfH/fp8VqfH/fp//vWH/vWEVqfH/fp//vWHpE7b6AAAAEHRSTlMA6urqqlVVFRUVq6upqVZUDT4vVAAAAEZJREFUKM/t0CcOACAQRFF6r3v/w6IQJGwyDsPT882IQzQE0E3chToByjG5LwMgLZN3TQATmdypCciBya0cgOT3/h//9PgF49kd+6lTSIIAAAAASUVORK5CYII=") repeat;
    }

    .tui-top {
        margin-top: 20rpx;
        overflow: hidden;
    }

    .tui-goods-title {
        font-size: 28rpx;
        display: flex;
        align-items: center;
    }

    .tui-padding {
        box-sizing: border-box;
    }

    .tui-goods-item {
        width: 100%;
        padding: 20rpx 30rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }

    .tui-goods-img {
        width: 180rpx;
        height: 180rpx;
        display: block;
        flex-shrink: 0;
    }

    .tui-goods-center {
        flex: 1;
        padding: 20rpx 8rpx;
        box-sizing: border-box;
    }

    .tui-goods-name {
        max-width: 310rpx;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 26rpx;
        line-height: 32rpx;
    }

    .tui-goods-attr {
        font-size: 22rpx;
        color: #888888;
        line-height: 32rpx;
        padding-top: 20rpx;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .tui-price-right {
        text-align: right;
        font-size: 24rpx;
        color: #888888;
        line-height: 30rpx;
        padding-top: 20rpx;
    }

    .tui-flex {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 26rpx;
    }

    .tui-total-flex {
        justify-content: flex-end;
    }

    .tui-color-red,
    .tui-invoice-text {
        color: #E41F19;
        padding-right: 30rpx;
    }

    .tui-balance {
        font-size: 28rpx;
        font-weight: 500;
    }

    .tui-black {
        color: #222;
        line-height: 30rpx;
    }

    .tui-gray {
        color: #888888;
        font-weight: 400;
    }

    .tui-light-dark {
        color: #666;
    }

    .tui-goods-price {
        display: flex;
        align-items: center;
        padding-top: 20rpx;
    }

    .tui-size-26 {
        font-size: 26rpx;
        line-height: 26rpx;
    }

    .tui-price-large {
        font-size: 34rpx;
        line-height: 32rpx;
        font-weight: 600;
    }

    .tui-flex-end {
        display: flex;
        align-items: flex-end;
        padding-right: 0;
    }

    .tui-phcolor {
        color: #B3B3B3;
        font-size: 26rpx;
    }

    /* #ifndef H5 */
    .tui-remark-box {
        padding: 22rpx 30rpx;
    }

    /* #endif */
    /* #ifdef H5 */
    .tui-remark-box {
        padding: 26rpx 30rpx;
    }

    /* #endif */

    .tui-remark {
        flex: 1;
        font-size: 26rpx;
        padding-left: 64rpx;
    }

    .tui-scale-small {
        transform: scale(0.8);
        transform-origin: 100% center;
    }

    .tui-scale-small .wx-switch-input {
        margin: 0 !important;
    }

    /* #ifdef H5 */
    >>>uni-switch .uni-switch-input {
        margin-right: 0 !important;
    }

    /* #endif */
    .tui-tabbar {
        width: 100%;
        height: 98rpx;
        background: #fff;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 26rpx;
        box-shadow: 0 0 1px rgba(0, 0, 0, .3);
        padding-bottom: env(safe-area-inset-bottom);
        z-index: 999;
    }

    .tui-pr-30 {
        padding-right: 30rpx;
    }

    .tui-pr-20 {
        padding-right: 20rpx;
    }

    .tui-none-addr {
        height: 80rpx;
        padding-left: 5rpx;
        display: flex;
        align-items: center;
    }

    .tui-addr-img {
        width: 36rpx;
        height: 46rpx;
        display: block;
        margin-right: 15rpx;
    }


    .tui-pr25 {
        padding-right: 25rpx;
    }

    .tui-safe-area {
        height: 1rpx;
        padding-bottom: env(safe-area-inset-bottom);
    }
</style>
