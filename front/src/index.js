import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { ReactReduxContext } from 'react-redux'

import App from './containers/App';
import configureStore from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const history = createHistory();

export const store = configureStore(history);

ReactDOM.render((
		<Provider store={store}>
	      	<ConnectedRouter history={history}>
	        		<App />
			</ConnectedRouter>
		</Provider>

  ), document.getElementById('root'));
