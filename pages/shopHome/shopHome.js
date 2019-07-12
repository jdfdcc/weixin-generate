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
    this.getShopList();
    this.getShopType();
  },

  getShopType: function () {
    shopHandler.getSubjectType(data => {
      data.unshift({
        g_id: '',
        g_class: '全部'
      })
      this.setData({
        subjects: data
      })
    });
  },

  /**
   * 选择分类
   */
  chooseType: function (e) {
    console.log(e.detail);
    const item = e.detail;
    this.getShopList({
      cls: item.g_id,
      hasBuy: "",
    })
  },

  getShopList: function (req = {}) {
    shopHandler.getShopList(req, data => {
      console.log(data)
      const { quesList } = data;
      this.setData({
        shopList: quesList
      })
    })
  },

  // 选择客户
  chooseCourse: function (e) {
    console.log(e.detail);
    const item = e.detail;
    wx.navigateTo({
      url: `/pageShop/shopDetail/shopDetail?id=${item.id}`,
    })
  },

  switchSubject: function(e) {
    const item = e.detail;
    console.log(item);
    shopHandler.setSubject({
      subjectId: item.id,
      subjectName: item.title,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
  }
})