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

  /**
   * 收藏错题
   * sid
   * cid
   * tid
   * type 0历史 1收藏 2错题 3笔记
   * answer 
   */
  collectQuestion: function (req, cb) {
    http('answerQuestion', req).then(res => {
      console.log('answerQuestion', res);
      cb && cb(res.data);
    })
  },

  /**
   * 全真模拟
   * c=apiSubject&a=simulations
   */
  simulations: function (req) {
    const reqT = {
      c: 'apiSubject',
      a: 'simulations'
    };
    http('api', {...req ,...reqT}).then(res => {
      console.log('api', res);
      cb && cb(res.data);
    })
  }
}