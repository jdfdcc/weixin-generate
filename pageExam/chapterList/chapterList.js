import examHandler from '../../handlers/examHandler.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },

  toExercise: function (e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pageExam/makeExam/makeExam?id=${item.g_id}&sid=${item.g_sid}&type=subject`,
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