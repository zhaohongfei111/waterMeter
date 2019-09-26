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
        // var deviceId = "C6:00:00:00:00:10";
        // wx.openBluetoothAdapter({ // 调用 手机蓝牙
        //     success: function(res) {
        //         console.log("初始化蓝牙适配器成功")
        //         wx.onBluetoothAdapterStateChange(function(res) {
        //             console.log("蓝牙适配器状态变化", res)
        //         })
        //         wx.startBluetoothDevicesDiscovery({
        //             success: function(res) {
        //                 console.log("开始搜索附近蓝牙设备")
        //                 console.log(res);
        //                 wx.createBLEConnection({
        //                     deviceId: deviceId, //  搜索到的蓝牙 信息提供的(唯一性)
        //                     success: function(res) {

        //                         console.log(res);
        //                         wx.hideLoading();
        //                         wx.showToast({ // 微信弹框
        //                             title: '连接中',
        //                             icon: 'loading',
        //                             duration: 5000,
        //                             mask: true,
        //                             success() {
        //                                 wx.stopBluetoothDevicesDiscovery({ // 连接成功后 停止搜索蓝牙
        //                                     success: function(res) {
        //                                         console.log("停止蓝牙搜索")
        //                                         console.log(res);
        //                                     }
        //                                 })
        //                                 wx.showToast({
        //                                     title: '连接成功',
        //                                     icon: 'success',
        //                                     duration: 1000,
        //                                     success: function(res) {}
        //                                 })


        //                                 wx.getBLEDeviceServices({
        //                                     // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        //                                     deviceId: deviceId,
        //                                     success(res) {
        //                                         console.log('device services:', res.services)
        //                                         wx.getBLEDeviceCharacteristics({
        //                                             // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        //                                             deviceId,
        //                                             // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
        //                                             serviceId: "E607FEE7-9D04-4625-963D-1AC43838DD2C",
        //                                             success(res) {
        //                                                 console.log('device getBLEDeviceCharacteristics:', res.characteristics)
        //                                                 wx.readBLECharacteristicValue({
        //                                                     //   deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        //                                                     deviceId,
        //                                                     // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
        //                                                     serviceId: "E607FEE7-9D04-4625-963D-1AC43838DD2C",

        //                                                     // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
        //                                                     characteristicId: "E607FEC9-9D04-4625-963D-1AC43838DD2C",
        //                                                     success(res) {
        //                                                         console.log('readBLECharacteristicValue:', res.errCode)
        //                                                     },
        //                                                     fail(res) {
        //                                                         console.log(res)
        //                                                     }
        //                                                 })
        //                                             }
        //                                         })

        //                                     },
        //                                     fail(res) {
        //                                         console.log(res)
        //                                     }
        //                                 })

        //                             }
        //                         })
        //                         console.log("连接设备成功")
        //                     },
        //                     fail: function(res) {
        //                         wx.hideLoading()
        //                         wx.showToast({
        //                             title: '连接设备失败',
        //                             icon: 'fail',
        //                             duration: 1000
        //                         })
        //                         console.log("连接设备失败")
        //                         console.log(res)
        //                     }
        //                 })

        //             }
        //         })
        //     },
        //     fail: function(res) {
        //         console.log("初始化蓝牙适配器失败")
        //         wx.showModal({
        //             title: '提示',
        //             content: '请检查手机蓝牙是否打开',
        //         })
        //     },
        // })

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