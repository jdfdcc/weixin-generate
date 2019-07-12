// pages/func/func.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  test: function () {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'add',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
      success(res) {
        console.log('---s',res.result) // 3
      },
      fail: console.error
    })
  },
  onLoad: function() {
    wx.cloud.init({
      traceUser: true,
      env: 'chaobenxueyua-d2344a'
    });
  }
})