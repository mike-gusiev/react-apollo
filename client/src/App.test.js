import React from 'react';
import renderer from 'react-test-renderer';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import {App} from './App';

test('should render component correctly', () => {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql'
    });
    const products = {
        products: {
            data: [
                {
                    brand: {
                        name: 'test-brand-name',
                        __typename: 'test-brand-type'
                    },
                    name: 'test-name',
                    id: 'test-id',
                    category: 'test-category',
                    __typename: 'test-typename'
                }
            ],
            loading: true,
            error: ''
        }
    };
    const tree = renderer.create(
        <ApolloProvider client={client}><App onLoad={() => {}} products={products}/></ApolloProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot();
});
