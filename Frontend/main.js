import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import status from './logging/LoggingReducer.jsx'
var centralState = combineReducers({
    //Logging
    status: status,
})
var store = createStore(centralState, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app'))