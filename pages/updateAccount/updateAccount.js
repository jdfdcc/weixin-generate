import formData from './../common/config/config.js';
import accountHandler from '../../handlers/accountHandler.js';
import utils from '../../utils/util.js';
import { dateToAge } from '../../utils/tools.js';
import ReduxConnect from '../../assets/libs/redux/ReduxConnect.js';
import config from '../../config/config.js';
import { updateCustomerInfo, showLoading } from '../../redux/actions/action.js';
import api from '../../utils/api.js';


Page(ReduxConnect({

  /**
   * 页面的初始数据
   */
  data: {
    formList: formData,
    defaultImage: config.defaultImage,
    customerInfo: {},
    formObj: {
      customerName: '',
      phone: '',
      gender: '',
      birthday: '',
      age: '',
      degree: '', // 用户学历
      career: '', // 职业
      insuredIntention: '', // 投保意向
      maritalStatus: '', // 婚姻状况
      childrenNum: '', // 子女状况
      annualIncome: '', // 年收入
      loanStatus: '', // 贷款状况
      socialSecurityStatus:  '' // 社保状况
    }
  },


  /**
   * 初始化用户信息
   */
  initCustomerInfo: function () {
    this.data.formObj.customerName && showLoading(false);
    // customerHandler.getCustomerDetail(this.options.id, res => {
    //   console.log(res)
    //   this.setData({ formObj: res })
    // })
  },

  /**
   * 当数据改变的时候改变当前页面的数据
   */
  valueChange: function (e) {
    const updateObj = {};
    let { key, value, isPass } = e.detail
    const { formObj } = this.data;
    updateObj.id = formObj.id;
    formObj[key] = value;
    updateObj[key] = value;
    // 生日的时候特殊操作
    if (key === 'birthday') {
      const age = dateToAge(value);
      formObj.age = age;
      updateObj.age = age;
    }

    if (isPass) {
      accountHandler.updateUserInfo(updateObj, res => {
        this.setData({ formObj });
      })
    } else {
      this.setData({ formObj });
    }
  },

  /**
   * 省市区选择起
   */
  bindRegionChange: function (e) {
    const { formObj } = this.data;
    const value = e.detail.value;
    formObj['provinceCode'] = value[0];
    formObj['cityCode'] = value[1];
    formObj['areaCode'] = value[2];
    customerHandler.updateUserInfo(formObj, res => {
      this.setData({ formObj });
    })
  },

  /**
   * 更新用户信息
   */
  updateCustomer: function () {
    const { formObj } = this.data;
    // customerHandler.addOrUpdateCustomer(formObj, res => {
    //   utils.toast('更新成功', () => {
    //     wx.navigateBack();
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    api.eventStat('clientdetail_editclient');    
    this.initCustomerInfo();
  }
}, ['customer']))