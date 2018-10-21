import http from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getObjectList () {
    http('getObjectList').then(res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  
  bindgetphonenumber: function (res) {
    wx.switchTab({
      url: '/pages/questionHome/questionHome',
    })
  }
})