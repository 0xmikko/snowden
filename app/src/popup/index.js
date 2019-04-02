import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createUIStore} from 'redux-webext';
import App from './containers/App';
import Router from "router-lite";

async function initApp() {
    const store = await createUIStore();

    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    ReactDOM.render(
        <Provider store={store}>
            <Router history>
	        		<App />
			</Router>
        </Provider>,
        mountNode
    );
}

initApp();
