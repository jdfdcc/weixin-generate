// 配置具体的请求方式
import httpConfig from './httpConfig.js';

// 环境切换 test uat pro
const http = httpConfig.test

/**
 * @name  生成对于的函数对象
 * @param url 地址
 * @param method 请求方法
 * @param liading 是否显示加载框
 * @param autoToast 当接口失败的时候是否自动进行数据提示
 */
const config = function (url, method = 'POST', loading = true, autoToast = true, autoReg = true) {
  return {
    url,
    method,
    loading,   // 自动显示加载框...
    autoToast, // 自动处理返回数据 直接toast提示
    autoReg,   //  自动处理未注册接口
  }
}

// 配置接口调用方式
export default {
  getObjectList: config(`${http.LITE}?c=apiSubject&a=subjects`, 'GET', false, false, false,),
}
export const httpObj = http
