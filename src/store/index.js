import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { requestMiddleware } from './redux-request';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware, requestMiddleware)),
);

window.store = store;

requestMiddleware.on.fail = ((err) => err.response || err);

export default store;
