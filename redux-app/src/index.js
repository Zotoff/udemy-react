import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import reducers from './Reducers/index';
import App from './containers/App';

// Gets the list of all the reducers inside app
const createStoreWidhMiddleware = applyMiddleware()(createStore)

ReactDOM.render(
    <Provider store={createStoreWidhMiddleware(reducers)}> 
        <App />
    </Provider>
, document.getElementById('root'));

