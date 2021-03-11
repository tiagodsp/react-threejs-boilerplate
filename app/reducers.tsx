import { combineReducers } from 'redux';
import appReducer from 'containers/App/reducer';
import navbarReducer from 'containers/LateralNavbar/reducer';

// Combine here all reducers in the application
const allReducers = combineReducers({
    global: appReducer,
    counter: navbarReducer,
});

export default allReducers;
