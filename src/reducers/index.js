import {combineReducers} from 'redux';
import {localeReducer} from 'react-localize-redux';
import reducer from "./reducer";

const allReducers = combineReducers({
    main: reducer,
    locale: localeReducer
});

export default allReducers;