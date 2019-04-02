import storage from 'redux-persist/es/storage'
import { applyMiddleware, createStore, compose  } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'


export default (history) => {

    // Redux DevTools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


    const reducer = persistReducer(
    {
      key: 'polls',
      storage: storage,
    },
    rootReducer(history)
    )

    const store = createStore(
    reducer,
    {},
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    ));

    persistStore(store)

    return store
}