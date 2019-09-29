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
        selectIndex: 0
    },

    selectDefault: function(e) {
        console.log(e.currentTarget.dataset)
        this.setData({
            selectIndex: e.currentTarget.dataset.listindex
        })
    },
    onLoad: function(options) {
        this.setData({
            waterAdd: options.waterCode
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
        var selectIndex = this.data.bindInfo.findIndex(item => {
            return item.isDefault == 1
        })
        this.setData({
            selectIndex: selectIndex
        })
    },
    bindDefault: function() {
        var condition = {
            openid: app.globalData.openid,
            userId: this.data.bindInfo[this.data.selectIndex].userId
        }
        wx.request({
            url: `${app.data.dingApi}WxUser/SetDefault`,
            method: 'POST',
            header: {
                Authorization: `Bearer ${app.globalData.token}`
            },
            data: condition,
            success: function(response) {
                if (response.data.code == 0) {

                } else {

                }
            }
        })
    }
})