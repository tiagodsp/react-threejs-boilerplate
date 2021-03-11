/* eslint-disable import/prefer-default-export */
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from 'containers/App'; // Main application
import allReducers from './reducers'; // All reducers combined
import 'styles/style.scss';

// Create application store
/* eslint-disable no-underscore-dangle */
export const store = createStore(
    allReducers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

// Render applicaiton
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
