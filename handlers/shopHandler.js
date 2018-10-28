export default {
  getShopList: function (cb) {
    const data = {
      subjects: [{ // 科目列表
        title: '语文',
        id: '1',
        type: '1' // 类型
      }, { // 科目列表
        title: '数学',
        id: '2',
        type: '1' // 类型
      }, { // 科目列表
        title: '物理',
        id: '3',
        type: '1' // 类型
      }, { // 科目列表
        title: '化学',
        id: '4',
        type: '1' // 类型
      }],
      quesList: [{// 题库列表 没有题库的话给个空列表
        id: '1', // 唯一的识别id
        type: '1', // 类型 语文 英语 ....
        count: '2562', // 总题目
        content: '内含5年四真题，有解析', // 简介
        beashCount: '890', // 刷题人数
        price: '79.9', // 最低价格
        buyCount: '1000', // 购买人数
        src: 'http://wap.chaobenxueyuan.com/images/shop/book.png', // 科目图片
        title: '四级真题单选2000题', // 
        hasBuy: false, // 是否购买
        hasMake: '22', // 已完成题目
        percentComplete: '', // 完成比例
        endTime: '', // 到期时间
      }]
    }
    cb(data);
  }
}