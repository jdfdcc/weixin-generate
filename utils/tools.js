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

    if (num1 > num2) {
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
  if (!date) return '22'
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
        console.log(res.tempFilePath)
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
  // console.log(obj, obj2)
  // 1 当传入对象的类型不相同的时候 则返回false
  if (typeof obj !== typeof obj2) return false

  let type = typeof obj

  if (type === 'number' || type === 'string' || type === 'boolean' || type === 'undefined' || obj === null) return obj === obj2

  if (Array.isArray(obj)) return JSON.stringify(obj) === JSON.stringify(obj2)

  if (type === 'object') {
    // console.log(obj, obj2)
    // return JSON.stringify(obj) === JSON.stringify(obj2)
    for (let key in obj) {
      if (!compareObj(obj[key], obj2[key])) return false
    }
  } else {
    return false
  }

  return true
}