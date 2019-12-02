import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import Start from './container/Start';
import Menus from './container/Menus';
import Index from './container/Index';

ReactDOM.render(
    <App/>, 
    document.getElementById('root')
);

serviceWorker.unregister();
