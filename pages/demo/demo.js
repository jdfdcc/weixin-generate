import { drawImage, compareObj} from '../../utils/tools.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '2-60',
    testValue: '',
    mobile: '13771152499',
    show: false,
    list: [{ "openId": "onSoB0dWj4RR8J0iyhlCms-XaAEg", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5Nfq0OSb9yJianxibedpxFSQOkHXaic3AicPgdEFaknribtFXiaTj1c9WrO4WUZ7E6cwe0WLibtRR1W7Jg/132", "content": "成功获得音乐包", "gmt_created": "2018-08-16 19:54:51" }, { "openId": "onSoB0YZx_aqaFo751m9_DCNe8Z0", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWw6jc9D68uHbYvJhpgT7hdZSKwbQtYmCgm0fJbyFIyxSTic435W3QNPVBEUBmGVYoSnmtO91dHqg/132", "content": "正在参与", "gmt_created": "2018-08-16 19:03:11" }, { "openId": "onSoB0WwvWu1osdt2RL9ZRBkKxGs", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoWw8jlcicq2ObFuyyhnN0hicMYKa0MBvIp3yjT5zTbEntMIDs3HHWvYvl0MEiaJj6ntxbGLslebnuxw/132", "content": "正在参与", "gmt_created": "2018-08-16 19:02:51" }, { "openId": "onSoB0dWj4RR8J0iyhlCms-XaAEg", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5Nfq0OSb9yJianxibedpxFSQOkHXaic3AicPgdEFaknribtFXiaTj1c9WrO4WUZ7E6cwe0WLibtRR1W7Jg/132", "content": "成功获得音乐包", "gmt_created": "2018-08-16 17:44:30" }, { "openId": "onSoB0UqNKv3K1awq17Vgk3W32Sk", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epVd97kFD1NyMjCHib0EmLU9pvGIXfG8Znk7RgPSRicmxRkOEibRHA22ESFRVakRgWI6gw3YvBt2gfYw/132", "content": "正在参与", "gmt_created": "2018-08-16 17:26:13" }, { "openId": "onSoB0dWj4RR8J0iyhlCms-XaAEg", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5Nfq0OSb9yJianxibedpxFSQOkHXaic3AicPgdEFaknribtFXiaTj1c9WrO4WUZ7E6cwe0WLibtRR1W7Jg/132", "content": "成功获得音乐包", "gmt_created": "2018-08-16 17:17:26" }, { "openId": "onSoB0fTgIgzAxF3lNXFUjp6myno", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJTH83G2zVZb7xf0vENWlkshib7np644egkIjlHrQPeNjJ34qDu0KgQ8AKU6dBKcheKUy1gmrIdtZQ/132", "content": "正在参与", "gmt_created": "2018-08-16 17:15:01" }, { "openId": "onSoB0SgQPL8kV-5yQr-jBYWmifA", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTISUQZD5d3ibE4y9NLI4dv019VMiaJW1DG6ZK6S7UvBru3ocCNvBibsMCD7VKEp4JPXQ0HbQibicEibHYFw/132", "content": "成功获得音乐包", "gmt_created": "2018-08-16 16:27:41" }, { "openId": "onSoB0ZT6o_rqAk9cooJX6tK7X7g", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqbNDbCVAa6UA3y9BUnWtRIuiaDzLWAiaZEqcaftOW4za7mOUp3q7iaeqLb2IOdibibs5icJhXqia5RudwHw/132", "content": "正在参与", "gmt_created": "2018-08-16 16:25:39" }, { "openId": "onSoB0ZT6o_rqAk9cooJX6tK7X7g", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqbNDbCVAa6UA3y9BUnWtRIuiaDzLWAiaZEqcaftOW4za7mOUp3q7iaeqLb2IOdibibs5icJhXqia5RudwHw/132", "content": "正在参与", "gmt_created": "2018-08-16 16:25:39" }, { "openId": "onSoB0dWj4RR8J0iyhlCms-XaAEg", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5Nfq0OSb9yJianxibedpxFSQOkHXaic3AicPgdEFaknribtFXiaTj1c9WrO4WUZ7E6cwe0WLibtRR1W7Jg/132", "content": "成功获得音乐包", "gmt_created": "2018-08-16 16:07:50" }, { "openId": "onSoB0dWj4RR8J0iyhlCms-XaAEg", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5Nfq0OSb9yJianxibedpxFSQOkHXaic3AicPgdEFaknribtFXiaTj1c9WrO4WUZ7E6cwe0WLibtRR1W7Jg/132", "content": "成功获得音乐包", "gmt_created": "2018-08-16 16:04:39" }, { "openId": "onSoB0dWj4RR8J0iyhlCms-XaAEg", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5Nfq0OSb9yJianxibedpxFSQOkHXaic3AicPgdEFaknribtFXiaTj1c9WrO4WUZ7E6cwe0WLibtRR1W7Jg/132", "content": "成功获得音乐包", "gmt_created": "2018-08-16 15:42:34" }, { "openId": "onSoB0dWj4RR8J0iyhlCms-XaAEg", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5Nfq0OSb9yJianxibedpxFSQOkHXaic3AicPgdEFaknribtFXiaTj1c9WrO4WUZ7E6cwe0WLibtRR1W7Jg/132", "content": "成功获得音乐包", "gmt_created": "2018-08-16 15:37:32" }, { "openId": "onSoB0dWj4RR8J0iyhlCms-XaAEg", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5Nfq0OSb9yJianxibedpxFSQOkHXaic3AicPgdEFaknribtFXiaTj1c9WrO4WUZ7E6cwe0WLibtRR1W7Jg/132", "content": "成功获得音乐包", "gmt_created": "2018-08-16 15:32:26" }, { "openId": "onSoB0TTBuI7Afn5giG7q9oxtlPw", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/4X7xicCK9h7dE4fPVd9iaNBRTZQJzksubwZO8VKRQZ3BQjGOSNE2XnHmTLWWobf3boMdGRcRL5LxhTGhZVQ8G84A/132", "content": "成功获得音乐包", "gmt_created": "2018-08-15 22:30:02" }, { "openId": "onSoB0Sa7bvNGzBMKWn4cAZlIkPI", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCQCWQ4VVm0NC4ks9Pztibf4as95kpuBo9FJmh71DuRVtoibwRkdVCEg6ky5EfZFsdV4icg0iaK71vbg/132", "content": "成功获得音乐包", "gmt_created": "2018-08-15 22:12:10" }, { "openId": "onSoB0Sa7bvNGzBMKWn4cAZlIkPI", "headImage": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCQCWQ4VVm0NC4ks9Pztibf4as95kpuBo9FJmh71DuRVtoibwRkdVCEg6ky5EfZFsdV4icg0iaK71vbg/132", "content": "成功获得音乐包", "gmt_created": "2018-08-15 21:50:41" }]
  },

  changeMobile (e) {
    console.log(e)
    this.setData({
      mobile: e.detail.value
    })
  },

  submit: function (e) {
    this.setData({
      show: true
    })
    
  },
  show: function(e) {
    this.setData({
      show: true
    })
  },
  choose: function (e) {
    console.log(e.detail)
  },

  toRegister: function (e) {
    console.log(e)
    setTimeout(e => {
      console.log('我执行了改变mobile------')
      this.setData({ mobile: 111})
    }, 2000)
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  getElement: function () {
    var query = wx.createSelectorQuery()
    query.select('#ele_test').boundingClientRect()
    wx.createSelectorQuery().select('#ele_test').boundingClientRect(function (rect) {
      rect.id      // 节点的ID
      rect.dataset // 节点的dataset
      rect.left    // 节点的左边界坐标
      rect.right   // 节点的右边界坐标
      rect.top     // 节点的上边界坐标
      rect.bottom  // 节点的下边界坐标
      rect.width   // 节点的宽度
      rect.height  // 节点的高度

      console.log(rect)
    }).exec()
  },

  getAuth : function (e) {
    console.log('22')
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.address',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })

  },

  drawImage: function () {
    let a ='https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCQCWQ4VVm0NC4ks9Pztibf4as95kpuBo9FJmh71DuRVtoibwRkdVCEg6ky5EfZFsdV4icg0iaK71vbg/132';
    let b = 'https://static.iyunbao.com/website/health/iybApp/iyb-wx/activity/qqmusic/qqMusicPoster.png'
    let c = `https://lite-test.iyunbao.com/open/v1/lite/wx/common/getwxacode?scene=321312&biz_type=orderLite&page=`
    drawImage(a, b, c, '里斯')
    // let obj = {name: 1, sex: [1, 2, 3]}
    // let obj2 = { name: 1, sex: [1, 2, 3, 4]}
    // console.log(compareObj(obj, obj2))
  },

  compareObj: function () {
    let obj = undefined
    let obj2 = undefined
    console.log(compareObj(obj, obj2))
  },

  onLoad: function(){
    this.compareObj()
  }
})