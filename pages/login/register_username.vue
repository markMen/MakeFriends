<template>
    <view class="pp">
        <view class="">
            <div class="cols">

                <view class="rows pt-lg">
                    <view class="text-df text-color-3 form-text-left">用户名: </view>
                    <input data-key="username" :value="model.username" @input="onInput" placeholder-class=" text-color-9" 
					class="text-df pl" placeholder="请输入用户名" maxlength="64"></input>
                </view>

<!--                <view class="rows pt-lg">
                    <view class="text-df text-color-3 form-text-left ">验证码: </view>
                    <view class="full-width box ">
                        <input data-key="code" @input="onInput" placeholder-class=" text-color-9" class="text-df pl input-text-code"
                            placeholder="请输入验证码"></input>
                        <tui-button size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</tui-button>

                    </view>

                </view> -->


                <view class="rows pt-lg">
                    <view class="text-df text-color-3 form-text-left">填写密码: </view>
                    <input password="true" data-key="password" @input="onInput" placeholder-class=" text-color-9" class="text-df pl"
                        placeholder="请输入密码" maxlength="64"></input>
                </view>

                <view class="rows pt-lg">
                    <view class="text-df text-color-3 form-text-left">确认密码: </view>
                    <input password="true" data-key="again_password" @input="onInput" placeholder-class=" text-color-9"
                        class="text-df pl" placeholder="确认密码" maxlength="64"></input>
                </view>
				
				<view class="rows pt-lg" v-if="config.is_pid_not_null == '1'">
				    <view class="text-df text-color-3 form-text-left">推广码: </view>
				    <input data-key="pid_code" :value="model.pid_code" @input="onInput" placeholder-class=" text-color-9" 
					class="text-df pl" placeholder="请输入推广码" maxlength="64"></input>
				</view>
				
				


                <view class="rows pt-lg">
                    <view class="text-df text-color-3 form-text-left"></view>
                    <view class="rows text-sm">
                        <checkbox-group @change="checkboChangeInterface">
                            <label class="checkbox">
                                <checkbox value="1" /><text>同意 </text>
                            </label>
                        </checkbox-group>
						<text class="tui-protocol-red" @tap="protocol">《用户协议》</text>
						<text class="tui-protocol-red" @tap="privacy_policy">《隐私政策》</text>
						<!-- <text @tap="onMianze" class="tui-protocol-red">《免责声明与条约》</text> -->
                    </view>
                </view>

                <view class="rows pt-lg">

                </view>



                <!--                <view class="pt-lg">
                    <radio-group @change="radioChange" class="box-wrap-space-around">
                        <label class="uni-list-cell uni-list-cell-pd rows">
                            <view>
                                <radio value="1" checked="false" />
                            </view>
                            <view>同意</view>
                        </label>
                        <label class="uni-list-cell uni-list-cell-pd rows">
                            <view>
                                <radio value="2" checked="false" />
                            </view>
                            <view>不同意</view>
                        </label>
                    </radio-group>
                </view> -->


                <!-- <view class="rows pt-lg">
					<view class="text-df text-color-3">使用年限: </view>
					<radio-group class="radio-group pl" @change="onType">
						<label class="tui-radio">
							<radio value="1" color="#5677fc" />一年
						</label>
						<label class="tui-radio">
							<radio value="3" color="#5677fc" />三年
						</label>
						<label class="tui-radio">
							<radio value="5" color="#5677fc" />五年
						</label>
					</radio-group>
				</view>
 -->
                <view class="rows pt-lg">
                    <button class="btn-main btn-block" @tap="onRefister">注册</button>
                </view>
            </div>
        </view>


    </view>
</template>

<script>
    const util = require('../../utils/util.js')

    import tuiIcon from "@/components/icon/icon"
    import tuiButton from "@/components/button/button"
    export default {
        components: {
            tuiIcon,
            tuiButton
        },
        data() {
            return {
                model: {
                    // username: '',
                    company_name: '',
                    company_id: '',
                    company_legal: '',
					
					username: '',
                    phone: '',
                    code: '',
                    password: '',
                    again_password: '',
                    type: '',
                    interface: '0',
					pid_code: '',
                },
                company_img: ['/static/image/icon_company.png'],
                company_def: '/static/image/icon_company.png',

                disabled: false,
                btnText: "获取验证码",
                mobile: "",
                type: "main",
				
				config:{},
				

            }
        },
        methods: {
            onInput(e) {
                this.model[this.app.ed(e).key] = this.app.ev(e)
            },
            onType(e) {
                this.model['type'] = this.app.ev(e)
                this.model['price'] = this.model['type'] * 598
            },
            onRefister() {
                if(this.app.isEmpty(this.model.username)){
                    this.app.toast('请输入用户名')
                    return
                }
				if(this.model.username.length < 4){
				    this.app.toast('用户名过短')
				    return
				}

                    
    //             if (this.app.isEmpty(this.model.company_name)) {
    //                 this.app.toast('请输入公司名称')
    //                 return
    //             }
                
    //             if (this.app.isEmpty(this.model.company_id)) {
    //                 this.app.toast('请输入统一社会信用代码')
    //                 return
    //             }
    //             if (this.app.isEmpty(this.model.company_legal)) {
    //                 this.app.toast('请输入法人代表')
    //                 return
    //             }
    //             if (this.company_img[0] == this.company_def) {
    //                 this.app.toast('请选择营业执照')
    //                 return
    //             }             
				
				// if (this.app.isEmpty(this.model.company_img_base)) {
				//     this.app.toast('请选上传营业执照')
				//     return
				// }    
				
    //             if (this.app.isEmpty(this.model.type)) {
    //                 this.app.toast('请选择生产方或销售方')
    //                 return
    //             }


                // if (this.app.isEmpty(this.model.phone)) {
                //     this.app.toast('请输入手机号')
                //     return
                // }

                // if (!util.isMobile(this.model.phone)) {
                //     this.app.toast('请输入正确的手机号码');
                //     return
                // }
				
				

                // if (this.app.isEmpty(this.model.code)) {
                //     this.app.toast('请输入验证码')
                //     return
                // }


                if (this.app.isEmpty(this.model.password)) {
                    this.app.toast('请输入密码')
                    return
                }
                if (this.model.password != this.model.again_password) {
                    this.app.toast('两次输入密码不一致')
                    return
                }
				
				
				
                
                if (this.model.interface != '1') {
                    this.app.toast('请同意协议')
                    return
                }

/*                this.app.uploadFilesHtml('api/login/upload', this.company_img, uploadFiles => { //上传完成后
                    //this.app.msg('', this.app.toJson(this.model))
                    this.app.postHtml('api/login/register_phone', {
                        ...this.model,
                        company_img: uploadFiles[0].saveName,
                    }, json => {
                        if (json.code == '0') {
                            this.app.goc('/pages/login/register_finish')
                        } else {
                            this.app.msgSys(json.data)
                        }
                    })
                }) */
                
				if(this.model.id){
					this.app.postHtml('api/login/register_phone_eidt', {
					    ...this.model,
					}, json => {
					    if (json.code == '0') {
					        this.app.goc('/pages/login/register_finish')
					    } else {
					        this.app.msgSys(json.data)
					    }
					})
				}else{
					
					if (this.config.is_pid_not_null == '1') {
					   if (!this.model.pid_code) {
					       this.app.toast('请输入推广码')
					       return
					   }
					}
					
					this.app.postHtml('api/login/register', {
					    ...this.model,
					}, json => {
					    if (json.code == '0') {
					        this.app.goc('/pages/login/register_finish')
					    } else {
					        this.app.msgSys(json.data)
					    }
					})
				}
                
                

            },
            onAddImg() {
                this.app.chooseImage(fs => {
                    this.company_img = fs
                    
                    this.app.uploadFilesHtml('api/login/upload_file_company', this.company_img, jsons => { //上传完成后
                        let json = jsons[0]
                        this.model.company_img = json.file.saveName          
                        this.model.company_img_base = json.file.saveNameBase          
                        this.model.company_json = this.app.toJson(json.company)
                         
						if(json.company.company_name != '无'){
							this.model.company_name = json.company.company_name
						}
						if(json.company.company_id != '无'){
							this.model.company_id = json.company.company_id                        
						}
						if(json.company.company_legal != '无'){
							this.model.company_legal = json.company.company_legal                        
						}
                    })
                    
                }, 1)
            },
            previewImage(e) {
                this.app.previewImage(e)
            },
            doLoop: function(seconds) {
                //let code = this.getRandom(6);
                //this.tui.toast('您本次的验证码是：' + code, 5000);
                seconds = seconds ? seconds : 60;
                this.btnText = seconds + "s后获取";
                // this.code = code
                let countdown = setInterval(() => {
                    if (seconds > 0) {
                        this.btnText = seconds + "s后获取"
                            --seconds;
                    } else {
                        this.btnText = "获取验证码";
                        this.disabled = false;
                        this.type = "primary";
                        clearInterval(countdown);
                    }
                }, 1000);
            },
            btnSend: function() {
                if (util.isNullOrEmpty(this.model.phone)) {
                    this.app.toast('请输入手机号码');
                    return
                } else if (!util.isMobile(this.model.phone)) {
                    this.app.toast('请输入正确的手机号码');
                    return
                }
                this.disabled = true;
                this.btnText = "请稍候...";
                this.type = "gray"


                this.app.postHtml('api/login/login_send_code', {
                    phone: this.model.phone
                }, json => {
                    if (json.code == '0') {
                        this.code = json.data.code
                        //this.app.toast(this.code + '')

                        this.doLoop(60)

                    } else {
                        this.app.toast(json.data)
                    }
                })
            },
            radioChangeType(e) {
                this.model['type'] = this.app.ev(e)
            },
            checkboChangeInterface(e) {
                this.model['interface'] = this.app.ev(e)
            },
			onMianze(e) {
                this.app.go('/pages/login/editor', {tag: 'disclaimer_treaty'})
            },
			protocol: function() {
				this.app.go('/pages/login/editor', {tag: 'user_agreement'})
			},
			privacy_policy: function() {
				this.app.go('/pages/login/editor', {tag: 'privacy_policy'})
			},
        },
        onLoad() {
            this.app.setTitle('注册账号')
			
			if(this.app.data.user && this.app.data.user.openid){
				this.app.post('api/user/info', {}, json => {
				    this.model = json
					this.company_img = [this.app.upload + json.company_img]
				    // this.model['type'] = ''
				    // this.model['interface'] = ''
				})			
			}
			
			this.app.postHtml('api/config/config_all', {}, json => {
				let {code, data} = json
				if(code == 0){
					this.config = data
				}
			})
			
        },
		onShow() {
			
			
		},

    }
</script>

<style>
    .input-text-code {
        width: 200rpx;
        ;
    }
</style>
