<template>
	<view>
		<view class="pl pr">
			<rich-text :nodes="data.editor"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {},
			}
		},
		methods: {
			
		},
        onLoad() {
            // this.app.setTitle('交易注意事项')
            this.app.post('api/readme/last', {}, json => {
                this.data = json
            })
        },
	}
</script>

<style>

</style>
