<template>
	<view>
		<picker class="" v-model="value" mode="multiSelector" @change="picker" @columnchange="columnPicker"
			:range="multiArray">
			<input v-if="is_show_region" v-model="text" class="in-text" disabled :placeholder="placeholder" />
			<slot v-else>
			</slot>
		</picker>
	</view>
</template>

<script>
	const cityData = require('../../utils/picker.city.all.js')

	export default {
		name: "ws-region",
		props: {
			placeholder: {
				type: String,
				default: "请选择城市",
			},
			value_text: {
			    type: Array,
				default: function() {
					return ['','', '',]
				},
			},
			value_index: {
			    type: Array,
				default: function() {
					return [0, 0, 0]
				},
			},
			value_json: {
			    type: String,
				default: '',
			},
			type: {
				type: String,
				default: "left",
			},
			is_show_region: {
				type: Boolean,
				default: true,
			},
			region_dep: {
				type: String,
				default: '3',
			},
			is_show_all: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				selectList: cityData, //接口返回picker数据,此处就直接使用本地测试数据
				multiArray: [], //picker数据
				// value: [0, 0, 0],
				value: [0, 0, 0],
				text: "",
			};
		},
		watch: {
			value_text: {
				handler(newValue, oldValue) {
					
					if(newValue){
						// console.log(newValue)
						let arr = [0,0,0]
						if(newValue.length > 0){
							let province = newValue[0]
							let index = this.getIndexOfArray(this.selectList, province, 'name')
							if(index >= 0){
								arr[0] = index
							}
						}
						
						if(newValue.length > 1){
							let city = newValue[1]
							let index = this.getIndexOfArray(this.selectList[arr[0]].children, city, 'name')
							if(index >= 0){
								arr[1] = index
							}
						}
						if(newValue.length > 2){
							let county = newValue[2]
							let index = this.getIndexOfArray(this.selectList[arr[0]].children[arr[1]].children, county, 'name')
							if(index >= 0){
								arr[2] = index
							}
						}
						console.log(arr)
						
						if(arr[0] == this.value[0] && arr[1] == this.value[1] && arr[2] == this.value[2]){
							
						}else{
							this.setValue(arr) //这里设置的是 索引
						}
						
					}
					
					
				},
				deep: true // 深度监听父组件传过来对象变化
			},
			value_index: {
				handler(newValue, oldValue) {
					this.setValue(newValue)
					// console.log(newValue)
				},
				deep: true // 深度监听父组件传过来对象变化
			},
			value_json: {
				handler(newValue, oldValue) {
					if(newValue){
						let arr = JSON.parse(newValue)
						this.setValue(arr)
					}
					
				},
				deep: true // 深度监听父组件传过来对象变化
			},
		},
		created() {
			// if(this.is_show_all){
			// 	let all = {"name":"全部","children":[{"name":"全部","children":[{"name":"全部","children":[]}]}]}
			// 	this.selectList.unshift(all)
			// }
			
			// if(this.region_dep == 2){
			// 	this.multiArray = [
			// 		this.toArr(this.selectList),
			// 		this.toArr(this.selectList[0].children),
			// 	]
			// }else{
			// 	this.multiArray = [
			// 		this.toArr(this.selectList),
			// 		this.toArr(this.selectList[0].children),
			// 		this.toArr(this.selectList[0].children[0].children)
			// 	]
			// }
			
			
			let arr = []			
			if(this.region_dep == 1){
				arr = [this.toArr(this.selectList),]
			}else if(this.region_dep == 2){
				arr = [
					this.toArr(this.selectList),
					this.toArr(this.selectList[0].children),
				]
			}else if(this.region_dep == 3){
				arr = [
					this.toArr(this.selectList),
					this.toArr(this.selectList[0].children),
					this.toArr(this.selectList[0].children[0].children)
				]
			}
			// for(let i in arr){
			// 	if(arr[i][0] != '全部'){
			// 		arr[i].unshift('全部')
			// 	}
			// }
			this.multiArray = arr
			
		},
		methods: {
			picker: function(e) {  //选择完了
				let value = e.detail.value
				// this.value = value
				let province = this.selectList[value[0]].name
				let city = this.selectList[value[0]].children[value[1]].name
				let county = this.selectList[value[0]].children[value[1]].children[value[2]].name
				if(this.region_dep == 2){
					this.text = province + " " + city
				}else{
					this.text = province + " " + city + " " + county
				}
				
				//this.id = this.selectList[value[0]].children[value[1]].children[value[2]].id
				this.$emit('change', {
					text: this.text,
					json: JSON.stringify(value),
					province: province,
					city: city,
					county: county,
				});
			},
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].name);
				}
				return arr;
			},
			columnPicker: function(e) { //选项动的时候 
				//第几列 下标从0开始
				let column = e.detail.column;
				//第几行 下标从0开始
				let value = e.detail.value;
				
				let arr = this.multiArray
				
				if (column === 0) {
					arr = [
						arr[0],
						this.toArr(this.selectList[value].children),
						this.toArr(this.selectList[value].children[0].children)
					];
					this.value = [value, 0, 0]
				} else if (column === 1) {
					arr = [
						arr[0],
						arr[1],
						this.toArr(this.selectList[this.value[0]].children[value].children)
					];
					this.value = [this.value[0], value, 0]
				}
				

				let [a,b,c] = arr;				
				if(this.region_dep == 1){
					arr = [a]
				}else if(this.region_dep == 2){
					arr = [a,b]
				}else if(this.region_dep == 3){
					// arr = [a,b,c]
				}
				this.multiArray = arr
			},
			setValue(value){
				if(!value || value.length != 3){
					return
				}
				this.value = value
				
				if (this.region_dep == 2) {
					this.multiArray = [
						this.multiArray[0],
						this.toArr(this.selectList[value[0]].children),
						// this.toArr(this.selectList[value[0]].children[value[1]].children)
					];
				} else{
					this.multiArray = [
						this.multiArray[0],
						this.toArr(this.selectList[value[0]].children),
						this.toArr(this.selectList[value[0]].children[value[1]].children)
					];
				}
				
				
				this.picker({
					detail: {
						value: value
					},
				})
				this.$forceUpdate()
			},
			//获取数组中的键的指定值的索引
			getIndexOfArray: function(list, indexValue, key) {
				let index = -1
				for (let i in list) {
					let value = null
					if (key) {
						value = list[i][key]
					} else {
						value = list[i]
					}
					if (value == indexValue) {
						index = i
					}
				}
				return index
			},
			
		},
	}
</script>

<style lang="less">
	.in-text {
		font-size: 28rpx;
	}
</style>
