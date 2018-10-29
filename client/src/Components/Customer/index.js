import React from 'react';
import PropTypes from 'prop-types';

import  ProductList  from '../ProductList'

const Customer = ({products}) => (
    <React.Fragment>
        <h2>Costumer</h2>
        <hr/>
        <ProductList products={products}/>
    </React.Fragment>
);

Customer.propTypes = {
    products: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape({
            brand: PropTypes.shape({
                name: PropTypes.string,
                __typename: PropTypes.string
            }),
            name: PropTypes.string,
            id: PropTypes.string,
            category: PropTypes.string,
            __typename: PropTypes.string
        })),
        loading: PropTypes.bool,
        error: PropTypes.string
    })
};

export default Customer;
