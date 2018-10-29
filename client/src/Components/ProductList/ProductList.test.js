import React from 'react';
import ProductList from './index';

import renderer from 'react-test-renderer';

test('should render component correctly', () => {
    const products = {
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
    const tree = renderer.create(<ProductList products={products}/>)
        .toJSON()
    expect(tree).toMatchSnapshot();
})

