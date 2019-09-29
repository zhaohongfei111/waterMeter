const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
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