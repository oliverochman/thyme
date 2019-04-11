import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import "./index";
import { BrowserRouter } from 'react-router-dom'


ReactDOM.render((
	<BrowserRouter>
		<Router/>
	</BrowserRouter>
	),
	document.getElementById('root')
);
serviceWorker.unregister();
