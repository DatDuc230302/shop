import { legacy_createStore as createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';

const allReducers = combineReducers({
    authReducer,
    cartReducer,
});

const store = createStore(allReducers);

export default store;
