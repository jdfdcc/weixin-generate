import { drawImage, compareObj} from '../../utils/tools.js';
import http from "../../utils/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '2-60',
    testValue: '',
    mobile: '13771152499',
    show: false,
    list: []
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
  },

  pay: function(){
    http('pay', { total_fee: 1 }).then(res => {
      console.log(res)
      /**
       * {"state":1,"timeStamp":"1551535100","nonceStr":"pklauHvscAROLTWgTshRQoKmHHYggkqM","signType":"MD5","package":"prepay_id=wx0221582067067369cd3f0fda0632816079","paySign":"A9DCDEC89F26DC7098452B7125285C13","out_trade_no":1551535100}
       */
      wx.requestPayment({
        ...res.data,
        success(res) {
          console.log('支付成功')
         },
        fail(res) {
          console.log('支付失败')
        }
      })
    })
  }
})