import http from './../utils/http.js';
import api from './../utils/api.js';
import { updateHolderInfo, isMaster, updateUserInfo } from './../redux/actions/action.js'
import store from './../redux/index.js';
import { httpObj } from '../api/api.js';


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
  compareArray
}
