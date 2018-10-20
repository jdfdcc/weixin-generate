// 公共模版属性，方法继承
module.exports = Behavior({
  behaviors: [],
  properties: {
  },
  data: {
    hasAuth: false,// 是否授权
  },
  attached: function () {
    
  },
  methods: {
    myBehaviorMethod: function () {
      console.log('myBehaviorMethod')
    }
  }
})