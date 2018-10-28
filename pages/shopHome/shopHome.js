import shopHandler from '../../handlers/shopHandler.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects: [],
    shopList: []
  },

  initData: function () {
    shopHandler.getShopList(data => {
      console.log(data)
      const { subjects, quesList } = data;
      this.setData({
        subjects,
        shopList: quesList
      })
    })
  },

  // 选择客户列表

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
  }
})