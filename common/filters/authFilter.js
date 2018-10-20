// 过滤器 用来判断是否登陆
const loginCheck = function(pageObj) {
  if (pageObj.onLoad) {
    let _onLoad = pageObj.onLoad;
    // 使用onLoad的话需要传递options
    pageObj.onLoad = function (options) {
      // 执行原页面方法
      _onLoad(options)
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 用户已经授权
          } else {
            let route = this.route
            if (this.options) {
              for (const key in this.options) {
                route += `&${key }=${this.options[key]}`
              }
            }
            let url = `/pages/auth/auth?path_to=${route }`
            wx.redirectTo({
              url
            });
          }
        }
      })
    }
  }
  return pageObj;
}

export default loginCheck
