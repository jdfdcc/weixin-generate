// 图片加载个数
let imgLoadIndex = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 传入的图片列表
    imgList: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showContext: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imgLoaded: function () {
      let { imgList }  = this.properties
      //  图片加载完成之后\
      imgLoadIndex ++
      if (imgLoadIndex === imgList.length) {
        this.setData({
          showContext: false
        })
      }
    }
  },

  /**
   * 当组件完成布局之后
   */
  ready: function (e) {
    imgLoadIndex = 0
  }
})
