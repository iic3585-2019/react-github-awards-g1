import {combineReducers} from 'redux';

import uiReducer from './ui';
import githubReducer from './github';

export const getRootReducer = () => combineReducers({
  github: githubReducer,
  ui: uiReducer
});
