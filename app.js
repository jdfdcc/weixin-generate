import loginCheck from '/common/filters/authFilter.js';
import api from './utils/api.js'
const mta = require('./assets/libs/mta_analysis.js');

App({
  onLaunch: function onLaunch() {
    api.eventInit(true)
    api.getCode()
  }
});