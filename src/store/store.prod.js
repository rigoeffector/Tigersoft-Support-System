import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const storeConfig = (initialState) => createStore(reducers, initialState, middleware);

sagaMiddleware.run(rootSaga);

export default storeConfig;
