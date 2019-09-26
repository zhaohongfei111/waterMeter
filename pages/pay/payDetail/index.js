// pages/recharge/recharge.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        waterAdd: "",
        payVal: 10,
    },

    selectPayVal: function(event) {
        this.setData({
            payVal: event.currentTarget.dataset.payval
        })
    },
    onLoad: function(options) {
        this.setData({
            waterAdd: options.waterCode
        })
    },
    confirmPay: function() {
        console.log("付款" + this.data.payVal + "元")
        var condition = {
            "total": 1,
            "openID": app.globalData.openid,
            "userId": "UI00222960",
            "userName": "900",
            "meterAdd": "43061908130900",

        }
        wx.request({
            url: `${app.data.dingApi}WxPay/UnifiedOrder`,
            method: 'POST',
            header: {
                Authorization: `Bearer ${app.globalData.token}`
            },
            data: condition,
            success: function(response) {
                console.log(response.data);
                wx.requestPayment({
                    'timeStamp': response.data.timeStamp,
                    'nonceStr': response.data.nonceStr,
                    'package': response.data.package,
                    'signType': response.data.signType,
                    'paySign': response.data.paySign,
                    'success': function(res) {
                        console.log(res);
                    },
                    'fail': function(res) {
                        console.log(res);
                        return;
                    },
                    'complete': function(res) {
                        console.log('支付完成');

                        // console.log('get url', url)


                        if (res.errMsg == 'requestPayment:ok') {
                            wx.showModal({
                                title: '提示',
                                content: '充值成功'
                            });
                            wx.request({
                                url: `${app.data.dingApi}WxPay/Query?package=encodeUrl(${response.data.package})`,
                                method: 'get',
                                header: {
                                    Authorization: `Bearer ${app.globalData.token}`
                                },

                                success: function(res) {
                                    console.log(res);
                                }
                            })
                        }
                        return;
                    },

                });


            }
        })
    }
})