import { toDate } from '../../../utils/tools.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: null
    },
    item: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    endDate: toDate(new Date(), 'yyyy-MM-dd') // 当日期为生日的时候设置当天为最终日期
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入框改变的时候触发
    inputChange (e) {
      this.triggerEvent('change', {
        value: e.detail.value,
        key: this.data.item.key
      })
    },

    clearValue(e){
      this.triggerEvent('change', {
        value: '',
        key: this.data.item.key
      })
    },

    /**
     * 点击的时候回调函数
     */
    clickItem () {
      this.triggerEvent('click', this.data.item)
    },

    /**
     * 点击右侧icon的时候的回调函数
     */
    clickIcon () {
      this.triggerEvent('clickIcon', this.data.item)
    }

    // 日期改变的时候触发
    // dateChange (e) {
    //   this
    //   this.triggerEvent('change', {
    //     value: e.detail.value,
    //     key: this.data.item.key
    //   })
    // }
  }
})
