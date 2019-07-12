Page({
  data: {
    status: 2, // 1成功， 2 失败
  },

  toHome: function () {
    wx.reLaunch({
      url: '/pages/shopHome/shopHome',
    })
  },

  onLoad: function () {
    this.setData({
      status: this.options.status
    })
  }
})