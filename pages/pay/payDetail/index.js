// pages/recharge/recharge.js
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
        console.log("付款")
    }
})