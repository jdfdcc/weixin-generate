import examHandler from '../../handlers/examHandler.js';
import pageSet from './config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',// 列表的样式
    dataList: []
  },

  /**
   * 去进行练习
   */
  toExercise: function (e) {
    const { g_question_completed, g_sid, g_id } = e.currentTarget.dataset.item;
    const { title, api } = pageSet[this.options.api] || {};
    wx.navigateTo({
      url: `/pageExam/makeExam/makeExam?id=${g_id}&sid=${g_sid}&type=subject&index=${g_question_completed}&api=${api}`,
    })
  },

  /**
   * 查询数据
   */
  onShow: function () {
    const { id, api = 'getChapterList' } = this.options;
    const { title, type } = pageSet[api] || {};
    getApp().http({
      api,
      data: {
        pageNo: 0,
        pageSize: 1000,
        id,
        sid: id,
      },
    }).then(res => {
      this.setData({
        dataList: res.data,
        type,
      })
    });
    wx.setNavigationBarTitle({
      title,
    })
  }
})