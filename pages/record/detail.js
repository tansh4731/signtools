const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];

for (let i = 2018; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}

for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}

for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}

for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}

for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
Page({
  data: {
    time: '',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, 0, 0, 0, 0],
  },
  //获取时间日期
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]]
    const month = this.data.multiArray[1][index[1]]
    const day = this.data.multiArray[2][index[2]]
    const hour = this.data.multiArray[3][index[3]]
    const minute = this.data.multiArray[4][index[4]]
    this.setData({
      time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    })
    console.log(this.data.time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  }
})