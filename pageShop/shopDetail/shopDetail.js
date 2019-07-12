import shopHandler from './../../handlers/shopHandler.js';
Page({
  data: {
    shopDetail: {},
  },

  getShopDetail: function () {
    const { id } = this.options;
    shopHandler.getShopDetail(id, detail => {
      this.setData({
        shopDetail: detail
      })
    })
  },

  onReady: function(){
    this.getShopDetail();
  },

  toPay: function () {
    const { shopDetail } = this.data;
    console.log(shopDetail);
    wx.navigateTo({
      url: '/pageShop/shopPay/shopPay?sid=' + shopDetail.g_id,
    })
  },
})