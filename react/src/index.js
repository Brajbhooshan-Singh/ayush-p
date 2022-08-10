import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import createReducer from './redux/reducer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const reducer = createReducer();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
