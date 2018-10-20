Component({
  /**
   * 组件的属性列表
   */
  properties: {
    top: {
      type: String,
      top: '0rpx'
    },
    height: {
      type: String,
      value: '300rpx'
    },
    scrollList: {
      type: Object,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        let {height} = this.data
        for(let i = 0; i < newVal.length; i++) {
          let item = newVal[i]
          item.ani = `_to_left 3s linear 1 ${2 * i}s`
          item.top = Math.random() * (parseInt(height) - 45) + 'rpx'
        }
        this.setData({
          list: newVal
        })
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
