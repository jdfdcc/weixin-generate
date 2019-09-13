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
const config = function (url, method = 'GET', loading = true, autoToast = true, autoReg = true) {
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
  getObjectList: config(`${http.LITE}?c=apiSubject&a=subjects&`, 'GET', false, false, false,),
  login: config(`${http.LITE}?c=apiuser&a=wxlogin&`),
  getUserInfo: config(`${http.LITE}?c=apiuser&a=mine&`),
  getHomeConfig: config(`${http.LITE}?c=apihome&a=home&`), // 首页接口
  getExercise: config(`${http.LITE}?c=apihome&a=topics&`), // 每日练习
  getShopList: config(`${http.LITE}?c=apihome&a=subjects`), // 获取题库列表
  getSubjectType: config(`${http.LITE}?c=apihome&a=subjectclass`), // 获取分类接口
  pay: config(`${http.LITE}?c=apipay&a=pay`), // 获取支付信息
  getSubjectDetail: config(`${http.LITE}?c=apiSubject&a=newsubjectsdetails`), // 获取科目详情
  getPayDetail: config(`${http.LITE}?c=apipay&a=pay_detail`), // 获取科目详情
  setSubject: config(`${http.LITE}?c=apiSubject&a=setsubject`), // 获取科目详情
  getChapterList: config(`${http.LITE}?c=apiSubject&a=chapters`), // 获取科目详情
  getChapterDetail: config(`${http.LITE}?c=apisubject&a=topics`), // 获取科目详情

  answerQuestion: config(`${http.LITE}?c=apiSubject&a=dosubject`,'GET', false, false, false, false), // 收集答题情况

  api: config(`${http.LITE}`), // 公共地址

  // 我的错题
  corrents: config(`${http.LITE}?c=apiSubject&a=corrents`),
  correntdetails: config(`${http.LITE}??c=apiSubject&a=correntdetails`),
  // 全真模拟
  simulations: config(`${http.LITE}?c=apiSubject&a=simulations`),

}
export const httpObj = http
