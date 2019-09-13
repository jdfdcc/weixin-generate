import http from './../utils/http.js';
import api from './../utils/api.js';
import { updateToken, updateOpenId, updateUserInfo as updateUser } from './../redux/actions/action.js'
import store from './../redux/index.js';
import { httpObj } from '../api/api.js';

// 更新用户信息
function updateUserInfo(cb) {
  wx.getUserInfo({
    success: function (res) {
      if (res.errMsg === 'getUserInfo:ok') {
        const userInfo = JSON.parse(res.rawData);
        console.log(userInfo)
        updateUser(userInfo);
        cb && cb(userInfo)
      }
    }
  })
}

/**
 * login
 */
const login = function login () {
  http({
    api: 'login',
    noLogin: true,
  }).then(res => {
    updateToken(res.data.session_key);
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

/**
 * 首页接口
 */
const getHomeConfig = function (cb) {
  http('getHomeConfig').then(res => {
    console.log(res)
    cb && cb(res.data)
  })
}

/**
 * get user info from wechat
 */
const getUserInfo = function (cb) {
  http('getUserInfo').then(res => {
    console.log('用户信息', res);
  })
  updateUserInfo(cb)
}

export default {
  compareArray,
  login,
  getHomeConfig,
  getUserInfo,
}
