import { legacy_createStore as createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import authAdminReducer from './reducers/authAdminReducer';

const allReducers = combineReducers({
    authReducer,
    cartReducer,
    authAdminReducer,
});

const store = createStore(allReducers);

export default store;
