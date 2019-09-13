/**
 * @name 调用后台获取用户数据
 */
import API from './../api/api.js';
import store from '../redux/index.js';
import APP from './api.js'
import util from './util.js';
import { deepCopy, clearObj } from './tools.js';
const httpList = []
let isLoadding = false // loadding是否已经存在
let token = '';
// 设置请求对象的基本属性
const defaultObj = {
  loading: false,
  autoToast: true, // 当请求失败的情况下是否直接toast提示
  cacheTime: 1000, // GET 请求缓存的额时间
};
/**
 * @name  调用后台请求
 * @param key api.js配置的key信息
 * @param data 请求数据
 * @param urlData 无论什么请求都拼接在地址后面
 * @param loadText 加载显示内容
 */
const http = function (options, params, url, text = '加载中') {
  let apiConfig, key, data = params, urlData = url, loadText = text;
  if (typeof options === 'string') {
    key = options;
    apiConfig = deepCopy(API[key]);
  } else {
    // 如果传入的为对象的时候则初始化数据
    key = options.api;
    apiConfig = { ...deepCopy(API[key]), ...options };
    options.data && (data = options.data);
    options.urlData && (urlData = options.urlData);
    options.loadText && (loadText = options.loadText);
  }

  apiConfig = { ...defaultObj, ...apiConfig };
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
      data: clearObj(data),
      //（需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { },
      // 如果设为json，会尝试对返回的数据做一次 JSON.parse
      dataType: 'json',
      
      success: function (res) {
        console.log('返回数据', res)
        const data = res.data;
        if (+data.status === 0 || +data.code === 0) {
          if (data.data && typeof data.data === 'string') {
            data.data = JSON.parse(data.data)
          }
          resolve(data)
          // 当后台返回用户未注册并且当前接口设置为自动处理未注册信息的时候执行
        } else {
          // 自动提示
          apiConfig.autoToast && util.toast(data.msgs || '服务器异常')
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
      // const token = store.getState().base.token;
      opt.header["code"] = code;
      opt.header['Access-Control-Max-Age'] = '86400';
      opt.header['resource'] = 'orderLite';
      
      opt.url += `&code=${code}`;
      // 自动登录
      if (!apiConfig.noLogin) {
        login(token => {
          opt.header['token'] = token;
          let requestTask = wx.request(opt)
        })
      } else {
        let requestTask = wx.request(opt);
      }
    })
  })
}

const login = function (cb) {
  if (token) {
    cb && cb(token);
  } else {
    http({
      api: 'login',
      noLogin: true,
    }).then(res => {
      token = res.data.session_key;
      cb && cb(res.data.session_key);
    })
  }
  
}
module.exports = http

