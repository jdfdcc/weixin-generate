import base from '../states/base.js';
import constants from '../constants.js';
import tempState from '../states/tempState.js';

let baseState = {
  base,
  tempState
}

export default function (state = baseState, action) {
  switch (action.type){
    case constants.CODE:
      state.base.code = action.code
      break;
    case constants.USER_INFO: 
      state.base.user = action.userInfo
      break;
    case constants.HAS_AUTH:
      state.base.hasAuth = action.hasAuth
      break;
    case constants.OPENID:
      state.base.openId = action.openId
      break;
    case constants.TOKEN:
      state.base.token = action.token
      break;
    case constants.VALIDATE_INFO:      // 更新用户详情
      const { key, validate } = action.validateInfo;
      const tempObj = state.base.validate[key] || {};
      const tempValidateObj = { ...tempObj, ...validate }
      for (const indexKey in tempValidateObj) {
        const tempItem = tempValidateObj[indexKey];
        if (!tempItem.isPass) {
          tempObj['allPass'] = false;
          break;
        }
        tempObj['allPass'] = true;
      }
      state.base.validate[key] = tempValidateObj;
      break;
    default:
      break;
  }
  return state
}