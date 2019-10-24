import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './ducks';
import sagas from './sagas';

const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlewares = [sagaMiddleware];

const composer = process.env.NODE_ENV === 'development' ?
    compose(
        applyMiddleware(...middlewares),
        console.tron.createEnhancer()
    )
    :
    applyMiddleware(...middlewares);

const reduxPersistedState = localStorage.getItem('reduxPersistedState') ? JSON.parse(localStorage.getItem('reduxPersistedState')) : {};

const store = createStore(reducers, reduxPersistedState, composer);

sagaMiddleware.run(sagas);

store.subscribe(()=> {
    localStorage.setItem('reduxPersistedState', JSON.stringify(store.getState()))
})

export default store;