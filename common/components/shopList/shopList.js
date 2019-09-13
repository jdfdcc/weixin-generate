Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 1, // 1表示购买 2 表示 选择
    },
    subjects: {
      type: Array,
      value: [{
        g_class: '全部',
        g_id: ''
      }]
    },
    shopList: {
      type: Array,
      value: []
    }
  },
  data: {
    chooseId: ''
  },
  methods: {
    /**
     * 选择科目类别
     */
    chooseSubJect: function (e) {
      const item = e.currentTarget.dataset.item;
      this.setData({
        chooseId: item.g_id
      });
      this.triggerEvent('chooseType', item);
    },

    /**
     * 选择题库
     */
    chooseItem: function (e) {
      const item = e.currentTarget.dataset.item;
      this.triggerEvent('choose', item);
    },

    chooseSubjectToStudy: function (e) {
      const item = e.currentTarget.dataset.item;
      wx.showModal({
        title: '切换科目',
        content: `确定切换到${item.title}科目吗？`,
        success: res => {
          // 科目切换
          if (res.confirm) {
            this.triggerEvent('switch', item);
          }
        }
      })
    }
  }
})
