import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/reducers';

render(
    <Provider store={createStore(reducers)}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  , document.querySelector('.main'));
