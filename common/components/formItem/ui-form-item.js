import { toDate } from '../../../utils/tools.js';
import * as validate from '../../../utils/validate.js';
import store from '../../../redux/index.js';
import { updateValidateInfo } from '../../../redux/actions/action.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    validate: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        const { value, item } = this.data;
        this.validateForm(value, item)
      }
    },
    formId: {
      type: String
    },
    hasIcon: {
      type: Boolean,
      value: true
    },
    value: {
      type: null,
      observer: function (newVal, oldVal) {
        const { item } = this.data;
        if (item.type === 'select') {
          item.actions.map((item, index) => {
            if (newVal == item.id) {
              this.setData({ selectIndex: index, dataValue: newVal})
            }
          })
        }
      }
    },
    item: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    endDate: toDate(new Date(), 'yyyy-MM-dd'), // 当日期为生日的时候设置当天为最终日期
    selectIndex: '',
    showError: false,
    errorMsg: '',
    dataValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入框改变的时候触发
    inputChange (e) {
      const { item, selectIndex } = this.data;
      let value = e.detail.value;
      if (item.type === 'select') {
        value = item.actions[+e.detail.value].id;
      }
      this.triggerEvent('change', {
        value: value,
        isPass: this.validateForm(value, item),
        key: this.data.item.key
      })
    },

    // 处理验证不通过的原因
    dealValidateErrorInfo: function (message, isPass, showErrorMsg) {
      const { item, formId } = this.data;
      updateValidateInfo(formId, { [`${item.key}`]: {
        isPass,
        message: message
      }})

      let showError = true;
      if (isPass) {
        showError = false;
        message = '';
      }
      if (!showErrorMsg) {
        message = '';
      }
      this.setData({
        showError,
        errorMsg: message
      })
    },

    // 验证
    validateForm: function (value, item, showError = true) {
      if (item.require && !value) {
        this.setData({
          showError,
          errorMsg: item.placeholder
        })
        return false
      }
      if (value && item.rules && Array.isArray(item.rules) && item.rules.length > 0) {
        for(let i = 0; i < item.rules.length; i++) {
          const tempItem = item.rules[i];
          // 如果是方法的严重
          if (tempItem.fnName) {
            if (!validate[tempItem.fnName](value)) {
              this.dealValidateErrorInfo(tempItem.message, false, showError);
              return false
            }
          } else {
            // 正则的严重
            const regExp = new RegExp(tempItem.pattern);
            if (!regExp.test(value)) {
              this.dealValidateErrorInfo(tempItem.message, false, showError);
              return false
            }
          }
        }
      }
      this.dealValidateErrorInfo('', true);
      return true;
    },

    focus: function () {
      this.setData({
        showError: false,
        errorMsg: ''
      });
    },

    clearValue(e){
      const { item } = this.data;
      this.triggerEvent('change', {
        value: '',
        isPass: this.validateForm('', item),
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
  },

  ready: function () {
    const { formId } = this.data;
    if (!formId) {
      console.error('请设置formId')
    } else {
      const { value, item } = this.data;
      this.validateForm(value, item, false)
    }
    
  }
})
