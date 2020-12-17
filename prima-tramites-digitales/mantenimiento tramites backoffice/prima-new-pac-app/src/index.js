import React from 'react';
import ReactDOM from 'react-dom';
import './fonts.css';
import './index.scss';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import redux from './modules/Retirement955/redux/store';

const store = redux();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
