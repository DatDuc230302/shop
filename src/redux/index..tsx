import { legacy_createStore as createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';

const allReducers = combineReducers({
    authReducer,
});

const store = createStore(allReducers);

export default store;
