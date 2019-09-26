// pages/mine/bindInfo/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bindInfo: [],
        visiable: false
    },
    addMeter: function() {
        wx.navigateTo({
            url: "/pages/mine/addMeter/index"
        })
    },
    unbindMeter: function() {
        if (app.globalData.bindInfo != 0) {
            this.setData({ visiable: true })
        }
    },
    confirm: function() {
        var that = this;
        var condition = {
            openid: app.globalData.openid,
            userId: app.globalData.bindInfo[0].userId
        }
        wx.request({
            url: `${app.data.dingApi}wxuser/RemoveBindings`,
            method: 'POST',
            header: {
                Authorization: `Bearer ${app.globalData.token}`
            },
            data: condition,
            success: function(res) {
                if (res.statusCode == "200") {
                    //if (res.data.code == 0) {
                    wx.request({
                        url: `${app.data.dingApi}wxuser/Getbindings?openid=${app.globalData.openid}`,
                        method: 'GET',
                        header: {
                            Authorization: `Bearer ${app.globalData.token}`
                        },
                        success: function(res) {
                            if (res.statusCode == "200") {
                                app.globalData.bindInfo = res.data.result;
                                that.setData({ bindInfo: res.data.result })
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                that.setData({ visiable: false })
                            }
                        }
                    })
                }
                // }
            }
        })
    },
    cancle: function() {
        this.setData({ visiable: false })
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
        this.setData({
            bindInfo: app.globalData.bindInfo
        })
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