import ReduxConnect from '../../assets/libs/redux/ReduxConnect.js';
import config from '../../config/config.js';

Page(ReduxConnect({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    headerImage: config.defaultImage,
    itemList: [{
      src: 'lx.png',
      title: '智能练习',
      context: 'AI人工智能 为你推荐30道题目'
    }, {
      src: 'zx.png',
      title: '专项测试',
      context: '分章节 考点 题型 进行专项测试'
    }, {
      src: 'mni.png',
      title: '全真模拟',
      context: '名师团队组卷 打造模拟考试'
    }, {
      src: 'errq.png',
      title: '错题回顾',
      context: '解决掉错题 把分数拿下'
    } ]
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
    wx.hideTabBar();
  },
  /**
   * 跳转到练习页面
   */
  toItem: function () {
    wx.navigateTo({
      url: '/pages/exam/exam',
    })
  }
}, ['base']))
