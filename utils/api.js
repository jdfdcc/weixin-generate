// import STORAGE_KEY from './../config/storage.js';
import { updateCode } from './../redux/actions/action.js';
import store from '../redux/index.js';

const mta = require('../assets/libs/mta_analysis.js');

/**
 * @name  获取code
 * @param promise
 */
export let getCode = function () {
  let code = store.getState().base.code
  return new Promise((resolve, reject) => {
    if (code) {
      resolve(code)
    } else {
      wx.login({
        timeout: 3000,
        success: res => {
          // @toDelete
          updateCode(res.code)
          code = res.code
          resolve(code)
        },
        fail: res => {
          reject(res)
        }
      })
    }

  })
}

/**
 * @name 获取用户信息
 */
export let getUserInfo = function () {
  let userInfo = wx.getStorageSync(STORAGE_KEY.USERINFO)
  return new Promise((resolve, reject) => {
    if (userInfo) {
      resolve(userInfo)
    } else {
      wx.getUserInfo({
        withCredentials: true,
        success: res => {
          userInfo = res
          wx.setStorageSync(STORAGE_KEY.USERINFO, userInfo)
          resolve(userInfo)
        },
        fail: res => {
          reject(res)
        }
      });
    }
  })
}

/**
 * 埋点设置
 */
export const eventStart = function (event) {
  console.log(event);
  mta.Event.stat(event);
}

/**
 * 初始化埋点设置
 */
export const eventInit = function (isFirst = false) {
  if (isFirst) {
    mta.App.init({
      "appID": "500624141",
      "eventID": "500625297",
      "statPullDownFresh": true,
      "statShareApp": true,
      "statReachBottom": true
    });
  } else {
    mta.Page.init();
  }
}

/**
 * 初始化信息（是否认证，code 等）
 */
export const initPageData = function () {
  // 初始化code
  getCode()
}

export default {
  getCode,
  getUserInfo,
  initPageData,
  eventStart,
  eventStat: eventStart,
  eventInit
}
