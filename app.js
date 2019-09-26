//app.js
App({
    data: {
        apiUrl: "https://meterapi.jsjymgroup.com/api/",
        dingApi: "https://miniapp.dingxuanwei.com/api/"
    },
    onLaunch: function() {
        // 展示本地存储能力
        var that = this;
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        //if (!wx.getStorageSync('jwt')) { //验证storage中是否有jwt
        // wx.request({
        //         url: that.data.apiUrl + 'TokenAuth/Authenticate',
        //         method: 'POST',
        //         data: {
        //             "userNameOrEmailAddress": "admin",
        //             "password": "123qwe"
        //         },
        //         success: function(res) {
        //             if (res.statusCode == "200") {
        //                 wx.setStorageSync('jwt', res.data.result.accessToken)
        //                 that.globalData.token = res.data.result.accessToken;
        //                 that.wxLogin(that);
        //             }
        //         }
        //     })
        //     // } else {
        //     //     that.globalData.token = wx.getStorageSync('jwt');
        //     //     this.wxLogin(that);
        //     // }
        this.wxSetting();

    },
    // wxLogin: function(that) {
    //     // 登录
    //     wx.login({
    //             success: res => {
    //                 // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //                 wx.request({
    //                     url: `${that.data.dingApi}wxuser/Code2Session?code=${res.code}`,
    //                     method: 'GET',
    //                     header: {
    //                         Authorization: `Bearer ${that.globalData.token}`
    //                     },
    //                     success: function(res) {
    //                         if (res.statusCode == "200") {
    //                             that.globalData.openid = res.data.openid;
    //                             that.globalData.session_key = res.data.session_key;
    //                             //that.getBindInfo(that);
    //                         }
    //                     }
    //                 })
    //             }
    //         })
    //         // 获取用户信息

    // },
    wxSetting: function() { //判断是否授权
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    getBindInfo: function(that) {
        wx.request({
            url: `${that.data.dingApi}wxuser/Getbindings?openid=${that.globalData.openid}`,
            method: 'GET',
            header: {
                Authorization: `Bearer ${that.globalData.token}`
            },
            success: function(res) {
                if (res.statusCode == "200") {
                    console.log(res)
                    that.globalData.bindInfo = res.data.result
                }
            }
        })
    },
    globalData: {
        token: "",
        openid: "",
        session_key: "",
        userInfo: null,
        bindInfo: [
            // {
            //     "userId": "1",
            //     "userCode": "1",
            //     "userName": "1",
            //     "linkMan": "1",
            //     "telephone": "1",
            //     "areaName": "1",
            //     "buildingName": "1",
            //     "houseNumber": "1",
            //     "userAddress": "1",
            //     "meterAdd": "水表1",
            //     "balanceType": "1",
            //     "peopleNumber": 0,
            //     "installDate": "2019-09-24T07:03:15.983Z",
            //     "valueStatus": "关",
            //     "lastReading": 0,
            //     "lastDate": "2019-09-24T07:03:15.983Z"
            // },
            // {
            //     "userId": "2",
            //     "userCode": "2",
            //     "userName": "2",
            //     "linkMan": "2",
            //     "telephone": "2",
            //     "areaName": "2",
            //     "buildingName": "2",
            //     "houseNumber": "2",
            //     "userAddress": "2",
            //     "meterAdd": "水表2",
            //     "balanceType": "2",
            //     "peopleNumber": 0,
            //     "installDate": "2019-09-24T07:03:15.983Z",
            //     "valueStatus": "2",
            //     "lastReading": 0,
            //     "lastDate": "2019-09-24T07:03:15.983Z"
            // },

        ]
    }
})