import ReduxConnect from '../../assets/libs/redux/ReduxConnect.js';
import config from '../../config/config.js';

Page(ReduxConnect({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    headerImage: config.defaultImage,
    homeObj: {
      vipLevel: '', // 会员等级
      questionList: [ // 题库列表 没有题库的话给个空列表
        {
          title: '语文', // 
          id: '', // 唯一的识别id
          type: '', // 类型 语文 英语 ....
          endTime: '', // 到期时间
          percentComplete: '', // 完成比例
          content: '', // 简介
          count: '', // 总提数
          beashCount: '', // 刷题人数
          src: '', // 科目图片
        }
      ],
      examTime: '--', // 考试时间
      studyCount: 111, // 刷题人数
      currentQB: { 
        name: '英语单选综合训练10000题目', // 当前选择的题库
        id: '' // 用于tab进行练习或者专项
      },
      itemList: [{
        src: 'http://wap.chaobenxueyuan.com/images/home/lx.png',
        title: '智能练习',
        context: 'AI人工智能 为你推荐30道题目',
        url: ''
      }, {
        src: 'http://wap.chaobenxueyuan.com/images/home/zx.png',
        title: '专项测试',
        context: '分章节 考点 题型 进行专项测试',
        url: ''
      }, {
        src: 'http://wap.chaobenxueyuan.com/images/home/mni.png',
        title: '全真模拟',
        context: '名师团队组卷 打造模拟考试',
        url: ''
      }, {
        src: 'http://wap.chaobenxueyuan.com/images/home/errq.png',
        title: '错题回顾',
        context: '解决掉错题 把分数拿下',
        url: ''
      }]
    },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.hideTabBar();
  },
  /**
   * 跳转到练习页面
   */
  toItem: function () {
    wx.navigateTo({
      url: '/pages/exam/exam',
    })
  }
}, ['base']))
