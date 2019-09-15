// import questionsList from './question.js';
import commonHandler from '../../handlers/commonHandler.js';
import examHandler from '../../handlers/examHandler.js';
import http from '../../utils/http.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pogress: 0.3,
    showChoose: false,// 答题
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
    const { id, sid, index, api } = this.options;
    this.setData({
      index,
    });
    getApp().http({
      api,
      data: {
        pageNo: 0,
        pageSize: 500,
        sid,
        cid: id
      },
    }).then(res => {
      const { data } = res;
      const question = data[quesIndex];
      this.setData({
        question,
        questionsList: data,
        showChoose: +index > 1
      });
    })
    // examHandler.getChapterDetail({pageSize: 500, sid, cid: id }, data => {
    //   const question = data[quesIndex];
    //   this.setData({
    //     question,
    //     questionsList: data,
    //     showChoose: +index > 1
    //   });
    // })
  },

  // 答题
  toAnswer: function (e) {
    const { question, optiontype } = this.data;

    if (optiontype === 3) {
      return;
    }
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
  },

  restart() {
    this.setData({
      showChoose: false,
    })
  },

  continueQuestion() {
    const { questionsList } = this.data;
    const { index } = this.options;
    const question = questionsList[index - 1];
    this.setData({
      quesIndex: index - 1,
      question,
    });
    this.restart();
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
      let myAnswer;
      if (+type === 0) {
        options.forEach(tempItem => {
          if (tempItem.choose) {
            myAnswer = tempItem.value;
            question.isRight = tempItem.value == rightAnswer;
          }
        })
      }
      this.setData({
        question,
        optiontype: 3
      });
      this.showAnswer();

      // 收集题目
      examHandler.collectQuestion({
        type: 2,
        sid: question.sid,
        cid: question.cid,
        tid: question.tid,
        answer: myAnswer,
      })
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
    console.log(options);
    // 随机练习
    if (!id) {
      this.initQuestion();
      // 科目答题
    } else if (type == 'subject'){
      this.getObjectDetail();
    }
  }
})