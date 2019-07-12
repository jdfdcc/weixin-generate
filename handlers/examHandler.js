import http from '../utils/http.js';
export default {

  /**
   * 获取每日练习
   */
  getExercise: function (cb) {
    http('getExercise').then(res => {
      console.log('getExercise', res);
      cb && cb(res.data);
    })
  },
  /**
   * 获取章节列表
   */
  getChapterList: function (req, cb) {
    http('getChapterList', req).then(res => {
      console.log('getExercise', res);
      cb && cb(res.data);
    })
  },

  /**
   * 获取章节列表
   */
  getChapterDetail: function (req, cb) {
    http('getChapterDetail', req).then(res => {
      console.log('getChapterDetail', res);
      cb && cb(res.data);
    })
  },
}