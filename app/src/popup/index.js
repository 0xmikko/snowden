import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Link} from 'route-lite'
import { Provider } from 'react-redux'
import {createUIStore} from 'redux-webext';

import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

console.log("POPUP STARTED")

async function initApp() {

	const store = await createUIStore();

	ReactDOM.render((
		<Provider store={store}>
			<Router>
				<App/>
			</Router>
		</Provider>

	), document.getElementById('root'));
}

initApp();