// pageShop/codePay/codePay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: ''
  },

  change: function (e) {
    console.log(e)
    this.setData({
      value: e.detail.value
    });
  }
})