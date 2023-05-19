<template>
	<view>
		<view class="tui-searchbox" >
			<view class="tui-search-input">
				<view @tap="onSearch" v-if="type == 'left' || (type == 'center' && search_text != null && search_text != '')" >
					<tui-icon name="search" :size='16' color='#333'></tui-icon>
				</view>
				<!-- :focus="true" auto-focus -->
				<input confirm-type="text" :placeholder="placeholder"  placeholder-class="tui-input-plholder"
				 class="tui-input" v-model.trim="search_text" :class="[type=='center'?'text-center':'']"/>
				<view @tap="cleanSearchText" v-show="search_text">
					<tui-icon name="close-fill" :size='16' color='#bcbcbc'></tui-icon>
				</view>
			</view>
			<view class="tui-cancle" @tap="onSearch" v-if="search_text != null && search_text != ''">搜索</view>
			
		</view>
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	
	export default {
		components: {
			tuiIcon,
		},
		name: "viveSearch",
		props: {
		    placeholder: {
		        type: String,
		        default: "请输入搜索内容"
		    },
			// search_text: {
			//     type: String,
			//     default: ""
			// },
			type: {
			    type: String,
			    default: "left"
			},
		},
		data() {
			return {
				search_text: '',
			}
		},
		methods: {
			onSearch() { //搜索			
				// this.$emit('click', {
				//     search_text: this.search_text
				// });
				this.$emit('click', this.search_text);
			},
			cleanSearchText() {
				this.search_text = ''
				this.onSearch()				
			},
		},
	}
</script>

<style>

</style>
