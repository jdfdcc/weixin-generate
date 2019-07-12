import http from '../utils/http.js';

export default {
  getShopList: function (req, cb) {
    http("getShopList", req).then(res => {
      cb && cb(res.data);
    })
  },

  /**
   * 获取科目详情
   */
  getShopDetail: function (sid, cb) {
    http('getSubjectDetail', { sid }).then(res => {
      cb && cb(res.data);
    })
  },

  /**
   * 获取科目分类
   */
  getSubjectType: function (cb) {
    http('getSubjectType').then(res => {
      console.log('科目分类', res);
      cb && cb(res.data)
    })
  },

  /**
   * 切换当前科目
   */
  setSubject: function (req, cb) {
    http('setSubject', req).then(res => {
      cb && cb(res.data)
    })
  }
}