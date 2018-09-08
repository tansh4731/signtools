const util = require('../../utils/util.js')

Page({

  data: {
    currentTimeText: new util.formatTime(Date.now(), 'Y/M/D\nh:m:s'),
    lastRecord: {},
    toastHidden: true,
    setInter: null
  },

  onShow: function () {

    let records = wx.getStorageSync('records');
    if(records.length > 0)
    {
      records[0].signTime = util.formatTime(records[0].signTime, 'Y/M/D h:m:s');
      this.setData({
        currentTimeText: util.formatTime(Date.now(), 'Y/M/D\nh:m:s'),
        lastRecord: records[0]
      })
    }
    else
    {
      this.setData({
        currentTimeText: util.formatTime(Date.now(), 'Y/M/D\nh:m:s')
      })

    }
    
    this.data.setInter = setInterval((function () {
      this.updateClockTime()
    }).bind(this), 1000)
  },

  onHide: function () {
    clearInterval(this.data.setInter)
  },

  startSign: function (e) {

    var tmpLastRecord = {
      signTime: Date.now()
    }

    this.saveRecord(tmpLastRecord)

    this.setData({
      toastHidden: false
    })

    tmpLastRecord.signTime = util.formatTime(tmpLastRecord.signTime, 'Y/M/D h:m:s');
    this.setData({
      lastRecord: tmpLastRecord
    })

  },

  updateClockTime: function () {
    this.setData({
      currentTimeText: util.formatTime(Date.now(), 'Y/M/D\nh:m:s')
    })
  },

  hideToast: function () {
    this.setData({
      toastHidden: true
    })
  },
  
  saveRecord: function (record) {
    var records = wx.getStorageSync('records') || []
    records.unshift(record)
    wx.setStorageSync('records', records)
  }
})
