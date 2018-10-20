import config from './config.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: '1-0', // 1表示多少年 2表示多少岁
      observer: function (newVal, oldVal, changedPath) {
        if (!newVal) return
        let tempArray = newVal.split('-')
        let tab = +tempArray[0]
        if (tab === 1) {
          this.setData({
            selectValue: this._getValueIndex('years', tempArray[1]),
            datas: config.years,
            tab
          })
        } else if(tab === 2) {
          this.setData({
            selectValue: this._getValueIndex('ages', tempArray[1]),
            datas: config.ages,
            tab
          })
        }
        // 当数值改变的时候返回
        this.triggerEvent('ok', {
          tab: this.data.tab,
          value: this.data.chooseValue
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectValue: [0],
    datas: config.years,
    tab: 1,
    chooseValue: config.years[0]
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 改变的时候选项
    bindChange(e){
      const index = e.detail.value[0]
      const key = this.data.tab === 1 ? 'years' : 'ages'
      this.data.chooseValue = config[key][index]
    },
    
    // 关闭
    close(){
      this.setData({
        show: false
      })
    },

    // 点击了确定按钮
    submit () {
      this.triggerEvent('ok', {
        tab: this.data.tab,
        value: this.data.chooseValue
      })
      this.close()
    },

    // 点击了页面按钮
    chooseTab(e){
      let {tab } = this.data
      let id = +e.currentTarget.dataset.id
      if (tab === id) {
        return
      }
      
      if (id === 1) {
        // 选择多少年
        this.setData({
          datas: config.years,
          tab: id,
          selectValue: [0],
          chooseValue: config.years[0]
        })
      } else {
        // 选择保多少岁
        this.setData({
          datas: config.ages,
          tab: id,
          selectValue: [0],
          chooseValue: config.ages[0]
        })
      }
    },

    // 获取数据的下标
    _getValueIndex (key, value) {
      for(let i = 0; i < config[key].length; i++) {
        this.data.chooseValue = config[key][i]
        if (config[key][i].value == value) {
          return [i]
        }
      }
      return [0]
    }
  },
  ready () {
    
  }
})
