import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import * as reducers from './ducks/products';
import App from './App';
import './index.css';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

const rootReducer = combineReducers({products: reducers.default});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

sagaMiddleware.run(reducers.watchRequest);

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}><App client={client}/></Provider>
    </ApolloProvider>, document.getElementById('root')
);
