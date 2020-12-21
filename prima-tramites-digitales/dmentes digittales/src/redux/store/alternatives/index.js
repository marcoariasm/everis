import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

const thunkMiddleware = reduxThunk();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware), loadState());

store.subscribe(function () {
	saveState(store.getState());
});
