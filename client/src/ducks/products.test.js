import React from 'react';
import ApolloClient from 'apollo-boost';

import {getProductsQuery} from '../queries/queries';

import reducer, {addProducts, loadProducts, fetchProductsSaga} from './products';

describe('products actions', () => {

    test('should create an action to add products', () => {
        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql'
        });
        const vars = {
            name: 'name',
            category: 'category',
            brandId: 'brandId'
        };
        const expectedAction = {
            type: 'ADD_PRODUCT',
            client,
            vars
        };
        expect(addProducts(client, vars)).toEqual(expectedAction)
    });

    test('should create an action to load products', () => {
        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql'
        });
        const expectedAction = {
            type: 'LOAD_PRODUCTS',
            client
        };
        expect(loadProducts(client)).toEqual(expectedAction)
    });

});

describe('products reducer', () => {

    test('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                data: null,
                loading: true,
                error: null
            }
        )
    });

    test('should handle LOAD_PRODUCTS}', () => {
        expect(reducer([], {
            type: 'LOAD_PRODUCTS'
        })).toEqual({
            loading: true
        })
    });

    test('should handle LOAD_SUCCESS}', () => {
        expect(reducer({}, {
            type: 'LOAD_SUCCESS',
            data: [{test: 'test'}]
        })).toEqual({
            data: [{test: 'test'}],
            loading: false
        })
    });

    test('should handle LOAD_FAILURE}', () => {
        expect(reducer({}, {
            type: 'LOAD_FAILURE',
            error: 'error'
        })).toEqual({
            loading: false,
            error: 'error'
        })
    });

    test('should handle ADD_PRODUCT}', () => {
        expect(reducer([], {
            type: 'ADD_PRODUCT'
        })).toEqual({
            loading: false,
        })
    });

    test('should handle PRODUCT_ADDED}', () => {
        expect(reducer({data: [{test: 'test'}]}, {
            type: 'PRODUCT_ADDED',
            data: {product: 'test-product'}
        })).toEqual({
            data: [{test: 'test'}, {product: 'test-product'}],
            loading: false,
        })
    });
});

test('fetchProductsSaga', async () => {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql'
    });
    const generator = fetchProductsSaga({client});
    expect(generator.next().value).toEqual(client.query({query: getProductsQuery}));
});
