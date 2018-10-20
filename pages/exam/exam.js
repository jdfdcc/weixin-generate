import questionsList from './question.js';
import commonHandler from '../../handlers/commonHandler.js';
import http from '../../utils/http.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer: [],
    questionsList: questionsList,
    answerStatus: 0, // 0 表示未作答，1表示选择待提交 2 表示已经提交
    isRight: false, // 用户是否答对
    quesIndex: 0,
    question: {}
  },

  initQuestion () {
    const { quesIndex } = this.data
    const question = questionsList[quesIndex]
    this.setData({ question, answerStatus: 0, answer: [] })
  },

  /**
   * 选中了某个
   */
  checkboxChange (e) {
    console.log(e.detail.value)
    let { answer, question, answerStatus } = this.data
    if (question.type === 0) {
      answer = []
      answer.push(e.detail.value)
      answerStatus = 1
    } else if (e.detail.value.length > 1) {
      answer = e.detail.value
      answerStatus = 1
    }
    this.setData({ answer, answerStatus})
  },

  /**
   * 提交答案
   */
  submitAnswer () {
    let { answerStatus, answer, question } = this.data
    // 单选
    if (+question.type === 0) {
      if (answerStatus === 1) {
        answerStatus++
      }
      this.setData({ isRight: answer[0] === question.rightAnswer })
    } else if (+question.type === 1){
      // 多选择题
      if (answer.length > 1) {
        answerStatus++
      }
      this.setData({ isRight: commonHandler.compareArray(answer, question.rightAnswer.split('')) })
    }
    this.setData({ answerStatus})
  },

  /**
   * 下一题
   */
  nextQuestion () {
    let { quesIndex} = this.data
    quesIndex++
    this.setData({ quesIndex })
    if (quesIndex >= questionsList.length) {
      console.log('最后一提了');
      wx.showToast({
        title: '恭喜完成练习',
        icon: 'success'
      })
      setTimeout(e => {
        wx.navigateBack()
      }, 1000)
    } else {
      this.initQuestion()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initQuestion()
  }
})