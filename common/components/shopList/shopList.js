// common/components/shopList/shopList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subjects: {
      type: Array,
      value: [{
        title: '首页',
        id: '9999',
        type: 'all' // 类型
      }],
      observer: function(newVal, oldVal) {
        newVal.unshift({
          title: '首页',
          id: '9999',
          type: 'all' // 类型
        });
        this.setData({ subjects: newVal })
      }
    },
    shopList: {
      type: Array,
      value: []
    }
  },
  data: {
    chooseId: '9999'
  },
  methods: {
    /**
     * 选择客户
     */
    chooseSubJect: function (e) {
      const item = e.currentTarget.dataset.item;
      this.setData({
        chooseId: item.id
      });
    }
  }
})
