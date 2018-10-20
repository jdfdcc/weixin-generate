Component({
  externalClasses: [''],
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    position: { // 位置信息
      type: String,
      value: ''
    },
    animation: {
      type: String,
      value: "scaleIn"
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @name 点击meng
     */
    clickModal() {
      this.triggerEvent('clickModal')
    }
  }
})
