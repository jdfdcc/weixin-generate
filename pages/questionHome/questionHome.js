import config from '../../config/config.js';
import commonHandler from '../../handlers/commonHandler.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeObj: {},
  },

  chooseSub: function () {
    wx.navigateTo({
      url: '/pageShop/chooseSub/chooseSub',
    })
  },

  toItem: function (e) {
    const { item } = e.currentTarget.dataset;
    const { homeObj } = this.data;
    if (!homeObj.currentQB.name) {
      wx.showToast({
        title: '请先选择题库',
        icon: 'none',
      })
      return;
    }
    switch (item.id){
      case '2':
        wx.navigateTo({
          url: '/pageExam/makeExam/makeExam',
        });
        break;
      case '3':
        wx.navigateTo({
          url: `/pageExam/chapterList/chapterList?id=${homeObj.currentQB.id}&api=getChapterList`,
        });
        break;
      case '5':
        wx.showToast({
          title: '敬请期待...',
          icon: 'none'
        });
        break;
      case '4':
        wx.navigateTo({
          url: `/pageExam/chapterList/chapterList?id=${homeObj.currentQB.id}&api=corrents`,
        });
        break;
    }
  },
  onShow: function () {
    commonHandler.getHomeConfig(result => {
      this.setData({ homeObj: result })
    })
  },
})
