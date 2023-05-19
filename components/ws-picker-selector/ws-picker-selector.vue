<template>
	<view class="picker">
		<picker mode="selector" class="picker" v-model="index" @change="change"
			:range="range" :range-key="range_key">
			<input v-if="is_show_region" v-model="text" class="in-text" :class="input_class" disabled :placeholder="placeholder" />
			<slot v-else>
			</slot>
		</picker>
	</view>
</template>

<script>

	export default {
		name: "ws-region",
		props: {
			range: {
				type: Array,
				default(){
					return  []
				},
			},
			range_key: {
			    type: String,
				default: '',
			},
			model: {
			    type: Number,
				default: -1,
			},
			model_text: {
			    type: String | Number,
				default: '',
			},
			placeholder: {
			    type: String,
				default: '',
			},
			is_show_region: {
				type: Boolean,
				default: true,
			},
			data_key: {
			    type: String,
				default: '',
			},
			input_class: {
				type: String,
				default: 'input-class',
			},
		},
		data() {
			return {
				index: -1,
				text: "",
			};
		},
		watch: {
			model: {
				handler(newValue, oldValue) {
					this.index = newValue
				},
				deep: true // 深度监听父组件传过来对象变化
			},
			model_text: {
				handler(newValue, oldValue) {
					this.setValue(newValue)
					// console.log(newValue)
				},
				deep: true // 深度监听父组件传过来对象变化
			},
		},
		created() {
			// setTimeout(()=>{
			// 	this.setValue(this.model_text)
			// }, 300)
			this.setValue(this.model_text)
		},
		mounted() {
			// this.setValue(this.model_text)
			// this.index = 1
			
		},
		methods: {
			change(e) {
				let index = e.detail.value
				if(index < 0){
					return
				}
				let item = this.range[index]
				if(this.range_key){
					if(!item){
						return
					}
					this.text = item[this.range_key]
				}else{
					this.text = item
				}
				this.$emit('change', {
					index: index,
					text: this.text,
					detail: item,
					data_key: this.data_key,
				});
			},
			setValue(value){
				let index = this.app.getIndexOfArray(this.range, value, this.range_key)
				if(index < 0){
					return
				}
				this.index = index
				let item = this.range[index]
				if(!item){
					return
				}
				if(this.range_key){
					if(!item){
						return
					}
					this.text = item[this.range_key]
				}else{
					this.text = item
				}
				this.$forceUpdate()
			},
			
		},
	}
</script>

<style lang="less">
	.in-text {
		// font-size: 28rpx;
		height: 100%;
		width: 100%;
	}
	.picker{
		width: 100%;
		height: 100%;
	}
	
	.input-class{
		 padding: 20rpx 0;
	}
</style>
