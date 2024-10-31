import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import './helpers/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));

Modal.setAppElement(document.querySelector('body'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals();
