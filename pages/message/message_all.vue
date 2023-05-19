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
<!--        <view class="tui-operation tui-chat-operation" style="margin-bottom: 100rpx;">
            <view class='tui-right-flex rows tui-input-box '>
                <view hover-class="tui-opcity" :hover-stay-time="150" class="tui-voice tui-pl tui-pr" @tap="onInputTypeVoice"
                    v-if="input_type == '0'">
                    <tui-icon name="news" :size="34" color='#666'></tui-icon>
                </view>
                <view hover-class="tui-opcity" :hover-stay-time="150" class="tui-voice tui-pl tui-pr" @tap="onInputTypeText"
                    v-if="input_type == '2'">
                    <tui-icon name="edit" :size="34" color='#666'></tui-icon>
                </view>

                <input v-if="input_type == '0'" class="tui-chat-input " @input="onInputText" :value="input_text"></input>

                <view v-if="input_type == '2'" class="tui-chat-input text-center-hv" :class="[]" @touchstart="onPreAddAudio"
                    @touchend="onAddAudio" @touchmove="onMoveAddAudio">
                    {{input_text_title}}
                </view>

                <view @tap="onAddLocation" hover-class="tui-opcity" :hover-stay-time="150" class="tui-pr tui-pl" v-show="input_text==null || input_text == ''">
                    <tui-icon name="gps" :size="30" color='#666'></tui-icon>
                </view>

                <view @tap="onAddImg" hover-class="tui-opcity" :hover-stay-time="150" class="tui-pr " v-show="input_text==null || input_text == ''">
                    <tui-icon name="pic" :size="30" color='#666'></tui-icon>
                </view>
                <view @tap="onAddVideo" hover-class="tui-opcity" :hover-stay-time="150" class="tui-pr" v-show="input_text==null || input_text == ''">
                    <tui-icon name="video" :size="30" color='#666'></tui-icon>
                </view>

                <view hover-class="tui-opcity" :hover-stay-time="150" class="tui-pl tui-pr" @tap.stop="send" v-show="input_text!=null && input_text != ''">
                    <tui-icon name="send" :size="30" color='#666'></tui-icon>
                </view>

            </view>
        </view> -->

        <!--tabbar-->
        <view class="tui-chat-content">
            <tui-loadmore :visible="loadding" :index="3" type="primary" text=" "></tui-loadmore>

            <view class="content" id="content" :style="{height: style.contentViewHeight + 'px'}">
                <scroll-view :scroll-top="scrollTop" id="scrollview" :style="{height: style.contentViewHeight + 'px'}"
                    scroll-y="true" enable-back-to-top='true' @scrolltoupper="onChatPre">
                    <view v-for="(item,index) in chat_list" :key="index" class="m-item">

                        <view class="tui-chat-left" v-if="item.from==item.creby">
                            <image :src="item.avatar" class="tui-user-pic tui-right" @tap="onAvatar" :data-id='item.creby'></image>
                            <view v-if="item.type=='0'" class="tui-chatbox tui-chatbox-left">{{item.text}}</view>
                            <view v-if="item.type=='1'" class="tui-chatbox tui-chatbox-left tui-chatbox-video" @tap="previewImage"
                                :data-src='app.upload + item.text'>
                                <view class=" text-center-hv ">
                                    <image :src="app.upload + item.text" mode="widthFix" class="img-chat"></image>
                                </view>
                            </view>
                            <view v-if="item.type=='2'" class="tui-chatbox tui-chatbox-left  " @tap="onPayAudio"
                                :data-index="index" :class="{'tui-chatbox-play-left': index_play_msg == index && index_play == 1}"
                                :data-text="item.text" :style="{width: 100 + (item.duration<=0?1:item.duration>60?60:item.duration) * 4 + 'rpx' }">
                                <!-- <tui-icon name="news" :size="30" color='#666'></tui-icon> -->
                                <view class="box">
                                    <view class="rows">
                                        <view class=" text-center-hv chat-audio-left">
                                            <image src="../../static/image/icon_audio_left.png" class="chat-audio"></image>
                                        </view>
                                        <view class=" text-center-hv">
                                            <view>{{item.duration<=0?1:item.duration>60?60:item.duration}}"</view>
                                        </view>
                                    </view>
                                    <view></view>
                                </view>
                            </view>
                            <view v-if="item.type=='3'" class="tui-chatbox tui-chatbox-left tui-chatbox-video" @tap="onPayVideo"
                                :data-text="item.text">
                                <!-- <video :src="app.upload + item.text" class="chat-video" ></video> -->
                                <view class="chat-video-box text-center-hv">
                                    <image src="../../static/images/chat_video.png" class="chat-video"></image>
                                </view>
                            </view>

                            <view v-if="item.type=='6'" class="tui-chatbox tui-chatbox-location tui-chatbox-left tui-chatbox-video"
                                @tap="onLocation" :data-text="item.text">
                                <view class="text-inline pt-sm pl-sm ">{{formatLocation(item)}}</view>
                                <view class="text-inline text-sm pb-sm pl-sm ">{{formatLocationDetail(item)}}</view>
                                <view class="chat-location text-center-hv">
                                    <tui-icon name="gps" :size="40" color='#666'></tui-icon>
                                </view>
                            </view>

                        </view>

                        <view class="tui-chat-right" v-if="item.from==me.id">
                            <view v-if="item.type=='0'" class="tui-chatbox tui-chatbox-right">{{item.text}}</view>
                            <view v-if="item.type=='1'" class="tui-chatbox tui-chatbox-right tui-chatbox-video" @tap="previewImage"
                                :data-src='app.upload + item.text'>
                                <view class=" text-center-hv ">
                                    <image :src="app.upload + item.text" mode="widthFix" class="img-chat"></image>
                                </view>
                            </view>
                            <view v-if="item.type=='2'" class="tui-chatbox tui-chatbox-right" @tap="onPayAudio"
                                :data-index="index" :class="{'tui-chatbox-play-right': index_play_msg == index && index_play == 1}"
                                :data-text="item.text" :style="{width: 100 + (item.duration<=0?1:item.duration>60?60:item.duration) * 4 + 'rpx' }">
                                <!-- <tui-icon name="news" :size="30" color='#666'></tui-icon> -->
                                <view class="box">
                                    <view></view>
                                    <view class="rows">
                                        <view class=" text-center-hv ">
                                            <view>{{item.duration<=0?1:item.duration>60?60:item.duration}}"</view>
                                        </view>
                                        <view class=" text-center-hv chat-audio-right">
                                            <image src="../../static/image/icon_audio_right.png" class="chat-audio"></image>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view v-if="item.type=='3'" class="tui-chatbox tui-chatbox-right tui-chatbox-video" @tap="onPayVideo"
                                :data-text="item.text">
                                <!-- <video :src="app.upload + item.text" class="chat-video" ></video> -->
                                <view class="chat-video-box text-center-hv">
                                    <image src="../../static/images/chat_video.png" class="chat-video"></image>
                                </view>
                            </view>

                            <view v-if="item.type=='6'" class="tui-chatbox tui-chatbox-location tui-chatbox-right tui-chatbox-video"
                                @tap="onLocation" :data-text="item.text">
                                <view class="text-inline pt-sm pl-sm ">{{formatLocation(item)}}</view>
                                <view class="text-inline text-sm pb-sm pl-sm ">{{formatLocationDetail(item)}}</view>
                                <view class="chat-location text-center-hv">
                                    <tui-icon name="gps" :size="40" color='#666'></tui-icon>
                                </view>
                            </view>

                            <image :src="me.avatar" class="tui-user-pic tui-left" @tap="onAvatar" :data-id='item.creby'></image>
                        </view>
                    </view>
                    <!-- <view style="height: 50rpx;" class="m-item"></view> -->
                    <!-- <view>
                        <button @tap="startRecord">开始录音</button>
                        <button @tap="endRecord">停止录音</button>
                        <button @tap="playVoice">播放录音</button>
                        <button @tap="onUploadVoice">上传录音</button>
                    </view> -->
                </scroll-view>
            </view>
        </view>
        <!-- <view class="tui-safearea-bottom"></view> -->
		
        

    </view>
</template>

<script>
    import tuiIcon from "@/components/icon/icon"
    import tuiBadge from "@/components/badge/badge"
    import tuiLoadmore from "@/components/loadmore/loadmore"

    const recorderManager = uni.getRecorderManager();
    const innerAudioContext = uni.createInnerAudioContext()


    export default {
        components: {
            tuiIcon,
            tuiBadge,
            tuiLoadmore
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
            }
        },
        computed: {
            // 控制显示的内容
            formatLocation: function() {
                return function(item){
                    let text = this.app.toObject(item.text)
                    if(text){
                        if(text.name){
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
                return function(item){
                    let text = this.app.toObject(item.text)                    
                    if(text){
                        if(text.address){
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
            // this.user_id = options.user_id

            //板块
            this.app.post('api/chat/chat_user_info', {
                user_id: this.user_id
            }, json => {
                this.me = json.me
                this.you = json.you
                this.app.setTitle(this.you.nickname)
            })

            this.reLoad()
            if (this.app.timeLoop != null) {
                clearInterval(this.app.timeLoop);
            }
            this.app.timeLoop = setInterval(() => {
                this.reLoad()
            }, 3000)

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
            clearInterval(this.app.timeLoop);
        },
        onUnload() {
            clearInterval(this.app.timeLoop);
        },
        methods: {
			onAvatar(e){
				let id = this.app.ed(e).id
				this.app.go('/pages/index/detail/detail',{user_id: id})
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
                this.app.post('api/chat/chat_send', {
                    user_id: this.user_id,
                    text: this.input_text
                }, json => {
                    this.input_text = ''
                    this.reLoad()
                })
            },
            scrollToBottom: function() { //滚动到最底部

                const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度     api为获取系统信息同步接口
                this.style.pageHeight = res.windowHeight;
                this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100)  //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 
                //console.log(this.style)

                let that = this
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
                    setTimeout(() => {
                        if (that.style.mitemHeight > (that.style.contentViewHeight - 100)) { //判断子元素高度是否大于显示高度
                            that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight //用子元素的高度减去显示的高度就获益获得序言滚动的高度
                        }
                    }, 100)
                })
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
            onPreAddAudio(e) { //按下录制
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
            onMoveAddAudio(e) { //按下时 是否 完成 或取消
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
            onAddAudio(e) { //按钮抬起 是否添加还是取消
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
                    setTimeout(() => {
                        let ac = uni.createInnerAudioContext()
                        ac.src = this.voicePath;
                        setTimeout(() => {
                            let ac = uni.createInnerAudioContext()
                            ac.src = this.voicePath;
                            let duration = ac.duration
                            if (ac.duration < 1) {
                                this.app.toast('录制时间过短')
                                return
                            }

                            this.app.uploadFile('api/chat/chat_send', {
                                name: 'file',
                                path: this.voicePath,
                                data: {
                                    type: '2',
                                    user_id: this.user_id,
                                    duration: duration,
                                },
                            }, json => {
                                this.reLoad()
                            })
                        }, 200)
                    }, 200)
                }

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
                    this.app.uploadFiles('api/chat/chat_send', ufs, () => {
                        this.reLoad()
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
                    if (duration > 60) {
                        this.app.toast('视频超过60s')
                        return
                    }
                    this.app.uploadFile('api/chat/chat_send', videoUp, () => {
                        this.reLoad()
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
                this.loadding = true

                let param = {
                    user_id: this.user_id,
                }
                if (this.chat_list && this.chat_list.length > 0) {
                    param.first_id = this.chat_list[0].id
                }
                this.app.post('api/chat/chat_user_pre_all', {
                    ...param
                }, json => {
                    let list = []
                    for (let i in json.chat_list) {
                        list.push(json.chat_list[i])
                    }
                    for (let i in this.chat_list) {
                        list.push(this.chat_list[i])
                    }
                    this.chat_list = list

                    this.show = true;
                    this.loadding = false
                })
            },
            onChatNext() { //下载下面
                let param = {
                    user_id: this.user_id,
                }
                if (this.chat_list && this.chat_list.length > 0) {
                    param.last_id = this.chat_list[this.chat_list.length - 1].id
                }
                this.app.post('api/chat/chat_user_next_all', {
                    ...param
                }, json => {
                    let list = []
                    for (let i in this.chat_list) {
                        list.push(this.chat_list[i])
                    }
                    for (let i in json.chat_list) {
                        list.push(json.chat_list[i])
                    }
                    this.chat_list = list

                    setTimeout(() => {
                        this.scrollToBottom()
                    }, 100)

                })
            },
            onPayVideo(e) { //点击播放视频
                let url = this.app.upload + this.app.ed(e).text
                this.app.go('/pages/message/video', {
                    url: url
                })
            },
            onAddLocation(e) { //获取地址
                this.app.getLocation(json => {
                    this.app.post('api/chat/chat_send', {
                        type: '6',
                        user_id: this.user_id,
                        text: this.app.toJson(json)
                    }, json => {
                        this.reLoad()
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
            onLocation: function(e){
                let text = this.app.ed(e).text
                // console.log(text)
                let location = this.app.toObject(text)
                
                const latitude = location.latitude;
                const longitude = location.longitude;
                if(latitude &&  longitude && latitude > 0 && longitude > 0){
                    uni.openLocation({
                        latitude: location.latitude,
                        longitude: location.longitude,
                        name: location.name,
                        address: location.address,
                        success: function () {
                            console.log('success map');
                        }
                    });
                }else{
                    this.app.toast('位置错误')
                }
            },
        },
        onPageScroll(e) {
            if (e.scrollTop == 0 && !this.loadding) {
                this.loadding = true
                setTimeout(() => {
                    this.show = true;
                    this.loadding = false
                    this.onChatPre()
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
        padding-top: 36upx;
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
