import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-boost'

import {getBrandsQuery} from '../../queries/queries';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            brandId: ''
        }
    }

    submitForm(event) {
        event.preventDefault();

        this.selectEl.selectedIndex = 0;
        this.nameInpEl.value = '';
        this.catInpEl.value = '';

        this.props.onAdd(this.props.client, {
            name: this.state.name,
            category: this.state.category,
            brandId: this.state.brandId
        });
    }

    getBrands() {
        const data = this.props.getBrandsQuery;
        if (data.loading) {
            return <option disabled>Loading</option>;
        } else {
            return data.brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>);
        }
    }

    render() {
        return (
            <form onSubmit={this.submitForm.bind(this)}>
                <div className="form-group">
                    <label htmlFor="name">Name of the product:</label>
                    <input
                        id="name"
                        className="form-control"
                        type="text"
                        ref={node => this.nameInpEl = node}
                        onChange={(e) => this.setState({name: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cat">Category:</label>
                    <input
                        id="cat"
                        className="form-control"
                        type="text"
                        ref={node => this.catInpEl = node}
                        onChange={(e) => this.setState({category: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="brand">Example select</label>
                    <select
                        id="brand"
                        className="form-control"
                        ref={node => this.selectEl = node}
                        onChange={(e) => this.setState({brandId: e.target.value})}
                    >
                        <option value='default'>Select brand</option>
                        {this.getBrands()}
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary submit">Add product</button>
                </div>
            </form>
        );
    }
}

AddProduct.propTypes = {
    getBrandsQuery: PropTypes.object,
    client: PropTypes.instanceOf(ApolloClient),
    onAdd: PropTypes.func
};

export default compose(
    graphql(getBrandsQuery, {name: 'getBrandsQuery'}),
)(AddProduct);
