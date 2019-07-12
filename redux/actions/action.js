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

/**
 * 更新验证信息
 */
export const updateValidateInfo = function (key, validate) {
  const validateInfo = {
    key: key,
    validate: validate
  };
  store.dispatch({ type: state.VALIDATE_INFO, validateInfo })
}

// 默认
export default {
  updateCode,
  updateUserInfo,
  updateAuth,
  updateToken,
  updateOpenId,
  updateValidateInfo,
}
