// import questionsList from './question.js';
import commonHandler from '../../handlers/commonHandler.js';
import examHandler from '../../handlers/examHandler.js';
import http from '../../utils/http.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionsList: [],
    isRight: false, // 用户是否答对
    quesIndex: 0,
    showExplain: false,
    optiontype: 0, // 0 表示未作答  1 表示选过 2 表示多选然后又取消了 3 表示提交了
    question: {} // type 0 单选
  },

  initQuestion() {
    const { quesIndex } = this.data
    examHandler.getExercise(data => {
      const question = data[quesIndex];
      this.setData({ question, questionsList: data })
    })
  },

  getObjectDetail() {
    const { quesIndex } = this.data
    const { id, sid } = this.options;
    examHandler.getChapterDetail({pageSize: 500, sid, cid: id }, data => {
      const question = data[quesIndex];
      this.setData({ question, questionsList: data })
    })

  },

  // 答题
  toAnswer: function (e) {
    console.log(e)
    const { question } = this.data;
    const { item, index } = e.currentTarget.dataset;
    question.optiontype = 1;
    const { type, options } = question;
    if (+type === 0) {
      // 清楚所有的数据
      options.forEach(tempItem => {
        tempItem.choose = false;
        return tempItem;
      })
    }
    options[index].choose = true;
    this.setData({
      question,
      optiontype: 1,
    });

    // wx.vibrateShort();
  },


  back: function () {
    wx.showToast({
      title: '恭喜完成练习',
      icon: 'success'
    })
    setTimeout(e => {
      wx.navigateBack()
    }, 1000)
  },

  /**
   * 提交答案
   */
  submit: function () {
    const { question, optiontype } = this.data;
    let { quesIndex, questionsList } = this.data;
    if (optiontype === 3) {
      quesIndex++;
      this.setData({
        quesIndex,
        question: questionsList[quesIndex],
        optiontype: 0
      });
      wx.pageScrollTo({
        scrollTop: 0,
      })
    } else {
      const { options, type, rightAnswer } = question;
      question.isRight = false;
      if (+type === 0) {
        options.forEach(tempItem => {
          if (tempItem.choose) {
            question.isRight = tempItem.value == rightAnswer;
          }
        })
      }
      this.setData({
        question,
        optiontype: 3
      });
      this.showAnswer();

      if (!question.isRight) {
        console.log(question);
        // examHandler.answerQuestion({
        //   type: 2
        // })
      }
    }
  },

  showAnswer: function () {
    this.setData({showExplain: true,}, () => {
      wx.pageScrollTo({
        scrollTop: 500,
      })
    })
  },
  onLoad: function (options) {
    const { type, id } = options;
    // 随机练习
    if (!id) {
      this.initQuestion();
      // 科目答题
    } else if (type == 'subject'){
      this.getObjectDetail();
    }
  }
})