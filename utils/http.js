/**
 * @name 调用后台获取用户数据
 */
import API from './../api/api.js';
import APP from './api.js'
import util from './util.js';
import { deepCopy} from './tools.js';
const httpList = []
let isLoadding = false // loadding是否已经存在



/**
 * @name  调用后台请求
 * @param key api.js配置的key信息
 * @param data 请求数据
 * @param urlData 无论什么请求都拼接在地址后面
 * @param loadText 加载显示内容
 */
const http = function (key, data, urlData, loadText = '加载中') {
  data = deepCopy(data)
  urlData = deepCopy(urlData)
  const apiConfig = API[key]
  // 根据请求方法组建对应的接口请求对象数据
  if (apiConfig.method === 'GET' && data) {
    if (data[key] || data[key] === 0) {
      apiConfig.url +=`${key}=${data[key]}&`
    }
  } else {
    // 去除参数为null或者undefined的对象
    for (let key in data) {
      if (!data[key] && data[key] !== 0) delete data[key]
    }
  }
  // 跟在后面的参数
  if (urlData) {
    if (typeof urlData === 'string') {
      apiConfig.url += urlData
    } else {
      for (let key in urlData) {
        if (urlData[key] || urlData[key] === 0) {
          apiConfig.url += `${key}=${urlData[key]}&`
        }
      }
    }
  }
  
  apiConfig.loading && httpList.push(key)
  // 进行请求加载处理
  if (apiConfig.loading && !isLoadding && httpList.length === 1) {
    isLoadding = true
    wx.showLoading({
      title: loadText,
      mask: true
    })
    wx.showNavigationBarLoading()
  }


  return new Promise((resolve, reject) => {
    let opt = {
      data: data,
      //（需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { },
      // 如果设为json，会尝试对返回的数据做一次 JSON.parse
      dataType: 'json',
      
      body: {},

      success: function (res) {
        console.log('返回数据', res)
        if (+res.data.status === 0) {
          resolve(res.data)
          // 当后台返回用户未注册并且当前接口设置为自动处理未注册信息的时候执行
        } else {
          // 自动提示
          apiConfig.autoToast && util.toast(data.message || data.errorMsg)
          reject(res)
        }
      },

      fail: function (res) {
        apiConfig.autoToast && util.toast(res.errMsg)
        reject(res)
      },
      
      // 接口调用结束的回调函数（调用成功、失败都会执行）
      complete: function () {
        apiConfig.loading && httpList.pop()

        // 设置延时关闭加载框 防止多次连续调用导致加载框闪动
        setTimeout(e => {
          if (httpList.length === 0 && apiConfig.loading) {
            wx.hideLoading()
            isLoadding = false
            wx.hideNavigationBarLoading()
          }
        }, 300)
       
      },
      ...apiConfig
    }
    // 获取登陆code传入到后台
    APP.getCode().then(code => {
      opt.header["code"] = code
      opt.header['Access-Control-Max-Age'] = '86400'
      opt.header['resource'] = 'orderLite'
      let requestTask = wx.request(opt)
    })
  })
}

module.exports = http
