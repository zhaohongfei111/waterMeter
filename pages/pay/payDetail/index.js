// pages/recharge/recharge.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        waterAdd: "",
        payVal: 10,
        bindInfo: [],
        selectInfo: {
            areaName: "无",
            balanceType: "无",
            buildingName: "无",
            houseNumber: "无",
            installDate: "无",
            lastDate: "无",
            lastReading: "无",
            linkMan: "无",
            meterAdd: "无",
            peopleNumber: "无",
            telephone: "无",
            userAddress: "无",
            userCode: "无",
            userId: "无",
            userName: "无",
            valueStatus: "无"
        },
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
            "userId": selectInfo.userId,
            "userName": selectInfo.userName,
            "meterAdd": selectInfo.meterAdd,

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
    },
    bindPickerChange: function(e) { //选择水表
        this.setData({
            selectInfo: app.globalData.bindInfo[e.detail.value]
        })
    },
    onShow: function() {
        this.setData({
            bindInfo: app.globalData.bindInfo
        })
        if (this.data.bindInfo.length != 0) {
            this.setData({
                selectInfo: app.globalData.bindInfo[0]
            })
        }
    },
})