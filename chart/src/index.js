import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";

import './index.css';
import App from './App';
import {CHANGE_PARAM, CHANGE_PERIOD, FETCH_SUCCESS} from './actions'
import { PERIOD } from './API';


const defaultState = {
  param: 'yield',
  data: {},
  period: PERIOD.WEEK,
  ISIN: 'US67021BAE92'
}

function chartReducer(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_PARAM:
      return {...state, param: action.payload}
    case CHANGE_PERIOD:
      return {...state, period: action.payload}
    case FETCH_SUCCESS:
      return {...state, data: action.payload}
    default:
      return state
  }
}

let store = createStore(chartReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
