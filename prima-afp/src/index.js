import React from 'react';
import ReactDOM from 'react-dom';
//Main Page
import PrimaWebTransactionalApp from './PrimaWebTransactionalApp.jsx';

//Redux
import { Provider } from 'react-redux';
import storeConfig from './redux/store';

//Polyfill
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './polyfills';

//SW
import * as serviceWorker from './serviceWorker';

//styles
import './index.scss';
import './fonts.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeConfig}>
      <PrimaWebTransactionalApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
