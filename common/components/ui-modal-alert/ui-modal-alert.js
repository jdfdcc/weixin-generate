Component({
  externalClasses: [''],
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        const { animation } = this.data;
        if (animation === '') {
          this.setData({
            showModal: newVal,
          })
        } else {
          if (newVal) {
            this.setData({
              showModal: true,
              animated: `${animation} animated`,
            });

          } else {
            this.setData({
              animated: `${animation} animated reverse`,
            });
          }
        }
      }
    },
    position: { // 位置信息
      type: String,
      value: 'center'
    },
    animation: {
      type: String,
      value: "scaleIn"
    }
  },

  data: {
    showModal: false,
    animated: "",
    reverse: ""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    animationend () {
      console.log('动画结束了');
      this.setData({
        animated: '',
        showModal: this.data.show,
      })
    },

    // 用于禁止穿透滚动的事件
    preventD (){},
    /**
     * @name 点击meng
     */
    clickModal() {
      this.triggerEvent('clickModal')
    },
    
    // 用于禁止穿透滚动的事件
    closeModal() { },
  }
})
