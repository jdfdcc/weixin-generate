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
      state.base.openId = action.userInfo.openId
      break;
    case constants.HAS_AUTH:
      state.base.hasAuth = action.hasAuth
      break;
    default:
      break;
  }
  return state
}