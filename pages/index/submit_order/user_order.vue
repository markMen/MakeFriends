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
						<text v-if="type == '2'">选择发货地址</text>
						<text v-else>选择收货地址</text>
					</view>
				</view>
				<view class="tui-bg-img"></view>
			</tui-list-cell>
			<view class="tui-top tui-goods-info">
				<tui-list-cell :hover="false" :lineLeft="false">

					<view class="box full-width">
						<view class="tui-goods-title">
							商品信息
						</view>
						<view><button class="btn-info btn-sm" @tap="onAddProduct" v-if="!order_no">添加</button></view>
					</view>
				</tui-list-cell>

				<view v-for="(item,index) in list" :key="index" class="pp">
					<view class="rows">
						<input type="text" placeholder="产品" :value="item.product_name" data-key='product_name' :data-index='index' @input='onInputOrder'>
						<input type="text" placeholder="规格" :value="item.spec_name" data-key='spec_name' :data-index='index' @input='onInputOrder'>
						<input type="text" placeholder="型号" :value="item.type_name" data-key='type_name' :data-index='index' @input='onInputOrder'>
					</view>
					<view class="rows">
						<input type="digit" placeholder="单价" :value="item.price" data-key='price' :data-index='index' @input='onInputOrder'>
						<input type="digit" placeholder="数量" :value="item.product_count" data-key='product_count' :data-index='index'
						 @input='onInputOrder'>
						<input type="text" placeholder="金额" :value="itemSumPrice(item.product_count, item.price)" data-key='total'
						 :data-index='index' @input='onInputOrder' disabled='true'>
					</view>

					<view class="rows">
						<input type="text" placeholder="单位" :value="item.company_name" data-key='company_name' :data-index='index' @input='onInputOrder'>
						<input type="text" placeholder="备注" :value="item.product_remark" data-key='product_remark' :data-index='index'
						 @input='onInputOrder'>
						<view v-if="!order_no" @tap="onDelItem" :data-index='index' class="btn-danger text-center-hv" style="width: 100rpx; padding: 2rpx;">删除</view>
					</view>


				</view>

				<!-- <tui-list-cell :hover="false" padding="0">
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
					</tui-list-cell> -->


				<tui-list-cell :hover="false">
					<view class="tui-padding tui-flex">
						<view>商品总额</view>
						<!-- <view>￥{{sum.sum_price_int}}.{{sum.sum_price_float}}</view> -->
						<view>￥{{sumPrice()}}</view>
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
						<input data-key='order_remark' @input="onInputAddress" type="text" class="tui-remark" placeholder="选填: 请先和商家协商一致"
						 placeholder-class="tui-phcolor"></input>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :last="true">
					<view class="tui-padding tui-flex tui-total-flex">
						<view class="tui-flex-end tui-color-red">
							<view class="">合计： </view>
							<view class="tui-size-26">￥</view>
							<view class="tui-price-large">{{sumPrice()}}</view>
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
				<view class="tui-price-large">{{sumPrice()}}</view>
				<!-- <view class="tui-price-large">{{sum.sum_price_int}}</view>
				<view class="tui-size-26">.{{sum.sum_price_float}}</view> -->
			</view>
			<view class="tui-pr25 rows" v-if="sum.state == '1'">
				<tui-button width="200rpx" height="70rpx" type="danger" shape="circle" @click="btnAliPay">支付宝支付</tui-button>
				<tui-button width="200rpx" height="70rpx" type="danger" shape="circle" @click="btnWxPay">微信支付</tui-button>
			</view>
			<view class="tui-pr25" v-else>
				<tui-button width="200rpx" height="70rpx" type="danger" shape="circle" @click="btnCreateOrder">确定订单</tui-button>
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
				order:{}, //订单信息

				order_no: '', //如果存在订单号 则直接预览
				product_id: '', //如果传递 物品规格
				product_spec_id: '', //如果传递 物品规格
				product_count: 1, //如果传递 物品数量
				user_id: '',

				address: {},
				hasCoupon: true,
				insufficient: false
			}
		},
		computed: {
			itemSumPrice: function() {
				return function(count, price) {
					return count * price
				}
			},
			sumPrice: function() {
				return function() {
					if (this.sum && this.sum.sum_price && this.sum.sum_price > 0) {
						return this.sum.sum_price
					} else {
						let sum = 0
						for (let i in this.list) {
							let item = this.list[i]
							sum += item.product_count * item.price
						}
						return sum
					}
				}
			},
		},
		methods: {
			onInputAddress: function(e) {
				let key = this.app.ed(e).key
				this.address[key] = this.app.ev(e)
			},
			onInputOrder: function(e) {
				let key = this.app.ed(e).key
				let index = this.app.ed(e).index
				// console.log(key)
				// console.log(index)
				this.list[index][key] = this.app.ev(e)
				//console.log(this.list)
			},
			chooseAddr() {
				uni.navigateTo({
					url: "../address/address"
				})
			},
			btnWxPay() {
				let that = this
				that.payPre(() => {
					that.app.msg('','敬告：您正在使用微信支付订单交易，当此订单交易完后系统将扣除此订单总金额的0.7%交易服务费，然后把剩余的货款转入对方的已绑定的微信里，请您告知对方，同时告知对方如果未绑定微信和输入保存真实姓名(真实姓名必须与微信实名认证相同)将无法收到货款。', is => {
						if(is){
							that.app.wxPay({
								'total': that.order.sum_price,
								'subject': '自定义订单',
								'out_trade_no': that.order.order_no,
							}, res => {
								that.payFinish({pay_type: 2})
							})
						}
					})
					
				})
			},
			btnAliPay() {
				let that = this
				that.payPre(() => {
					that.app.msg('','敬告：您正在使用支付宝支付订单交易，当此订单交易完后系统将扣除此订单总金额的0.7%交易服务费，然后把剩余的货款转入对方的已绑定的支付宝里，请您告知对方，同时告知对方如果未绑定支付宝和输入保存真实姓名(真实姓名必须与支付宝实名认证相同)将无法收到货款。', is => {
						if(is){
							that.app.aliPay({
								'total' : that.order.sum_price,
								'subject' : '自定义订单',
								'out_trade_no' : that.order.order_no,
							}, res => {
								that.payFinish({pay_type: 1})
							})
						}
					})
					
					
				})
			},
			payPre(invoke) {
				if (!this.address.user_name) {
					this.app.toast('请选择收获地址')
					return
				}


				if (this.order_no) { //存在订单号
					if (invoke) {
						invoke()
					}
				} else {
					this.app.post('api/order/cre_order_user_id?XDEBUG_SESSION_START=11841', {
						user_id: this.user_id,
						json: this.app.toJson(this.list),
						address: this.app.toJson(this.address),
						type: this.type,
					}, json => {
						this.list = json.list
						this.sum = json.sum
						this.order_no = json.order_no
						this.address = json.address

						if (invoke) {
							invoke()
						}
					})
				}
			},			
			payFinish(param) {
				let that = this
				that.app.post('api/order/pay_finish', {
					order_no: that.order.order_no, //订单号
					// is_clean: this.product_spec_id?'0':'1',
					is_clean: '0',
					...param,
				}, json => {
					that.app.toast('支付成功')
					//成功支付后跳转
					that.app.go('./pay_finish', {
						order_no: json.order_no
					})
				})
			},
			onAddProduct() {

				this.list.push({
					product_name: '',
					spec_name: '',
					type_name: '',

					product_count: '',
					price: '',
					total: '',

					company_name: '',
					product_remark: '',
					type: '', //1:生产方,2:经销方  2则推送订单
				})
			},
			btnCreateOrder(e) {
				if (!this.address.user_name) {
					this.app.toast('请选择收获地址')
					return
				}
				/*
				product_name: '',
				spec_name: '',
				type_name: '',
				
				product_count: '',
				price: '',
				total: '',
				
				company_name: '',
				product_remark: '',
				type: '', //1:生产方,2:经销方  2则推送订单
				*/
				for (let i in this.list) {
					let item = this.list[i]
					if (!item.product_name) {
						this.app.toast('请输入产品名称')
						return
					}
					if (!item.spec_name) {
						this.app.toast('请输入规格名称')
						return
					}
					if (!item.type_name) {
						this.app.toast('请输入型号名称')
						return
					}

					if (!item.price) {
						this.app.toast('请输入单价')
						return
					}
					if (!item.product_count) {
						this.app.toast('请输入数量')
						return
					}
					if (!item.company_name) {
						this.app.toast('请输入单位')
						return
					}
				}




				if (this.order_no) { //存在订单号
					if (this.sum.state == '1') {
						this.pay() //
					}
				} else {
					this.app.post('api/order/cre_order_user_id?XDEBUG_SESSION_START=11841', {
						user_id: this.user_id,
						json: this.app.toJson(this.list),
						address: this.app.toJson(this.address),
						type: this.type,
					}, json => {
						this.list = json.list
						this.sum = json.sum
						this.order_no = json.order_no
						this.address = json.address


						this.app.toast('生成订单')
						//成功支付后跳转
						this.app.go('./order_finish', {
							order_no: json.order_no
						})

					})
				}
			},
			onDelItem(e) {
				let index = this.app.ed(e).index
				this.list.splice(index, 1)
			},
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

			if (option.user_id) { //传递过来商品 数量
				this.user_id = option.user_id
			}

			if (option.type) { //传递过来商品 数量
				this.type = option.type
			}

		},
		onShow() {
			if(this.user_id){
				this.app.post('api/user/is_friend?XDEBUG_SESSION_START=14470', {
					user_id : this.user_id				 
				}, json => {
					if(json.code == '0'){
					}else{
						this.app.msgSys('成为合作商之后才能下单', is => {
							this.app.back()
						})
						return
					}
				})
			}
			
			
			if (this.order_no) { //存在订单号
				//构造
				this.app.post('api/order/find_order', {
					order_no: this.order_no
				}, json => {
					this.list = json.list
					this.sum = json.sum
					this.order = json.sum
					if (json.address) {
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
						if (json.address) {
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
						if (json.address) {
							this.address = json.address
						}
					})
				} else if (this.user_id) { //如果是用户的ID 当前项目修改为这里
					this.app.post('api/order/pre_order_user_id', {
						user_id: this.user_id,
					}, json => {
						this.list = json.list
						if (this.list.length == 0) {
							this.onAddProduct()
						}
						this.sum = json.sum
						this.order = json.sum
						if (json.address) {
							this.address = json.address
						}
					})	
				} else { //否则 是从五购物车提取商品 预览
					//构造
					this.app.post('api/order/pre_order', {}, json => {
						this.list = json.list
						this.sum = json.sum
						if (json.address) {
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
