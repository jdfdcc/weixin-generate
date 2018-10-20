

const MOBILE = /^1[3|4|5|8|7|9][0-9]\d{8}$/;
const EMAIL = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/;
const MONEY = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
const NAME = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/;
const PWD = /(\d(?!\d{5})|[A-Za-z](?![A-Za-z]{5})){6}/;
const IDCARDNO = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;

export const isRule = (re, value) => {
  if (!value || value.length === 0) {
    return false;
  }

  if (!(re instanceof RegExp)) {
    throw new Error('The rule shoud be RegExp');
  }

  if (!re.test(value)) {
    return false;
  }
  return true;
};

export const isNotEmpty = (data) => {
  return data && (data.length > 0);
};

export const isMobile = (mobile) => {
  return isRule(MOBILE, mobile);
};

export const isEmail = (email) => {
  return isRule(EMAIL, email);
};

export const isMoney = (money) => {
  return isRule(MONEY, money);
};

export const isUsername = (name) => {
  return isRule(NAME, name);
};

export const isPwd = (pwd) => {
  return isRule(PWD, pwd);
};

export const isIdCardNo = (no) => {
  return isRule(IDCARDNO, no);
};

const verifyBirthday = (year, month, day, birthday,min =0, max = 130) => {
  const now = new Date();
  const nowYear = now.getFullYear();
  // 年月日是否合理
  if (birthday.getFullYear() === year && birthday.getMonth() + 1 === month && birthday.getDate() === day) {
    // 判断年份的范围（3岁到100岁之间)
    const age = nowYear - year;
    if (age >= min && age <= max) {
      return true;
    }
    return false;
  }
  return false;
};


const checkParity = (no) => {
  const len = no.length;
  if (len === 18) {
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let noTemp = 0;
    let i;
    for (i = 0; i < 17; i += 1) {
      noTemp += no.substr(i, 1) * arrInt[i];
    }
    const valnum = arrCh[noTemp % 11];
    if (valnum === no.substr(17, 1)) {
      return true;
    }
    return false;
  }
  return true;
};

export const isIdCardNoISO = (no) => {
  if (!isNotEmpty(no)) { return false; }

  const number = no.toUpperCase();
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!isIdCardNo(number)) { return false; }
  // 校验生日
  if (!checkBirthday(number)) { return false; }
  
  // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  if (!checkParity(no)) { return false; }
  return true;
};

export const format = (ne) => {
  let date = new Date();

  var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
  };

  return (date.getFullYear() + ne) + "-" + (`${date.getMonth()+1}`.length == 1 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`) + "-" + (`${date.getDate()}`.length == 1 ? `0${date.getDate()}` : `${date.getDate()}` );
};

