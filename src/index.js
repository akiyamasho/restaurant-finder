import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {initialize, addTranslation, setActiveLanguage} from "react-localize-redux";
import thunk from "redux-thunk";
import {MainContainer} from "./components/Main";
import allReducers from "./reducers"
import {strings} from "./constants/strings";
import * as stringConstants from "./constants/strings";

const browserLocale = require('browser-locale')().toLowerCase();
const locale = require(`./constants/sample.locale.json`);

const store = createStore(allReducers, applyMiddleware(thunk));
store.dispatch(initialize(stringConstants.languages));
store.dispatch(addTranslation(locale));
store.dispatch(setActiveLanguage(browserLocale.includes(`ja`) || browserLocale.includes(`jp`) ? stringConstants.JA_LOCALE : stringConstants.EN_LOCALE));

ReactDOM.render(
    <Provider store={store}>
        <MainContainer />
    </Provider>,
    document.getElementById('app')
);
