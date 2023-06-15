import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import { ToastContainer } from 'react-toastify';

import store from './app/store/store';
import '@app/common/prototype';
import 'sanitize.css/sanitize.css';
import 'react-toastify/dist/ReactToastify.css';

import './styles/theme.less';
import './styles/main.scss';
import './styles/header.less';


// Import root app
import App from '@containers/App';

import '!file-loader?name=[name].[ext]!@assets/favicon/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
import { setupAxios } from '@src/utils/utils';

const { PUBLIC_URL } = process.env;
const MOUNT_NODE = document.getElementById('root');

setupAxios(axios, store);

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={viVN}>
      <BrowserRouter basename={PUBLIC_URL}>
        <ToastContainer pauseOnFocusLoss={false}/>
        <App/>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
  MOUNT_NODE,
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  const runtime = require('offline-plugin/runtime'); // eslint-disable-line global-require
  runtime.install({
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating');
    },
    onUpdateReady: () => {
      console.log('SW Event:', 'onUpdateReady');
      // Tells to new SW to take control immediately
      runtime.applyUpdate();
    },
    onUpdated: () => {
      console.log('SW Event:', 'onUpdated');
      // Reload the webpage to load into the new version
      window.location.reload();
    },
    onUpdateFailed: () => {
      console.log('SW Event:', 'onUpdateFailed');
    },
  });
}
