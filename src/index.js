import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyWayApp from "./MyWayApp.js";

import { Provider } from 'react-redux'
import store from './redux/store'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <MyWayApp />
  </Provider>,
  rootElement
)

