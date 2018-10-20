import ReduxConnect from './../../../assets/libs/redux/ReduxConnect.js';
import { updateAuth } from './../../../redux/actions/action.js';
import store from './../../../redux/index.js';
import http from './../../../utils/http.js';

// 此处定义的参数只会执行一次
Component(ReduxConnect({
  externalClasses: ['out_class'],
  /**
   * 组件的属性列表
   */
  properties: {
    text: {   // 设置默认的显示文字
      type: String,
      value: '立即授权'
    },
    type: {   // 设置默认的按钮类型
      type: String,
      value: 'getUserInfo'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hasAuth: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 授权成功后的回调
    getUserInfo: function (res) {
      if (res.detail.errMsg === 'getUserInfo:ok') {
        updateAuth(true)
        this.triggerEvent('success')

        // 默认更新用户头像和昵称
        let userInfo = res.detail.userInfo
        let req = {
          headImage: userInfo.avatarUrl ,
          nickName: userInfo.nickName
        }
        http('updateAuthorize', req)
      }
    }
  },
  // 初始化操作
  ready: function (e) {
    // 初始化数据
    const {base } = store.getState();
    this.setData({
      hasAuth: base.hasAuth
    })
    if (!base.hasAuth) {
      wx.getSetting({
        success: (res) => {
          updateAuth(res.authSetting && res.authSetting['scope.userInfo'] ? true : false)
        }
      })
    }
  }
}, ['base']))
