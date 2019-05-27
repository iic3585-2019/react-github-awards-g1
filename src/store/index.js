import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import {getRootReducer} from './reducers/index';

const logger = createLogger({});

export const createReduxStore = () => createStore(
    getRootReducer(),
    applyMiddleware(
      logger,
      thunk
    )
);
