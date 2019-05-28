import 'react-hot-loader';
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app.jsx';

import {Provider} from 'react-redux';
import {createReduxStore} from './store';

import './initializers';
import './styles/index.scss';

const store = createReduxStore();

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

