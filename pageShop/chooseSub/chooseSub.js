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
    this.getShopList({
      hasBuy: "1",
    });
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
      hasBuy: "1",
    })
  },

  getShopList: function (req = {}) {
    shopHandler.getShopList(req, data => {
      const { quesList } = data;
      this.setData({
        shopList: quesList
      })
    })
  },

  // 选择客户
  chooseCourse: function (e) {
    // console.log(e.detail);
    const item = e.detail;
    wx.showModal({
      title: '切换科目',
      content: `确定切换到${item.title}科目吗？`,
      success: res => {
        if (res.confirm){
          shopHandler.setSubject({
            subjectId: item.id,
            subjectName: item.title,
          }, () => {
            wx.reLaunch({
              url: '/pages/questionHome/questionHome',
            })
          });
        }
      }

    })
    
    // wx.navigateTo({
    //   url: `/pageShop/shopDetail/shopDetail?id=${item.id}`,
    // })
    console.log('选择题库', e)
  },

  toBuyQuestion: function () {
    wx.switchTab({
      url: '/pages/shopHome/shopHome',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
  }
})