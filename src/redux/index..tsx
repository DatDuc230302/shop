import { legacy_createStore as createStore, combineReducers } from 'redux';
import cartReducer from './reducers/cartReducer';
import authAdminReducer from './reducers/authAdminReducer';
import authClientReducer from './reducers/authClientReducer';

const allReducers = combineReducers({
    cartReducer,
    authAdminReducer,
    authClientReducer,
});

const store = createStore(allReducers);

export default store;
