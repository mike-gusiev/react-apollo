import React from 'react';
import PropTypes from 'prop-types';

const ProductList = ({products}) => {
    return (
        <ul className='product-list'>
            {products.data && products.data.map(product => (
                <div className="card" key={product.id}>
                    <div className="card-header">{product.name}</div>
                    <div className="card-body">
                        <p className="card-text"><b>Category:</b> {product.category}</p>
                        <p className="card-text"><b>Brand:</b> {product.brand.name}</p>
                    </div>
                </div>
            ))}
        </ul>
    );
};

ProductList.propTypes = {
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

export default ProductList;
