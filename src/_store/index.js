import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import todo from '../_reducers/todo';
import logger from 'redux-logger';

// The Global state
const rootReducer = combineReducers({
  todo,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
