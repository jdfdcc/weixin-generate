import config from './config.js';
import commonHandler from '../../handlers/commonHandler.js';
Page({
  data: {
    itemList: config,
    wxUser: {},
  },

  toUpdateAccount: function () {
    wx.navigateTo({
      url: '/pages/updateAccount/updateAccount',
    })
  },
  onLoad() {
    commonHandler.getUserInfo(user => {
      console.log(user)
      this.setData({
        wxUser: user
      })
    })
  }
})