<template>
	<view class="container">
		<view class="tui-order-header">
			<image :src="webURL+'img_detail_bg.png'" mode="widthFix" class="tui-img-bg"></image>
			<view class="tui-header-content">
				<view>
					<view class="tui-status-text">售出的订单 {{app.getStatusText(order.state)}}</view>
					<!-- <view class="tui-reason"><text class="tui-reason-text">{{getReason(order.state)}}</text>
						<tui-countdown :time="1800" color="rgba(254,254,254,0.75)" colonColor="rgba(254,254,254,0.75)" bcolor="transparent"
						 bgcolor="transparent" v-if="status===1"></tui-countdown>
                       
					</view> -->
				</view>
				<image :src="getImg(status)" class="tui-status-img" mode="widthFix"></image>
			</view>
		</view>
		<!-- 		<tui-list-cell :arrow="true" bgcolor="#fefefe">
			<view class="tui-flex-box">
				<image :src="webURL+'img_order_logistics3x.png'" class="tui-icon-img"></image>
				<view class="tui-logistics">
					<view class="tui-logistics-text">快递已到收货点，请注意查收哦! 投递员: XXX 联系电话: 17788849992</view>
					<view class="tui-logistics-time">2019-06-03 12:02</view>
				</view>
			</view>
		</tui-list-cell> -->
		<tui-list-cell :last="true" :hover="false" padding="26rpx 0rpx">
			<view class="tui-flex-box">
				<image :src="webURL+'img_order_address3x.png'" class="tui-icon-img"></image>
				<view class="tui-addr">
					<view class="tui-addr-userinfo">{{address.user_name}}<text class="tui-addr-tel">{{address.tel_number}}</text></view>
					<view class="tui-addr-text">{{address.province_name}} {{address.city_name}} {{address.county_name}}
						{{address.detail_info}}</view>
				</view>
			</view>
		</tui-list-cell>

		<view class="tui-order-item">
			<!-- 			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-goods-title">
					商品信息
				</view>
			</tui-list-cell> -->

			<tui-list-cell :hover="false" :lineLeft="false">
				<view class="tui-goods-title box">
					<view>
						{{sale.company_name}}
					</view>
					<view @tap="onSale" :data-sale_id="sale.id">
						进入商家主页
					</view>
				</view>
			</tui-list-cell>


			<view v-for="(item,index) in order_detail" :key="index" class="pp">
				<view class="rows">
					<input type="text" placeholder="产品" :value="item.product_name" data-key='product_name' :data-index='index' @input='onInputOrder'>
					<input type="text" placeholder="规格" :value="item.spec_name" data-key='spec_name' :data-index='index' @input='onInputOrder'>
					<input type="text" placeholder="型号" :value="item.type_name" data-key='type_name' :data-index='index' @input='onInputOrder'>
				</view>
				<view class="rows">
					<input type="text" placeholder="数量" :value="item.product_count" data-key='product_count' :data-index='index'
					 @input='onInputOrder'>
					<input type="text" placeholder="单价" :value="item.price" data-key='price' :data-index='index' @input='onInputOrder'>
					<input type="text" placeholder="金额" :value="item.total" data-key='total' :data-index='index' @input='onInputOrder'>
				</view>

				<view class="rows">
					<input type="text" placeholder="单位" :value="item.company_name" data-key='company_name' :data-index='index' @input='onInputOrder'>
					<input type="text" placeholder="备注" :value="item.product_remark" data-key='product_remark' :data-index='index'
					 @input='onInputOrder'>
				</view>
			</view>

			<view class="rows pl pr ">
				<view>发货期限至</view>
				<view class="pl text-blue" v-if="order.last_send_date">{{order.last_send_date}}</view>
				<view class="pl text-blue" v-else>
					<view v-if="is_sale" @tap="onSelectLaseSendDate">选择发货期限</view>
					<view v-else>等待选择发货期限</view>
				</view>
			</view>

			<view class="rows pl pr  ">
				<view class="form-text-left form-text-left">发货凭证</view>
				<view class="form-text-right" v-if="order.state == '2'">
					<input type="text" placeholder="请选择图片" @tap="onAddImg">
				</view>
			</view>
			<view class="box-wrap-start pl pr">
				<view class='col img-box pr pt' v-for="(item,index) in listPhoto" :key="index">
					<image class='img-border' :src='app.upload + item' :data-src='app.upload + item' @tap="previewImageOrder"></image>
					<button class='btn-danger  full-width text-center-hv' :data-index='index' @tap='onDelImg' v-if="order.state == '2'">
						<!-- <image src="/static/logo.png" class="img-del"></image> -->
						x
					</button>
				</view>
			</view>
			<view class="box-wrap-start pl pr">
				<view class='col img-box pr pt' v-for="(item,index) in listPhotoLocal" :key="index">
					<image class='img-border' :src='item' :data-src='item' @tap="previewImage"></image>
					<button class='btn-danger  full-width text-center-hv' :data-index='index' @tap='onDelImgLocal' v-if="order.state == '2'">
						<!-- <image src="/static/logo.png" class="img-del"></image> -->
						x
					</button>
				</view>
			</view>


			<!-- 			<block v-for="(item,index) in order_detail" :key="index">
				<tui-list-cell padding="0" >
					<view class="tui-goods-item" @tap="onProductDetail" :data-id='item.product_id'>
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
			</block> -->


			<view class="tui-goods-info">
				<view class="tui-price-flex tui-size24">
					<view>商品总额</view>
					<view>￥{{order.sum_price}}</view>
				</view>
				<view class="tui-price-flex  tui-size24">
					<view>优惠券</view>
					<view>￥0.00</view>
				</view>
				<view class="tui-price-flex  tui-size24">
					<view>配送费</view>
					<view>￥0.00</view>
				</view>
				<view class="tui-price-flex tui-size32 tui-pbtm20">
					<view class="tui-flex-shrink">合计</view>
					<view class="tui-goods-price">
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{order.sum_price}}</view>
						<!-- <view class="tui-price-large">{{order.sum_price_int}}</view> -->
						<!-- <view class="tui-size-24">.{{order.sum_price_float}}</view> -->
					</view>
				</view>
				<view class="tui-price-flex tui-size32">
					<view class="tui-flex-shrink">实付款</view>
					<view class="tui-goods-price tui-primary-color">
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{order.sum_price}}</view>
						<!-- <view class="tui-price-large">{{order.sum_price_int}}</view> -->
						<!-- <view class="tui-size-24">.{{order.sum_price_float}}</view> -->
					</view>
				</view>
			</view>
		</view>

		<view class="tui-order-info">
			<tui-list-cell :hover="false">
				<view class="tui-order-title">
					订单信息
				</view>
			</tui-list-cell>
			<view class="tui-order-content">
				<view class="tui-order-flex">
					<view class="tui-item-title">订单号:</view>
					<view class="tui-item-content">{{order.order_no}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">物流单号:</view>
					<view class="tui-item-content">{{order.order_no}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">创建时间:</view>
					<view class="tui-item-content">{{order.credate}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">付款时间:</view>
					<view class="tui-item-content">{{order.pay_date}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">发货时间:</view>
					<view class="tui-item-content">{{order.send_date}}</view>
				</view>

				<view class="tui-order-flex">
					<view class="tui-item-title">退款时间:</view>
					<view class="tui-item-content">{{order.refund_time_price}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">退货时间:</view>
					<view class="tui-item-content">{{order.refund_time_product}}</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">完成时间:</view>
					<view class="tui-item-content">{{order.finish_time}}</view>
				</view>

				<view class="tui-order-flex">
					<view class="tui-item-title">配送方式:</view>
					<view class="tui-item-content">第三方承运</view>
				</view>
				<view class="tui-order-flex">
					<view class="tui-item-title">订单备注:</view>
					<view class="tui-item-content">{{order.order_remark}}</view>
				</view>
			</view>
		</view>
		<view class="tui-safe-area"></view>
		<view class="tui-tabbar tui-order-btn">


			<view class="tui-btn-mr rows" v-if="order.state == '5'">
				<view class="tui-btn-mr" @tap="onReOrderCancel">
					<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">不同意退款</tui-button>
				</view>

				<view class="tui-btn-mr" @tap="onReOrderOk">
					<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">同意退款</tui-button>
				</view>

			</view>

			<view class="tui-btn-mr rows" v-if="order.state == '52'">
				<view class="tui-btn-mr" @tap="onReOrderProductCancel">
					<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">不同意退货</tui-button>
				</view>

				<view class="tui-btn-mr" @tap="onReOrderOkProduct">
					<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">同意退货</tui-button>
				</view>
			</view>


			<view class="tui-btn-mr" v-if="order.state == '51'" @tap="onReOrderOkProduct51">
				<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">完成退款</tui-button>
			</view>

			<view class="tui-btn-mr" v-if="order.state == '53'" @tap="onReOrderOkProduct53">
				<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">完成退货</tui-button>
			</view>


			<view class="tui-btn-mr" @tap="onOkOrder" v-if="is_sale && order.state == '10'">
				<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">确认订单</tui-button>
			</view>

			<view class="tui-btn-mr" @tap="onOkOrder11" v-if="!is_sale && order.state == '11'">
				<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">确认订单</tui-button>
			</view>

			<view class="tui-btn-mr" @tap="setOrderState3" v-if="order.state == '2'">
				<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">确认发货</tui-button>
			</view>


			<!-- {订单状态}[0:默认状态,1:未支付,2:已支付,3:已发货,4:已完成,5:申请退款,6:退款完成,7:退款失败,
8:错误的订单,9:强制完结,10:待商家确认,11:待买家确认,51:退款处理中,52:申请退货,53:退货处理中] -->

			<view class="tui-btn-mr pr" @tap="onDelOrder" v-if="order.state == '1' || order.state == '10' 
			|| order.state == '11' || order.state == '4'|| order.state == '6'">
				<tui-button type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">删除订单</tui-button>
			</view>



			<!-- 			<view class="tui-btn-mr" @tap="onDelOrder">
				<tui-button  type="black" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">删除订单</tui-button>
			</view>
			<view class="tui-btn-mr" v-if="order.state == '1'" @tap="onPayOrder">
				<tui-button type="danger" :plain="true" width="148rpx" height="56rpx" :size="26" shape="circle">立即支付</tui-button>
			</view> -->
		</view>


		<tui-datetime ref="dateTime" :type="2" :startYear="startYear" :endYear="endYear" :setDateTime="setDateTime" @confirm="changeDataTime"></tui-datetime>

	</view>
</template>

<script>
	import tuiIcon from '@/components/icon/icon'
	import tuiButton from "@/components/extend/button/button"
	import tuiCountdown from "@/components/countdown/countdown"
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiDatetime from "@/components/dateTime/dateTime"

	export default {
		components: {
			tuiIcon,
			tuiButton,
			tuiCountdown,
			tuiListCell,
			tuiDatetime,

		},
		data() {
			return {
				app: this.app,
				order: {},
				order_detail: [],

				address: {},
				//webURL: "https://www.thorui.cn/wx/static/images/mall/order/",
				webURL: "/static/image/",
				//1-待付款 2-付款成功 3-待收货 4-订单已完成 5-交易关闭
				status: 1,

				startYear: 1980,
				endYear: 2030,
				setDateTime: "2019-09-12",

				is_sale: false, //是否是销售出去的

				listPhoto: [],
				listPhotoLocal: [],
				sale: {},
			}
		},
		methods: {
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
			onDelImg(e) {
				let index = this.app.ed(e).index
				this.listPhoto.splice(index, 1)
			},
			onDelImgLocal(e) {
				let index = this.app.ed(e).index
				this.listPhotoLocal.splice(index, 1)
			},
			previewImage(e) {
				this.app.previewImage(e)
			},
			previewImageOrder(e) { //listPhoto
				let current = this.app.ed(e).src;
				let currents = [];
				for (let i in this.listPhoto) {
					currents.push(this.app.upload + this.listPhoto[i])
				}
				this.app.previewImageOrder({
					current: current, // 当前显示图片的http链接
					urls: currents, // 需要预览的图片http链接列表
				})
			},
			reLoad() {
				//this.app.toast(options.order_no)
				// this.app.post('api/product_order/product_order', {product_order_id: options.product_order_id}, json => {
				// })
				this.setDateTime = this.app.getNowDate();


				//构造
				this.app.post('api/order/find_order', {
					order_no: this.order_no
				}, json => {
					this.order = json.sum
					this.order_detail = json.list
					this.address = json.address
					this.sale = json.cre

					// if(this.order.sale_id == this.order.creby){ //相等就是我售出的订单
					// 	this.is_sale = true
					// }else{
					// 	this.is_sale = false
					// }

					this.is_sale = true
					if (this.order.imgs_send) {
						this.listPhoto = this.order.imgs_send.split(',')
					}
					
					//查看了订单
					this.app.post('api/order/order_see_sale', {
						order_no: this.order_no
					}, json => {
					})

				})
			},
			getImg: function(status) {
				return this.webURL + ["img_order_payment3x.png", "img_order_send3x.png", "img_order_received3x.png",
					"img_order_signed3x.png", "img_order_closed3x.png"
				][status - 1]
			},
			onDelOrder(e) {
				this.app.msg('确认删除订单', '', is => {
					if (is) {
						this.app.post('api/order/del_order', {
							order_no: this.order_no
						}, json => {
							if (json.code == '0') {
								this.app.toast('删除成功')
								setTimeout(()=> {
									this.app.back()
								}, 1000)
							} else {
								this.app.toast(json.data)
							}
						})
					}
				})
			},
			onPayOrder(e) {
				this.app.go('/pages/index/submit_order/user_order', {
					order_no: this.order_no
				})
			},
			onProductDetail(e) {
				let id = this.app.ed(e).id
				this.app.go('/pages/index/detail/detail', {
					id: id
				})
			},
			onOkOrder(e) { //确认订单
				//this.$refs.dateTime.show()
				if (!this.order.last_send_date) {
					this.app.toast('请选择发货期限')
					return
				}

				this.app.msg('提示：请确认并同意以下内容',
					'1、订单完成后系统将扣除此订单总金额的0.7%服务费，然后把剩余货款转入您的账户。\n2、请确认已绑定支付宝、微信和输入保存真实姓名（真实姓名必须与支付宝、微信实名认证相同），如果未绑定将无法收到货款。', is => {
						if (is) {
							this.app.post('api/order/set_order_state', {
								order_no: this.order_no,
								state: '11',
								last_send_date: this.order.last_send_date,
							}, json => {
								if (json.code == '0') {
									this.app.toast('确认订单')
									this.reLoad()
								} else {
									this.app.toast(json.data)
								}
							})
						}
					})

			},
			onOkOrder11(e) { //确认订单
				this.app.post('api/order/set_order_state', {
					order_no: this.order_no,
					state: '1',
				}, json => {
					if (json.code == '0') {
						this.app.toast('确认订单')
						this.reLoad()
					} else {
						this.app.toast(json.data)
					}
				})

			},
			changeDataTime: function(e) {
				console.log(e)
				this.order.last_send_date = e.result
			},
			onSelectLaseSendDate(e) {
				// if(this.is_sale && this.order.state == '10'){
				// 	this.$refs.dateTime.show()	
				// }
				this.$refs.dateTime.show()
			},
			onInputOrder(e) {},
			onReOrderOk(e) {
				this.app.msg('确认退款', '', is => {
					if (is) {
						this.app.post('api/order/set_order_state', {
							order_no: this.order_no,
							state: '51',
						}, json => {
							if (json.code == '0') {
								this.app.toast('确认退款')
								this.reLoad()
							} else {
								this.app.toast(json.data)
							}
						})
					}
				})
			},
			onReOrderOkProduct(e) {
				this.app.msg('确认退货', '', is => {
					if (is) {
						this.app.post('api/order/set_order_state', {
							order_no: this.order_no,
							state: '53',
						}, json => {
							if (json.code == '0') {
								this.app.toast('确认退货')
								this.reLoad()
							} else {
								this.app.toast(json.data)
							}
						})
					}
				})
			},
			onReOrderOkProduct51(e) {
				this.app.msg('完成退款', '', is => {
					if (is) {
						this.app.post('api/order/set_order_state', {
							order_no: this.order_no,
							state: '6',
						}, json => {
							if (json.code == '0') {
								this.app.toast('完成退款')
								this.reLoad()
							} else {
								this.app.toast(json.data)
							}
						})
					}
				})
			},
			onReOrderOkProduct53(e) {
				this.app.msg('完成退货', '', is => {
					if (is) {
						this.app.post('api/order/set_order_state', {
							order_no: this.order_no,
							state: '6',
						}, json => {
							if (json.code == '0') {
								this.app.toast('完成退货')
								this.reLoad()
							} else {
								this.app.toast(json.data)
							}
						})
					}
				})
			},
			setOrderState3(e) { //设置发货状态
				//let index = this.app.ed(e).index
				//let item = this.page.data[index]

				let actionSend = () => {
					//`state`'{订单状态}[0:默认状态,1:未支付,2:已支付,3:已发货,4:已完成,5:退款,6:退款完成,7:退款失败,8:错误的订单,9:强制完结]',
					this.app.post('api/order/set_order_state', {
						order_no: this.order.order_no,
						state: '3',
						imgs_send: this.order.imgs_send,
					}, json => {
						if (json.code == '0') {
							this.app.toast('发货成功')
							this.reLoad()
						} else {
							this.app.toast(json.data)
						}
					})
				}

				this.app.msg('确认发货', '', is => {
					if (is) {
						this.app.uploadFiles('api/order/upload', this.listPhotoLocal, uploadFiles => { //上传完成后
							let imgs = []
							for (let i in uploadFiles) {
								imgs.push(uploadFiles[i].saveName)
							}
							let imgsAll = this.listPhoto.concat(imgs)
							if (imgsAll.length <= 0) {
								this.app.toast('请上传发货凭证')
								return
							}
							this.order.imgs_send = this.app.join(imgsAll, ',')
							actionSend()
						})
					}
				})

			},
			onSale(e) {
				let sale_id = this.app.ed(e).sale_id
				this.app.go('/pages/index/detail/detail', {
					user_id: sale_id
				})
			},
			onReOrderCancel: function(e) {
				this.app.msg('取消退款', '', is => {
					if (is) {
						this.app.post('api/order/set_order_state_cancel', {
							order_no: this.order_no,
							state: '2',
						}, json => {
							if (json.code == '0') {
								this.app.toast('取消退款')
								this.reLoad()
							} else {
								this.app.toast(json.data)
							}
						})
					}
				})
			},
			onReOrderProductCancel: function(e) {
				this.app.msg('取消退货', '', is => {
					if (is) {
						this.app.post('api/order/set_order_state_cancel', {
							order_no: this.order_no,
							state: '3',
						}, json => {
							if (json.code == '0') {
								this.app.toast('取消退货')
								this.reLoad()
							} else {
								this.app.toast(json.data)
							}
						})
					}
				})
			},

		},
		onLoad(options) {
			this.order_no = options.order_no
			this.reLoad()
		},
	}
</script>

<style>
	.container {
		padding-bottom: 118rpx;
	}

	.tui-order-header {
		width: 100%;
		height: 160rpx;
		position: relative;
	}

	.tui-img-bg {
		width: 100%;
		height: 160rpx;
	}

	.tui-header-content {
		width: 100%;
		height: 160rpx;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 70rpx;
		box-sizing: border-box;
	}

	.tui-status-text {
		font-size: 36rpx;
		line-height: 36rpx;
		color: #FEFEFE;
	}

	.tui-reason {
		font-size: 24rpx;
		line-height: 24rpx;
		color: rgba(254, 254, 254, 0.75);
		padding-top: 15rpx;
		display: flex;
		align-items: center;
	}

	.tui-reason-text {
		padding-right: 12rpx;
	}

	.tui-status-img {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	.tui-flex-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-icon-img {
		width: 44rpx;
		height: 44rpx;
		flex-shrink: 0;
	}

	.tui-logistics {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 24rpx 0 20rpx;
		box-sizing: border-box;
	}

	.tui-logistics-text {
		font-size: 28rpx;
		line-height: 32rpx;
	}

	.tui-logistics-time {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 16rpx;
		color: #666;
	}

	.tui-addr {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.tui-addr-userinfo {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: bold;
	}

	.tui-addr-text {
		font-size: 24rpx;
		line-height: 30rpx;
		padding-top: 16rpx;
	}

	.tui-addr-tel {
		padding-left: 40rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		line-height: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
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

	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
	}

	.tui-goods-info {
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.tui-price-flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-size24 {
		padding-bottom: 20rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #888;
	}

	.tui-size32 {
		font-size: 32rpx;
		line-height: 32rpx;
		font-weight: 500;
	}

	.tui-pbtm20 {
		padding-bottom: 20rpx;
	}

	.tui-flex-shrink {
		flex-shrink: 0;
	}

	.tui-primary-color {
		color: #EB0909;
	}

	.tui-order-info {
		margin-top: 20rpx;
	}

	.tui-order-title {
		position: relative;
		font-size: 28rpx;
		line-height: 28rpx;
		padding-left: 12rpx;
		box-sizing: border-box;
	}

	.tui-order-title::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		border-left: 4rpx solid #EB0909;
		height: 100%;
	}

	.tui-order-content {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		background: #fff;
		font-size: 24rpx;
		line-height: 30rpx;
	}

	.tui-order-flex {
		display: flex;
		padding-top: 18rpx;
	}

	.tui-order-flex:first-child {
		padding-top: 0
	}

	.tui-item-title {
		width: 132rpx;
		flex-shrink: 0;
	}

	.tui-item-content {
		color: #666;
	}

	.tui-safe-area {
		height: 1rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

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

	.tui-btn-mr {
		margin-right: 30rpx;
	}
</style>
