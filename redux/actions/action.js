// 更新用户信息
import state, { NAME, TEST, HAS_AUTH, FAMILYLIST, POLICYLIST, HOUSEHOLDER, POLICYOBJ, ISMASTER, USER_INFO, CODE } from '../constants.js';
import store from '../index.js';

// const store = getApp().store

// 更新code信息
export const updateCode = function (code) {
  store.dispatch({type: CODE, code: code})
}

// 更新用户信息
export const updateUserInfo = function (userInfo) {
  store.dispatch({ type: USER_INFO, userInfo: userInfo })
}

// 更新用户是否授权
export const updateAuth = function (hasAuth){
  store.dispatch({ type: HAS_AUTH, hasAuth: hasAuth })
}

// 更新用户家庭信息
export const updateFamily = function (familyList) {
  store.dispatch({ type: FAMILYLIST, familyList: familyList })
}

// 更新户主信息
export const updateHolderInfo = function (householder) {
  store.dispatch({ type: HOUSEHOLDER, householder: householder })
}

// 更新用户保单列表信息
export const updatePolicyList = function (policyList) {
  store.dispatch({ type: POLICYLIST, policyList: policyList })
}

// 更新保单页面所有的信息
export const updatePolicyObj = function (policyObj) {
  store.dispatch({ type: POLICYOBJ, policyObj: policyObj })
}

// 更新户主信息 -- 是否为户主
export const isMaster = function (isMaster) {
  store.dispatch({ type: ISMASTER, isMaster: isMaster })
}

// 更新底部导航信息
export const updateTabIndex = function (tabIndex) {
  store.dispatch({ type: state.TABINDEX, tabIndex: tabIndex })
}

// 更新续保保单列表
export const updateRenewalPolicyList = function (renewalPolicyList) {
  store.dispatch({ type: state.REPOLICYLIST, renewalPolicyList: renewalPolicyList })
}

// 更新保单详情
export const updatePolicyDetail = function (policyDetail) {
  store.dispatch({ type: state.POLICYDETAIL, policyDetail: policyDetail })
}


// 默认
export default {
  updateUserInfo,
  updateAuth,
  updateFamily,
  updateHolderInfo,
  updatePolicyList,
  updateTabIndex,
  updateRenewalPolicyList,
  updatePolicyDetail
}
