// pages/shopHome/shopHome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [{ "g_id": "79", "g_name": "1", "g_remark": "3", "g_status": "1", "g_money": "2.00", "g_type": "", "g_isrecommend": "0", "g_content": "http://m.chaobenxueyuan.com/Static/Uploads/image/20180813/20180813093812_91480.jpeg", "g_classType": "", "g_buycount": 0, "g_usersImg": ["180318222607790.100.100.0.2423", "180315085409829.100.100.0.2654"], "fee": [] }, { "g_id": "76", "g_name": "超本题库综合技术测试", "g_remark": "超本题库综合技术测试", "g_status": "0", "g_money": "0.01", "g_type": "系统班", "g_isrecommend": "0", "g_content": "<p>\r\n\t<img src=\\\"/Static/Uploads/image/20180813/20180813093812_91480.jpeg\\\" alt=\\\"\\\" />\r\n</p>\r\n<p>\r\n\t<img src=\\\"/Static/Uploads/image/20180813/20180813101947_90508.jpg\\\" alt=\\\"\\\" />\r\n</p>", "g_classType": "系统班", "g_buycount": 0, "g_usersImg": ["180318222607790.100.100.0.2423", "180315085409829.100.100.0.2654"], "fee": [{ "g_id": "10", "g_subject_id": "76", "g_time": "2年", "g_fee": "5", "g_remark": "" }, { "g_id": "9", "g_subject_id": "76", "g_time": "1年", "g_fee": "4", "g_remark": "" }, { "g_id": "8", "g_subject_id": "76", "g_time": "半年", "g_fee": "3", "g_remark": "" }, { "g_id": "7", "g_subject_id": "76", "g_time": "3个月", "g_fee": "2", "g_remark": "" }, { "g_id": "6", "g_subject_id": "76", "g_time": "1个月", "g_fee": "1", "g_remark": "" }] }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { shopList} = this.data
    console.log(shopList)
  }
})