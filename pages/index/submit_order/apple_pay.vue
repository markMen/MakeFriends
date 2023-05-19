<template>
	<view>
	        <view class="uni-list">
	            <radio-group @change="applePriceChange">
	                <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in priceList" :key="index">
	                    {{item.text}}
	                    <radio :value="item.value" :checked="item.checked" />
	                </label>
	            </radio-group>
	        </view>
	        <view class="uni-padding-wrap">
	            <button class="ipaPayBtn" @click="requestPayment" :loading="loading" :disabled="disabled">确认支付</button>
	        </view>
			
			<view class="uni-padding-wrap">
			    <button class="ipaPayBtn" @click="requestPaymentTest" :loading="loading" >支付</button>
			</view>
			
	    </view>
	    </view>
</template>

<script>
    let iapChannel = null,
        productId = 'plus001',
        productIds = ['plus001', 'plus003', 'plus006', 'plus012'];
    export default {
        data() {
            return {
                title: 'request-payment',
                loading: false,
                disabled: true,
                priceList: [{
                    value: 'plus001',
                    text: '支付5元',
                    checked: true
                }, {
                    value: 'plus003',
                    text: '支付15元',
                    checked: false
                },{
                    value: 'plus006',
                    text: '支付30元',
                    checked: false
                },{
                    value: 'plus012',
                    text: '支付50元',
                    checked: false
                },
				]
            }
        },
        onLoad: function() {
            plus.payment.getChannels((channels) => {
                console.log("获取到channel" + JSON.stringify(channels))
                for (var i in channels) {
                    var channel = channels[i];
                    if (channel.id === 'appleiap') {
                        iapChannel = channel;
                        this.requestOrder();
                    }
                }
                if(!iapChannel){
                    this.errorMsg()
                }
            }, (error) => {
                this.errorMsg()
            });
        },
        methods: {
			requestPaymentTest(){
				plus.payment.getChannels((channels) => {
				    console.log("获取到channel" + JSON.stringify(channels))
				    for (var i in channels) {
				        var channel = channels[i];
				        if (channel.id === 'appleiap') {
				            iapChannel = channel;
				            this.requestOrder();
				        }
				    }
				    if(!iapChannel){
				        this.errorMsg()
				    }
				}, (error) => {
					
					uni.showModal({
					    content: this.app.toJson(error),
					    showCancel: false
					})
					
					
				    //this.errorMsg()
				});
			},
            requestOrder() {
                uni.showLoading({
                    title:'检测支付环境...'
                })
                iapChannel.requestOrder(productIds, (orderList) => { //必须调用此方法才能进行 iap 支付
                    this.disabled = false;
                    console.log('requestOrder success666: ' + JSON.stringify(orderList));
                    uni.hideLoading();
                }, (e) => {
                    console.log('requestOrder failed: ' + JSON.stringify(e));
                    uni.hideLoading();
                    this.errorMsg()
                });
            },
            requestPayment(e) {
                this.loading = true;
                uni.requestPayment({
                    provider: 'appleiap',
                    orderInfo: {
                        productid: productId
                    },
                    success: (e) => {
                        uni.showModal({
                            content: "感谢您的赞助",
                            showCancel: false
                        })
                    },
                    fail: (e) => {
                        uni.showModal({
                            content: "支付失败,原因为: " + e.errMsg,
                            showCancel: false
                        })
                    },
                    complete: () => {
                        console.log("payment结束")
                        this.loading = false;
                    }
                })
            },
            applePriceChange(e) {
                productId = e.detail.value;
            },
            errorMsg(){
                uni.showModal({
                    content: "暂不支持苹果 iap 支付",
                    showCancel: false
                })
            },
        }
    }
</script>

<style>

</style>
