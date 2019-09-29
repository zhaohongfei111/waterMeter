// pages/search/search/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    toPayDetail: function() {
        wx.navigateTo({ url: "/pages/pay/payDetail/index" })
    },
    toOpenValve: function() {
        wx.navigateTo({ url: "/pages/pay/openVavle/index" })
    },
    toChangeDefault: function() {
        wx.navigateTo({ url: "/pages/pay/changeDefault/index" })
    },
    toPayRecord: function() {
        wx.navigateTo({ url: "/pages/pay/payRecord/index" })
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
        if (this.data.bindInfo.length == 0) {
            this.setData({
                visiable: true
            })
        } else {
            this.setData({
                selectInfo: app.globalData.bindInfo[0]
            })

        }
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