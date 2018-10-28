import http from './../utils/http.js';
import api from './../utils/api.js';
import { updateToken, updateOpenId, updateUserInfo as updateUser } from './../redux/actions/action.js'
import store from './../redux/index.js';
import { httpObj } from '../api/api.js';

// 更新用户信息
function updateUserInfo(cb) {
  wx.getUserInfo({
    success: function (res) {
      console.log('用户信息', res)
      if (res.errMsg === 'getUserInfo:ok') {
        const userInfo = JSON.parse(res.rawData);
        updateUser(userInfo);
        cb && cb()
      }
    }
  })
}

const login = function login () {
  http('login').then(res => {
    updateToken(res.data.session_key);
    updateOpenId(res.data.openid);
    updateUserInfo(res => {
      wx.switchTab({
        url: '/pages/questionHome/questionHome',
      })
    })
  })
}
/**
 * 公共逻辑处理层
 * 判断两个数据是否相同
 */
const compareArray = function (array = [], array2 = []) {
  if (array.length != array2.length) {
    return false
  }

  for(let i = 0; i < array.length; i++) {
    let res = array2.findIndex(value => {
      return value === array[i]
    })
    if (res === -1) {
      return false
    }
  }

  return true

}
export default {
  compareArray,
  login
}
