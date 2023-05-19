<template>
	<view class="">

		<!-- <vive-loadmore :visible='true'  text=''></vive-loadmore> -->
		<!-- <tui-loading :visible='true'></tui-loading> -->

		<view class="bottom full tui-operation-inpupt-voice" v-if="input_text_voice_type == '1'">
		</view>

		<!-- 弹出语音取消按钮 -->
		<view class="bottom full " v-if="input_text_voice_type == '1' && input_type_h5 == '0'">
			<div class="full text-center-hv">
				<view class="input-text-voice-cancel">
					<view class="  text-center-hv cols" :class="[input_text_cancel_type == '1'?'bg-circle':'bg-circle-cancel']">
						<tui-icon name="back" :size="26" color='#333333' v-if="input_text_cancel_type == '0'"></tui-icon>
						<tui-icon name="back" :size="26" color='#ffffff' v-if="input_text_cancel_type == '1'"></tui-icon>
						<text>取 消</text>
						<view class="text-xs pt-sm">{{audio_time}} /60s</view>
					</view>
				</view>
			</div>
		</view>
		
		<view class="bottom full " v-if="input_text_voice_type == '1' && input_type_h5 == '1'">
			<div class="full text-center-hv">
				<view class="input-text-voice-cancel" @tap.sop="onAudioCancelH5">
					<view class="bg-circle  text-center-hv cols" >
						<tui-icon name="back" :size="26" color='#ffffff' ></tui-icon>
						<text>点击取消</text>
						<view class="text-xs pt-sm">{{audio_time}} /60s</view>
					</view>
				</view>
			</div>
		</view>

		<!--tabbar 下方按钮-->
		<view class="bottom cols bottom-msg-options" v-if="is_friend == '1'">
			<view class='text-center-hv  rows  full-width bottom-msg-input'>
				<view hover-class="tui-opcity" :hover-stay-time="150" class="tui-voice tui-pl tui-pr "
					@tap="onInputTypeVoice" v-if="input_type == '0'">
					<tui-icon name="news" :size="34" color='#666'></tui-icon>
				</view>
				<view hover-class="tui-opcity" :hover-stay-time="150" class="tui-voice tui-pl tui-pr "
					@tap="onInputTypeText" v-if="input_type == '2'">
					<tui-icon name="edit" :size="34" color='#666'></tui-icon>
				</view>

				<input v-if="input_type == '0'" class="tui-chat-input btn-send-speek-item" @input="onInputText"
					:value="input_text" confirm-type='send' @confirm='send'></input>


				
				<view v-if="input_type == '2' && input_type_h5 == '0'" class="tui-chat-input text-center-hv btn-send-speek-item"
					:class="[input_text_voice_type == '1'?'btn-send-speek':'']" @touchstart="onAudioStart"
					@touchend="onAudioEnd" @touchmove="onAudioMove" @touchcancel="onAudioCancel">
					{{input_text_title}}
				</view>
				
				<view v-if="input_type == '2' && input_type_h5 == '1'" class="tui-chat-input text-center-hv btn-send-speek-item"
					:class="[input_text_voice_type == '1'?'btn-send-speek':'']" @tap.stop="handlerOnCahnger">
					{{input_text_title}}
				</view>


				<!-- 笑脸 -->
				<view hover-class="tui-opcity" :hover-stay-time="150" class="tui-pl tui-pr " @tap.stop="onMsgMoreEmoji">
					<tui-icon name="imface" :size="28" color='#666'></tui-icon>
				</view>

				<!-- 更多信息  加号 -->
				<view hover-class="tui-opcity" :hover-stay-time="150" class="tui-pr " @tap.stop="onMsgMoreMores"
					v-show="input_text==null || input_text == ''">
					<tui-icon name="add" :size="30" color='#666'></tui-icon>
				</view>

				<!-- 发送 -->
				<view hover-class="tui-opcity" :hover-stay-time="150" class="tui-pr " @tap.stop="send"
					v-show="input_text!=null && input_text != ''">
					<tui-icon name="send" :size="30" color='#666'></tui-icon>
				</view>

			</view>

			<view v-if="msgMoreType == 'more'" class="msg-more-type-box ">
				<view class="msg-more-type-more rows-wrap">
					<view @tap.stop="onAddLocation" hover-class="tui-opcity" :hover-stay-time="150"
						class="msg-more-item text-center-hv cols">
						<view class="cols">
							<tui-icon name="gps" :size="50" color='#666'></tui-icon>
							<view class="text-center-h text-sm text-color-9 mt-xs">位置</view>
						</view>
					</view>
					<view @tap.stop="onAddImg" hover-class="tui-opcity" :hover-stay-time="150"
						class="msg-more-item text-center-hv cols">
						<view class="cols">
							<tui-icon name="pic" :size="50" color='#666'></tui-icon>
							<view class="text-center-h text-sm text-color-9 mt-xs">图片</view>
						</view>
					</view>
					<view @tap.stop="onAddVideo" hover-class="tui-opcity" :hover-stay-time="150"
						class="msg-more-item text-center-hv cols">
						<view class="cols">
							<tui-icon name="video" :size="50" color='#666'></tui-icon>
							<view class="text-center-h text-sm text-color-9 mt-xs">视频</view>
						</view>
					</view>
				</view>
			</view>

			<view v-if="msgMoreType == 'emoji'" class="msg-more-type-box ">
				<scroll-view scroll-x="true" class=" scroll-view-h mt mb ml mr" show-scrollbar="false">
					<view v-for="(item,index) in emoji_type" :class="[item.check == '1'? 'msg-more-emoji-action':'']"
						@tap.stop="onEmojiType" :data-index='index' hover-class="tui-opcity" :hover-stay-time="150"
						class="scroll-view-h-item msg-more-emoji-type text-center-h text-color-9">
						<text>{{item.emoji}}</text>
					</view>
				</scroll-view>
				<scroll-view class="msg-more-type-emoji-box" scroll-y="true">
					<view class="msg-more-type-emoji rows-wrap" v-for="(type,type_index) in emoji_type"
						v-if="type.check == '1'">
						<view @tap.stop="onTextEmoji" :data-type_index='type_index' :data-index='index'
							v-for="(item,index) in type.emoji_list" hover-class="tui-opcity" :hover-stay-time="150"
							class="msg-more-emoji text-center-hv cols">
							<view class="cols">
								<view class="text-center-h text-color-9 ">{{item.emoji}}</view>
							</view>
						</view>
					</view>
					<view style="height: 200rpx;"></view>
				</scroll-view>
			</view>

		</view>

		<!-- 长按弹出菜单 -->
		<view class="bottom text-center-v bg-width" style=" z-index: 1000;height: 100rpx;" v-if="menu_text == '多选'">
			<view class="full-width box-wrap-space-around">
				<button @tap.stop="onAllCopy">复制</button>
				<button @tap.stop="onAllBackCancel">撤回</button>
				<button @tap.stop="onAllDel">删除</button>
				<button @tap.stop="onAllSelect">全选</button>
				<button @tap.stop="onAllCancel">取消</button>
			</view>
		</view>


		<!-- 聊天主体 -->
		<view class="chat-content" @tap.stop="onMsgMoreClose">
			<tui-loadmore :visible="loadding" :index="3" type="primary" text=" "></tui-loadmore>


			<!-- 			<image src="/static/image/icon_audio_left.gif"></image>
 -->
			<!-- <view class="tui-label">对方已通过您的好友请求</view> -->
			<view class="tui-chat-center text-top-nomore" v-if="is_top_nomore">没有更多了</view>

			<view v-for="(item,index) in chat_list" :key="index" class="m-item " :id="'chat'+item.id">
				<view class="tui-chat-left" v-if="item.from==you.id && !(item.is_hidden == true)">
					<image :src="you.avatar" class="tui-user-pic tui-right" @tap.stop="onAvatar" :data-id='item.creby'
						:data-user_type='you.user_type'>
					</image>
					<view class="cols full-width">
						<view class="text-color-9 text-xs">{{item.credate}}</view>
						<view class="tui-chat-left-padding">
							<text v-if="item.type=='0'" :data-index="index" @longtap="onDetailLong"
								class="tui-chatbox tui-chatbox-left">{{item.text}}</text>
							<view v-if="item.type=='1'" :data-index="index" @longtap="onDetailLong"
								class="tui-chatbox tui-chatbox-left tui-chatbox-video" @tap.stop="previewImage"
								:data-src='app.upload + item.text'>
								<view class=" text-center-hv ">
									<image :src="app.upload + item.text" mode="widthFix" class="img-chat">
									</image>
								</view>
							</view>
							<view v-if="item.type=='2'" :data-index="index" @longtap="onDetailLong"
								@tap.stop="onPayAudio" class="rows">
								<view class="tui-chatbox tui-chatbox-left tui-chatbox-max"
									:class="{'tui-chatbox-play-left': index_play_msg == index && index_play == 1}"
									:data-text="item.text"
									:style="{width: 100 + (item.duration<=0?1:item.duration>60?60:item.duration) * 4 + 'rpx' }">
									<view class="box">
										<view class="rows">
											<view class=" text-center-hv chat-audio-left">
												<image v-if="item.is_play_audio == '1'"
													src="/static/image/icon_audio_left.gif" class="chat-audio">
												</image>
												<image v-else src="/static/image/icon_audio_left.png"
													class="chat-audio">
												</image>
											</view>
											<view class=" text-center-hv">
												<view>{{item.duration<=0?1:item.duration>60?60:item.duration}}"
												</view>
											</view>
										</view>
									</view>
								</view>
								<view v-if="item.is_click != '1'" class="text-center-hv pl-sm"
									style="margin: 0 0 0 0rpx;">
									<tui-badge v-if="true" type="danger" :dot="true"></tui-badge>
								</view>
							</view>
							<view v-if="item.type=='3'" :data-index="index" @longtap="onDetailLong"
								class="tui-chatbox tui-chatbox-left tui-chatbox-video" @tap.stop="onPayVideo"
								:data-text="item.text">
								<view class="text-center-hv" :class="[item.img?'':'chat-video-box']">
									<image :src="app.upload + item.img" mode="widthFix" class="chat-video-cover">
									</image>
									<view class="chat-video-play-img-box text-center-hv">
										<image src="../../static/images/chat_video.png" class="chat-video"></image>
									</view>
								</view>
							</view>
							<view v-if="item.type=='6'" :data-index="index" @longtap="onDetailLong"
								class="tui-chatbox tui-chatbox-location tui-chatbox-left tui-chatbox-video"
								@tap.stop="onLocation" :data-text="item.text">
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

				<view class="tui-chat-right" v-if="item.from==me.id  && !(item.is_hidden == true)">
					<view class="cols full-width">
						<view class="text-color-9 text-xs tui-chat-right-time">{{item.credate}}</view>
						<view class="tui-chat-right-padding">
							<text v-if="item.type=='0'" :data-index="index" @longtap="onDetailLong"
								class="tui-chatbox tui-chatbox-right">{{item.text}}</text>
							<view v-if="item.type=='1'" :data-index="index" @longtap="onDetailLong"
								class="tui-chatbox tui-chatbox-right tui-chatbox-video rows relative"
								@tap.stop="previewImage" :data-src='app.upload + item.text'>

								<view v-if="item.per && item.per < 100"
									class="cols text-center-hv pr-sm pl-sm absolute "
									style="left: 0;top: 0;bottom: 0; margin-left: -100rpx;">
									<view>
										<vive-loadmore :visible='true' text=''></vive-loadmore>
									</view>
									<view class="circle-per-text">{{item.per}}%</view>
								</view>

								<view class=" text-center-hv ">

									<image v-if="item.path" :src="item.path" mode="widthFix" class="img-chat">
									</image>
									<image v-else :src="app.upload + item.text" mode="widthFix" class="img-chat">
									</image>
								</view>
							</view>
							<view v-if="item.type=='2'" :data-index="index" @longtap="onDetailLong"
								@tap.stop="onPayAudio" class="rows">

								<!-- <view class="text-center-hv pr-sm" style="margin: 0 0 0 0rpx;">
									<tui-badge v-if="true" type="danger" :dot="true"></tui-badge>
								</view> -->

								<view class="tui-chatbox tui-chatbox-right tui-chatbox-max"
									:class="{'tui-chatbox-play-right': index_play_msg == index && index_play == 1}"
									:data-text="item.text"
									:style="{width: 100 + (item.duration<=0?1:item.duration>60?60:item.duration) * 4 + 'rpx' }">
									<view class="box">
										<view></view>
										<view class="rows ">
											<view class=" text-center-hv ">
												<view>{{item.duration <= 0?1:item.duration>60?60:item.duration}}"
												</view>
											</view>
											<view class=" text-center-hv chat-audio-right">
												<image v-if="item.is_play_audio == '1'"
													src="/static/image/icon_audio_right.gif" class="chat-audio">
												</image>
												<image v-else src="/static/image/icon_audio_right.png"
													class="chat-audio">
												</image>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="item.type=='3'" :data-index="index" @longtap="onDetailLong"
								class="tui-chatbox tui-chatbox-right tui-chatbox-video" @tap.stop="onPayVideo"
								:data-text="item.text">

								<view v-if="item.per && item.per < 100"
									class="cols text-center-hv pr-sm pl-sm absolute "
									style="left: 0;top: 0;bottom: 0; margin-left: -100rpx;">
									<view>
										<vive-loadmore :visible='true' text=''></vive-loadmore>
									</view>
									<view class="circle-per-text">{{item.per}}%</view>
								</view>

								<view class=" text-center-hv" :class="[item.img?'':'chat-video-box']">
									<image :src="app.upload + item.img" mode="widthFix" class="chat-video-cover">
									</image>
									<view class="chat-video-play-img-box text-center-hv">
										<image src="../../static/images/chat_video.png" class="chat-video"></image>
									</view>
								</view>
							</view>
							<view v-if="item.type=='6'" :data-index="index" @longtap="onDetailLong"
								class="tui-chatbox tui-chatbox-location tui-chatbox-right tui-chatbox-video"
								@tap.stop="onLocation" :data-text="item.text">
								<view class="text-inline pt-sm pl-sm ">{{formatLocation(item)}}</view>
								<view class="text-inline text-sm pb-sm pl-sm ">{{formatLocationDetail(item)}}
								</view>
								<view class="chat-location text-center-hv">
									<tui-icon name="gps" :size="40" color='#666'></tui-icon>
								</view>
							</view>
						</view>
					</view>
					<image :src="me.avatar" class="tui-user-pic tui-left" @tap.stop="onAvatar" :data-id='item.creby'
						:data-user_type='me.user_type'>
					</image>
					<view class="pl" v-if="menu_text == '多选'">
						<checkbox-group name="is_check" @change="onCheckChat" :data-index="index">
							<label class="checkbox">
								<checkbox value="1" :checked="item.is_check == '1'" />
							</label>
						</checkbox-group>
					</view>
				</view>

				<!-- <view class="m-item-none" v-show="(item.is_hidden == true)"></view> -->
			</view>
		</view>

		<view v-if="msgMoreType != ''" style="height: 500rpx;"></view>
		<view style="height:150rpx;"></view>
		<view class="tui-safearea-bottom"></view>

		<vive-modal-menu :hidden="selected==null" @click="onMenuInvoke" @close="onMenuClose" :menu="modal_menu">
		</vive-modal-menu>

		<!-- 				<view @tap.stop="onAddLocation" hover-class="tui-opcity" :hover-stay-time="150" class="tui-pr tui-pl"
					v-show="input_text==null || input_text == ''">
					<tui-icon name="gps" :size="30" color='#666'></tui-icon>
				</view>
				<view @tap.stop="onAddImg" hover-class="tui-opcity" :hover-stay-time="150" class="tui-pr "
					v-show="input_text==null || input_text == ''">
					<tui-icon name="pic" :size="30" color='#666'></tui-icon>
				</view>
				<view @tap.stop="onAddVideo" hover-class="tui-opcity" :hover-stay-time="150" class="tui-pr"
					v-show="input_text==null || input_text == ''">
					<tui-icon name="video" :size="30" color='#666'></tui-icon>
				</view> -->

		<view v-if="input_type_h5 == '1'">
<!-- 			<audio :src='recorder.localUrl' v-if='recorder' name='本地录音' controls="true"></audio>
			<view @click='handlerOnCahnger'>
				{{!status?'开始录音':'结束录音'}}
			</view> -->
			<mumu-recorder ref='recorder' @success='handlerSuccess' @error='handlerError'></mumu-recorder>
		</view>

	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"

	import tuiIcon from "@/components/icon/icon"
	import tuiBadge from "@/components/badge/badge"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import viveModalMenu from "@/components/vive-modal-menu/vive-modal-menu"
	import tuiLoading from "@/components/loading/loading"
	import viveLoadmore from "@/components/vive-loadmore/vive-loadmore"

	//h5 录音
	import MumuRecorder from '@/uni_modules/mumu-recorder/components/mumu-recorder/mumu-recorder.vue'

	let recorderManager = uni.getRecorderManager()
	let innerAudioContext = uni.createInnerAudioContext()

	export default {
		components: {
			tuiIcon,
			tuiBadge,
			tuiLoadmore,
			viveModalMenu,
			tuiLoading,
			viveLoadmore,
			MumuRecorder,
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

				msgMoreType: '', //弹出的输入类型
				emoji_type: [],

				ANDROID_RECORD_AUDIO: -1,
				is_top_nomore: false, //上面没有更多


				recorder: null,
				audio_status_h5: 0, //录音
				input_type_h5:0,
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
			
			//会员激活聊天 非好友状态下
			plusAddChat(){
				this.app.post('api/chat_contact/add_float_plus', {
					user_id: this.user_id
				}, json => {
					if (json.code == '0') {  //是好友了
						this.is_friend = '1'
					} else {//这里需要购买了
						this.app.toastNone('请解锁后聊天')
					}
				})
				return
				
				
				//不是朋友则 判断是否PLUS 则加为好友
				this.app.post('api/user/plus', {}, json => {
					if (json.code == '0') {
						let plus = json.data
						if(plus.is_plus == 1){//是会员则 加好友
							//会员添加好友 加不上则 可以购买
							this.app.post('api/chat_contact/add_float_plus', {
								user_id: this.user_id
							}, json => {
								if (json.code == '0') {  //是好友了
									this.is_friend = '1'
								} else {//这里需要购买了
								
									this.app.toast(json.data)
									setTimeout(()=>{
										this.app.toastNone('请解锁后聊天')
									}, 1500)
								
									//这里是直接支付购买
									// this.app.messageSys('会员每日次数已用尽，是否直接购买', ()=> {
									// 	this.payAliUserWx()
									// })
								}
							})
							
						}else{
							this.app.messageSys('升级为VIP才能与用户聊天', () => {
								//this.app.back()
								this.app.go('/pages/plus/plus_coin')
							})
						}
					}
				})
			},
			//支付购买
			payAliUserWx(){
				this.app.post('api/user_plus_see/plus_see_order_cre', {user_id: this.user_id}, json => {
					let {code, data} = json
					if(code == 0){
						// #ifdef H5
						this.app.payAliUrl('api/user_plus_see/plus_see_pay?order_no=' + data.order_no)
						// #endif
						// #ifdef APP
						this.app.payAliApp(data.order_no, success => {
							this.app.toast('支付成功')
							this.reload()
						})
						// #endif
					}else{
						this.app.toastNone(data)
					}
				})
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


			this.app.getOpenid(openid => {
				this.app.post('api/user/is_friend?XDEBUG_SESSION_START=14470', {
					user_id: this.user_id
				}, json => {
					if (json.code == '0') {
						this.is_friend = '1'
					} else {
						this.is_friend = '0'
						this.plusAddChat()  //非好友 判断会员特权
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
						// if (this.you.company_name) {
						// 	title += this.you.company_name + " "
						// }
						// if (this.you.company_server_name) {
						// 	title += this.you.company_server_name + " "
						// }
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
					}, this.app.data.loopTaskTime)

					this.onChatNextBottom()
				})
				
				////////// 接收推送 刷新
				//////// this.app.loopTask(task => {
				//////// 	this.onChatNext()
				//////// })
				
				//推送接收
				this.app.data.eventRefChatSend = task => {
					this.onChatNext()
				}

				//板块
				this.app.post('api/text_emoji/all', {
					user_id: this.user_id
				}, json => {
					this.emoji_type = json
				})


				//#ifdef  APP-PLUS
				// let msg_list = plus.push.getAllMessage()
				// console.log(msg_list)
				// plus.push.clear()
				//#endif

			})
			
			//#ifdef  H5
			this.input_type_h5 = '1'
			this.input_text_title = '点击 录制语音消息'
			//#endif
			

		},
		onShow() {
			//this.app.data.loopTaskEnable = false
			this.app.checkUser()
			this.loadAudio()
		},
		onHide() {
			//this.app.data.loopTaskEnable = true
			//clearInterval(this.app.timeLoop);
			//innerAudioContext.stop()
			/*
			<button @tap.stop="onAllBackCancel">撤销</button>
			<button @tap.stop="onAllDel">删除</button>
			<button @tap.stop="onAllSelect">全选</button>
			<button @tap.stop="onAllCancel">取消</button>
			*/

			innerAudioContext.stop()
			this.stopAudioAni()
		},
		onUnload() {
			this.app.data.loopTaskEnable = true
			clearInterval(this.app.timeLoop);
			innerAudioContext.stop()
			innerAudioContext.destroy();
			innerAudioContext = null
			this.stopAudioAni()
		},
		methods: {
			loadAudio() {
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
					// this.stopAudioAni()
				});
				innerAudioContext.onEnded(() => {
					this.index_play = -1
					console.log('播放结束');
					this.stopAudioAni()
				});
			},
			stopAudioAni() {
				// this.chat_list.forEach(item => {
				// 	item.is_play_audio = '0'
				// })
				for (let i in this.chat_list) {
					this.chat_list[i].is_play_audio = '0'
				}
			},
			onAdd(e) {
				let that = this
				if (!this.loadding) {
					this.loadding = true
					setTimeout(() => {
						that.show = true;
						that.loadding = false
						that.onChatPre()
					}, 100)
				}
			},
			onAvatar(e) {
				let id = this.app.ed(e).id
				let user_type = this.app.ed(e).user_type
				if (user_type == 1) {
					this.app.toast('客服无详情')
				} else {
					this.app.go('/pages/index/detail/detail', {
						user_id: id
					})
				}
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
					this.onMsgMoreClose()
					this.onSendFinish()
					
				})
			},
			scrollToBottom: function() { //滚动到最底部
				let that = this
				that.$nextTick(() => {
					uni.pageScrollTo({
						scrollTop: 999999,
						duration: 0
					});
				});
			},
			scrollToBottomItem: function(new_last_id, actionFinish) { //滚动到最底部
				let that = this
				that.$nextTick(() => {

					let view = uni.createSelectorQuery().select('#chat' + new_last_id);
					view.boundingClientRect(res => {
						console.log('#chat' + new_last_id + '距离顶部' + res
							.top); //获取10条消息的元素距顶部的距离，这就是需要滚动的距离
						uni.pageScrollTo({ //回到下拉之前，多展示一条消息
							scrollTop: res.top,
							duration: 0
						});

						if (actionFinish) {
							actionFinish()
						}
					}).exec();


					// const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度     api为获取系统信息同步接口
					// that.style.pageHeight = res.windowHeight;
					// that.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth /
					// 	750 * (100) //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 
					// //console.log(this.style)
					// let query = uni.createSelectorQuery()
					// query.selectAll('.m-item').boundingClientRect()
					// query.select('#scrollview').boundingClientRect()
					// query.exec(res => {
					// 	that.style.mitemHeight = 0;
					// 	// console.log(res)
					// 	let index = 0
					// 	res[0].forEach((rect) => {
					// 		if (that.chat_list[index].char_page_index == char_page_index) {
					// 			that.style.mitemHeight = that.style.mitemHeight + rect.height
					// 			index++
					// 		}
					// 		// console.log(that.style.mitemHeight)
					// 	}) //获取所有内部子元素的高度                    
					// 	// 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这红字
					// 	that.$nextTick(() => {
					// 		 setTimeout(() => {
					// 				if (that.style.mitemHeight > (that.style.contentViewHeight -100)) { //判断子元素高度是否大于显示高度
					// 					that.scrollTop = that.style.mitemHeight //用子元素的高度减去显示的高度就获益获得序言滚动的高度
					// 				}
					// 				if (actionFinish) {
					// 					actionFinish()
					// 				}		
					// 		}, 0)
					// 	})
					// })
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
				this.stopAudioAni()

				//请求取消消息红点
				if (item.is_click != 1) {
					item.is_click = 1

					this.app.post('api/chat/chat_click', {
						chat_id: item.id,
					}, json => {

					})
				}

				if (this.index_play == -1 || index != this.index_play_msg) { //true 表示暂停或停止
					innerAudioContext.stop()
					let url = this.app.upload + item.text
					// innerAudioContext.autoplay = true
					innerAudioContext.src = url
					innerAudioContext.play()

					item.is_play_audio = '1'
				} else {
					innerAudioContext.stop()

				}
				this.index_play_msg = index
			},
			onAndroidPermiss: function() {
				//#ifdef  APP-PLUS
				let that = this
				plus.android.requestPermissions(
					['android.permission.RECORD_AUDIO'], // 理论上支持多个权限同时查询，但实际上本函数封装只处理了一个权限的情况。有需要的可自行扩展封装
					function(resultObj) {
						var result = '0';
						for (var i = 0; i < resultObj.granted.length; i++) {
							var grantedPermission = resultObj.granted[i];
							console.log('已获取的权限：' + grantedPermission);
							result = '1'
						}
						for (var i = 0; i < resultObj.deniedPresent.length; i++) {
							var deniedPresentPermission = resultObj.deniedPresent[i];
							console.log('拒绝本次申请的权限：' + deniedPresentPermission);
							result = '0'
						}
						for (var i = 0; i < resultObj.deniedAlways.length; i++) {
							var deniedAlwaysPermission = resultObj.deniedAlways[i];
							console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
							result = '-1'
						}
						// 若所需权限被拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限
						that.ANDROID_RECORD_AUDIO = result
					},
					function(error) {
						console.log('申请权限错误：' + error.code + " = " + error.message);
					}
				);
				//#endif
			},
			onAudioStart(e) { //按下录制

				innerAudioContext.stop()
				this.stopAudioAni()

				let actionStart = () => {
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
				}

				if (this.app.isAndroid()) {
					if (this.ANDROID_RECORD_AUDIO == '1') {
						actionStart()
					} else {
						this.onAndroidPermiss()
					}
				} else {
					actionStart()
				}


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
							//测试播放
							// let ac = uni.createInnerAudioContext()
							// ac.src = this.voicePath;
							// let duration = ac.duration
							// ac.play()
							//测试播放时间
							// if (ac.duration < 1) {
							// 	this.app.toast('录制时间过短')
							// 	return
							// }
							// console.log('录制的时间=>：' + duration);

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
									this.onSendFinish()
									
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
								chat_no: this.app.uuidStr(),
							}
						})
					}
					uni.showToast({
						title: "上传中…",
						icon: "loading",
						duration: 99999
					})
					ufs.forEach(f => {
						let file = f
						let chat = {
							// id: file.data.chat_no,
							title: '',
							text: file.path,
							path: file.path,
							from: this.me.id,
							to: this.you.id,
							type: file.data.type,
							chat_no: file.data.chat_no,
							per: 0,
						}
						this.chat_list.push(chat)
						this.onChatNextBottom()

						this.app.uploadFileTask('api/chat/chat_send', file, task => {
							console.log(task)
							chat.per = task.per
						}, () => {

							//this.reLoad()
							this.onChatNextBottom()
							this.app.toastHide()
							this.onMsgMoreClose()
							this.onSendFinish()
							
						})
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
							chat_no: this.app.uuidStr(),
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

					let chat = {
						// id: file.data.chat_no,
						title: '',
						text: videoUp.path,
						path: videoUp.path,
						from: this.me.id,
						to: this.you.id,
						type: videoUp.data.type,
						chat_no: videoUp.data.chat_no,
						per: 0,
					}
					this.chat_list.push(chat)
					this.onChatNextBottom()

					this.app.uploadFileTask('api/chat/chat_send?XDEBUG_SESSION_START=17577', videoUp, task => {
						console.log(task)
						chat.per = task.per
					}, () => {
						//this.reLoad()
						this.onChatNextBottom()
						this.app.toastHide()
						this.onMsgMoreClose()
						this.onSendFinish()
					})
				})
			},
			onInputTypeVoice(e) { //输入语音
				this.input_type = '2'
				this.onAndroidPermiss()
			},
			onInputTypeText(e) { //输入文字
				this.input_type = '0'
			},
			onChatPre() { //加载聊天历史
				let that = this

				let param = {
					user_id: this.user_id,
				}
				if (this.chat_list && this.chat_list.length > 0) {
					param.first_id = this.chat_list[0].id
				} else { //如果没有消息直接退出
					return
				}
				this.loadding = true

				that.app.toastLoading()
				this.app.post('api/chat/chat_user_pre', {
					...param
				}, json => {
					if (json.chat_list.length <= 0) {
						that.app.toastHide()
						this.show = true;
						this.loadding = false
						this.is_top_nomore = true
						return
					}
					let newLast = null
					that.char_page_index--
					let listSore = []
					for (let i in json.chat_list) {
						let item = json.chat_list[i]
						item.char_page_index = that.char_page_index
						// item.is_hidden = true
						listSore[item.id] = item
					}
					for (let i in that.chat_list) {
						let item = that.chat_list[i]
						listSore[item.id] = item
						if (!newLast) {
							newLast = item
						}
					}
					let list = []
					for (let i in listSore) {
						list.push(listSore[i])
					}
					that.chat_list = list

					// for (let i in listSore) {
					// 	let item = listSore[i]
					// 	that.chat_list.unshift(item)
					// }

					that.scrollToBottomItem(newLast.id, () => {
						that.app.toastHide()
						for (let i in that.chat_list) {
							that.chat_list[i].is_hidden = false
						}
					})

					this.show = true;
					this.loadding = false
				})
			},
			onChatNext(action = null) { //下载下面
				let that = this
				let param = {
					user_id: this.user_id,
				}

				for (let i = this.chat_list.length - 1; i >= 0; i--) {
					let item = this.chat_list[i]
					if (item.id) {
						param.last_id = item.id
						break
					}
				}
				// if (this.chat_list && this.chat_list.length > 0) {
				// 	param.last_id = this.chat_list[this.chat_list.length - 1].id
				// }
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


					// let listSore = [] //这个是键值对
					// //旧的加入进去
					// for (let i in this.chat_list) {
					// 	let item = this.chat_list[i]
					// 	listSore[item.id] = item
					// }
					// //新的加入
					// for (let i in json.chat_list) {
					// 	let item = json.chat_list[i]
					// 	listSore[item.id] = item
					// }
					// //整理为数组
					// let list = []  //整理为数据
					// for (let i in listSore) {
					// 	list.push(listSore[i])
					// }
					// this.chat_list = list


					let listSore = [] //这个是键值对
					let listSoreNo = [] //这个是键值对
					//旧的加入进去
					for (let i in this.chat_list) {
						let item = this.chat_list[i]
						if (item.id) {
							listSore[item.id] = item
						}
						if (item.chat_no) {
							listSoreNo[item.chat_no] = item
						}
					}

					//新的加入
					for (let i in json.chat_list) {
						let item = json.chat_list[i]
						if (!listSore[item.id]) {
							if (item.chat_no) {
								let itemNo = listSoreNo[item.chat_no]
								if (itemNo) {
									for (let ii in item) {
										itemNo[ii] = item[ii]
									}
								} else {
									this.chat_list.push(item)
								}
							} else {
								this.chat_list.push(item)
							}
						}
					}


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
						this.onMsgMoreClose()
						this.onSendFinish()
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
				/* this.app.toast('新消息')
				uni.vibrate({
				    success: function () {
				        console.log('success');
				    }
				});

				vadd hide
				let innerAudioContext = uni.createInnerAudioContext()
				innerAudioContext.autoplay = true
				innerAudioContext.src = '/static/audio/ios_msg.wav'
				innerAudioContext.play() */
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
						this.app.post('api/chat/chat_back_all?XDEBUG_SESSION_START=14436', {
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
				this.$forceUpdate();
				
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
				that.onChatNext(() => {
					setTimeout(() => {
						that.scrollToBottom()
					}, 300)
				})
			},
			onMsgMoreClose(e) { //点击更多消息方式
				this.msgMoreType = ''
			},
			onMsgMoreMores(e) { //点击更多消息方式
				let that = this
				if (this.msgMoreType != 'more') {
					this.msgMoreType = 'more'
					that.scrollToBottom()
				} else {
					this.msgMoreType = ''
				}
			},
			onMsgMoreEmoji(e) { //点击更多消息方式
				let that = this
				if (this.msgMoreType != 'emoji') {
					this.msgMoreType = 'emoji'
					that.scrollToBottom()
				} else {
					this.msgMoreType = ''
				}
			},
			onEmojiType(e) {
				let index = this.app.ed(e).index
				for (let i in this.emoji_type) {
					this.emoji_type[i].check = '0'
				}
				this.emoji_type[index].check = '1'
			},
			onTextEmoji(e) {
				let index = this.app.ed(e).index
				let type_index = this.app.ed(e).type_index
				this.input_type = '0'
				let emoji = this.emoji_type[type_index].emoji_list[index].emoji
				this.input_text += emoji


			},


			onAudioCancelH5(e){
				this.audio_status_h5 = 2
				this.input_text_voice_type = 0
				this.input_text_title = '点击 录制语音消息'
				if (this.audio_time_loop) {
					clearInterval(this.audio_time_loop)
				}
				try{
					this.$refs.recorder.stop()
				}catch(e){
					
				}
			},
			handlerSave() { //测试保存
				let tag = document.createElement('a')
				tag.href = this.recorder.localUrl
				tag.download = '录音'
				tag.click()
			},
			handlerOnCahnger() {  //录音播放暂停
			 if (this.audio_status_h5 == 1) {
					// this.audio_status_h5 = 0
					this.input_text_voice_type = 0
					this.input_text_title = '点击 录制语音消息'
					if (this.audio_time_loop) {
						clearInterval(this.audio_time_loop)
					}
					try{
						this.$refs.recorder.stop()
					}catch(e){
						
					}
				} else{
					this.audio_status_h5 = 1
					
					innerAudioContext.stop()  //结束播放
					this.stopAudioAni()
					
					this.$refs.recorder.start()
					this.input_text_voice_type = 1
					this.input_text_title = '点击 发送语音消'
					
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
				}
			},
			handlerSuccess(res) {  //录音完成并上传
				let that = this
				if(this.audio_status_h5 == 2){
					this.audio_status_h5 = 0
					return
				}
				
				console.log(res)
				this.recorder = res
				if(res.duration < 0.5){
					that.app.toastNone('录制时间过短')
					return 
				}
				
				setTimeout(()=> {
					that.app.uploadFileH5('api/chat/chat_send', {
						name: 'file',
						path: res.data,
						data: {
							type: '2',
							type_media: '2',
							user_id: that.user_id,
							duration: res.duration,
						},
					}, json => {
						if (json.code == '0') {
							//this.reLoad()
							that.onChatNextBottom()
							that.onSendFinish()
						} else {
							that.app.toast(json.data)
						}
						
					}, fail=> {},
					com => {
						this.audio_status_h5 = 0
					})
					
					
				}, 100)
				
			},
			handlerError(code) {
				switch (code) {
					case '101':
						uni.showModal({
							content: '当前浏览器版本较低，请更换浏览器使用，推荐在微信中打开。'
						})
						break;
					case '201':
						uni.showModal({
							content: '麦克风权限被拒绝，请刷新页面后授权麦克风权限。'
						})
						break
					default:
						uni.showModal({
							content: '未知错误，请刷新页面重试'
						})
						break
				}
			},
			//消息以发送完成
			onSendFinish(){
				// this.app.data.webSocket.send({
				// 	type: 'chat',
				// 	from_id: this.me.openid,
				// 	to_id: this.you.openid,
				// 	data: '发送了消息',
				// })
			},

		},
		onPageScroll(e) {
			let that = this
			if (e.scrollTop == 0 && !this.loadding) {
				// this.loadding = true
				setTimeout(() => {
					// that.show = true;
					// that.loadding = false
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

	.chat-content {
		/* 		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 30rpx;
		background-color: #FFFFFF; */
		margin: 0 20rpx;
	}

	.m-item {
		position: relative;
		/* position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		margin: 30rpx 0; */
	}

	.m-item-none {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100%;
		background: #ebedf6;

	}

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
		/* max-width: 66%; */
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

	.tui-chatbox-max {
		max-width: 100%;
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
		position: relative;
		border-radius: 5rpx;
		background-color: #333;
		width: 250rpx;
		height: 200rpx;
	}

	.chat-video {
		background-color: #3333333ee;
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


	/* 底部消息栏 */
	.bottom-msg-options {
		background: #f6f6f6;
	}

	/* 消息里面的更多  按钮 */
	.msg-more-item {
		height: 180rpx;
		width: 25%;
	}

	.bottom-msg-input {
		padding: 20rpx 0;
	}

	.msg-more-type-box {
		border-top: 1rpx solid #E0E0E0;
		height: 500rpx;
	}

	.msg-more-type-more {
		padding: 40rpx 0 80rpx 0;
	}

	.msg-more-type-emoji {
		padding: 10rpx;
	}

	/* 表情 */
	.msg-more-emoji {
		height: auto;
		width: 12.5%;
		font-size: 70rpx;
	}

	.msg-more-emoji-type {
		height: auto;
		padding: 10rpx;
		font-size: 50rpx;
	}

	.msg-more-type-emoji-box {
		height: 100%;
		min-height: 100%;
		max-height: 100%;
		background-color: #e0e0e0;
	}

	.msg-more-emoji-action {
		border-radius: 10rpx;
		background-color: #b0b0b0;
	}

	.uni-scroll-view::-webkit-scrollbar {
		display: none
	}

	.text-top-nomore {
		font-size: 22rpx;
		color: #b0b0b0;
	}

	.chat-video-cover {
		/* 	overflow: hidden;
		max-width: 250rpx;
		max-height: 200rpx; */

		width: 250rpx;
		/* height: 200rpx; */
		border-radius: 5rpx;
		overflow: hidden;
	}

	.chat-video-play-img-box {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.btn-send-speek {
		background: #07C060;
		color: #FFFFFF;
	}

	.btn-send-speek-item {
		padding: 2rpx 10rpx;
	}
</style>
