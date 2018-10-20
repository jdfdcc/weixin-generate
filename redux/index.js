import reduce from './reducers/reducer.js';

const Redux = require('../assets/libs/redux/redux.min.js')

let store = Redux.createStore(reduce)
export default store
