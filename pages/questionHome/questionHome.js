// pages/questionHome/questionHome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 跳转到练习页面
   */
  toExam: function () {
    wx.navigateTo({
      url: '/pages/exam/exam',
    })
  }
})