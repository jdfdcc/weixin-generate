import http from '../../utils/http.js';
import commonHandler from '../../handlers/commonHandler.js';
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  login: function () {
    commonHandler.login()
  },
  
  bindgetphonenumber: function (res) {
   
  }
})