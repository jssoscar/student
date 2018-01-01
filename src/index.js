import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react'
import createHashHistory from 'history/createHashHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

import './css/index.scss';
import store from './store'
import registerServiceWorker from './registerServiceWorker';
import CustomerRouter from './router'

const hashHistory = createHashHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
  ...store
};

const history = syncHistoryWithStore(hashHistory, routingStore);

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <CustomerRouter />
        </Router>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
