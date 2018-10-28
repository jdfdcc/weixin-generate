// 更新用户信息
import state from '../constants.js';
import store from '../index.js';

// 更新code信息
export const updateCode = function (code) {
  store.dispatch({ type: state.CODE, code: code})
}

// 更新用户信息
export const updateUserInfo = function (userInfo) {
  store.dispatch({ type: state.USER_INFO, userInfo: userInfo })
}

// 更新用户是否授权
export const updateAuth = function (hasAuth){
  store.dispatch({ type: state.HAS_AUTH, hasAuth: hasAuth })
}
export const updateToken = function (token) { 
  store.dispatch({ type: state.TOKEN, token: token })
}
export const updateOpenId = function (openId) { 
  store.dispatch({ type: state.OPENID, openId: openId })
}

// 默认
export default {
  updateCode,
  updateUserInfo,
  updateAuth,
  updateToken,
  updateOpenId,
}
