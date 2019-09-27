// pages/mine/addMeter/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        meterInfo: {

        },
        meterAdd: "",
        visable: false,
        visiableDialog: false
    },
    handleScan: function() {
        var that = this;
        wx.scanCode({
            success(res) {
                this.scanResult("43061908130900", that)
            }
        })

    },
    scanResult: function(meterAdd, that) {
        that.setData({ meterAdd: meterAdd })

    },
    handleBind: function() {
        var that = this;
        wx.request({
            url: `${app.data.apiUrl}services/app/MeterReading/GetUserInfoByMeterAdd?meterAdd=${that.data.meterAdd}`,
            method: 'GET',
            header: {
                Authorization: `Bearer ${app.globalData.token}`
            },
            success: function(res) {
                if (res.statusCode == "200") {
                    if (res.data.result != null) {
                        that.setData({ meterInfo: res.data.result })
                        that.setData({ visiable: true })
                    } else {
                        that.setData({ visiableDialog: true })
                    }


                }
            }
        })

    },

    bindSubmitConfirm: function() { //绑定添加
        var that = this;
        this.data.meterInfo.openid = app.globalData.openid;
        wx.request({
            url: `${app.data.dingApi}wxuser/Setbinding`,
            method: 'POST',
            header: {
                Authorization: `Bearer ${app.globalData.token}`
            },
            data: this.data.meterInfo,
            success: function(res) {
                if (res.statusCode == "200") {
                    if (res.data.code == 0) {
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
                                        visiable: false
                                    })
                                    wx.navigateTo({
                                        url: "/pages/mine/bindInfo/index"
                                    })
                                }
                            }
                        })
                    } else {
                        console.log(res.data.message)
                        wx.showToast({
                            title: res.data.message,
                            icon: "none",
                            duration: 2000
                        })

                    }
                }
            }
        })
    },
    bindSubmitCancle: function() {
        this.setData({ visiable: false })
    },
    bindDialogConfirm: function() {
        this.setData({ visiableDialog: false })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})