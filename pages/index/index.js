//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        this.switchPage();
    },

    switchPage: function() { //首页获取jwt验证后跳转

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        };
        var that = this;
        wx.getSetting({
            success: function(res) {

                if (res.authSetting['scope.userInfo']) {
                    wx.request({
                        url: app.data.apiUrl + 'TokenAuth/Authenticate',
                        method: 'POST',
                        data: {
                            "userNameOrEmailAddress": "admin",
                            "password": "123qwe"
                        },
                        success: function(res) {
                            if (res.statusCode == "200") {
                                wx.setStorageSync('jwt', res.data.result.accessToken)
                                app.globalData.token = res.data.result.accessToken;
                                wx.login({
                                    success: res => {
                                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                                        wx.request({
                                            url: `${app.data.dingApi}wxuser/Code2Session?code=${res.code}`,
                                            method: 'GET',
                                            header: {
                                                Authorization: `Bearer ${app.globalData.token}`
                                            },
                                            success: function(res) {
                                                if (res.statusCode == "200") {
                                                    app.globalData.openid = res.data.openid;
                                                    app.globalData.session_key = res.data.session_key;
                                                    //that.getBindInfo(that);
                                                    wx.request({
                                                        url: `${app.data.dingApi}wxuser/Getbindings?openid=${app.globalData.openid}`,
                                                        method: 'GET',
                                                        header: {
                                                            Authorization: `Bearer ${app.globalData.token}`
                                                        },
                                                        success: function(res) {
                                                            if (res.statusCode == "200") {
                                                                var reg = new RegExp('T', "g");
                                                                res.data.result.forEach(item => {
                                                                    item.installDate = item.installDate.replace(reg, ' ');
                                                                    item.lastDate = item.lastDate.replace(reg, ' ');
                                                                })
                                                                app.globalData.bindInfo = res.data.result;
                                                                that.setData({
                                                                    bindInfo: app.globalData.bindInfo
                                                                })
                                                                wx.switchTab({ //已经授权过就跳过授权
                                                                    url: "/pages/search/index/index"
                                                                })
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                } else {

                }
            }
        })
    },
    getUserInfo: function(e) {
        var that = this;
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })

        wx.request({
            url: app.data.apiUrl + 'TokenAuth/Authenticate',
            method: 'POST',
            data: {
                "userNameOrEmailAddress": "admin",
                "password": "123qwe"
            },
            success: function(res) {
                if (res.statusCode == "200") {
                    wx.setStorageSync('jwt', res.data.result.accessToken)
                    app.globalData.token = res.data.result.accessToken;
                    wx.login({
                        success: res => {
                            // 发送 res.code 到后台换取 openId, sessionKey, unionId
                            wx.request({
                                url: `${app.data.dingApi}wxuser/Code2Session?code=${res.code}`,
                                method: 'GET',
                                header: {
                                    Authorization: `Bearer ${app.globalData.token}`
                                },
                                success: function(res) {
                                    if (res.statusCode == "200") {
                                        app.globalData.openid = res.data.openid;
                                        app.globalData.session_key = res.data.session_key;
                                        //that.getBindInfo(that);
                                        wx.request({
                                            url: `${app.data.dingApi}wxuser/Getbindings?openid=${app.globalData.openid}`,
                                            method: 'GET',
                                            header: {
                                                Authorization: `Bearer ${app.globalData.token}`
                                            },
                                            success: function(res) {
                                                if (res.statusCode == "200") {
                                                    app.globalData.bindInfo = res.data.result;
                                                    that.setData({
                                                        bindInfo: app.globalData.bindInfo
                                                    })
                                                    wx.switchTab({ //已经授权过就跳过授权
                                                        url: "/pages/pay/index/index"
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            }
        })
    }
})