export default [{
  type: 'cut'
}, {
  key: "customerName",
  lable: "姓名",
  type: "input",
  placeholder: "请输入",
  require: true
}, {
  key: "phone",
  lable: "手机",
  type: "input",
  placeholder: "请输入",
  rules: [{
    pattern: "^1[3|4|5|8|7|9][0-9]\\d{8}$",
    message: '手机号码格式不正确'
  }]
}, {
  key: "gender",
  lable: "性别",
  type: "select",
  placeholder: "请选择",
  actions: [{
    id: 'M',
    value: '男'
  }, {
    id: 'F',
    value: '女'
  }]
}, {
  key: "birthday",
  lable: "出生日期",
  type: "birthdate",
  placeholder: "请选择",
  value: "",
  end: '2060-09-01'
}, {
  key: "age",
  lable: "年龄",
  type: "input",
  placeholder: "请输入",
}, {
  key: "career",
  lable: "QQ",
  type: "input",
  placeholder: "请输入",
}, {
  key: "career",
  lable: "学校",
  type: "input",
  placeholder: "请输入",
}, {
  key: "career",
  lable: "入学时间",
  type: "date",
  placeholder: "请输入",
}, {
  key: "career",
  lable: "就读专业",
  type: "input",
  placeholder: "请输入",
}, {
  type: 'cut'
}, {
  key: "idNumber",
  lable: "报考类别",
  type: "input",
  placeholder: "请输入",
}, {
  key: "address",
  lable: "目标学校",
  type: "input",
  placeholder: "请输入",
}, {
  key: "homeAddress",
  lable: "目标专业",
  type: "input",
  placeholder: "请输入",
}, {
  key: "ethnic",
  lable: "目标资格证书",
  type: "input",
  placeholder: "请输入",
}, ]

/**
 * 码表 星标 M 男 F 女
 * 有无社保 1 有 2 无
 * 婚姻状况 1 已婚 2 未婚 3 离异
 */