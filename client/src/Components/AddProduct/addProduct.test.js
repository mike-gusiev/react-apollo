import React from 'react';
import ApolloClient from 'apollo-boost';
import renderer from 'react-test-renderer';
import {ApolloProvider} from 'react-apollo';

import AddProduct from './index';

test('should render component correctly', () => {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql'
    });
    const tree = renderer.create(
        <ApolloProvider client={client}><AddProduct/></ApolloProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
