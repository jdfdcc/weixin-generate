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
    default:
      break;
  }
  return state
}