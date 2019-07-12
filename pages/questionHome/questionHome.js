import ReduxConnect from '../../assets/libs/redux/ReduxConnect.js';
import config from '../../config/config.js';
import commonHandler from '../../handlers/commonHandler.js';

Page(ReduxConnect({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    headerImage: config.defaultImage,
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
    console.log(item)
    switch (item.id){
      case '2':
        wx.navigateTo({
          url: '/pageExam/exam/exam',
        });
        break;
      case '3':
        wx.navigateTo({
          url: `/pageExam/chapterList/chapterList?id=${homeObj.currentQB.id}`,
        });
        break;
    }
  },
  onShow: function () {
    commonHandler.getHomeConfig(result => {
      this.setData({ homeObj: result })
    })
  },
}, ['base']))
