import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-boost';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

import * as productDuck from './ducks/products'
import Admin from './Components/Admin'
import Customer from './Components/Customer'

import {connect} from 'react-redux';

export class App extends Component {

    componentDidMount() {
        this.props.onLoad(this.props.client)
    }

    render() {
        return (
            <Router>
                <div className="container app">
                    {this.props.products.loading ? (
                        <div>Loading...</div>
                    ) : this.props.products.error ? (
                        <div>Error: {JSON.stringify(this.props.products.error)}</div>
                    ) : (
                        <React.Fragment>
                            <nav className="nav">
                                <Link to="/admin" className='nav-link'>Admin</Link>
                                <Link to="/customer" className='nav-link'>Customer</Link>
                            </nav>
                            <Switch>
                                <Route exact path='/' render={() => (<Redirect to={'/customer'}/>)}/>
                                <Route exact path='/admin' render={() => <Admin onAdd={this.props.onAdd} client={this.props.client} />} />
                                <Route exact path='/customer' render={() => <Customer products={this.props.products}/>}/>
                            </Switch>
                        </React.Fragment>
                    )}
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    client: PropTypes.instanceOf(ApolloClient),
    onAdd: PropTypes.func,
    onLoad: PropTypes.func,
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
}

export default connect(
    state => ({
        products: state.products
    }),
    dispatch => ({
        onLoad: (client) => {
            dispatch(productDuck.loadProducts(client))
        },
        onAdd: (client, vars) => {
            dispatch(productDuck.addProducts(client, vars))
        }
    })
)(App);
