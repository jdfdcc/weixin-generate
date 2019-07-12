目录结构

官方文档地址: https://developers.weixin.qq.com/miniprogram/dev/index.html?t=18081810

静态资源地址: https://static.iyunbao.com/website/health/iybApp/程序名称

动画库: https://github.com/daneden/animate.css


```

---api      接口交互配置
---assets   自定义资源文件
---common   公共组件，过滤器，等 存放目录
---config   配置目录 *****废弃(在使用过程中发现需要存储的key很少)
---handlers 数据处理层
---pages    公共模块目录
---packageA 开发模块目录
---redux    状态管理
---utils    工具类目录

```

```
注意点:
1.只能在pages里面设置第一个为首页，分包情况下无法设置分包页面为首页? 提交审核的时候可以修改功能页面
2.redux 使用注意点,记得取消订阅
3.苹果X 设置border的时候 需要设置 box-sizing
4.授权弹窗如果用户很久不响应的话，就会调用失败
5.在远程调试的模式下面,setStorageSync 会报错
6.子组件setData无法改变父组件的值
7.input bindinput从光标从头部删除的时候返回的值为空(部分低端手机,解决方法: 使用bindblur事件)
```

****
  需要在utils/api.js 中修改埋点初始化信息(70行)

****
  建议:
    1、尽量避免使用setStorageSync方法,公共状态使用redux进行处理

    
    2、有优化点及时修正并告知



"tabBar": {
    "selectedColor": "rgb(61, 161, 255)",
    "list": [
      {
        "iconPath": "./assets/images/tab/find.png",
        "selectedIconPath": "./assets/images/tab/find_active.png",
        "pagePath": "pages/shopHome/shopHome",
        "text": "市场"
      },
      {
        "iconPath": "./assets/images/tab/question.png",
        "selectedIconPath": "./assets/images/tab/question_active.png",
        "pagePath": "pages/questionHome/questionHome",
        "text": "试题"
      }
    ]
  },

  ,
  {
    "iconPath": "./assets/images/tab/account.png",
    "selectedIconPath": "./assets/images/tab/account_active.png",
    "pagePath": "pages/account/account",
    "text": "我的"
  }

  ,
      {
        "iconPath": "./assets/images/tab/account.png",
        "selectedIconPath": "./assets/images/tab/account_active.png",
        "pagePath": "pages/account/account",
        "text": "我的"
      }