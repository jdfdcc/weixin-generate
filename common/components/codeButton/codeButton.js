import { isMobile } from './../../../utils/validate';
import util from './../../../utils/util.js';
import commonHandler from './../../../handlers/commonHandler.js';



Component({
  externalClasses: ['btn_class'],
  /**
   * 组件的属性列表
   */
  properties: {
    mobile: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    btnTextYzm: '获取验证码'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 倒计时
     * 无需清除定时器，因为当倒计时完成之后会自动清楚
     */
    _timeOver() {
      let time = 60
      let btnTextYzm = ''
      let timeInter = setInterval(e => {
        time--
        btnTextYzm = `${time}s`
        if (time <= 0) {
          btnTextYzm = '获取验证码'
          clearInterval(timeInter)
        }
        this.setData({
          btnTextYzm
        })
      }, 1000)
    },

    // 获取验证码
    getCode () {
      let { mobile } = this.data
      if (isMobile(mobile)) {
        commonHandler.getCode(mobile, res => {
          this._timeOver()
        })
      } else {
        util.toast('请输入正确的手机号')
      }
    }

  }
})
