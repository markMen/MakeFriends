<template>
	<view class="">

		<view class="bottom full tui-operation-inpupt-voice" v-if="input_text_voice_type == '1'">
		</view>



		<view class="bottom full " v-if="input_text_voice_type == '1'">
			<div class="full text-center-hv">
				<view class="input-text-voice-cancel">
					<view class="bg-circle-cancel  text-center-hv cols" v-if="input_text_cancel_type == '0'">
						<tui-icon name="back" :size="26" color='#333333'></tui-icon>
						<text>取 消</text>
						<view class="text-xs pt-sm">{{audio_time}} /60s</view>
					</view>
					<view class="bg-circle  text-center-hv cols" v-if="input_text_cancel_type == '1'">
						<tui-icon name="back" :size="26" color='#ffffff'></tui-icon>
						<text>取 消</text>
						<view class="text-xs pt-sm">{{audio_time}} /60s</view>
					</view>
				</view>
			</div>
		</view>


		<!--tabbar-->
		<view class="tui-operation tui-chat-operation" v-if="is_friend == '1'">
			<view class='tui-right-flex rows tui-input-box '>
				<view hover-class="tui-opcity" :hover-stay-time="150" class="tui-voice tui-pl tui-pr"
					@tap="onInputTypeVoice" v-if="input_type == '0'">
					<tui-icon name="news" :size="34" color='#666'></tui-icon>
				</view>
				<view hover-class="tui-opcity" :hover-stay-time="150" class="tui-voice tui-pl tui-pr"
					@tap="onInputTypeText" v-if="input_type == '2'">
					<!-- <tui-icon name="voice" :size="34" color='#333'></tui-icon> -->
					<tui-icon name="edit" :size="34" color='#666'></tui-icon>
				</view>

				<input v-if="input_type == '0'" class="tui-chat-input " @input="onInputText"
					:value="input_text"></input>

				<view v-if="input_type == '2'" class="tui-chat-input text-center-hv" :class="[]"
					@touchstart="onAudioStart" @touchend="onAudioEnd" @touchmove="onAudioMove"
					@touchcancel="onAudioCancel">
					{{input_text_title}}
				</view>

				<view @tap="onAddLocation" hover-class="tui-opcity" :hover-stay-time="150" class="tui-pr tui-pl"
					v-show="input_text==null || input_text == ''">
					<tui-icon name="gps" :size="30" color='#666'></tui-icon>
				</view>

				<view @tap="onAddImg" hover-class="tui-opcity" :hover-stay-time="150" class="tui-pr "
					v-show="input_text==null || input_text == ''">
					<tui-icon name="pic" :size="30" color='#666'></tui-icon>
				</view>
				<view @tap="onAddVideo" hover-class="tui-opcity" :hover-stay-time="150" class="tui-pr"
					v-show="input_text==null || input_text == ''">
					<tui-icon name="video" :size="30" color='#666'></tui-icon>
				</view>

				<view hover-class="tui-opcity" :hover-stay-time="150" class="tui-pl tui-pr" @tap.stop="send"
					v-show="input_text!=null && input_text != ''">
					<tui-icon name="send" :size="30" color='#666'></tui-icon>
				</view>

			</view>
		</view>


		<view class="bottom text-center-v bg-width" style=" z-index: 1000;height: 100rpx;" v-if="menu_text == '多选'">
			<view class="full-width box-wrap-space-around">
				<button @tap.stop="onAllCopy">复制</button>
				<button @tap.stop="onAllBackCancel">撤回</button>
				<button @tap.stop="onAllDel">删除</button>
				<button @tap.stop="onAllSelect">全选</button>
				<button @tap.stop="onAllCancel">取消</button>
			</view>
		</view>

		<!--tabbar-->
		<view class="tui-chat-content">
			<tui-loadmore :visible="loadding" :index="3" type="primary" text=" "></tui-loadmore>

			<view class="content" id="content" :style="{height: style.contentViewHeight + 'px'}">
				<scroll-view :scroll-top="scrollTop" id="scrollview" :style="{height: style.contentViewHeight + 'px'}"
					scroll-y="true" enable-back-to-top='true' @scrolltoupper="onChatPre">
					<view v-for="(item,index) in chat_list" :key="index" class="m-item "
						v-show="!(item.is_hidden == '1')" :id="'chat'+item.id">
						<view class="tui-chat-left" v-if="item.from==you.id">
							<image :src="you.avatar" class="tui-user-pic tui-right" @tap="onAvatar"
								:data-id='item.creby'></image>
							<view class="cols full-width">
								<view class="text-color-9 text-xs">{{item.credate}}</view>
								<view class="tui-chat-left-padding">
									<!-- <rich-text :nodes="item.text" v-if="item.type=='0'" :data-index="index" @longtap="onDetailLong" class="tui-chatbox tui-chatbox-left"></rich-text> -->
									<text v-if="item.type=='0'" :data-index="index" @longtap="onDetailLong"
										class="tui-chatbox tui-chatbox-left">{{item.text}}</text>
									<view v-if="item.type=='1'" :data-index="index" @longtap="onDetailLong"
										class="tui-chatbox tui-chatbox-left tui-chatbox-video" @tap="previewImage"
										:data-src='app.upload + item.text'>
										<view class=" text-center-hv ">
											<image :src="app.upload + item.text" mode="widthFix" class="img-chat">
											</image>
										</view>
									</view>
									<view v-if="item.type=='2'" :data-index="index" @longtap="onDetailLong"
										class="tui-chatbox tui-chatbox-left  " @tap="onPayAudio"
										:class="{'tui-chatbox-play-left': index_play_msg == index && index_play == 1}"
										:data-text="item.text"
										:style="{width: 100 + (item.duration<=0?1:item.duration>60?60:item.duration) * 4 + 'rpx' }">
										<!-- <tui-icon name="news" :size="30" color='#666'></tui-icon> -->
										<view class="box">
											<view class="rows">
												<view class=" text-center-hv chat-audio-left">
													<image src="../../static/image/icon_audio_left.png"
														class="chat-audio"></image>
												</view>
												<view class=" text-center-hv">
													<view>{{item.duration<=0?1:item.duration>60?60:item.duration}}"
													</view>
												</view>
											</view>
											<view></view>
										</view>
									</view>
									<view v-if="item.type=='3'" :data-index="index" @longtap="onDetailLong"
										class="tui-chatbox tui-chatbox-left tui-chatbox-video" @tap="onPayVideo"
										:data-text="item.text">
										<!-- <video :src="app.upload + item.text" class="chat-video" ></video> -->
										<view class="chat-video-box text-center-hv">
											<image src="../../static/images/chat_video.png" class="chat-video"></image>
										</view>
									</view>
									<view v-if="item.type=='6'" :data-index="index" @longtap="onDetailLong"
										class="tui-chatbox tui-chatbox-location tui-chatbox-left tui-chatbox-video"
										@tap="onLocation" :data-text="item.text">
										<view class="text-inline pt-sm pl-sm ">{{formatLocation(item)}}</view>
										<view class="text-inline text-sm pb-sm pl-sm ">{{formatLocationDetail(item)}}
										</view>
										<view class="chat-location text-center-hv">
											<tui-icon name="gps" :size="40" color='#666'></tui-icon>
										</view>
									</view>
								</view>
							</view>
							<view class="pl" v-if="menu_text == '多选'">
								<checkbox-group name="is_check" @change="onCheckChat" :data-index="index">
									<label class="checkbox">
										<checkbox value="1" :checked="item.is_check == '1'" />
									</label>
								</checkbox-group>
							</view>
						</view>

						<view class="tui-chat-right" v-if="item.from==me.id">
							<view class="cols full-width">
								<view class="text-color-9 text-xs tui-chat-right-time">{{item.credate}}</view>
								<view class="tui-chat-right-padding">
									<!-- <rich-text :nodes="item.text" v-if="item.type=='0'" :data-index="index" @longtap="onDetailLong" class="tui-chatbox tui-chatbox-right"></rich-text> -->
									<text v-if="item.type=='0'" :data-index="index" @longtap="onDetailLong"
										class="tui-chatbox tui-chatbox-right">{{item.text}}</text>
									<view v-if="item.type=='1'" :data-index="index" @longtap="onDetailLong"
										class="tui-chatbox tui-chatbox-right tui-chatbox-video" @tap="previewImage"
										:data-src='app.upload + item.text'>
										<view class=" text-center-hv ">
											<image :src="app.upload + item.text" mode="widthFix" class="img-chat">
											</image>
										</view>
									</view>
									<view v-if="item.type=='2'" :data-index="index" @longtap="onDetailLong"
										class="tui-chatbox tui-chatbox-right" @tap="onPayAudio"
										:class="{'tui-chatbox-play-right': index_play_msg == index && index_play == 1}"
										:data-text="item.text"
										:style="{width: 100 + (item.duration<=0?1:item.duration>60?60:item.duration) * 4 + 'rpx' }">
										<!-- <tui-icon name="news" :size="30" color='#666'></tui-icon> -->
										<view class="box">
											<view></view>
											<view class="rows">
												<view class=" text-center-hv ">
													<view>{{item.duration <= 0?1:item.duration>60?60:item.duration}}"
													</view>
												</view>
												<view class=" text-center-hv chat-audio-right">
													<image src="../../static/image/icon_audio_right.png"
														class="chat-audio"></image>
												</view>
											</view>
										</view>
									</view>
									<view v-if="item.type=='3'" :data-index="index" @longtap="onDetailLong"
										class="tui-chatbox tui-chatbox-right tui-chatbox-video" @tap="onPayVideo"
										:data-text="item.text">
										<!-- <video :src="app.upload + item.text" class="chat-video" ></video> -->
										<view class="chat-video-box text-center-hv">
											<image src="../../static/images/chat_video.png" class="chat-video"></image>
										</view>
									</view>
									<view v-if="item.type=='6'" :data-index="index" @longtap="onDetailLong"
										class="tui-chatbox tui-chatbox-location tui-chatbox-right tui-chatbox-video"
										@tap="onLocation" :data-text="item.text">
										<view class="text-inline pt-sm pl-sm ">{{formatLocation(item)}}</view>
										<view class="text-inline text-sm pb-sm pl-sm ">{{formatLocationDetail(item)}}
										</view>
										<view class="chat-location text-center-hv">
											<tui-icon name="gps" :size="40" color='#666'></tui-icon>
										</view>
									</view>
								</view>
							</view>
							<image :src="me.avatar" class="tui-user-pic tui-left" @tap="onAvatar" :data-id='item.creby'>
							</image>
							<view class="pl" v-if="menu_text == '多选'">
								<checkbox-group name="is_check" @change="onCheckChat" :data-index="index">
									<label class="checkbox">
										<checkbox value="1" :checked="item.is_check == '1'" />
									</label>
								</checkbox-group>
							</view>
						</view>
					</view>
					<view style="height: 50rpx;" class="m-item"></view>
					<!-- <view>
                        <button @tap="startRecord">开始录音</button>
                        <button @tap="endRecord">停止录音</button>
                        <button @tap="playVoice">播放录音</button>
                        <button @tap="onUploadVoice">上传录音</button>
                    </view> -->
				</scroll-view>
			</view>
		</view>
		<view class="tui-safearea-bottom"></view>

		<vive-modal-menu :hidden="selected==null" @click="onMenuInvoke" @close="onMenuClose" :menu="modal_menu">
		</vive-modal-menu>

	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiBadge from "@/components/badge/badge"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import viveModalMenu from "@/components/vive-modal-menu/vive-modal-menu"

	let recorderManager = uni.getRecorderManager()
	let innerAudioContext = uni.createInnerAudioContext()

	export default {
		components: {
			tuiIcon,
			tuiBadge,
			tuiLoadmore,
			viveModalMenu,
		},
		data() {
			return {
				app: this.app,
				user_id: '', //连天对象
				me: {}, //我的信息
				you: {}, //他的信息
				chat_list: [], //聊天列表
				input_text: '', //输入文本       

				input_type: '0', //输入类型  {消息类型}[0:默认文本类型,1:图片类型,2:语音类型,3:视频类型,4:发起语音,5:发起视频]              
				input_text_title: '按住 说话', //输入提示信息
				input_text_voice_type: '0', //0未在输入 1 在输入
				input_text_cancel_type: '0', //0默认 1 取消

				loadding: false,
				show: false,
				bottom: 0,
				//to_chat: '',
				// 聊天页面时时滚动样式

				scrollTop: 0,
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				voicePath: '',

				startData: {
					clientX: 0,
					clientY: 0,
				},

				audio_time: 0, //录制时间
				audio_time_loop: null,
				index_play_msg: -1,
				index_play: -1, //当前播放状态

				is_friend: '0',

				selected: null, //长按
				modal_menu: ['复制', '撤回', '删除', '多选', '取消'],
				menu_text: '',

				char_page_index: 0, //历史页面


				name: '&#129300; &#128514; &#128540; &#128522; &#128076; &#128513; ',
			}
		},
		computed: {
			// 控制显示的内容
			formatLocation: function() {
				return function(item) {
					let text = this.app.toObject(item.text)
					if (text) {
						if (text.name) {
							return text.name
						}
						// if(text.address){
						//     if(text.address.province){
						//         return text.address.province + text.address.city + text.address.district
						//     }
						// }
					}
				}

			},
			formatLocationDetail: function() {
				return function(item) {
					let text = this.app.toObject(item.text)
					if (text) {
						if (text.address) {
							return text.address
						}
						// if(text.address){
						//     if(text.address.province){
						//         return text.address.street + text.address.streetNum + text.address.poiName
						//     }
						// }
					}
				}

			},
		},
		onLoad: function(options) {
			let that = this
			this.app.data.loopTaskEnable = false


			this.user_id = options.user_id
			if (!this.user_id || this.user_id == 'undefined') {
				this.app.toast('缺少用户ID')
				return
			}

			this.app.post('api/user/is_friend?XDEBUG_SESSION_START=14470', {
				user_id: this.user_id
			}, json => {
				if (json.code == '0') {
					this.is_friend = '1'
				} else {
					this.is_friend = '0'
					this.app.msgSys('成为合作商之后才能通信', is => {
						//this.app.back()
					})
					//return
				}


				//板块
				this.app.post('api/chat/chat_user_info', {
					user_id: this.user_id
				}, json => {
					this.me = json.me
					this.you = json.you
					//{{item.company_name}} {{item.company_server_name}}
					let title = ''
					if (this.you.nickname) {
						title += this.you.nickname + " "
					}
					if (this.you.company_name) {
						title += this.you.company_name + " "
					}
					if (this.you.company_server_name) {
						title += this.you.company_server_name + " "
					}
					this.app.setTitle(title)

					if (this.you.del == '-4') {
						this.app.toast('用户已注销')
						this.is_friend = '0'
						// setTimeout(()=> {
						// 	this.app.back()
						// }, 2000)
					}
				})


			})

			this.onChatNext(() => {
				if (this.app.timeLoop != null) {
					clearInterval(this.app.timeLoop);
				}
				this.app.timeLoop = setInterval(() => {
					this.onChatNext()
				}, 3000)

				this.onChatNextBottom()
			})
		},
		onShow() {
			//this.app.data.loopTaskEnable = false
			this.app.checkUser()

			recorderManager = uni.getRecorderManager()
			innerAudioContext = uni.createInnerAudioContext()


			let self = this;
			recorderManager.onStop(function(res) {
				// console.log('recorder stop' + JSON.stringify(res));
				console.log('录制的语音: ' + res.tempFilePath);
				self.voicePath = res.tempFilePath;
			});
			innerAudioContext.onPlay(() => {
				this.index_play = 1
				console.log('开始播放');
			});
			innerAudioContext.onError((res) => {
				this.index_play = -1
				console.log(res.errMsg);
				console.log(res.errCode);
			});
			innerAudioContext.onStop(() => {
				this.index_play = -1
				console.log('停止播放');
			});
			innerAudioContext.onEnded(() => {
				this.index_play = -1
				console.log('播放结束');
			});
		},
		onHide() {
			//this.app.data.loopTaskEnable = true
			//clearInterval(this.app.timeLoop);
			//innerAudioContext.stop()
		},
		onUnload() {
			this.app.data.loopTaskEnable = true
			clearInterval(this.app.timeLoop);
			innerAudioContext.stop()

		},
		methods: {
			onAvatar(e) {
				let id = this.app.ed(e).id
				this.app.go('/pages/index/detail/detail', {
					user_id: id
				})
			},
			reLoad: function() { //重新 加载聊天
				//板块
				/*                this.app.post('api/chat/chat_user_all', {
				                    user_id: this.user_id,
				                }, json => {
				                    // this.me = json.me
				                    // this.you = json.you
				                    // this.app.setTitle(this.you.nickname)
				                    this.chat_list = json.chat_list
				                    setTimeout(() => {
				                        this.scrollToBottom()
				                    }, 100)
				                }) */
				this.onChatNext()
			},
			onInputText(e) { //输入框
				this.input_text = this.app.ev(e)
			},
			send(e) { //点击发送
				this.app.post('api/chat/chat_send?XDEBUG_SESSION_START=13656', {
					user_id: this.user_id,
					text: this.input_text
				}, json => {
					this.input_text = ''
					this.onChatNextBottom()
				})
			},
			scrollToBottom: function() { //滚动到最底部
				let that = this
				that.$nextTick(() => {
					const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度     api为获取系统信息同步接口
					that.style.pageHeight = res.windowHeight;
					that.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth /
						750 * (100) //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 
					//console.log(this.style)

					let query = uni.createSelectorQuery()
					query.selectAll('.m-item').boundingClientRect()
					query.select('#scrollview').boundingClientRect()
					query.exec(res => {
						that.style.mitemHeight = 0;
						// console.log(res)
						res[0].forEach((rect) => {
							that.style.mitemHeight = that.style.mitemHeight + rect.height
							// console.log(that.style.mitemHeight)
						}) //获取所有内部子元素的高度                    
						// 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这红字
						that.$nextTick(() => {
							if (that.style.mitemHeight > (that.style.contentViewHeight -
									100)) { //判断子元素高度是否大于显示高度
								that.scrollTop = that.style.mitemHeight - that.style
									.contentViewHeight //用子元素的高度减去显示的高度就获益获得序言滚动的高度
							}
						})
					})
				});
			},
			scrollToBottomItem: function(char_page_index, actionFinish) { //滚动到最底部
				let that = this
				that.$nextTick(() => {
					const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度     api为获取系统信息同步接口
					that.style.pageHeight = res.windowHeight;
					that.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth /
						750 * (100) //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 
					//console.log(this.style)
					let query = uni.createSelectorQuery()
					query.selectAll('.m-item').boundingClientRect()
					query.select('#scrollview').boundingClientRect()
					query.exec(res => {
						that.style.mitemHeight = 0;
						// console.log(res)
						let index = 0
						res[0].forEach((rect) => {
							if (that.chat_list[index].char_page_index == char_page_index) {
								that.style.mitemHeight = that.style.mitemHeight + rect.height
								index++
							}
							// console.log(that.style.mitemHeight)
						}) //获取所有内部子元素的高度                    
						// 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这红字
						that.$nextTick(() => {
							 setTimeout(() => {
									if (that.style.mitemHeight > (that.style.contentViewHeight -100)) { //判断子元素高度是否大于显示高度
										that.scrollTop = that.style.mitemHeight //用子元素的高度减去显示的高度就获益获得序言滚动的高度
									}
									if (actionFinish) {
										actionFinish()
									}		
							}, 0)
						})
					})
				});
			},
			startRecord() { //test
				console.log('开始录音');

				recorderManager.start();
			},
			endRecord() { //test
				console.log('录音结束');
				recorderManager.stop();
			},
			playVoice() { //test
				console.log('播放录音');

				let innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
				}
			},
			onUploadVoice() { //上传  语音
				this.app.uploadFile('api/chat/chat_send', {
					name: 'file',
					path: this.voicePath,
					data: {
						type: '2',
						user_id: this.user_id,
					},
				}, json => {
					this.reLoad()
				})
			},
			onPayAudio(e) { //点击了 语音
				let index = this.app.ed(e).index
				let item = this.chat_list[index]
				if (this.index_play == -1 || index != this.index_play_msg) { //true 表示暂停或停止
					innerAudioContext.stop()
					let url = this.app.upload + this.app.ed(e).text
					// innerAudioContext.autoplay = true
					innerAudioContext.src = url
					innerAudioContext.play()
				} else {
					innerAudioContext.stop()
				}
				this.index_play_msg = index
			},
			onAudioStart(e) { //按下录制

				recorderManager = uni.getRecorderManager()
				let self = this;
				recorderManager.onStop(function(res) {
					console.log('录制的语音: ' + res.tempFilePath);
					self.voicePath = res.tempFilePath;
				});

				this.startData.clientX = e.changedTouches[0].clientX;
				this.startData.clientY = e.changedTouches[0].clientY;

				this.input_text_title = '松开 结束'
				this.input_text_voice_type = '1'
				this.input_text_cancel_type = '0'

				this.audio_time = 0
				if (this.audio_time_loop) {
					clearInterval(this.audio_time_loop)
				}
				this.audio_time_loop = setInterval(() => {
					this.audio_time++
					if (this.audio_time > 60) {
						this.audio_time = 60
					}
				}, 1000)

				recorderManager.stop();
				recorderManager.start();
			},
			onAudioMove(e) { //按下时 是否 完成 或取消
				const subX = e.changedTouches[0].clientX - this.startData.clientX
				const subY = e.changedTouches[0].clientY - this.startData.clientY
				if (subY > 200 || subY < -200) {
					console.log('上下滑')
					this.input_text_cancel_type = '1'
				} else {
					this.input_text_cancel_type = '0'
					if (subX > 100) {
						console.log('右滑')
					} else if (subX < -100) {
						console.log('左滑')
					} else {
						console.log('无效')
					}
				}
			},
			onAudioEnd(e) { //按钮抬起 是否添加还是取消
				let that = this

				this.input_text_cancel_type = '0'

				const subX = e.changedTouches[0].clientX - this.startData.clientX
				const subY = e.changedTouches[0].clientY - this.startData.clientY

				if (subY > 200 || subY < -200) {
					console.log('取消发送')

					this.input_text_title = '按住 说话'
					this.input_text_voice_type = '0'
					recorderManager.stop();

				} else {
					console.log('发送 语音消息')

					this.input_text_title = '按住 说话'
					this.input_text_voice_type = '0'
					recorderManager.stop();

					that.$nextTick(() => {
						setTimeout(() => {
							// let ac = uni.createInnerAudioContext()
							// ac.src = this.voicePath;
							// let duration = ac.duration
							// if (ac.duration < 1) {
							// 	this.app.toast('录制时间过短')
							// 	return
							// }
							that.app.uploadFile('api/chat/chat_send', {
								name: 'file',
								path: that.voicePath,
								data: {
									type: '2',
									user_id: that.user_id,
									// duration: duration,
								},
							}, json => {
								if (json.code == '0') {
									//this.reLoad()
									that.onChatNextBottom()
								} else {
									that.app.toast(json.data)
								}
							
							})
						}, 300)
					})
				}
			},
			onAudioCancel(e) {
				let that = this

				console.log('中断录音')
				that.input_text_title = '按住 说话'
				that.input_text_voice_type = '0'
				recorderManager.stop();
				that.$nextTick(() => {
					setTimeout(() => {
						that.app.uploadFile('api/chat/chat_send', {
							name: 'file',
							path: that.voicePath,
							data: {
								type: '2',
								user_id: that.user_id,
								// duration: duration,
							},
						}, json => {
							if (json.code == '0') {
								//this.reLoad()
								that.onChatNextBottom()
							} else {
								that.app.toast(json.data)
							}
						})
					}, 300)
				})

			},
			onCancelVoice(e) { //弃用
				this.input_text_title = '按住 说话'
				this.input_text_voice_type = '0'
				recorderManager.stop();
				console.log('取消发送')
			},
			onAddImg(e) { //点击添加图片
				this.app.chooseImage(fs => {
					let ufs = []
					for (let i in fs) {
						ufs.push({
							name: 'file',
							path: fs[i],
							data: {
								type: '1',
								user_id: this.user_id,
							}
						})
					}
					uni.showToast({
						title: "上传中…",
						icon: "loading",
						duration: 99999
					})
					this.app.uploadFiles('api/chat/chat_send', ufs, () => {
						//this.reLoad()
						this.onChatNextBottom()
						this.app.toastHide()
					})
				}, 9)
			},
			previewImage(e) { //点击图片预览
				this.app.previewImage(e)
			},
			onAddVideo(e) { //点击添加视频
				this.app.chooseVideo((video, res) => {
					let duration = res.duration
					let videoUp = {
						name: 'file',
						path: video,
						data: {
							type: '3',
							user_id: this.user_id,
							duration: duration,
						}
					}
					if (duration > 61) {
						this.app.toast('视频超过60s')
						return
					}


					uni.showToast({
						title: "上传中…",
						icon: "loading",
						duration: 99999
					})
					this.app.uploadFile('api/chat/chat_send', videoUp, () => {
						//this.reLoad()
						this.onChatNextBottom()
						this.app.toastHide()
					})
				})
			},
			onInputTypeVoice(e) { //输入语音
				this.input_type = '2'
			},
			onInputTypeText(e) { //输入文字
				this.input_type = '0'
			},
			onChatPre() { //加载聊天历史
				let that = this
				this.loadding = true

				let param = {
					user_id: this.user_id,
				}
				if (this.chat_list && this.chat_list.length > 0) {
					param.first_id = this.chat_list[0].id
				}

				that.app.toastLoading()
				this.app.post('api/chat/chat_user_pre', {
					...param
				}, json => {
					that.char_page_index--
					let listSore = []
					for (let i in json.chat_list) {
						let item = json.chat_list[i]
						item.char_page_index = that.char_page_index
						item.is_hidden = true
						listSore[item.id] = item
					}
					for (let i in that.chat_list) {
						let item = that.chat_list[i]
						listSore[item.id] = item
					}
					let list = []
					for (let i in listSore) {
						list.push(listSore[i])
					}
					that.chat_list = list


					setTimeout(() => {
						
						that.scrollToBottomItem(that.char_page_index, () => {
							that.app.toastHide()
							
							for (let i in that.chat_list) {
								that.chat_list[i].is_hidden = false
							}
						})
					}, 300)
					

					this.show = true;
					this.loadding = false
				})
			},
			onChatNext(action = null) { //下载下面
				let that = this
				let param = {
					user_id: this.user_id,
				}
				if (this.chat_list && this.chat_list.length > 0) {
					param.last_id = this.chat_list[this.chat_list.length - 1].id
				}
				this.app.post('api/chat/chat_user_next', {
					...param
				}, json => {
					let userMsgCount = listMsg => {
						let count = 0
						for (let i in listMsg) {
							if (listMsg[i].creby == this.user_id) {
								if (listMsg[i].is_read == '0') {
									count++
								}
							}
						}
						return count
					}

					let listSore = []
					for (let i in json.chat_list) {
						let item = json.chat_list[i]
						listSore[item.id] = item
					}
					for (let i in this.chat_list) {
						let item = this.chat_list[i]
						listSore[item.id] = item
					}
					let list = []
					for (let i in listSore) {
						list.push(listSore[i])
					}
					this.chat_list = list

					/* 					let list = []
										for (let i in this.chat_list) {
											list.push(this.chat_list[i])
										}
										for (let i in json.chat_list) {
											list.push(json.chat_list[i])
										}
										this.chat_list = list */

					// let newCount = userMsgCount(list)
					// let nowCount = userMsgCount(this.chat_list)
					// console.log(newCount)
					// console.log(nowCount)
					// if(newCount > nowCount){
					// 	this.onNewMsg()
					// }

					if (action) {
						action()
					}

					//是否存在新的消息 并提醒
					if (userMsgCount(json.chat_list)) {
						this.onNewMsg()
						setTimeout(() => {
							that.scrollToBottom()
						}, 300)
					}

				})
			},
			onPayVideo(e) { //点击播放视频
				let url = this.app.upload + this.app.ed(e).text
				this.app.go('/pages/message/video', {
					url: url
				})
			},
			onAddLocation(e) { //获取地址
				this.app.chooseLocation(json => {
					this.app.post('api/chat/chat_send', {
						type: '6',
						user_id: this.user_id,
						text: this.app.toJson(json)
					}, json => {
						//this.reLoad()
						this.onChatNextBottom()

					})
				})

				/*                this.app.msgSys('确定发送位置', is => {
				                    if (is) {
				                        this.app.getLocation(json => {
				                            this.app.post('api/chat/chat_send', {
				                                type: '6',
				                                user_id: this.user_id,
				                                text: this.app.toJson(json)
				                            }, json => {
				                                this.reLoad()
				                            })
				                
				                        })
				                    }
				                }) */
			},
			formatChatText: function(list) {
				for (let i in list) {
					let item = list[i]
					if (item.type == '6') {
						item.text = this.app.toObject(item.text)
					}
					list[i] = item
				}
				return list
			},
			onLocation: function(e) { //回调位置信息
				let text = this.app.ed(e).text
				// console.log(text)
				let location = this.app.toObject(text)

				const latitude = location.latitude;
				const longitude = location.longitude;
				if (latitude && longitude && latitude > 0 && longitude > 0) {
					uni.openLocation({
						latitude: location.latitude,
						longitude: location.longitude,
						name: location.name,
						address: location.address,
						success: function() {
							console.log('success map');
						}
					});
				} else {
					this.app.toast('位置错误')
				}
			},
			onNewMsg: function() { //新消息  作废
				//this.app.toast('新消息')
				// uni.vibrate({
				//     success: function () {
				//         console.log('success');
				//     }
				// });

				//vadd hide
				// let innerAudioContext = uni.createInnerAudioContext()
				// innerAudioContext.autoplay = true
				// innerAudioContext.src = '/static/audio/ios_msg.wav'
				// innerAudioContext.play()
			},
			onDetailLong(e) { //长按消息
				this.selected = this.chat_list[this.app.ed(e).index]
				// this.modal_menu = ['删除', '取消']
				// if (this.selected.from == this.me.id) { //是我自己的 而且在两分钟内
				// 	if (this.selected._credate) {
				// 		let time = new Date().getTime() - new Date(this.selected._credate).getTime()
				// 		if (time <= 120 * 1000) {
				// 			this.modal_menu = ['撤回', '删除', '取消']
				// 		}
				// 	}
				// }
			},
			onMenuInvoke(e) { //菜单点击回调
				let selected = this.selected

				let id = this.selected.id
				let index = e.index
				let menu_text = this.modal_menu[index]
				this.menu_text = menu_text

				if (menu_text == '复制') { //点击了复制
					if (selected.type == '0') {
						let sum = selected.text
						this.app.copy(sum, () => {
							this.app.toast('内容已复制')
						})
					}
					this.selected = null
				} else if (menu_text == '撤回') { //点击了撤回
					if (this.selected.from == this.me.id) { //是我自己的 而且在两分钟内
						if (this.selected._credate) {

							this.app.msgSys('确定撤回消息', is => {
								if (is) {
									this.app.post('api/chat/chat_back', {
										id: id,
									}, json => {
										if (json.code == '0') {
											this.app.toast('撤回成功')
											selected.is_hidden = '1'
										} else {
											this.app.toast('不允许撤回')
										}
										this.selected = null
									})
								}
							})

							// let time = new Date().getTime() - new Date(this.selected._credate).getTime()
							// if (time <= 120 * 1000) {
							// 	this.app.msgSys('确定撤回消息', is => {
							// 		if (is) {
							// 			this.app.post('api/chat/chat_ba ck', {
							// 				id: id,
							// 			}, json => {
							// 				this.app.toast('撤回成功')
							// 				selected.is_hidden = '1'
							// 				this.selected = null
							// 			})
							// 		}
							// 	})
							// 	return
							// }
						}
					}

				} else if (menu_text == '删除') { //点击了删除
					this.app.msgSys('确定删除消息', is => {
						if (is) {
							this.app.post('api/chat/chat_del', {
								id: id,
							}, json => {
								this.app.toast('删除成功')
								selected.is_hidden = '1'
								this.selected = null
							})
						}
					})
				} else if (menu_text == '多选') { //点击了删除
					this.selected = null
				} else {
					this.selected = null
					this.menu_text = ''
				}
			},
			onMenuClose() { //菜单取消
				this.selected = null
			},
			/*
			<button @tap.stop="onAllBackCancel">撤销</button>
			<button @tap.stop="onAllDel">删除</button>
			<button @tap.stop="onAllSelect">全选</button>
			<button @tap.stop="onAllCancel">取消</button>
			*/
			onAllCopy() { //
				let sum = ''
				for (let i in this.chat_list) {
					let chat = this.chat_list[i]
					if (chat.is_check == '1') {
						if (chat.type == '0') {
							sum += chat.text + '\r\n'
						}
					}
				}
				if (sum.length > 0) {
					sum = sum.substr(0, sum.length - 1)
				}
				if (!sum) {
					this.app.toast('未选中')
					return
				}

				this.app.copy(sum, () => {
					this.app.toast('内容已复制')
				})

				for (let i in this.chat_list) {
					this.chat_list[i].is_check = '0'
				}

				this.menu_text = ''
			},
			onAllBackCancel() { //
				let ids = []
				for (let i in this.chat_list) {
					if (this.chat_list[i].is_check == '1') {
						ids.push(this.chat_list[i].id)
					}
				}
				if (ids.length <= 0) {
					this.app.toast('未选中')
					return
				}
				this.app.msgSys('确定撤回选中消息', is => {
					if (is) {
						this.app.post('api/chat/chat_back_all', {
							ids: ids,
						}, json => {
							if (json.code == '0') {
								for (let i in this.chat_list) {
									let list = json.data.list
									for (let j in list) {
										if (this.chat_list[i].id == j && list[j].state == '1') {
											this.chat_list[i].is_hidden = '1'
											this.chat_list[i].is_check = '0'
										}
									}
									if (this.chat_list[i].is_check == '1') {
										this.chat_list[i].is_check = '0'
									}
								}
								this.app.toast('撤回成功:' + json.data.count)
							} else {
								this.app.toast('撤回失败')
							}
							// selected.is_hidden = '1'							
							// this.selected = null
							this.menu_text = ''
						})
					}
				})
			},
			onAllDel() { //
				let ids = []
				for (let i in this.chat_list) {
					if (this.chat_list[i].is_check == '1') {
						ids.push(this.chat_list[i].id)
					}
				}
				if (ids.length <= 0) {
					this.app.toast('未选中')
					return
				}
				this.app.msgSys('确定删除选中消息', is => {
					if (is) {
						this.app.post('api/chat/chat_del_all', {
							ids: ids,
						}, json => {
							this.app.toast('删除成功')
							for (let i in this.chat_list) {
								if (this.chat_list[i].is_check == '1') {
									this.chat_list[i].is_hidden = '1'
									this.chat_list[i].is_check = '0'
								}
							}
							// selected.is_hidden = '1'							
							// this.selected = null
							this.menu_text = ''
						})
					}
				})
			},
			onAllSelect() { //
				let is = false
				for (let i in this.chat_list) {
					if (this.chat_list[i].is_check == '1') {

					} else {
						is = true
						break
					}
				}
				if (is) {
					for (let i in this.chat_list) {
						this.chat_list[i].is_check = '1'
					}
				} else {
					for (let i in this.chat_list) {
						this.chat_list[i].is_check = '0'
					}
				}
			},
			onAllCancel() { //
				this.selected = null
				this.menu_text = ''
			},
			onCheckChat(e) {
				let val = this.app.ev(e)[0]
				let index = this.app.ed(e).index
				this.chat_list[index].is_check = val
			},
			onChatNextBottom: function() {
				let that = this
				setTimeout(() => {
					that.scrollToBottom()
				}, 300)
			},

		},
		onPageScroll(e) {
			let that = this
			if (e.scrollTop == 0 && !this.loadding) {
				this.loadding = true
				setTimeout(() => {
					that.show = true;
					that.loadding = false
					that.onChatPre()
				}, 100)
			}
		},


	}
</script>

<style>
	.input-text-voice-cancel {
		position: absolute;
		bottom: 400rpx;

		/* filter: Alpha(opacity=100); */
		/* IE */
		/* -moz-opacity:1; */
		/* FF 主要是为了兼容老版本的FF */
		/* opacity:1; */
		/* FF */
	}

	.m-item {}

	page {
		background: #ebedf6;
	}

	.container {
		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 146upx;
		box-sizing: border-box;
	}

	/*--tabbar--*/

	.tui-operation {
		height: 100%;
		width: 100%;
		height: 100rpx;
		overflow: hidden;
		background: #EFF2FC;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 999;
	}

	.tui-operation-inpupt-voice {
		background: #000000;
		/* width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        z-index: 999; */

		padding-bottom: 100rpx;

		filter: Alpha(opacity=50);
		/* IE */
		-moz-opacity: 0.5;
		/* FF 主要是为了兼容老版本的FF */
		opacity: 0.5;
		/* FF */
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0px;
		right: 0;
		left: 0;
		border-top: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-chat-operation {
		background: #f6f6f6 !important;
		/* padding-right: 18upx; */
		/* box-sizing: border-box; */
	}

	.tui-pl {
		padding-left: 16rpx;
	}

	.tui-pr {
		padding-right: 16rpx;
	}

	.tui-right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-input-box {
		/* width: 78%; */
		width: 100%;
		justify-content: flex-start;
	}

	.tui-chat-input {
		background: #ffffff;
		height: 72rpx;
		border-radius: 6rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		flex: 1;
		width: 100%;
	}



	.tui-opcity {
		opacity: 0.5;
	}

	/*--tabbar--*/

	/*chatbox*/
	.tui-chat-content {
		width: 100%;
	}

	.tui-chatbox {
		max-width: 66%;
		border-radius: 10rpx;
		position: relative;
		padding: 20rpx 22rpx;
		font-size: 32rpx;
		color: #000;
		/* text-align: justify; */
		word-break: break-all;
		word-wrap: break-word;
	}

	.tui-chatbox::before {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		top: 20upx;
		border: 16upx solid;
	}

	.tui-chatbox-left {
		background: #fff;
		border: 1upx solid #fff;
		display: inline-block;
	}

	.tui-chatbox-left::before {
		right: 100%;
		border-color: transparent #fff transparent transparent;
	}

	.tui-chatbox-right {
		background: #a0d5f3;
		border: 1upx solid #a0d5f3;
	}

	.tui-chatbox-right::before {
		left: 100%;
		border-color: transparent transparent transparent #a0d5f3;
	}


	/*chatbox*/

	.tui-chat-left,
	.tui-chat-right {
		display: flex;
		align-items: flex-start;
		padding-top: 36rpx;
	}

	.tui-chat-left-padding,
	.tui-chat-right-padding {
		display: flex;
		align-items: flex-start;
		padding-top: 10rpx;
	}

	.tui-chat-right-padding {
		justify-content: flex-end;
	}

	.tui-chat-right-time {
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
	}



	.tui-user-pic {
		width: 80upx;
		height: 80upx;
		flex-shrink: 0;
		/* border-radius: 50%; */
		display: block;
		border-radius: 10%;

	}

	.tui-left {
		margin-left: 26upx;
	}

	.tui-right {
		margin-right: 26upx;
	}

	.tui-chat-right {
		justify-content: flex-end;
	}

	.tui-chat-center {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 28upx;
		font-size: 28upx;
		color: #666;
		padding-top: 36upx;
	}

	.tui-label {
		display: inline-block;
		background: rgba(0, 0, 0, 0.4);
		color: #fff;
		font-size: 24upx;
		line-height: 24upx;
		margin-top: 36upx;
		padding: 12upx 16upx;
		text-align: center;
		border-radius: 8upx;
		margin-left: 50%;
		transform: translateX(-50%);
	}

	.tui-img-chatbox {
		position: relative;
	}

	.tui-img-chatbox::after {
		content: '';
		position: absolute;
		height: 200%;
		width: 200%;
		border: 1upx solid #eaeef1;
		transform-origin: 0 0;
		-webkit-transform-origin: 0 0;
		-webkit-transform: scale(0.5);
		transform: scale(0.5);
		left: 0;
		top: 0;
		border-radius: 20upx;
	}

	.tui-chat-img {
		max-width: 200upx;
		/* min-height: 80upx; */
		display: block;
		border-radius: 10upx;
	}

	.tui-chat-flex {
		display: flex;
		align-items: center;
	}

	.tui-flex-center {
		display: flex;
		align-items: center;
	}

	.tui-chat-voice {
		width: 40upx;
		height: 40upx;
		display: block;
		flex-shrink: 0;
	}

	.tui-rotate {
		transform: rotate(180deg)
	}

	.tui-chat-fail {
		width: 50upx;
		height: 50upx;
		display: block;
		flex-shrink: 0;
	}

	.tui-mr {
		margin-right: 16upx;
	}

	.tui-ml {
		margin-left: 16upx;
	}

	.tui-flex-end {
		justify-content: flex-end;
	}

	.tui-flex-reverse {
		flex-direction: row-reverse;
	}

	.chat-video-box {
		border-radius: 5rpx;
		background-color: #333;
		width: 250rpx;
		height: 200rpx;
	}

	.chat-video {
		background-color: #333;
		width: 100rpx;
		height: 75rpx;
	}

	.tui-chatbox {
		padding: 20rpx 20rpx;
	}

	.tui-chatbox-video {
		padding: 6rpx 6rpx;
	}



	.tui-chatbox-play-left {
		background: #9EEA6A;
		border: 1upx solid #9EEA6A;
	}

	.tui-chatbox-play-right {
		background: #9EEA6A;
		border: 1upx solid #9EEA6A;
	}

	.tui-chatbox-play-left::before {
		right: 100%;
		border-color: transparent #9EEA6A transparent transparent;
	}

	.tui-chatbox-play-right::before {
		left: 100%;
		border-color: transparent transparent transparent #9EEA6A;
	}

	/* 位置消息 */
	.chat-location {
		border-radius: 5rpx;
		background-color: #f0f0f0;
		width: 100%;
		height: 180rpx;
	}

	.tui-chatbox-location {
		width: 60%;
	}
</style>



<!-- <view v-show="show">
				<view class="tui-label">对方已通过您的好友请求</view>
				<view class="tui-chat-center">星期四 11:02</view>
				<view class="tui-chat-right">
					<view class="tui-chatbox tui-chatbox-right">哈喽~，欢迎关注Thor UI！</view>
					<image src="../../../static/images/news/avatar_2.jpg" class="tui-user-pic tui-left"></image>
				</view>
				<view class="tui-chat-left">
					<image src="../../../static/images/news/avatar_1.jpg" class="tui-user-pic tui-right"></image>
					<view class="tui-chatbox tui-chatbox-left">哈喽~，欢迎关注Thor UI！</view>
				</view>
				<view class="tui-chat-left">
					<image src="../../../static/images/news/avatar_1.jpg" class="tui-user-pic tui-right"></image>
					<view class="tui-img-chatbox">
						<image src="../../../static/images/news/avatar_2.jpg" class="tui-chat-img" mode="widthFix"></image>
					</view>
				</view>
				<view class="tui-chat-right">
					<view class="tui-chatbox tui-chatbox-right">哈喽~，欢迎关注Thor UI！</view>
					<image src="../../../static/images/news/avatar_2.jpg" class="tui-user-pic tui-left"></image>
				</view>
				<view class="tui-chat-left">
					<image src="../../../static/images/news/avatar_1.jpg" class="tui-user-pic tui-right"></image>
					<view class="tui-chatbox tui-chatbox-left">哈喽~，欢迎关注Thor UI！</view>
				</view>
				<view class="tui-chat-left">
					<image src="../../../static/images/news/avatar_1.jpg" class="tui-user-pic tui-right"></image>
					<view class="tui-img-chatbox">
						<image src="../../../static/images/news/avatar_2.jpg" class="tui-chat-img" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="tui-chat-center">星期四 11:02</view>
			<view class="tui-chat-left">
				<image src="../../../static/images/news/avatar_1.jpg" class="tui-user-pic tui-right"></image>
				<view class="tui-chatbox tui-chatbox-left">哈喽~，欢迎关注Thor UI！</view>
			</view>
			<view class="tui-chat-center">星期五 12:09</view>
			<view class="tui-chat-right">
				<view class="tui-chatbox tui-chatbox-right">哈喽~，欢迎关注Thor UI！ 请说出您想加入或者优化的功能！</view>
				<image src="../../../static/images/news/avatar_2.jpg" class="tui-user-pic tui-left"></image>
			</view>
			<view class="tui-chat-right">
				<view class="tui-chatbox tui-chatbox-right">哈喽~，欢迎关注Thor UI！</view>
				<image src="../../../static/images/news/avatar_2.jpg" class="tui-user-pic tui-left"></image>
			</view>
			<view class="tui-chat-left">
				<image src="../../../static/images/news/avatar_1.jpg" class="tui-user-pic tui-right"></image>
				<view class="tui-chatbox tui-chatbox-left">哈喽~，欢迎关注Thor UI！</view>
			</view>
			<view class="tui-chat-left">
				<image src="../../../static/images/news/avatar_1.jpg" class="tui-user-pic tui-right"></image>
				<view class="tui-img-chatbox">
					<image src="../../../static/images/news/avatar_2.jpg" class="tui-chat-img" mode="widthFix"></image>
				</view>
			</view>
			<view class="tui-chat-left">
				<image src="../../../static/images/news/avatar_1.jpg" class="tui-user-pic tui-right"></image>
				<view class="tui-img-chatbox">
					<image src="../../../static/images/news/banner_2.jpg" class="tui-chat-img" mode="widthFix"></image>
				</view>
			</view>
			<view class="tui-chat-left">
				<image src="../../../static/images/news/avatar_1.jpg" class="tui-user-pic tui-right"></image>
				<view class="tui-flex-center">
					<view class="tui-chatbox tui-chatbox-left tui-chat-flex tui-mr">
						<image src="../../../static/images/chat/voice.png" class="tui-chat-voice tui-mr"></image>
						<view>8"</view>
					</view>
					<tui-badge :dot="true" type="danger"></tui-badge>
				</view>
			</view>
			<view class="tui-chat-left">
				<image src="../../../static/images/news/avatar_1.jpg" class="tui-user-pic tui-right"></image>
				<view class="tui-flex-center">
					<view class="tui-chatbox tui-chatbox-left tui-chat-flex tui-mr">
						<image src="../../../static/images/chat/voice.png" class="tui-chat-voice tui-mr"></image>
						<view style="width:300upx">20"</view>
					</view>
					<tui-badge :dot="true" type="danger"></tui-badge>
				</view>
			</view>

			<view class="tui-chat-right">
				<view class="tui-flex-center tui-flex-end">
					<tui-badge :dot="true" type="danger"></tui-badge>
					<view class="tui-chatbox tui-chatbox-right tui-chat-flex tui-ml tui-flex-reverse">
						<image src="../../../static/images/chat/voice.png" class="tui-chat-voice tui-rotate tui-ml"></image>
						<view style="width:280upx;text-align:right">18"</view>
					</view>
				</view>
				<image src="../../../static/images/news/avatar_2.jpg" class="tui-user-pic tui-left"></image>
			</view>

			<view class="tui-chat-right">
				<view class="tui-flex-center tui-flex-end tui-flex-reverse">
					<view class="tui-img-chatbox">
						<image src="../../../static/images/news/avatar_1.jpg" class="tui-chat-img" mode="widthFix"></image>
					</view>
					<image src="../../../static/images/chat/fail.png" class="tui-chat-fail tui-mr"></image>
				</view>
				<image src="../../../static/images/news/avatar_2.jpg" class="tui-user-pic tui-left"></image>
			</view> -->
