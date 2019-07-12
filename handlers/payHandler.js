import http from '../utils/http.js';
// appId, nonceStr, package, signType, timeStamp
import utils from './../utils/util.js';

export default {
  wxPay: function (req) {
    http('pay', req).then(res => {
      console.log('获取支付结果', res);
      wx.requestPayment(
        {
          ...res.data,
          success: function (res) { 
            console.log('支付成功', res);
            wx.navigateTo({
              url: '/pageShop/payResult/payResult?status=1',
            })
          },
          fail: function (res) {
            // wx.navigateTo({
            //   url: '/pageShop/payResult/payResult?status=2',
            // })
          },
          complete: function (res) {
           if (res.errMsg !== 'requestPayment:ok' && res.errMsg !== 'requestPayment:fail cancel') {
              utils.toast('支付失败，请重新支付');
            }
          }
        })
    })
  },
  getPayDetailBSid: function (sid, cb) {
    http('getPayDetail', { sid }).then(res => {
      console.log('支付详情', res);
      cb && cb(res);
    })
  }
}
