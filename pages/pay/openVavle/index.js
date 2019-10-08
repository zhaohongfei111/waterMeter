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
        deviceId: "",
        uuid: "",
        readService: "",
        writeService: "",
        notifyService: ""
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
    ab2hex: function(buffer) {
        let hexArr = Array.prototype.map.call(
            new Uint8Array(buffer),
            function(bit) {
                return ('00' + bit.toString(16)).slice(-2)
            }
        )
        return hexArr.join('');
    },
    openVavle: function() {
        var that = this;

        wx.openBluetoothAdapter({ // 调用 手机蓝牙
            success: function(res) {
                console.log("初始化蓝牙适配器成功")
                wx.onBluetoothAdapterStateChange(function(res) { //监听蓝牙适配器状态变化事件
                    console.log("蓝牙适配器状态变化", res)
                })
                wx.startBluetoothDevicesDiscovery({ //开始搜索
                    success: function(res) {
                        console.log("开始搜索附近蓝牙设备")
                        console.log(res);
                        that.startSearch();



                    }
                })
            },
            fail: function(res) {
                console.log("初始化蓝牙适配器失败")
                wx.showModal({
                    title: '提示',
                    content: '请检查手机蓝牙是否打开',
                })
            },
        })
    },
    startSearch: function() {
        var that = this;
        var deviceId = "";
        var uuid = "";
        wx.onBluetoothDeviceFound(function(res) {
            var devices = res.devices;
            var deviceName = devices[0].localName.split("_")[0]; //截取meterAdd
            console.log(devices[0].localName)
            if (devices[0].localName == "水表_000000001") {
                //if (devices[0].localName == app.globalData.bindInfo[0].meterAdd) {
                deviceId = devices[0].deviceId;
                uuid = devices[0].advertisServiceUUIDs[0];
                that.setData({ deviceId: deviceId })
                that.setData({ uuid: uuid })
                wx.createBLEConnection({
                    deviceId: that.data.deviceId, //  搜索到的蓝牙 信息提供的(唯一性)
                    success: function(res) {
                        wx.hideLoading();
                        wx.showToast({ // 微信弹框
                            title: '连接中',
                            icon: 'loading',
                            duration: 5000,
                            mask: true,
                            success() {
                                wx.stopBluetoothDevicesDiscovery({ // 连接成功后 停止搜索蓝牙
                                    success: function(res) {
                                        console.log("停止蓝牙搜索")
                                    }
                                })
                                wx.showToast({
                                    title: '连接成功',
                                    icon: 'success',
                                    duration: 1000,
                                    success: function(res) {}
                                })
                                that.getSevice();

                            }
                        })
                        console.log("连接设备成功")
                    },
                    fail: function(res) {
                        wx.hideLoading()
                        wx.showToast({
                            title: '连接设备失败',
                            icon: 'fail',
                            duration: 1000
                        })
                        console.log("连接设备失败")
                        console.log(res)
                    }
                })






            }
        })
    },
    getSevice() {
        var that = this;
        wx.getBLEDeviceServices({
            // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
            deviceId: that.data.deviceId,
            success(res) {
                wx.getBLEDeviceCharacteristics({
                    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
                    deviceId: that.data.deviceId,
                    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
                    //serviceId: readService.uuid,
                    serviceId: app.globalData.serviceId,
                    success(res) {
                        console.log('device getBLEDeviceCharacteristics:', res)
                        res.characteristics.forEach(item => {
                            if (item.properties.write) {
                                that.setData({
                                    writeService: item.uuid
                                })
                            }
                            if (item.properties.read) {
                                that.setData({
                                    readService: item.uuid
                                })

                            }
                            if (item.properties.notify) {
                                that.setData({
                                    notifyService: item.uuid
                                })

                            }
                        })
                        that.onOpenNotify(that)
                        //that.readCharacteristics(that)
                        that.writeData(that);
                    }
                })

            },
            fail(res) {
                console.log(res)
            }
        })
    },
    onOpenNotify: function(that) {

        var that = this;
        wx.notifyBLECharacteristicValueChange({
            state: true,
            deviceId: that.data.deviceId,
            serviceId: app.globalData.serviceId,
            characteristicId: that.data.notifyService,
            complete(res) {
                setTimeout(function() {
                    that.onOpenNotify();
                }, 1000);
                that.onNotifyChange(); //接受消息
                // that.readData(that);
            }
        })

    },
    onNotifyChange: function() {
        var _this = this;
        wx.onBLECharacteristicValueChange(function(res) {
            console.log("onNotifyChange")
            console.log(res);
        })

    },
    readCharacteristics: function(that) {
        //var that = this;
        wx.readBLECharacteristicValue({
            //deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
            deviceId: that.data.deviceId,
            // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
            serviceId: app.globalData.serviceId,

            // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
            characteristicId: that.data.readService,
            success(res) {
                console.log('readBLECharacteristicValue:', res)
                wx.onBLECharacteristicValueChange(function(res) {
                    console.log(res)
                    that.arrayBufferToHexString(res.value)
                })
            },
            fail(res) {
                console.log(res)
            }
        })
    },
    readData: function(that) {
        // var that = this;
        wx.readBLECharacteristicValue({
            deviceId: that.data.deviceId,
            serviceId: app.globalData.serviceId,
            characteristicId: that.data.writeService,
            success(res) {
                console.log('readBLECharacteristicValue:', res)
            }
        })
    },
    // onLoad:function(){
    //   this.writeData(this)
    // },
   strToHexCharCode:function(str) {
    　　if(str === "")
　　　　return "";
    　　var hexCharCode = [];
    　　hexCharCode.push("0x");
    　　for (var i = 0; i < str.length; i++) {
      　　　　hexCharCode.push((str.charCodeAt(i)).toString(16));
    　　}
    　　return hexCharCode.join("");
    },
    writeData: function(that) {
      
      var condition = {
        "meterProtocolType": 0,
        "code": "0",
        "meterType": 0,
        "isBluetooth": true,
        "sessionKey": "1231321321",
        "meterIds": [
          "1"
        ]
      }
      wx.request({
        url: app.data.apiUrl + 'services/app/MeterProtocol/OpenValveFrame',
        method: 'POST',
        header: {
          Authorization: `Bearer ${app.globalData.token}`
        },
        data: condition,
        success:function(e){
          console.log(e.data.result.commandBodies[0].body)
          console.log(that.strToHexCharCode(e.data.result.commandBodies[0].body))
          let buffer = new ArrayBuffer(e.data.result.commandBodies[0].body)
           wx.writeBLECharacteristicValue({
             deviceId: that.data.deviceId,
             // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
             serviceId: app.globalData.serviceId,

             // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
             characteristicId: that.data.writeService,
             value: buffer,
            success: function(res) {
              console.log(res)
            }
        })
        }})

       
    },
    arrayBufferToHexString: function(buffer) {
        let bufferType = Object.prototype.toString.call(buffer)
        if (buffer != '[object ArrayBuffer]') {
            return
        }
        let dataView = new DataView(buffer)
        var hexStr = '';
        for (var i = 0; i < dataView.byteLength; i++) {
            var str = dataView.getUint8(i);
            var hex = (str & 0xff).toString(16);
            hex = (hex.length === 1) ? '0' + hex : hex;
            hexStr += hex;
        }
        console.log(hexStr)
            //return hexStr.toUpperCase();
    }
})