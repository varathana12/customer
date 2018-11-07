import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "./init/init_axios_header"
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin()
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
