import payHandler from '../../handlers/payHandler.js';
import ReduxConnect from '../../assets/libs/redux/ReduxConnect.js';

Page(ReduxConnect({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    chooseItem: {},
    chooseList: []
  },
  chooseItem: function (e) {
    console.log(e.currentTarget.dataset);
    const { item } = e.currentTarget.dataset;
    this.setData({
      chooseItem: item,
    });
  },

  toPay: function () {
    const { chooseItem } = this.data;
    
    let req = {
      sid: chooseItem.g_subject_id,
      sfid: chooseItem.g_id,
    };
    payHandler.wxPay(req)
  },

  onReady: function () {
    payHandler.getPayDetailBSid(this.options.sid, res => {
      this.setData({
        chooseList: res.data,
      })
    })
  }
}, ['base']))