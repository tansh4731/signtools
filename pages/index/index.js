const util = require('../../utils/util.js')
const util_picker = require('../../utils/picker.js')

Page({

  data: {
    currentTimeText: new util.formatTime(Date.now(), 'Y/M/D\nh:m:s'),
    lastRecord: {},
    toastHidden: true,
    setInter: null,

    date: '',
    time: '',
    multiArray: util_picker.getDatePickerArray(),
    multiIndex: [0, 0, 0, 0, 0, 0],
  },

  //获取时间日期
  bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]]
    const month = this.data.multiArray[1][index[1]]
    const day = this.data.multiArray[2][index[2]]
    const hour = this.data.multiArray[3][index[3]].substring(3)
    const minute = this.data.multiArray[4][index[4]].substring(3)
    const second = this.data.multiArray[5][index[5]].substring(3)

    var tmp_date = new Date();
    tmp_date.setFullYear(year);
    tmp_date.setMonth(month - 1);
    tmp_date.setDate(day);
    tmp_date.setHours(hour);
    tmp_date.setMinutes(minute);
    tmp_date.setSeconds(second);

    var tmpLastRecord = {
      signTime: tmp_date.valueOf(),
    }

    this.updateLastRecord(tmpLastRecord)

    this.setData({
      toastHidden: false
    })

    this.showLastRecord();

    this.setData({
      time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    })
    console.log(this.data.time);
  },

  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      date: ""
    })
  },

  //监听picker的滚动事件
  bindMultiPickerColumnChange: function(e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;

    this.setData(data);
  },

  onShow: function() {
    let records = wx.getStorageSync('records');

    this.showLastRecord();

    this.setData({
      currentTimeText: util.formatTime(Date.now(), 'Y/M/D\nh:m:s')
    })

    this.data.setInter = setInterval((function() {
      this.updateClockTime()
    }).bind(this), 1000)

    this.updatePickerToLast();
  },

  onHide: function() {
    clearInterval(this.data.setInter)
  },

  startSign: function(e) {

    var tmpLastRecord = {
      signTime: Date.now()
    }

    this.saveRecord(tmpLastRecord)

    this.setData({
      toastHidden: false
    })

    this.showLastRecord();
  },

  updateClockTime: function() {
    this.setData({
      currentTimeText: util.formatTime(Date.now(), 'Y/M/D\nh:m:s')
    })
  },

  hideToast: function() {
    this.setData({
      toastHidden: true
    })
  },

  saveRecord: function(record) {
    var records = wx.getStorageSync('records') || []
    records.unshift(record)
    wx.setStorageSync('records', records)
  },

  updateLastRecord: function(record) {
    var records = wx.getStorageSync('records') || []
    records[0] = record
    wx.setStorageSync('records', records)
  },

  updatePickerToLast: function() {
    let records = wx.getStorageSync('records');
    var date = new Date(records[0].signTime);

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[0] = date.getFullYear() - 1990;
    data.multiIndex[1] = date.getMonth();
    data.multiIndex[2] = date.getDate() - 1;
    data.multiIndex[3] = date.getHours();
    data.multiIndex[4] = date.getMinutes();
    data.multiIndex[5] = date.getSeconds();

    this.setData(data);
  },

  editLastRecord: function(e) {
    this.updatePickerToLast();
  },

  showLastRecord: function() {
    let records = wx.getStorageSync('records');
    var tmp_lastRecord = {};
    var tmp_date = new Date(records[0].signTime);

    if (records.length > 0) {
      tmp_lastRecord.dateText = util.formatTime(records[0].signTime, 'Y/M/D h:m:s');
      tmp_lastRecord.date = tmp_date;

      this.setData({
        lastRecord: tmp_lastRecord
      })
    }
  },

})