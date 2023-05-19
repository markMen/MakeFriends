<template>
	<view class="tui-addr-box">
		<form :report-submit="true">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input placeholder-class="tui-phcolor" @input="onInput" data-key="user_name" :value="address.user_name" class="tui-input" name="name" placeholder="请输入收货人姓名" maxlength="15" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input placeholder-class="tui-phcolor" @input="onInput" data-key="tel_number" :value="address.tel_number" class="tui-input" name="mobile" placeholder="请输入收货人手机号码" maxlength="11"
					 type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title"><text class="tui-title-city-text">所在城市</text></view>
					
					<picker :value="value" mode="multiSelector" @change="picker" @columnchange="columnPicker" :range="multiArray">
						<!-- <button class="btn-primary" hover-class="btn-hover">请选择</button> -->
						<input :value="text"  placeholder-class="tui-phcolor" class="tui-input" disabled name="city" placeholder="请选择城市" maxlength="50" type="text" />
						
					</picker>
					
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货地址</view>
					<input placeholder-class="tui-phcolor" @input="onInput" data-key="detail_info" :value="address.detail_info" class="tui-input" name="address" placeholder="请输入详细的收货地址" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-cell-title">地址类型</view>
					<view class="tui-addr-label">
						<text @tap="onAddressTag" :data-index="index" v-for="(item,index) in lists" :key="index" class="tui-label-item" :class="{'tui-label-active':item==address.tag}">{{item}}</text>
					</view>
				</view>
			</tui-list-cell>

			<!-- 默认地址 -->
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-swipe-cell">
					<view>设为默认地址</view>
					<switch :checked="address.check == '1'" @change="onChecked" color="#30CC67" class="tui-switch-small" />
				</view>
			</tui-list-cell>
			<!-- 保存地址 -->
			<view class="tui-addr-save">
				<tui-button type="danger" height="88rpx" @tap="onSave">保存收货地址</tui-button>
			</view>
			<view class="tui-del" >
				<tui-button type="gray" height="88rpx" @tap="onDel">删除收货地址</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	import tuiButton from "@/components/extend/button/button"
	import tuiListView from "@/components/list-view/list-view"
	import tuiListCell from "@/components/list-cell/list-cell"
	
	const cityData = require('../../../utils/picker.city.all.js')
	
	export default {
		components: {
			tuiButton,
			tuiListView,
			tuiListCell
		},
		data() {
			return {
				selectList: cityData, //接口返回picker数据,此处就直接使用本地测试数据
				multiArray: [], //picker数据
				value: [0, 0, 0],
				text: "",
				
				address: {},
				lists: ["公司", "家", "学校", "其他"]
			}
		},		
		onLoad(option) {
			let address_id = option.address_id
			
			// this.app.post('api/area/area',{}, json => {
			// 	this.selectList = json
				
			// 	this.multiArray = [
			// 		this.toArr(this.selectList),
			// 		this.toArr(this.selectList[0].children),
			// 		this.toArr(this.selectList[0].children[0].children)
			// 	]
			// })
			
			this.multiArray = [
				this.toArr(this.selectList),
				this.toArr(this.selectList[0].children),
				this.toArr(this.selectList[0].children[0].children)
			]
			
			this.app.post('api/address/find',{id: address_id}, json => {
				this.address = json
				this.text = json.province_name + " " + json.city_name + " " + json.county_name
				
				
				let provice_id = this.address.provice_id
				let city_id = this.address.city_id
				let county_id = this.address.county_id
				
				for(let i in this.selectList){
					if(this.selectList[i].id == provice_id){
						
						this.multiArray = [
							this.multiArray[0],
							this.toArr(this.selectList[i].children),
							this.multiArray[2]
						]
						
						for(let j in this.selectList[i].children){
							if(this.selectList[i].children[j].id == city_id){
								
								this.multiArray = [
									this.multiArray[0],
									this.multiArray[1],
									this.toArr(this.selectList[i].children[j].children)
								]
								
								for(let k in this.selectList[i].children[j].children){
									if(this.selectList[i].children[j].children[k].id == county_id){
										this.value = [i * 1, j * 1, k * 1]
									}
								}
							}
						}
					}
				}
				
				console.log(json)				
			})
			
			
		},
		methods: {
			picker: function(e) {
				let value = e.detail.value
				this.value = value
				if (this.selectList.length > 0) {
					let provice = this.selectList[value[0]].name
					let city = this.selectList[value[0]].children[value[1]].name
					let district = this.selectList[value[0]].children[value[1]].children[value[2]].name
					this.text = provice + " " + city + " " + district
					//this.id = this.selectList[value[0]].children[value[1]].children[value[2]].id					
				}
			},
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].name);
				}
				return arr;
			},
			columnPicker: function(e) {
				//第几列 下标从0开始
				let column = e.detail.column;
				//第几行 下标从0开始
				let value = e.detail.value;
				if (column === 0) {
					this.multiArray = [
						this.multiArray[0],
						this.toArr(this.selectList[value].children),
						this.toArr(this.selectList[value].children[0].children)
					];
					this.value = [value, 0, 0]
				} else if (column === 1) {
					this.multiArray = [
						this.multiArray[0],
						this.multiArray[1],
						this.toArr(this.selectList[this.value[0]].children[value].children)
					];
					this.value = [this.value[0], value, 0]
				}
			},
			onAddressTag(e) {
				let index = this.app.ed(e).index
				let item = this.lists[index]
				this.address.tag = item
			},
			onSave(){				
				
				if (this.selectList.length > 0) {
					let value = this.value
					
					let provice_obj = this.selectList[value[0]]
					let city_obj = this.selectList[value[0]].children[value[1]]
					let district_obj = this.selectList[value[0]].children[value[1]].children[value[2]]
					
					let provice = provice_obj.name
					let city = city_obj.name
					let district = district_obj.name
					
					let provice_id = provice_obj.id
					let city_id = city_obj.id
					let district_id = district_obj.id
					
					this.app.post('api/address/edit',{...this.address, 
						province_name: provice, city_name: city, county_name: district, 
						provice_id : provice_id, city_id: city_id, county_id: district_id, 
					
					}, json => {
						console.log(json)				
						this.app.toast('修改成功')
						this.app.back()
						
					})		
				}else{
					this.app.toast('请选择地址')
				}
				
				
			},
			onDel(){
				this.app.msgSys('确认删除', is => {
					if(is){
						this.app.post('api/address/del',{id : this.address.id}, json => {
							console.log(json)				
							this.app.toast('删除成功')
							this.app.back()
						})		
					}
				})
				
			},
			onInput (e) {
				let key = this.app.ed(e).key
				this.address[key] = this.app.ev(e)
			},
			onChecked(){
				if(this.address.check == '1'){
					this.address.check = '0'
				}else{
					this.address.check = '1'
				}
			}
		}
	}
</script>

<style>
	.tui-addr-box {
		padding: 20rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 180rpx;
		font-size: 28rpx;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
	}

	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}
	.tui-cell-title{
		font-size: 28rpx;
	}
	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.9);
	}
	.tui-label-active{
		background: #E41F19;
		border-color:#E41F19;
		color: #fff;
	}
	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}

	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		padding: 24rpx;
		margin-top: 100rpx;
	}

	.tui-del {
		padding: 24rpx;
	}
</style>
