export default {
  /**
   * 轻提示
   */
  toast: function (text, cb) {
    wx.showToast({
      title: text,
      icon: "none",
      duration: 3000,
      complete: () => {
        setTimeout(e => {
          cb && cb()
        }, 3000)
      }
    });
  },

  // 复制
  copy(text){
    wx.setClipboardData({
      data: text,
      success: function(res) {
      }
    })
  }
}