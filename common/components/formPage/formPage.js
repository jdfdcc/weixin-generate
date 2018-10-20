import http from './../../../utils/http.js';
Component({
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * formId 收集
     */
    submit: function (e) {
      let formId = e.detail.formId;
      // console.log('收集', formId)
      if (formId !== 'the formId is a mock one') {
        http('collectFormId', {
          formId: e.detail.formId,
          resource: "orderLite"
        })
      }
    }
  }
})
