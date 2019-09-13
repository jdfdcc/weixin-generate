import http from '../../utils/http.js';
Page({

  data: {

  },

  initPage() {
    http('correntdetails', {
      pageNo: 1,
      pageSize: 10,
      sid: this.options.id,
      id: this.options.id,
    }).then(result => {
      console.log('错题列表', result)
    })
  },

  onLoad: function (options) {
    this.initPage();
  },
})