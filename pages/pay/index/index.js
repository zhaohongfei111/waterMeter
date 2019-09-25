// pages/pay/index/index.
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
            'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
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
        visiable: false

    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    },
    bindPickerChange: function(e) { //选择水表
        this.setData({
            selectInfo: app.globalData.bindInfo[e.detail.value]
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    confirm: function() {
        this.setData({
            visiable: false
        })
        wx.switchTab({
            url: "/pages/mine/index/index"
        })
    },
    toPayDetail: function() {
        wx.navigateTo({
            url: "/pages/pay/payDetail/index?waterCode=" + this.data.selectInfo.meterAdd
        })

    },
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