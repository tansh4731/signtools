const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
  },

  onLoad: function(options) {
  },

  onShow: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let records = wx.getStorageSync('records');
    var sort_records = util.storageSort(records);
    var tmp_logs = [];
    var index = 0;
    var date_index = -1;
    var pre_date = 0;

    for (var ii in sort_records) {
      var record = sort_records[ii];
      var date = new Date(record.signTime);
      if (date.getDate() + date.getMonth() * 35 + date.getFullYear() * 500 != pre_date) {
        pre_date = date.getDate() + date.getMonth() * 35 + date.getFullYear() * 500;
        index = 0;
        var Ymd = util.formatYmdByDate(date);

        date_index = date_index + 1;
        tmp_logs[date_index] = {
          date: Ymd,
          times: []
        }
      }

      tmp_logs[date_index].times[index] = util.formatHmsByDate(date);
      index = index + 1;
    }

    this.setData({
      logs: tmp_logs
    })
  },

})