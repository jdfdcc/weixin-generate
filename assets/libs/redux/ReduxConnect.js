// 过滤器 用来判断是否登陆
import store from '../../../redux/index.js';
import { compareObj, deepCopy } from '../../../utils/tools.js';

// 根据监听修改数据
const _updateData = function (keys, _stateUpdated, from = "init") {
  let tempDataJson = {}, tempData = {}
  const state = store.getState()
  let tempObj = {}
  // 判断是否存在多个key值
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    tempObj = Object.assign(tempObj, state[key])
  }
  for (const tkey in this.data) {
    if (tempObj.hasOwnProperty(tkey)) {
      tempData[tkey] = tempObj[tkey]
      tempDataJson[tkey] = this.data[tkey]
    }
  }
  // 如果当前的data和得到的data数据大小一致的话则不需要重新渲染
  if (!compareObj(tempData, tempDataJson)) {
    this.setData(tempData, e => {
      // console.log('------------', from)
    })
    // 增加钩子函数---当数据更新的时候
    _stateUpdated && _stateUpdated.call(this)
  }
}

/**
 * 连接器
 */
const REDUX = function (pageObj, keys = ['base']) {

  let _ready, _detached, _stateUpdated
  _ready = pageObj.ready || pageObj.onReady
  _detached = pageObj.detached;
  _stateUpdated = pageObj.stateUpdated;
  let unsubscribe = function () { };

  pageObj.onReady = pageObj.ready = function (options) {
    unsubscribe = store.subscribe(() => {
      // 统一处理数据
      _updateData.call(this, keys, _stateUpdated, 'listion')
      // _stateUpdated && _stateUpdated.call(this)
    });
    _updateData.call(this, keys)
    _ready && _ready.apply(this, options)
  }

  pageObj.detached = function (options) {
    // console.log('------I,m detached')
    // 当页面离开的时候,清除订阅
    unsubscribe()
    _detached && _detached.apply(this, options)
  }
  return pageObj;
}

export default REDUX
