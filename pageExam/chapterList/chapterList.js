import examHandler from '../../handlers/examHandler.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },

  toExercise: function (e) {
    const { g_question_completed, g_sid, g_id } = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pageExam/makeExam/makeExam?id=${g_id}&sid=${g_sid}&type=subject&index=${g_question_completed}`,
    })
  },
  onReady: function () {
    const { id } = this.options;
    examHandler.getChapterList({ pageNo: 0, pageSize: 1000,id}, res => {
      console.log('res', res);
      this.setData({
        dataList: res,
      });
    })
  }
})