import React from 'react';
import renderer from 'react-test-renderer';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import Admin from './index';

test('should component render correctly', () => {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql'
    });
    const tree = renderer.create(
        <ApolloProvider client={client}><Admin/></ApolloProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot();
});
