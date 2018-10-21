// pages/shopHome/shopHome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: ['首页', '语文', '数学', '物理', '化学', '英语', '哲学', '哲学', '哲学'],
    shopList: [1, 2, 3, 4, 5]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { shopList} = this.data
    console.log(shopList)
  }
})