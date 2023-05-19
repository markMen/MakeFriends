//app.js  creby Hocean 2019年12月31日 本uni 与微信小程序 H5 Android Swift 通用
let baseApp = getApp()


let host = 'https://www.yujianliangren.com'
// let host = 'http://chat91aiqianhonglianren.wwssaadd.coms'


const app = { //?XDEBUG_SESSION_START=17145  
	host: host + '/', //默认地址前缀
	upload: host + '/data/upload/', //默认上传地址前缀
	// defAvatar: '/static/image/icons/default-face.png', //默认的头像
	defAvatar: '/static/images/avater_def.png', //默认的头像
	loginPage: '/pages/login/login',
	loginCheckPage: '/pages/login/login_check',
	loginCheckAddPlus: '/pages/plus/index',
	//页面参数
	data: {
		is_debug: true, //调试模式
		statusBarHeight:0,
		
		user: null,
		loop: null,
		hasLogin: false,
		res: null,
		timeLoop: null,
		loopTask: null,
		loopTaskEnable: true,
		loopTaskTime: 6000,
		loopTaskActionEvent: null,
		
		
		is_version: false, //版本号
		read_count: 0, //通知消息
		//openid: null
		// default_image:[],  //默认图片
		
		loopWebSocket: null,  //通信
		webSocket: null,  //通信
		loopWebSocketTimeLive: 10000,
		
		eventRefChatSend:null, //发送了消息
		eventRefOnlineCount:null, //消息刷新事件 上下限
	},
	icon: {
		icon_color: '#19be6b',
	},
	onLaunch: function() {
		// this.uploadRealTime()
		//this.getOpenid(v => {});
		//console.log('App Launch')
	},
	onShow: function() {
		//console.log('App Show')
	},
	onHide: function() {
		//console.log('App Hide')
	},
	init: function() {
		String.prototype.replaceAll = function(s1, s2) {
			return this.replace(new RegExp(s1, "gm"), s2);
		}

		/**
		 *对Date的扩展，将 Date 转化为指定格式的String
		 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
		 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
		 *例子：
		 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
		 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
		 */
		Date.prototype.format = function(fmt) {
			var o = {
				"M+": this.getMonth() + 1, //月份
				"d+": this.getDate(), //日
				"h+": this.getHours(), //小时
				"m+": this.getMinutes(), //分
				"s+": this.getSeconds(), //秒
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度
				"S": this.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp
				.$1
				.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length ==
					1) ? (o[k]) : (("00" +
					o[k]).substr(("" + o[k]).length)));
			return fmt;
		}
	},
	formatDateTime: function(fmt) {
		if (!fmt) {
			fmt = "yyyy-MM-dd hh:mm:ss"
		}
		let datetime = new Date();
		var o = {
			"M+": datetime.getMonth() + 1, //月份
			"d+": datetime.getDate(), //日
			"h+": datetime.getHours(), //小时
			"m+": datetime.getMinutes(), //分
			"s+": datetime.getSeconds(), //秒
			"q+": Math.floor((datetime.getMonth() + 3) / 3), //季度
			"S": datetime.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1
			.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length ==
				1) ? (o[k]) : (("00" +
				o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	getNow: function() {
		return this.formatDateTime("yyyy-MM-dd hh:mm:ss")
	},
	getNowDate: function() {
		return this.formatDateTime("yyyy-MM-dd")
	},
	getNowTime: function() {
		return this.formatDateTime("hh:mm:ss")
	},
	//验证openid
	oid: function() {
		this.getOpenid(id => {
			console.log(id)
		})
	},
	setUser: function(user) {
		let app = this
		app.data.user = user
		try {
			if (user) {
				uni.setStorageSync('openid', user.openid);
			} else {
				uni.removeStorageSync('openid');
			}
		} catch (e) {
			// error
		}
	},
	getUserNow: function(callback) {

	},
	isUser: function() { //是否存在USER
		if (app.data.user && app.data.user.openid) {
			return true;
		}
		return false;
	},
	getUser: function(callback) {
		let app = this
		// let check = () => {
		// 	let user = app.data.user
		// 	if (user.del == '0') {
		// 		// if(user.is_plus == '0'){
		// 		// 	app.goOne(app.loginCheckAddPlus)
		// 		// 	return
		// 		// }
		// 		if (callback) {
		// 			callback(user)
		// 		}
		// 	} else {
		// 		app.goOne(app.loginCheckPage)
		// 	}
		// }

		if (app.data.user && app.data.user.openid) {
			if (callback) {
				callback(app.data.user)
			}
		} else {
			try {
				const openid = uni.getStorageSync('openid');
				if (openid) {
					app.postHtml('api/login/get_user_openid', {
						openid: openid
					}, json => {
						// if (json.code == '0') {
						// 	app.data.user = json.data
						// 	check()
						// } else {
						// 	app.goOne(app.loginPage)
						// }

						if (json.code == '0') {
							app.data.user = json.data
							if (callback) {
								callback(app.data.user)
							}
						} else {
							app.goOne(app.loginPage)
						}
					})

				} else {
					app.goOne(app.loginPage)
				}
			} catch (e) {
				// error
			}
			return


			if (app.data.user) {
				if (callback) {
					callback(app.data.user)
				}
			} else {
				app.goOne(app.loginPage)
				return

				//#ifdef  APP-PLUS
				uni.login({
					provider: 'weixin',
					success: data => {
						// console.log(data)
						/* {code: undefined, authResult: {
							access_token: "31_03X1DkjnzXLxEILEYQ735wKxHrQRd3_ik1PT_l_7XzcKcxBtvNXPHVQy2xAUquS3sMV8372nnq783sKa2oSM1zxmAEQuorcuToQgqRaKN3Y"
							expires_in: 7200
							openid: "oRrdQtwnHc1MbajEkrA8_V3ZM14g"
							refresh_token: "31_ykuAoPJApYD21qohLw0ucww0oJ1qtJ3bfAWdCcESCJwtUxSTUPqEfd-yMx_1aNlX6KqCrRazetTu3m37fFchHL4pa5ekaaTYJR5Y6jjKKvQ"
							scope: "snsapi_userinfo"
							unionid: "oU5Yyt5x1Fn9qHVg5jkriCT6b_no"
						}, errMsg: "login:ok"}*/
						uni.request({
							url: app.host + 'api/login/uni_code',
							data: {
								json: app.toJson(data),
							},
							success: function(res) {
								let user = res.data
								app.data.user = user
								if (callback) {
									callback(user)
								}
							},
							fail: function(res) {
								console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
								//callback(res)
							}
						})
					},
					fail: function(err) {
						console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
						//callback(err)
					}
				})
				//#endif

				//#ifndef APP-PLUS
				uni.request({
					url: app.host + 'api/login/code',
					data: {},
					success: function(res) {
						let user = res.data
						app.data.user = user
						//app.data.openid = user.openid
						// if (user.isFirst == '1') {
						// 	app.go('/pages/index/authorize')
						// }
						if (callback) {
							callback(user)
						}
					},
					fail: function(res) {
						console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
						//callback(res)
					}
				})
				//#endif
			}


		}
	},
	getUserInfo: function(callback) {
		uni.getUserInfo({
			provider: 'weixin',
			success: function(infoRes) {
				// console.log('用户昵称为：' + infoRes.userInfo.nickName);
				/*
				nickName	String	用户昵称	
				openId	String	该服务商唯一用户标识	App
				avatarUrl	String	用户头像
				*/
				if (callback) {
					callback(infoRes.userInfo)
				}

			}
		});
	},
	getWx: function(callback) {
		let app = this

		//#ifdef  APP-PLUS
		uni.login({
			provider: 'weixin',
			success: data => {
				// console.log(data)
				/* {code: undefined, authResult: {
					access_token: "31_03X1DkjnzXLxEILEYQ735wKxHrQRd3_ik1PT_l_7XzcKcxBtvNXPHVQy2xAUquS3sMV8372nnq783sKa2oSM1zxmAEQuorcuToQgqRaKN3Y"
					expires_in: 7200
					openid: "oRrdQtwnHc1MbajEkrA8_V3ZM14g"
					refresh_token: "31_ykuAoPJApYD21qohLw0ucww0oJ1qtJ3bfAWdCcESCJwtUxSTUPqEfd-yMx_1aNlX6KqCrRazetTu3m37fFchHL4pa5ekaaTYJR5Y6jjKKvQ"
					scope: "snsapi_userinfo"
					unionid: "oU5Yyt5x1Fn9qHVg5jkriCT6b_no"
				}, errMsg: "login:ok"}*/
				uni.request({
					url: app.host + 'api/login/uni_code',
					data: {
						json: app.toJson(data),
					},
					success: function(res) {

						let user = res.data
						app.data.user = user
						app.setUser(app.data.user)
						if (callback) callback(user)

					},
					fail: function(res) {
						console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
					}
				})
			},
			fail: function(err) {
				console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
			}
		})
		//#endif

		//#ifndef APP-PLUS
		uni.request({
			url: app.host + 'api/login/code',
			data: {},
			success: function(res) {
				let user = res.data
				app.data.user = user
				//app.data.openid = user.openid
				// if (user.isFirst == '1') {
				// 	app.go('/pages/index/authorize')
				// }
				app.setUser(app.data.user)
				if (callback) {
					callback(user)
				}
			},
			fail: function(res) {
				console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
				//callback(res)
			}
		})
		//#endif

	},
	//得到用户
	getUserWx: function(callback) {
		let app = this
		if (app.data.user && app.data.user.openid) {
			if (callback) {
				callback(app.data.user)
			}
		} else {
			uni.login({
				// provider: 'weixin',
				success: data => {
					uni.request({
						url: app.host + '/login/code?XDEBUG_SESSION_START=19006',
						data: {
							code: data.code
						},
						success: function(res) {
							let user = res.data
							app.data.user = user
							//app.data.openid = user.openid

							if (user.isFirst == '1') {
								app.go('/pages/index/authorize')
							}

							if (callback) {
								callback(user)
							}
						},
						fail: function(res) {
							console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
							//callback(res)
						}
					})
				},
				fail: function(err) {
					console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
					//callback(err)
					app.goc('/pages/login/login/login')
				}
			})

		}
	},
	//获取Openid lazy loading openid
	getOpenid: function(callback) {
		let app = this
		app.getUser(user => {
			if (callback) {
				callback(user.openid)
			}

		})
	},
	//授权 参数 权限域
	authorize: function(scope, success, fail) {
		uni.getSetting({
			success(res) {
				if (res.authSetting[scope]) {
					if (success) success()
				} else {
					uni.authorize({
						scope: scope,
						success() {
							if (success) success()
						},
						fail() {
							if (fail) fail()
						}
					})
				}
			}
		})
	},
	//判断字符串空
	isEmpty: function(str) {
		if (str == null || str == "" || str == '') {
			return true
		}
		return false
	},
	//每个参数都是数组相连 或者参考 Array.concat(array)
	concat: function(...args) {
		let list = []
		for (let listKey in args) {
			let itemList = args[listKey]
			for (let objKey in itemList) {
				list.push(itemList[objKey])
			}
		}
		return list
	},
	//字符串拼接  “{0}”
	stringFormat: function(text, ...args) {
		let result = text;
		if (args && args.length > 0) {
			let obj = args[0]
			if (typeof(obj) == "object") {
				for (var key in obj) {
					if (obj[key] != undefined) {
						var reg = new RegExp("({" + key + "})", "g");
						result = result.replace(reg, obj[key]);
					}
				}
			} else {
				for (var i = 0; i < args.length; i++) {
					if (args[i] != undefined) {
						var reg = new RegExp("({)" + i + "(})", "g");
						result = result.replace(reg, args[i]);
					}
				}
			}
		}
		return result;
	},
	//携带信息获取 app.ed(e).index  data-index='{{index}}' 
	ed: function(e) {
		return e.currentTarget.dataset
	},
	et: function(e) {
		return e.target.value
	},
	//输入框获取   app.ev(e) data-key='car_style' bindinput='onInput'
	//onInput: function (e) {
	//  let key = app.ed(e).key
	//  this.data.model[key] = e.detail.value
	//}
	ev: function(e) {
		return e.detail.value
	},
	//复制内容
	copy: function(data, success) {
		uni.setClipboardData({
			data: data,
			success: function(res) {
				if (success) success(res)
			}
		})
	},
	//复制的值
	copyValue: function(success) {
		uni.getClipboardData({
			success: function(res) {
				if (success) success(res.data)
			}
		})
	},
	//粘贴
	paste: function(success) {
		uni.getClipboardData({
			success: function(res) {
				if (success) success(res.data)
			}
		})
	},
	//初次创建上传用户信息 过时
	upUserInfo: function() {
		this.authorize('scope.userInfo', () => {
			uni.getUserInfo({
				success: function(res) {
					console.log(res.userInfo)
				}
			})
		})
	},
	//设置页面参数 过期
	setData: function(page, funcObj) {
		let obj = funcObj()
		page.setData(obj)
	},
	request: function(method, url, data, callback, fail, com) {
		let app = this
		app.getOpenid(openid => {
			data.openid = openid
			app.requestHtml(method, url, data, json => {
				if (callback) callback(json)
			}, fail, com)
		});
	},
	//请求get
	get: function(url, data, callback, fail, com) {
		this.request('GET', url, data, callback, fail, com)
	},
	//请求post
	post: function(url, data, callback, fail, com) {
		this.request('POST', url, data, callback, fail, com)
	},
	requestHtml: function(method, url, data, callback, fail, com) {
		let app = this
		uni.request({
			// header: {
			// 	'content-type': 'application/x-www-form-urlencoded',
			// },
			url: app.host + url, //仅为示例，并非真实的接口地址
			data: data,
			method: method,
			success: function(res) {
				try {
					if (callback) {
						if (res.statusCode == '200') {
							if (callback) callback(res.data)
						} else {
							// app.toast('错误码:' + res.statusCode)
							// app.message('错误码:' + res.statusCode + ',点击确定查看详情', '' + res.data, is => {
							// 	if (is) {
							// 		app.data.res = res
							// 		app.go('/pages/error/error', {})
							// 	}
							// })
							if (fail) fail()
						}
					}
				} catch (e) {

				}
				// if(com) com()
				//console.log(res.data)
			},
			fail: function() {
				if (fail) fail()
			},
			complete: function() {
				if (com) com()
			},
		})
	},
	//请求get
	getHtml: function(url, data, callback, fail, com) {
		this.requestHtml('GET', url, data, callback, fail, com)
	},
	//请求post
	postHtml: function(url, data, callback, fail, com) {
		this.requestHtml('POST', url, data, callback, fail, com)
	},
	//请求get
	getLoad: function(url, data, callback, fail, com) {
		let app = this
		app.toastLoading()
		this.get(url, data, json => {
			if (callback) callback(json)
		}, fail, c => {
			app.toastHide()
			if (com) com()
		})
	},
	//请求post
	postLoad: function(url, data, callback, fail, com) {
		let app = this
		app.toastLoading()
		this.post(url, data, json => {
			if (callback) callback(json)
		}, fail, c => {
			app.toastHide()
			if (com) com()
		})
	},
	postAsync: function(url, data, callback, fail, com) {
		return new Promise((resolve, reject) => {
			this.post(url, data, json => {
				if (callback) callback(json)
				resolve(json)
			}, fail => {
				reject()
			}, com)
		})
	},
	async postAsyncTest(url, data, callback, fail, com) {
		let json = await this.postAsync(url, data, callback, fail, com)
		console.log(json)
		return json
	},
	//选择文件 返回地址数组
	chooseImage: function(action, count = 1) {
		uni.chooseImage({
			count: count, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function(res) {
				let tempFilePaths = res.tempFilePaths
				if (action) action(tempFilePaths)
			}
		})
	},
	//选择文件 返回地址数组
	chooseVideo: function(action) {
		uni.chooseVideo({
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function(res) {
				let tempFilePaths = res.tempFilePath
				if (action) action(tempFilePaths, res)
			}
		})
	},
	//上传多个文件
	uploadFiles: function(url, fileInfos, callback) { //fileInfo = {name:'', path:'', data : {}}
		let that = this
		let list = [];
		let count = 0;
		if (fileInfos.length <= 0) {
			if (callback) callback(list)
		}
		that.getOpenid(openid => {
			fileInfos.forEach((fi, index) => { //单个文件上传后 集合起来
				that.uploadFile(url, {
					name: 'file',
					path: fi,
					data: {
						openid: openid,
						index: index,
					}
				}, json => {
					if (json.index) {
						list[json.index] = json
					} else {
						list.push(json)
					}
				}, null, json => {
					if (++count >= fileInfos.length) {
						if (callback) callback(list)
					}
				})
			})
		});
	},
	//上传文件 
	uploadFile: function(url, fileInfo, success, fail, complete) { //fileInfo = {name:'', path:'', data : {}}
		let that = this
		that.getOpenid(openid => {
			if (fileInfo.name) {
				fileInfo.data.openid = openid
			} else {
				fileInfo = {
					name: 'file',
					path: fileInfo,
					data: {
						openid: openid
					}
				}
			}
			let uploadTask = uni.uploadFile({
				url: that.host + url, //仅为示例，并非真实的接口地址
				filePath: fileInfo.path,
				name: fileInfo.name,
				formData: fileInfo.data,
				success: function(res) {
					let html = res.data
					try {
						html = JSON.parse(html);
					} catch (e) {}
					if (success) success(html)
				},
				fail: function(res) {
					if (fail) fail(res.data)
				},
				complete: function(res) {
					if (complete) complete(res.data)
				}
			})
			/*
			uploadTask.onProgressUpdate((res) => {  
			    // this.updata = res  
			    // console.log(res.totalBytesSent + '/' + res.totalBytesExpectedToSend)  
			    console.log('上传进度' + res.progress);  
			    console.log('已经上传的数据长度' + res.totalBytesSent);  
			    console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);  
				//回调中打印一下时间戳
				let a = res.totalBytesSent  
			    let b = res.totalBytesExpectedToSend  
			    that.per = ((a / b) * 100).toFixed(0)  
			    console.log("per  " + that.per + "time  " + new Date().toLocaleString())
			});  */

		});
	},
	//上传文件
	uploadFileH5: function(url, fileInfo, success, fail, complete) { //fileInfo = {name:'', path:'', data : {}}
		let that = this
		that.getOpenid(openid => {
			if (fileInfo.name) {
				fileInfo.data.openid = openid
			} else {
				fileInfo = {
					name: 'file',
					path: fileInfo,
					data: {
						openid: openid
					}
				}
			}
			// let uploadTask = uni.uploadFile({
			// 	url: that.host + url, //仅为示例，并非真实的接口地址
			// 	filePath: fileInfo.path,
			// 	name: fileInfo.name,
			// 	formData: fileInfo.data,
			// 	success: function(res) {
			// 		let html = res.data
			// 		try {
			// 			html = JSON.parse(html);
			// 		} catch (e) {}
			// 		if (success) success(html)
			// 	},
			// 	fail: function(res) {
			// 		if (fail) fail(res.data)
			// 	},
			// 	complete: function(res) {
			// 		if (complete) complete(res.data)
			// 	}
			// })


			let fData = new FormData();
			fData.append(fileInfo.name, fileInfo.path);
			for (let key in fileInfo.data) {
				fData.append(key, fileInfo.data[key]);
			}
			// fData.append("openid", openid);

			let xhr = new XMLHttpRequest();
			xhr.open("POST", that.host + url, true);
			xhr.onload = function(e) {
				// console.log("上传成功",e); //上传成功
			};
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4 && xhr.status == 200) { //上传后台成功
					// var res = JSON.parse(xhr.responseText)
					// _this.fileList.push(res.datas); // 上传成功后放进fileList数组用于展示
					let html = xhr.responseText
					try {
						html = JSON.parse(html);
					} catch (e) {}
					if (success) success(html)
				} else {
					if (fail) fail(xhr.responseText)
				}
				if (complete) complete(xhr.responseText)
			}

			// 这里设置请求头，做的时候遇到一个问题，明明上传的是FormData，可是在请求中变成了request payload,后台需要的是FormData，解决方法，设置enctype为multipart/form-data，不要设置Content-Type，切记直接不设置Content-Type
			xhr.setRequestHeader('enctype', "multipart/form-data");
			// xhr.setRequestHeader('Authorization', util.getToken());
			xhr.send(fData)

		});
	},
	//上传多个文件
	uploadFilesHtml: function(url, fileInfos, callback) { //fileInfo = {name:'', path:'', data : {}}
		let that = this
		let list = [];
		let count = 0;
		if (fileInfos.length <= 0) {
			if (callback) callback(list)
		}
		fileInfos.forEach((fi, index) => { //单个文件上传后 集合起来
			that.uploadFileHtml(url, {
				name: 'file',
				path: fi,
				data: {
					index: index,
				}
			}, json => {
				if (json.index) {
					list[json.index] = json
				} else {
					list.push(json)
				}
			}, null, json => {
				if (++count >= fileInfos.length) {
					if (callback) callback(list)
				}
			})
		})
	},
	//上传文件 
	uploadFileHtml: function(url, fileInfo, success, fail, complete) { //fileInfo = {name:'', path:'', data : {}}
		let that = this


		if (fileInfo.name) {} else {
			fileInfo = {
				name: 'file',
				path: fileInfo,
			}
		}
		uni.uploadFile({
			url: that.host + url, //仅为示例，并非真实的接口地址
			filePath: fileInfo.path,
			name: fileInfo.name,
			formData: fileInfo.data,
			success: function(res) {
				let html = res.data
				try {
					html = JSON.parse(html);
				} catch (e) {}
				if (success) success(html)
			},
			fail: function(res) {
				if (fail) fail(res.data)
			},
			complete: function(res) {
				if (complete) complete(res.data)
			}
		})

	},
	//上传文件
	uploadFileTask: function(url, fileInfo, task, success, fail,
		complete) { //fileInfo = {name:'', path:'', data : {}}
		let that = this
		that.getOpenid(openid => {
			if (fileInfo.name) {
				fileInfo.data.openid = openid
			} else {
				fileInfo = {
					name: 'file',
					path: fileInfo,
					data: {
						openid: openid
					}
				}
			}
			let uploadTask = uni.uploadFile({
				url: that.host + url, //仅为示例，并非真实的接口地址
				filePath: fileInfo.path,
				name: fileInfo.name,
				formData: fileInfo.data,
				success: function(res) {
					let html = res.data
					try {
						html = JSON.parse(html);
					} catch (e) {}
					if (success) success(html)
				},
				fail: function(res) {
					if (fail) fail(res.data)
				},
				complete: function(res) {
					if (complete) complete(res.data)
				}
			})
			if (task) {
				uploadTask.onProgressUpdate((res) => {
					// console.log('上传进度' + res.progress);  
					// console.log('已经上传的数据长度' + res.totalBytesSent);  
					// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);  
					// let a = res.totalBytesSent  
					//    let b = res.totalBytesExpectedToSend  
					//    let per = ((a / b) * 100).toFixed(0)
					task({
						...res,
						per: res.progress,
					})
					// console.log("per  " + that.per + "time  " + new Date().toLocaleString())
				});
			}

		});
	},
	//上传多个文件
	uploadFilesTask: function(url, fileInfos, tasks, callback) { //fileInfo = {name:'', path:'', data : {}}
		let that = this
		let list = [];
		let count = 0;
		if (fileInfos.length <= 0) {
			if (callback) callback(list)
		}
		fileInfos.forEach((fi, index) => { //单个文件上传后 集合起来
			that.uploadFileTask(url, fi, tasks[index], json => {
				list.push(json)
			}, null, json => {
				if (++count >= fileInfos.length) {
					if (callback) callback(list)
				}
			})
		})
	},
	//下载文件
	downloadFile: function(url, success, fail, complete) {
		const downloadTask = uni.downloadFile({
			url: url, //仅为示例，并非真实的资源
			success: res => {
				if (success) {
					success(res.tempFilePath)
				}
				// if (res.statusCode === 200) {
				//     console.log('下载成功');
				// }
			},
			fail: () => {
				if (fail) {
					fail()
				}
			},
			complete: () => {
				if (complete) {
					complete()
				}
			},
		});

		/*downloadTask.onProgressUpdate((res) => {
		    console.log('下载进度' + res.progress);
		    console.log('已经下载的数据长度' + res.totalBytesWritten);
		    console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
		
		    // 测试条件，取消下载任务。
		    // if (res.progress > 50) {
		    //     downloadTask.abort();
		    // }
		});*/
	},
	//对象转换 页面跳转参数
	objectToUrlParams: function(obj) {
		let param = ''
		for (var key in obj) {
			param += key + '=' + obj[key] + '&'
		}
		if (param != '') {
			param = '?' + param.substring(0, param.length - 1)
		}
		return param;
	},
	//返回页面
	back: function(delta = 1) {
		uni.navigateBack({
			delta: delta
		})
	},
	backData: function(data, delta = 1) {
		if (data) {
			let app = getApp()
			let pages = app.getPages();
			let prevPage = pages[pages.length - 2]; //上一个页面 
			//接调用上一个页面的setData()方法，把数据存到上一个页面中  微信
			// prevPage.setData({ 
			//      ...data
			// })			
			//prevPage._data = data	//H5		
			for (let i in data) { //通用
				prevPage.$vm[i] = data[i]
			}
		}
		uni.navigateBack({
			delta: delta
		})
	},
	backTime: function(time, data, delta = 1) {
		setTimeout(() => {
			this.backData(data, delta)
		}, time)
	},
	//跳转并关闭当前页面
	go: function(url, data) {
		let app = this

		if (app.data.user && app.data.user.del == '2') {
			let nowPageName = url
			let pageSee = [
				'/pages/index/index',
				'/pages/message/message',
				'/pages/message/circle',
				'/pages/me/me',
				// '/pages/me/user_info',
				'/pages/me/me_del',
			]
			let isFind = false
			pageSee.forEach(item => {
				if (nowPageName == item) {
					isFind = true
					return
				}
			})
			if (isFind) { //有权限

			} else { //没有权限
				// app.toast('wu')
				// return

				app.msgSys('请前往商家认证，认证后的商家展示在首页里', is => {
					if (is) {
						app.gos('/pages/me/me_edit/me_edit_info')
					}
				})
				return
			}
		}


		if (data) {
			url = url + this.objectToUrlParams(data);
		}
		uni.navigateTo({
			url: url
		})
	},
	//跳转并关闭当前页面
	gos: function(url, data) {
		if (data) {
			url = url + this.objectToUrlParams(data);
		}
		uni.navigateTo({
			url: url
		})
	},
	//跳转并关闭当前页面
	to: function(url, data) {
		if (data) {
			url = url + this.objectToUrlParams(data);
		}
		uni.redirectTo({
			url: url
		})
	},
	//跳转并关闭当前页面
	goc: function(url, data) {
		if (data) {
			url = url + this.objectToUrlParams(data);
		}
		uni.redirectTo({
			url: url
		})
	},
	//跳转到选项卡
	goTab: function(url, data) {
		if (data) {
			url = url + this.objectToUrlParams(data);
		}
		uni.switchTab({
			url: url
		})
	},
	//跳转到此页面 销毁其他页面
	goOne: function(url, data) {
		if (data) {
			url = url + this.objectToUrlParams(data);
		}
		uni.reLaunch({
			url: url
		})
	},
	//提醒
	toast: function(title = "完成", duration = 2000, action) {
		let icon = ''
		if (title && title.length > 7) {
			icon = 'none'
		}

		uni.showToast({
			title: title,
			duration: duration,
			icon: icon,
			success: function() {
				if (action) {
					action()
				}
			}
		})
	},
	toastIcon: function(title = "", icon = "success", duration = 2000, action) {
		wx.showToast({
			title: title,
			icon: icon,
			duration: duration,
			success: function() {
				if (action) {
					action()
				}
			}
		})
	},
	//提醒
	toastSuccess: function(title = "", duration = 2000, action) {
		this.toastIcon(title, 'success', duration, action)
	},
	//提醒
	toastError: function(title = "", duration = 2000, action) {
		this.toastIcon(title, 'error', duration, action)
	},
	toastNone: function(title = "", duration = 2000, action) {
		this.toastIcon(title, 'none', duration, action)
	},
	//加载
	toastLoading: function(title = "loading", duration = 60000) {
		uni.showToast({
			title: title,
			icon: "loading",
			duration: duration
		})
	},
	//取消加载
	toastHide: function() {
		uni.hideToast()
	},
	toastUpload: function(title = "上传中…", duration = 60000) {
		this.toastLoading(title, duration)
	},
	//只有确定的消息
	alert: function(title = "系统提示！", content = "确定操作？", action) {
		let modal = {
			showCancel: false,
			confirmText: "确定",
			success: function(res) {
				if (action) {
					if (res.confirm) {
						action(true)
					} else if (res.cancel) {
						action(false)
					}
				}
			}
		}
		if (title) {
			modal.title = title
		}
		if (content) {
			modal.content = content
		}
		uni.showModal(modal)
	},
	//只有确定的系统消息
	alertSys: function(content = "确定操作？", action) {
		this.alert("系统提示！", content, action)
	},
	//消息系统提示
	msgSys: function(content = "确定操作？", action) {
		this.msg("系统提示！", content, action)
	},
	//消息提示
	msg: function(title = "系统提示！", content = "确定操作？", action) {
		let modal = {
			confirmText: "确定",
			cancelText: "取消",
			success: function(res) {
				if (action) {
					if (res.confirm) {
						action(true)
					} else if (res.cancel) {
						action(false)
					}
				}

			}
		}
		if (title) {
			modal.title = title
		}
		if (content) {
			modal.content = content
		}
		uni.showModal(modal)
	},
	//消息提示
	msgToast: function(title = "系统提示！", content = "确定操作？", action, duration = 2000) {
		let modal = {
			duration: duration,
			confirmText: "确定",
			cancelText: "取消",
			success: function(res) {
				if (action) {
					if (res.confirm) {
						action(true)
					} else if (res.cancel) {
						action(false)
					}
				}

			}
		}
		if (title) {
			modal.title = title
		}
		if (content) {
			modal.content = content
		}
		uni.showModal(modal)
	},
	//消息提示
	msgs: function(content = "确定操作？", ok, cancel) {
		let modal = {
			confirmText: "确定",
			cancelText: "取消",
			success: function(res) {
				if (res.confirm) {
					if (ok) {
						ok()
					}
				} else if (res.cancel) {
					if (cancel) {
						cancel()
					}
				}
			}
		}
		modal.title = "系统提示！"

		if (content) {
			modal.content = content
		}
		uni.showModal(modal)
	},
	//消息提示
	message: function(title = "系统提示！", content = "确定操作？", ok, cancel) {
		let modal = {
			confirmText: "确定",
			cancelText: "取消",
			success: function(res) {
				if (res.confirm) {
					if (ok) {
						ok()
					}
				} else if (res.cancel) {
					if (cancel) {
						cancel()
					}
				}
			}
		}

		if (title) {
			modal.title = title
		}
		if (content) {
			modal.content = content
		}
		uni.showModal(modal)
	},
	//消息提示
	messageSys: function( content = "确定操作？", ok, cancel) {
		this.message("系统提示！", content, ok, cancel)
	},
	//对象转化为JSON字符串
	toJson: function(obj) {
		try {
			return JSON.stringify(obj)
		} catch (e) {}
		return obj
	},
	//字符串转换到对象
	toObject: function(Json) {
		try {
			return JSON.parse(Json)
		} catch (e) {}
		return Json
	},
	//输出到控制台
	l: function(message, ...optionalParams) {
		console.log(message, optionalParams)
	},
	//输出标准
	i: function(message, ...optionalParams) {
		console.info(message, optionalParams)
	},
	//输出警告
	w: function(message, ...optionalParams) {
		console.warn(message, optionalParams)
	},
	//输出错误
	e: function(message, ...optionalParams) {
		console.error(message, optionalParams)
	},
	log: function(message, ...optionalParams) {
		if(this.data.is_debug){
			console.log(message, optionalParams)
		}
	},
	//系统的参数
	stopPullDownRefresh: function() { //停止下拉刷新
		uni.stopPullDownRefresh()
	},
	//定时器 事件 时间
	timer: function(action, duration) {
		setTimeout(action, duration) //延迟时间
	},
	//支付
	pay: function(data, callback) { //data {body: '描述信息', attach: '携带信息',price: 0.01 }
		this.get('php_sdk_v3.0.9/example/xcxpay.php?XDEBUG_SESSION_START=15457', data, json => {
			console.log(json)
			uni.requestPayment({
				'timeStamp': json.timeStamp, //时间戳
				'nonceStr': json.nonceStr, //随机数
				'package': json.package, //订单号  prepay_id=wx02183345416450a65f38fd9c1534351811
				'signType': 'MD5', //加密方式
				'paySign': json.paySign, //签名
				'success': function(res) {
					if (callback) callback(res.data)
					//console.log(json.out_trade_no) //付款成功后逻辑
				},
				'fail': function(res) {
					console.log(res)
				}
			})
		})
	},
	// 判断是0或-0 1与+0的商为Infinite，1与-0的商为-Infinite
	isNegativeZero: function(num) {
		return num === 0 && (1 / num < 0)
	},
	//拨打电话
	makePhoneCall: function(tel) {
		uni.makePhoneCall({
			phoneNumber: tel
		})
	},
	previewImage: function(e) {
		let currentOne = e.currentTarget.dataset.src
		let current = [currentOne]
		uni.previewImage({
			//  current: current, // 当前显示图片的http链接
			urls: current, // 需要预览的图片http链接列表
			longPressActions: {
				itemList: ['保存图片'],
				success: function(ress) {
					uni.downloadFile({
						url: current[ress.index],
						success: (res) => {
							if (res.statusCode === 200) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										//uniapp提供的消息提示框。
										uni.showToast({
											title: "保存成功",
											icon: "success"
										});
									},
									fail: function() {
										uni.showToast({
											title: "保存失败，请稍后重试",
											icon: "none"
										});
									}
								});
							}
						}
					})
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			},
		})
	},
	previewImages: function(e) {
		let current = []
		let list = e.currentTarget.dataset.srcs.split(',')
		let prefix = e.currentTarget.dataset.prefix
		for (let i in list) {
			current.push(prefix + list[i])
		}
		let now = e.currentTarget.dataset.src
		uni.previewImage({
			current: now, // 当前显示图片的http链接
			urls: current, // 需要预览的图片http链接列表
			longPressActions: {
				itemList: ['保存图片'],
				success: function(ress) {
					uni.downloadFile({
						url: current[ress.index],
						success: (res) => {
							if (res.statusCode === 200) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										//uniapp提供的消息提示框。
										uni.showToast({
											title: "保存成功",
											icon: "success"
										});
									},
									fail: function() {
										uni.showToast({
											title: "保存失败，请稍后重试",
											icon: "none"
										});
									}
								});
							}
						}
					})
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			},
		})
	},
	previewImageOrder: function(param) {
		let current = param.current
		let urls = param.urls
		uni.previewImage({
			current: current,
			urls: urls,
			longPressActions: {
				itemList: ['保存图片'],
				success: function(ress) {
					uni.downloadFile({
						url: urls[ress.index],
						success: (res) => {
							if (res.statusCode === 200) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										//uniapp提供的消息提示框。
										uni.showToast({
											title: "保存成功",
											icon: "success"
										});
									},
									fail: function() {
										uni.showToast({
											title: "保存失败，请稍后重试",
											icon: "none"
										});
									}
								});
							}
						}
					})
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			},
		})
	},
	//深拷贝对象
	copyObj(obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	//页面构造 funcPage 需要返回page变量 <view class='center' wx:if="{{page.isLoad}}">加载中...</view> <view class='center' wx:if="{{page.isMore}}"> 没有更多了</view >
	page: function(url, param, invokeUI, funcPage) {
		this.app = getApp()
		this.build = function(url, param, invokeUI, funcPage) {
			if (url) this.url = url
			if (param) this.param = param
			if (funcPage) this.funcPage = funcPage
			if (invokeUI) this.invokeUI = invokeUI
			this.data = []
			this.isLoad = false //加载
			this.isMore = false //更多
			this.page = 0 //当前页
			return this
		}
		this.build(url, param, invokeUI, funcPage)
		//下一页
		this.next = function(actNextFinish) {
			if (this.isMore) {
				if (actNextFinish) actNextFinish()
				return //不在继续
			}
			this.isLoad = true //显示加载更多
			let thatPage = this
			let param = this.app.copyObj(this.param) //深拷贝对象
			param.page = ++this.page //页数
			this.app.post(this.url, param, json => {
				this.isLoad = false
				if (this.invokeUI) this.invokeUI(thatPage)
	
				let localPage = json
				if(json.code == '0'){
					localPage = json.data
				}
				if (this.funcPage) {
					localPage = this.funcPage(json) //回调返回的页面		  
				}
	
				if (localPage) {
					if (param.page >= localPage.last_page) { //最后一页了
						// if (data.page >= json.page.last_page) { //最后一页了
						thatPage.isMore = true
					}
					for (let key in localPage) {
						if (key == 'data') {
							thatPage.data = thatPage.data.concat(localPage.data)
						} else {
							thatPage[key] = localPage[key]
						}
					}
				}
				if (this.invokeUI) this.invokeUI(thatPage)
				if (actNextFinish) actNextFinish()
	
			})
		}
		//重新加载
		this.reload = function(actLoadFinish) {
			let thatPage = this
			this.isLoad = false //加载
			this.isMore = false //更多
			this.page = 0 //当前页
			this.data = [] //清空页面数据
			this.next(() => {
				thatPage.app.stopPullDownRefresh()
				if (actLoadFinish) actLoadFinish()
			})
		}
		//刷新--
		this.refresh = function(actNextFinish) {
			this.isLoad = true //显示加载更多
			let thatPage = this
			if (this.invokeUI) this.invokeUI(thatPage) //回调更新
			let param = this.app.copyObj(this.param) //深拷贝对象
			param.page = ++this.page //页数
			this.app.post(this.url, param, json => {
				this.isLoad = false
				if (this.invokeUI) this.invokeUI(thatPage)
	
				let localPage = json
				if (this.funcPage) {
					localPage = this.funcPage(json) //回调返回的页面		  
				}
	
				if (localPage) {
					for (let key in localPage) {
						if (key == 'data') {
							thatPage.data = thatPage.data.concat(localPage.data)
						} else {
							thatPage[key] = localPage[key]
						}
					}
					if (this.invokeUI) this.invokeUI(thatPage)
				}
				if (actNextFinish) actNextFinish()
	
			})
		}
		//下一页
		this.nextLoad = function(actLoadFinish) {
			if (this.isMore) {
				if (actNextFinish) actNextFinish()
				return //不在继续
			}
			this.app.loadingShow()
			this.next(() => {
				if(actLoadFinish){
					actLoadFinish()
				}
				this.app.loadingHide()
			})
		}
		//重新加载
		this.reloadLoad = function(actLoadFinish) {
			this.app.loadingShow()
			this.reload(() => {
				if(actLoadFinish){
					actLoadFinish()
				}
				this.app.loadingHide()
			})
		}
		//重新加载
		this.refreshLoad = function(actLoadFinish) {
			this.app.loadingShow()
			this.refresh(() => {
				if(actLoadFinish){
					actLoadFinish()
				}
				this.app.loadingHide()
			})
		}
	},
	//页面堆栈
	getPages: function() {
		return getCurrentPages();
	},
	getPageBack: function() {
		let pages = this.getPages()
		if (pages.length >= 2) {
			return pages[pages.length - 2]
		}
		return null
	},
	getPageLast: function() {
		let pages = this.getPages()
		if (pages.length >= 1) {
			return pages[pages.length - 1]
		}
		return null
	},
	getPageBackData: function() {
		let page = this.getPageBack()
		if (page) {
			// #ifdef H5
			return page.getData()
			// #endif
			// #ifndef H5
			return page.$vm.getData()
			// #endif
		}
		return null
	},
	getPageLastData: function() {
		let page = this.getPageLast()
		if (page) {
			// #ifdef H5
			return page.getData()
			// #endif
			// #ifndef H5
			return page.$vm.getData()
			// #endif
		}
		return null
	},
	//实时更新版本
	uploadRealTime: function() {
		const updateManager = uni.getUpdateManager()
		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
			console.log('upload->>')
			console.log(res.hasUpdate)
		})

		updateManager.onUpdateReady(function() {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success: function(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate()
					}
				}
			})

		})

		updateManager.onUpdateFailed(function() {
			// 新的版本下载失败
			uni.showModal({
				title: '更新提示',
				content: '新版本下载失败',
				showCancel: false
			})
		})
	},
	getIP: function(callback) {
		// 获取IP地址
		uni.request({
			url: 'https://tianqiapi.com/ip/',
			data: {},
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
				if (callback) {
					callback(res.data.ip)
				}
				//console.log('IP地址: ' + res.data.ip);
			}
		});
	},
	buildUser: function(user) {
		let app = this
		if (user.url_avatar) {
			if (user.url_avatar == user.avatar) { //自定义头像
				user.url_avatar = app.upload + user.url_avatar
			} else if (user.url_avatar == user.wx_avatar) { //包括则是微信头像        
			} else {
				if (user.avatar) {
					user.url_avatar = app.upload + user.url_avatar
				} else if (user.wx_avatar) {
					user.url_avatar = app.wx_avatar
				} else {
					user.url_avatar = app.defAvatar
				}
			}
		} else {
			user.url_avatar = app.defAvatar
		}
		return user;
	},
	buildUserList: function(listUser) {
		let app = this
		for (var i in listUser) {
			listUser[i] = app.buildUser(listUser[i])
		}
		return listUser;
	},
	setTitle: function(title) {
		uni.setNavigationBarTitle({
			title: title
		})
	},
	//转换页面
	toEditor: function(editor) {
		editor = editor.replace(new RegExp('/data/ueditor/', "gm"), this.host +
			'data/ueditor/')

		let newContent = editor.replace(/<img[^>]*>/gi, function(match, capture) {
			match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
			match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
			match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
			return match;
		});
		newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
			match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
				'max-width:100%;');
			return match;
		});
		// newContent = newContent.replace(/<br[^>]*\/>/gi, '');
		newContent = newContent.replace(/\<img/gi,
			'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
		return newContent;

	},
	buildDayList: function(start = 0, end = 30) {
		let day_list = []
		let now = new Date()
		for (let i = start; i < end; i++) {
			let nowStr = now.format("yyyy-MM-dd")
			day_list.push(nowStr)
			now.setDate(now.getDate() - 1)
		}
		return day_list
	},
	join: function(array, divide = ',', key = '') {
		let array_divide = []
		if (key) {
			for (let i in array) {
				array_divide.push(array[i][key])
			}
		} else {
			array_divide = array
		}
		return array_divide.join(divide)
	},
	getLocation: function(action) {
		uni.getLocation({
			type: 'wgs84',
			geocode: true,
			success: function(res) {
				/*
				{
				    "type": "WGS84",
				    "altitude": 0,
				    "latitude": 39.01738,
				    "longitude": 117.653894,
				    "speed": 0,
				    "accuracy": 100,
				    "address": {
				        "country": "中国",
				        "province": "天津市",
				        "city": "天津市",
				        "district": "滨海新区",
				        "street": "宁波道",
				        "streetNum": "482号",
				        "poiName": "上海道小学",
				        "cityCode": "022"
				    },
				    "errMsg": "getLocation:ok"
				}
				*/
				if (action) action(res)
			}
		});
	},
	chooseLocation: function(action) {
		uni.chooseLocation({
			success: function(res) {
				if (action) action(res)
			}
		})
	},
	//overpreviewImagepreviewImage
	getStatusText: function(status) {
		//  `state` varchar(10) DEFAULT '0' COMMENT '{订单状态}
		//[0:默认状态,1:未支付,2:已支付,3:已发货,4:已完成,5:申请退款,6:退款完成,7:退款失败,8:错误的订单,9:强制完结,10:待商家确认,11:待买家确认]',
		let statusText = ['默认状态', '未支付', '已支付待发货', '已发货', '已完成', '申请退款', '退款完成', '退款失败', '错误的订单', '强制完结',
			'待商家确认', '待买家确认'
		]
		if (status && status >= 0 && status < statusText.length) {
			return statusText[status]
		}
		if (status == '51') {
			return '退款处理中';
		}
		if (status == '52') { //51:退款处理中,52:申请退货,53:退货处理中]
			return '申请退货';
		}
		if (status == '53') { //51:退款处理中,52:申请退货,53:退货处理中]
			return '退货处理中';
		}
		return '未定义状态'
	},
	aliPay: function(order, invoke, complete) {
		let app = this
		//#ifndef APP-PLUS
		app.msg('模拟支付', '金额:' + order.total + '\r\n' + '描述:' + order.subject + '\r\n' + '单号:' + order
			.out_trade_no, is => {
				if (is) {
					app.toast('模拟支付成功')
					setTimeout(() => {
						if (invoke) invoke({})
					}, 1000)
				} else {
					app.toast('取消支付')
				}
				if (complete) complete()

			})
		//#endif
		//#ifdef  APP-PLUS
		app.get('alipay/aop/test/pay.php', {
			...order,
			// 'total': sum_price,
			// 'subject': '会员服务',
		}, json => {
			let orderInfo = json.replaceAll('&amp;', '&')
			uni.requestPayment({
				provider: 'alipay',
				orderInfo: orderInfo,
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
					if (invoke) invoke(res)
				},
				fail: function(err) {
					app.toast('取消支付')
					// app.msg('', JSON.stringify(err))
					console.log('fail:' + JSON.stringify(err));
				},
				complete: () => {
					if (complete) complete()
					console.log("payment结束")
				}
			});
		})
		//#endif
	},
	wxPay: function(order, invoke, complete) {
		let app = this
		//#ifndef APP-PLUS		
		app.msg('模拟支付', '金额:' + order.total + '元\r\n' + '描述:' + order.subject + '\r\n' + '单号:' + order
			.out_trade_no, is => {
				if (is) {
					app.toast('模拟支付成功')
					setTimeout(() => {
						if (invoke) invoke({})
					}, 1000)
				} else {
					app.toast('取消支付')
				}
				if (complete) complete()

			})
		//#endif
		//#ifdef  APP-PLUS
		app.get('payment/wxpayv3/index.php', {
			...order,
			// 'total': sum_price,
			// 'subject': '会员服务',
		}, json => {
			uni.requestPayment({
				provider: 'wxpay',
				orderInfo: json,
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
					if (invoke) invoke(res)
				},
				fail: function(err) {
					app.toast('取消支付')
					// app.msg('', JSON.stringify(err))
					console.log('fail:' + JSON.stringify(err));
				},
				complete: () => {
					if (complete) complete()
					console.log("payment结束")
				}
			});
		})
		//#endif
	},
	ApplePay: function(order, invoke, complete) {
		let app = this
		//#ifndef APP-PLUS		
		app.msg('模拟支付', '金额:' + order.total + '元\r\n' + '描述:' + order.subject + '\r\n' + '单号:' + order
			.out_trade_no, is => {
				if (is) {
					app.toast('模拟支付成功')
					setTimeout(() => {
						if (invoke) invoke({})
					}, 1000)
				} else {
					app.toast('取消支付')
				}
				if (complete) complete()
			})
		//#endif
		//#ifdef  APP-PLUS
		let iapChannel = null
		let productId = order.apple_product
		let productIds = app.toObject(order.apple_product_list)
		plus.payment.getChannels((channels) => {
			for (var i in channels) {
				var channel = channels[i];
				if (channel.id === 'appleiap') {
					iapChannel = channel;

					uni.showLoading({
						title: '检测支付环境...'
					})
					iapChannel.requestOrder(productIds, (orderList) => { //必须调用此方法才能进行 iap 支付

						uni.requestPayment({
							provider: 'appleiap',
							orderInfo: {
								productid: productId
							},
							success: (e) => {
								app.alertSys('支付成功')

								if (invoke) invoke()
							},
							fail: (e) => {
								app.alertSys('支付失败,原因为: ' + e.errMsg)
							},
							complete: () => {
								if (complete) complete()
								console.log("payment结束")
							}
						})
						uni.hideLoading();
					}, (e) => {
						uni.hideLoading();
						app.alert('授权支付商品失败')
					});

				}
			}
			if (!iapChannel) {
				app.alert('授权苹果支付失败')
			}
		}, (error) => {
			app.alert(this.app.toJson(error))
		});

		//#endif
	},
	checkDid: function() {
		let app = this
		const did = uni.getStorageSync('did')
		app.post('api/login/check_did', {
			did: did
		}, json => {
			if (json.code == '0') { //存在

			} else {
				app.toast('账号在另处登录')
				setTimeout(() => {
					app.goc('/pages/login/logout')
				}, 1000)
			}
		})
	},
	checkUser: function(checkSuccess, checkFail, checkCom) {
		// return
		let app = this
		app.getOpenid(openid => {
			app.postHtml('api/login/get_user_openid', {
				openid: openid
			}, json => {
				
				if (json.code == '0') {
					let user = json.data
					app.data.user = user
					
					
					if (user.del == '0') { //用户正常则跳出
					
						//判断完善资料
						if (user.gender != 1 && user.gender != 2) { //
							app.goOne('/pages/login/register_finish')
						}else if (!user.height) { //已封号
							app.goOne('/pages/login/register_finish_info')
						}else if (!user.wx) { //已封号
							app.messageSys('请完善资料', yes=>{
								app.go('/pages/me/user_info', {is_task:'1',})
								
							})
						}
						
						// else if (user.is_plus == '0' && user.gender == 1) { //会员不足需要续费  男的收费
						// 	app.go(app.loginCheckAddPlus)
						// } else if (!user.push_client_id) { //没有推送ID 则重新登录
						// 	// app.goOne(app.loginPage)
						// } else {
						// 	if (checkSuccess) { //完全正常的用户
						// 		checkSuccess()
						// 	}
						// }
						
						if (checkSuccess) { //完全正常的用户
							checkSuccess()
						}
					}
					//[0:审核通过,1:审核中,-1:删除的用户,-2:审核不通过,-3:申请注销,
					//-4:已经注销,-5:注销不通过,-6:已封号]<select>',
					else if (user.del == '-3') { //申请注销中
						app.goOne('/pages/me/me_del_ing')
					} else if (user.del == '-2') { //审核不通过
						app.goOne('/pages/login/login_check_no')
					} else if (user.del == '1') { //审核中
						app.goOne(app.loginCheckPage)
					} else if (user.del == '2') { //未完善信息

						// let page = app.getPageLast()
						// let nowPageName = page.route						
						// let pageSee = [
						// 	'pages/index/index',
						// 	'pages/message/message',
						// 	'pages/message/circle',
						// 	'pages/me/me',
						// 	'pages/me/user_info',
						// 	'pages/me/me_del',
						// ]
						// let isFind = false
						// pageSee.forEach(item => {
						// 	if(nowPageName == item){
						// 		isFind = true
						// 		return
						// 	}
						// })
						// if(isFind){  //有权限

						// }else{  //没有权限
						// 	console.log('没有权限')
						// 	app.dada.user.is_auth = '-1'
						// 	// app.back()
						// 	// app.go('/pages/me/me_edit/me_edit_info')
						// 	if(checkFail){
						// 		checkFail()
						// 	}							
						// }
					} else if (user.del == '-4') { //已经注销
						app.goOne('/pages/me/me_del_ing')
					} else if (user.del == '-5') { //注销不通过
						app.goOne('/pages/me/me_del_ing')
					} else if (user.del == '-6') { //已封号
						// app.alert('账号已被封停', user.lock_text, () => {
						// 	app.goOne(app.loginPage)
						// })
						app.goOne('/pages/userstate/lock')
					} else {
						app.goOne('/pages/login/logout')
					}
					
					
					
				}
				if (checkCom) {
					checkCom()
				}
			})

			app.checkDid() //更换机器后重新登录
		})

	},
	showTabBarRedDot: function(index) {
		// uni.setTabBarBadge({
		//   index: 0,
		//   text: '1'
		// })
		uni.showTabBarRedDot({
			index: index,
		})
		// uni.hideTabBarRedDot({
		// 	index: 0,
		// })
	},
	hideTabBarRedDot: function(index) {
		uni.hideTabBarRedDot({
			index: index,
		})
	},
	loopTask: function(invoke) { //循环侦听 app.data.loopTask
		let app = this
	
		this.data.loopTaskActionEvent = invoke
		if (app.data.loopTask == null) {			
			app.data.loopTask = setInterval(() => {
				app.loopTaskAction(this.data.loopTaskActionEvent)
			}, app.data.loopTaskTime)
		}
	},
	loopTaskActionMsg:function(count){
		// for (let i = 0; i < count; i++) {
		// 	setTimeout(() => {
		// 		let innerAudioContext = uni.createInnerAudioContext()
		// 		innerAudioContext.autoplay = true
		// 		innerAudioContext.src = '/static/audio/ios_msg.wav'
		// 		innerAudioContext.play()
		// 	}, i * 1000)
		// }
		
		let innerAudioContext = uni.createInnerAudioContext()
		innerAudioContext.autoplay = true
		innerAudioContext.src = '/static/audio/ios_msg.wav'
		innerAudioContext.play()
		
		//使用震动
		uni.vibrateLong({
			success: function() {
				console.log('success');
			}
		});
	},
	loopTaskAction: function() {
		let app = this
		let user = app.data.user
		if (user && user.openid) {
			// let curRoute  = this.$mp.page.route; // 直接获取当前页面路由
			// if(curRoute == app.loginPage){
			// 	return
			// }
			let pages = getCurrentPages() // 获取栈实例
			if (pages.length <= 0) {
				return
			}
			let page = pages[pages.length - 1] // 获取当前页面的数据，包含页面路由
			if ('/' + page.route == app.loginPage) {
				return
			}
		
			app.post('api/task/new_task?XDEBUG_SESSION_START=10513', {}, json => {
				if (json.code == '0') {
		
					let task = json.data
					if (this.data.loopTaskActionEvent) this.data.loopTaskActionEvent(task)
		
					if (task.count > 0) {
						if (app.data.loopTaskEnable == true) { //关闭的时候 直接返回
							app.loopTaskActionMsg(task.count)
						} else {
							app.loopTaskActionMsg(task.chat_contact_count) //打开聊天窗口的时候 只推送加好友声音
						}
						app.post('api/task/is_task', {}, json => {}) //设置已经推送到了声音
					}
		
					// if (task.red_count > 0) { //是否由于消息和好友红点
					// 	app.showTabBarRedDot(0)
					// } else {
					// 	app.hideTabBarRedDot(0)
					// }
		
					if (task.red_chat_count > 0) { //是否由于消息红点
						app.showTabBarRedDot(1)
					} else {
						app.hideTabBarRedDot(1)
					}
		
		
					//添加好友红点 red_chat_contact_count
					if (task.red_chat_contact_count > 0) { //是否由于消息红点
						app.showTabBarRedDot(2)
					} else {
						app.hideTabBarRedDot(2)
					}
		
					// if (task.red_product > 0 || (task.red_order_count + task
					// 		.red_order_sale_count) > 0) { //是否有商品更新红点
					// 	app.showTabBarRedDot(3)
					// } else {
					// 	app.hideTabBarRedDot(3)
					// }
					
					// //群组消息
					// if (task.red_group_chat_count > 0) { //是否有商品更新红点
					// 	app.showTabBarRedDot(3)
					// } else {
					// 	app.hideTabBarRedDot(3)
					// }
					
					//上下线 刷新
					if (task.ref_online_count != 0) { //是否有商品更新红点
						if(app.data.eventRefOnlineCount){
							app.data.eventRefOnlineCount(task)
							app.post('api/task/is_task_online_count', {}, json => {}) //设置已经推送到了声音
						}
					} 
		
					//#ifdef  APP-PLUS
					//设置APP 图标红点  这里也会出现消息 提醒 请单次设置
					let app_count = task.red_count  + task.red_group_chat_count
					if (app_count > 0) { //是否由于消息红点
						if (app_count > app.data.read_count) {
							plus.runtime.setBadgeNumber(app_count);
							app.data.read_count = app_count
						}
					} else {
						plus.runtime.setBadgeNumber(0);
					}
					//#endif
		
					if (task.user_del) {
						let user = task.user_del
						if (user.del == '-6') { //
							app.alert('账号已被封停', user.lock_text, () => {
								app.go(app.loginPage)
							})
						}
		
					}
					
					this.$forceUpdate()
					
		
				}
			})
		}
	},
	//返回页面  		onBackPress(e) { return this.app.onBackPress(e) }, 
	onBackPress(e) {
		// 这里可以自定义返回逻辑，比如下面跳转其他页面
		// uni.switchTab({
		// 	url: '/pages/me/me'
		// });
		// return true 表示禁止默认返回
		return true
	},
	PhoneCode: function(invoke) {
		this.loop = null
		this.text = ''
		this.seconds = 0
		this.invoke = null
		if (invoke) {
			this.invoke = invoke
		}
		this.reload = function() {
			let that = this
			if (that.loop != null) {
				clearInterval(that.loop)
				that.loop = null
			}
			that.seconds = 60
			that.text = '获取验证码'
		}
		this.onCode = function() {
			let that = this
			if (this.loop == null) {
				that.reload()
				that.lopping()
				if (that.invoke) {
					that.invoke()
				}
				that.loop = setInterval(() => {
					that.lopping()
				}, 1000);
			}
		}
		this.lopping = function() {
			let that = this
			if (that.seconds > 0) {
				--that.seconds
				that.text = that.seconds + "s"
			} else {
				that.reload()
			}
		}
		this.reload()
	},
	//单点登录
	oneLogin: function(callback) {
		let app = this

		let actionCheck = () => {
			let did = uni.getStorageSync('did')

			let param = {}
			//#ifdef APP-PLUS
			// if (plus && plus.push && plus.push.getClientInfo()) {
			// 	let info = plus.push.getClientInfo()
			// 	param.push_id = info.id
			// 	param.push_token = info.token
			// 	param.push_client_id = info.clientid
			// 	param.push_app_id = info.appid
			// 	param.push_app_key = info.appkey
			// }
			//#endif  			

			//#ifdef  APP-PLUS
			uni.login({
				provider: 'weixin',
				success: data => {
					// console.log(data)
					/* {code: undefined, authResult: {
						access_token: "31_03X1DkjnzXLxEILEYQ735wKxHrQRd3_ik1PT_l_7XzcKcxBtvNXPHVQy2xAUquS3sMV8372nnq783sKa2oSM1zxmAEQuorcuToQgqRaKN3Y"
						expires_in: 7200
						openid: "oRrdQtwnHc1MbajEkrA8_V3ZM14g"
						refresh_token: "31_ykuAoPJApYD21qohLw0ucww0oJ1qtJ3bfAWdCcESCJwtUxSTUPqEfd-yMx_1aNlX6KqCrRazetTu3m37fFchHL4pa5ekaaTYJR5Y6jjKKvQ"
						scope: "snsapi_userinfo"
						unionid: "oU5Yyt5x1Fn9qHVg5jkriCT6b_no"
					}, errMsg: "login:ok"}*/
					for (let i in param) {
						data.authResult[i] = param[i]
					}
					data.authResult.did = did

					uni.request({
						url: app.host + 'api/login/uni_code',
						data: {
							json: app.toJson(data),
						},
						success: function(res) {

							let user = res.data
							app.data.user = user
							app.setUser(app.data.user)
							if (callback) callback(user)

						},
						fail: function(res) {
							console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
						}
					})
				},
				fail: function(err) {
					console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
				}
			})
			//#endif

			//#ifndef APP-PLUS
			let data = []
			for (let i in param) {
				data.authResult[i] = param[i]
			}
			uni.request({
				url: app.host + 'api/login/code',
				data: {
					json: app.toJson(data),
				},
				success: function(res) {
					let user = res.data
					app.data.user = user
					//app.data.openid = user.openid
					// if (user.isFirst == '1') {
					// 	app.go('/pages/index/authorize')
					// }
					app.setUser(app.data.user)
					if (callback) {
						callback(user)
					}
				},
				fail: function(res) {
					console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
					//callback(res)
				}
			})
			//#endif			
		}

		let did = uni.getStorageSync('did')
		if (did) {
			actionCheck()
		} else { //get_did
			app.postHtml('api/login/get_did', {}, json => {
				if (json.code == '0') {
					uni.setStorageSync('did', json.data)
					actionCheck()
				} else {
					app.toast('获取did失败')
				}

			})
		}
	},
	getWxOpenid: function(auth) {
		uni.login({
			provider: 'weixin',
			success: data => {
				// console.log(data)
				/* {code: undefined, authResult: {
					access_token: "31_03X1DkjnzXLxEILEYQ735wKxHrQRd3_ik1PT_l_7XzcKcxBtvNXPHVQy2xAUquS3sMV8372nnq783sKa2oSM1zxmAEQuorcuToQgqRaKN3Y"
					expires_in: 7200
					openid: "oRrdQtwnHc1MbajEkrA8_V3ZM14g"
					refresh_token: "31_ykuAoPJApYD21qohLw0ucww0oJ1qtJ3bfAWdCcESCJwtUxSTUPqEfd-yMx_1aNlX6KqCrRazetTu3m37fFchHL4pa5ekaaTYJR5Y6jjKKvQ"
					scope: "snsapi_userinfo"
					unionid: "oU5Yyt5x1Fn9qHVg5jkriCT6b_no"
				}, errMsg: "login:ok"}*/
				if (auth) {
					auth(data.authResult)
				}
			},
			fail: function(err) {
				console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
			}
		})
	},
	getSystem: function() {
		let system = uni.getSystemInfoSync().platform
		return system
	},
	isIos: function() {
		return 'ios' == this.getSystem()
	},
	isAndroid: function() {
		return 'android' == this.getSystem()
	},
	checkVer: function(newVer, ver) {
		let newVers = newVer.split('.')
		let vers = ver.split('.')
		for (let i in newVers) {
			if (newVers[i] < vers[i]) {
				break
			} else if (newVers[i] == vers[i]) {
				continue
			} else if (newVers[i] > vers[i]) {
				return true
			}
		}
		return false
	},
	datetimeToDate(datetime) {
		if (datetime && datetime.length >= 10) {
			return datetime.substr(0, 10)
		}
		return datetime
	},
	maskPhone: function(phone) {
		let phone_mask = phone
		if (phone && phone.length >= 11) {
			phone_mask = phone.substr(0, 3) + '****' + phone.substr(7, 4)
		}
		return phone_mask
	},
	maskAccount: function(phone) {
		let phone_mask = phone
		if (phone && phone.length >= 4) {
			phone_mask = phone.substr(phone.length - 4, 4)
		}
		return phone_mask
	},
	newDate: function() {
		return new Date()
	},
	isTopFlag: function(e) {
		// onPageScroll(e) { //根据距离顶部距离是否显示回到顶部按钮
		// 	if (e.scrollTop > 600) { //当距离大于600时显示回到顶部按钮
		// 		this.top_flag = true
		// 	} else { //当距离小于600时隐藏回到顶部按钮
		// 		this.top_flag = false
		// 	}
		// },
		let top_flag = false
		if (e.scrollTop > 600) { //当距离大于600时显示回到顶部按钮
			top_flag = true
		} else { //当距离小于600时隐藏回到顶部按钮
			top_flag = false
		}
		return top_flag
	},
	uuid: function() {
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	},
	uuidStr: function() {
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		return (this.formatDateTime("yyyyMMddhhmmss") + S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
	},

	toBirthdayClass: function(birth, id) { //birthday
		let index = 0
		if (birth) {
			birth = Date.parse(birth.replace('/-/g', "/"));
			let year = 1000 * 60 * 60 * 24 * 365;
			let now = new Date();
			let birthday = new Date(birth);
			let age = parseInt((now - birthday) / year);
			index = parseInt(age / 5)
		} else {
			index = parseInt(id % 14)
		}

		if (index < 0) {
			index = 0
		}
		if (index > 7) {
			index = 7
		}
		if (index < 10) {
			index = '0' + index
		}
		return 'bg-world-' + index
		// return 'bg-world-01'
	},
	ChatWebSocket: function(){
		let app = getApp()
		this.app = getApp()
		this.client_id = ''
		this.ws = null
		
		this.timeConnect = 0;
		this.webSocketInit = function(){
			let that = this
		    /**
		     * 与GatewayWorker建立websocket连接，域名和端口改为你实际的域名端口，
		     * 其中端口为Gateway端口，即start_gateway.php指定的端口。
		     * start_gateway.php 中需要指定websocket协议，像这样
		     * $gateway = new Gateway(websocket://0.0.0.0:7272);
		     */
		        // let ws = new WebSocket("ws://127.0.0.1:8282");
		        // let ws = new WebSocket("ws://49.233.46.144:8282");
		        // let ws = new WebSocket("ws://chat.wwssaadd.com:8282");
		    // let ws = new WebSocket("wss://chat.wwssaadd.com/wss");
			if(this.ws){
				this.ws.close();
			}
			let ws = null
		    try{
				let url = app.host + 'wss' //"wss://chat.wwssaadd.com/wss"
				url = url.replace('https','wss')
				url = url.replace('http','wss')
				ws = new WebSocket(url);
			}catch(e){
				that.reconnect();
				return
			}
			this.ws = ws
		    // 服务端主动推送消息时会触发这里的onmessage
		    ws.onmessage = function (e) {
		        // json数据转换成js对象
		        var bindUrl = "/api/web_socket/BindClientIdAction";
		        var data = e.data;
		        try {
		            data = JSON.parse(data)
		        }catch (e) {
		        }
				// console.log(data);
		        var type = data.type || '';
				if(type == 'ping'){  //ping 不处理
					return
				}
				app.log(data)
				
		        switch (type) {
		            // Events.php中返回的init类型的消息，将client_id发给后台进行uid绑定
		            case 'login':
		                // 利用jquery发起ajax请求，将client_id发给后端进行uid绑定
		                // $.post(bindUrl, {client_id: data.client_id}, function (data) {
		                // }, 'json');
						that.client_id = data.client_id
						
						if(app.data.user && app.data.user.openid){
							let openid = app.data.user.openid
							app.post('api/web_socket/BindClientIdAction', {client_id:data.client_id, openid: openid}, json =>{})
						}
						
		                break;
					case 'login_all': //所有人登陆的样子
						
						break;
					case 'chat': //收到消息
						app.log('刷新消息条数+++++++++++++++++++++++++++');
						if(app.data.eventRefChatSend){
							app.data.eventRefChatSend()
						}
					    app.loopTaskAction()
					    break;
					case 'logout': //收到消息
					
					    break;
					case 'logout_all': //收到消息
						
						break;
 		            // 当mvc框架调用GatewayClient发消息时直接alert出来
		            default :
		                // var text = e.data;
		                // var str = '<div style="width:100%;  border:1px solid #000">' + text + '</div>';
		                // $('#message_box').append(str);
		            // alert(e.data);
		        }
		    };
		    ws.onopen = function () {
		        app.log("已连接TCP服务器");
		        // ws.send('Hello WebSockets!');
		    };
		    ws.onclose = function () {
		        app.log('服务器已经断开');  //断线重连
		        that.reconnect();
		    };
		    if(this.app.data.loopWebSocket){
		        clearInterval(this.app.data.loopWebSocket);
		    }
		    this.app.data.loopWebSocket = setInterval(()=>{
				if(ws && ws.readyState === 1){
					 ws.send( '{"type":"ping"}');
					 
					if(app.data.user && app.data.user.openid){
						let openid = app.data.user.openid
						app.post('api/web_socket/BindClientIdAction', {client_id:that.client_id, openid: openid}, json =>{})
					}
					 
				}else{ //重连
					that.reconnect();
				}
		    }, this.app.data.loopWebSocketTimeLive);
		}
		// 重连
		this.reconnect = function() {
			let that = this
			
		    // lockReconnect加锁，防止onclose、onerror两次重连
		    this.timeConnect++;
		    app.log("第" + this.timeConnect + "次重连");
		    // 进行重连
		    setTimeout(function () {
		        that.webSocketInit();
		    }, app.data.loopWebSocketTimeLive);
		}
		this.send = function(obj) {
			this.ws.send(JSON.stringify(obj));
		}
		
	},
	toPrice: function(price) {
		return price.toFixed(2)
	},
	payAliUrl(api){
		// let url =  this.app.host + 'api/coin_order/cre_order_pay_h5?order_no=' + data.order_no
		let url =  this.host + api
		// #ifdef H5
		window.location.href = url
		// #endif
		// #ifdef APP
		plus.runtime.openURL(url)
		// #endif
	},
	//阿里支付 H5 或 APP
	payAliApp(order_no, success, fail, complete){
		this.app = this
		this.app.post('api/coin_order/cre_order_pay_app_all', {order_no: order_no}, json => {
			console.log(json)
			
			let {code, data} = json
			if(code == 0){  //获取签名后支付
				// console.log(data);
				let orderInfo = data.alipay_sign.replaceAll('&amp;', '&')
				
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: orderInfo,
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						if (success) success(res)
					},
					fail: function(err) {
						app.toast('取消支付')
						if (fail) fail(err)
						console.log('fail:' + JSON.stringify(err));
					},
					complete: () => {
						if (complete) complete()
						console.log("payment结束")
					}
				});
			}else{
				this.app.toastNone(data)
			}
		})
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
}

function getApp() {
	return app;
}
app.init()

module.exports = app



/*
//定义页面参数
data: {
  page: null,
},

//构造
let that = this
new app.page('index/index/index', { type: '0' }, json => {
  return json.page  //需要返回TP5框架中的page
}, p => {
  that.setData({  //此处更新UI p为回调的自身
    page: p  
  })
}).next()

//上拉加载更多
onReachBottom: function () {
  this.data.page.next()
},

//开启下拉刷新
"enablePullDownRefresh": true
//下拉事件
onPullDownRefresh: function () {
  this.data.page.reload()
},

//加载提示文字
<view class="loading" hidden="{{!page.isLoad}}">正在载入更多...</view>
<view class="loading complete" hidden="{{!page.isMore}}">已加载全部</view>

*/

/* 加载进度 
.loading{  padding: 10rpx;  text-align: center;}
.loading:before{  display: inline-block;  margin-right: 5rpx;  vertical-align: middle;  content: '';  width: 40rpx;  height: 40rpx;  background-size: contain;  animation: rotate 1s linear infinite;}
.loading.complete:before{  display: none;}
*/


/*
this.page = new this.app.page('api/product/page', {})
this.page.next()
*/
