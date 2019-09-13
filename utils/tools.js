/**
 * 比较版本号
 * Major.Minor.Patch（主版本号.次版本号.修订号）
 * v1 > v2 true
 * @param {*} v1 
 * @param {*} v2 
 */
export function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 >= num2) {
      return true
    } else if (num1 < num2) {
      return false
    }
  }

  return 0
}

/**
 * 深复制
 * @param {array|object} data 数据
 */
export const deepCopy = (data) => {
  if (Array.isArray(data)) {
    return data.slice().map(item => deepCopy(item));
  }

  if (Object.prototype.toString.call(data) === '[object Object]') {
    const keys = Object.keys(data);
    const dataProto = Object.getPrototypeOf(data);
    const out = (dataProto === Object.prototype) ? {} : Object.create(dataProto);

    keys.reduce((cur, key) => {
      cur[key] = deepCopy(data[key]);
      return cur;
    }, out);

    return out;
  }
  return data;
};

/**
 * 倒计时插件
 * @param {Number} count 
 */
export const timer = function (count, cb) {
  let timer = setInterval(() => {
    if (count > 0) {
      count--
      cb && cb(count)
    } else {
      clearInterval(timer);
    }
  })
}

/**
 * @name 字符串转换成日期
 * @param str 传入字符串
 */
const _parseDate = function (str) {
  return str ? new Date(str.replace(/-/g, '/')) : null
}

// 格式化
const _format = function (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }

  return fmt
}

/**
 * @name  日期格式
 * @param date 传入日期
 * @param pattern 格式化模式
 */
export const toDate = (date, pattern = 'yyyy-MM-dd') => {
  if (!date) return ''
  if (!pattern) {
    pattern = 'yyyy-MM-dd HH:mm:ss'
  }
  if (typeof date === 'string') {
    date = _parseDate(date)
  }
  return _format(date, pattern)
}

/**
 * @name  获取日期的差值
 * @param startDate 开始日期
 * @param endDate 结束日期
 */
export const getDateDValue = function (endDate, startDate = new Date()) {
  if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
    console.error('param type need is “date”')
    return ''
  }

  let cha = endDate - startDate

  let day = Math.ceil(cha / 1000 / 60 / 60 / 24)

  return {
    day
  }
}


/**
 * canvas 生成海报图片
 * 
 */
export const drawImage = function (headImgUrl, posterImgUrl, qrCodeImgUrl, nickName) {
  wx.showLoading({
    title: '正在生成图片...',
  })
  const ctx = wx.createCanvasContext('myCanvas'); //看回wxml里的canvas标签，这个的myCanvas要和标签里的canvas-id一致
  ctx.clearRect(0, 0, 750, 1344);
  //画背景图 画头像
  ctx.drawImage(posterImgUrl, 0, 0, 750, 1344);
  ctx.save();
  ctx.beginPath()
  ctx.arc(226, 576, 66, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.clip()
  ctx.drawImage(headImgUrl, 160, 510, 132, 132);
  ctx.restore();
  ctx.setFillStyle("#363636");
  ctx.setFontSize(40);
  ctx.fillText(nickName, 320, 570);
  ctx.setFontSize(30);
  ctx.setFillStyle('#454448');
  ctx.fillText("扫描海报二维码即可帮助Ta", 190, 740);
  ctx.restore();
  ctx.beginPath()
  ctx.arc(375, 1025, 107, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.clip()
  ctx.drawImage(qrCodeImgUrl, 268, 918, 210, 210);
  ctx.restore();
  ctx.draw(true, setTimeout(() => { //延迟100毫秒，防止图片没画完
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 750,
      height: 1344,
      destWidth: 750,
      destHeight: 1344,
      canvasId: 'myCanvas',
      success: function (res) {
        wx.hideLoading()
        wx.previewImage({
          current: res.tempFilePath,
          urls: [res.tempFilePath]
        })
      }
    })
  }, 1000));
}

/**
 * @name 对比两个对象是否相等
 */
export const compareObj = function (obj, obj2) {
  // 1 当传入对象的类型不相同的时候 则返回false
  if (typeof obj !== typeof obj2) return false

  let type = typeof obj

  if (type === 'number' || type === 'string' || type === 'boolean' || type === 'undefined' || obj === null) return obj === obj2

  if (Array.isArray(obj)) return JSON.stringify(obj) === JSON.stringify(obj2)

  if (type === 'object') {
    // return JSON.stringify(obj) === JSON.stringify(obj2)
    for (let key in obj) {
      if (!compareObj(obj[key], obj2[key])) return false
    }
  } else {
    return false
  }

  return true
}


/*根据出生日期算出年龄*/
export const dateToAge = function (strBirthday) {
  let returnAge;
  let strBirthdayArr = strBirthday.split("-");
  let birthYear = strBirthdayArr[0];
  let birthMonth = strBirthdayArr[1];
  let birthDay = strBirthdayArr[2];

  let d = new Date();
  let nowYear = d.getFullYear();
  let nowMonth = d.getMonth() + 1;
  let nowDay = d.getDate();

  if (nowYear == birthYear) {
    returnAge = 0;//同年 则为0岁
  }
  else {
    let ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        let dayDiff = nowDay - birthDay;//日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        }
        else {
          returnAge = ageDiff;
        }
      }
      else {
        let monthDiff = nowMonth - birthMonth;//月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        }
        else {
          returnAge = ageDiff;
        }
      }
    }
    else {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge;//返回周岁年龄

}


export const getParam = function (url, name) {
  name = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


/**
 * 1 男 2女
 * @name 身份证校验方法
 * @param 需要验证的字符串
 */
export const isID = (idStr = '') => {
  if (idStr == null) {
    idStr = '';
  }
  const oldCode = idStr;
  idStr = idStr.toUpperCase();
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  };
  // tip,
  let pass = true;
  // tip = ''
  if (!idStr || (!/^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(idStr) && !/^[1-9]\d{7}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}$/i.test(idStr))) {
    // tip = '身份证号格式错误'
    pass = false;
  } else if (!city[idStr.substr(0, 2)]) {
    // tip = '地址编码错误'
    pass = false;
  } else if (idStr.length == 18) {
    // 18位身份证需要验证最后一位校验位
    // if (idStr.length == 18) {
    idStr = idStr.split('');
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验位
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    let ai = 0;
    let wi = 0;
    for (let i = 0; i < 17; i += 1) {
      ai = idStr[i];
      wi = factor[i];
      sum += ai * wi;
    }
    // let last = parity[sum % 11]
    if (parity[sum % 11] != idStr[17]) {
      // tip = '校验位错误'
      pass = false;
    }
    // }
  }
  if (!pass) {
    return false;
  }

  let sex = oldCode.length == 15 ? oldCode.substr(14, 1) % 2 : oldCode.substr(16, 1) % 2;
  sex == 0 ? sex = 2 : sex = 1; // 1M2F
  const birthDay = oldCode.length == 15 ? `19${oldCode.substr(6, 2)}-${oldCode.substr(8, 2)}-${oldCode.substr(10, 2)}` : `${oldCode.substr(6, 4)}-${oldCode.substr(10, 2)}-${oldCode.substr(12, 2)}`;
  return {
    cityCode: oldCode.substr(0, 4),
    cityDesc: city[oldCode.substr(0, 2)],
    birthDay,
    sex,
    age: dateToAge(birthDay),
  };

};


/**
 * 生成随机串
 */
export const uuid = function (len = 32) {
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/**
 * 互动列表转化时间转化为中文提示
 */
export const getCnText = function (lastVisitTime = '') {
  const dayTime = new Date(lastVisitTime.replace(/-/g, '/'));
  const caluTime = new Date(lastVisitTime.replace(/-/g, '/').split(' ')[0]);
  const dayItem = getDateDValue(caluTime);
  let text = '';
  const days = -dayItem.day;
  if (days === 0) {
    text = '今天 ' + toDate(dayTime, 'HH:mm');
  } else if (days === 1) {
    text = '昨天 ' + toDate(dayTime, 'HH:mm');
  } else if (days === 2) {
    text = '前天 ' + toDate(dayTime, 'HH:mm');
  } else {
    const year = toDate(dayTime, 'yyyy');
    const nowYear = toDate(new Date(), 'yyyy');
    if (year === nowYear) {
      text = toDate(dayTime, 'M月dd日 HH:mm');
    } else {
      text = toDate(dayTime);
    }
  }
  return text;
}


/**
 * 获取中文月份显示
 */
export const getCnDateText = function (lastVisitTime = '') {
  const dayTime = new Date(lastVisitTime.replace(/-/g, '/'));
  const caluTime = new Date(lastVisitTime.replace(/-/g, '/').split(' ')[0]);
  const dayItem = getDateDValue(caluTime);
  let text = '';
  const days = -dayItem.day;
  if (days === 0) {
    text = '今天';
  } else if (days === 1) {
    text = '昨天';
  } else if (days === 2) {
    text = '前天';
  } else {
    text = '';
  }
  return text;
}


export const throttle = function (obj, method, content, time = 16) {
  clearTimeout(obj.tid);
  obj.tid = setTimeout(function () {
    obj.tid = undefined;
    method(content)
  }, time)
}

// export const throttle = function throttle(func, wait) {
//   let previous = 0;
//   return function () {
//     let now = Date.now();
//     let context = this;
//     let args = arguments;
//     if (now - previous > wait) {
//       func.apply(context, args);
//       previous = now;
//     }
//   }
// }

/**
 * 清除对象中为null活着undefind的数值
 */
export const clearObj = function (obj) {
  const tempObj = deepCopy(obj);
  for (const key in tempObj) {
    if (tempObj[key] === null || tempObj[key] === undefined) {
      delete tempObj[key]
    };
  }

  return tempObj;
}

/**
 * 信息脱敏方法
 * @param {*} str
 * @param {*} type
 */
export const tmStr = (str, type) => {
  let tempStr = '';
  switch (type) {
    case 'name':
      tempStr = str.replace(/.*(.+)/, '**$1');
      break;
    case 'card':
      tempStr = str.replace(/^(.{4,4}).*(.{4,4})$/, '$1*****$2');
      break;
    case 'phone':
      tempStr = str.replace(/^(.{3}).*(.{3})$/, '$1*****$2');
      break;
    case "certiNo":
      tempStr = str.replace(/^(.{4,4}).*(.{1,1})$/, '$1*************$2');
      break;
  }
  return tempStr;
};
