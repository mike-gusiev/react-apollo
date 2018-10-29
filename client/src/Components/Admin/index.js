import React from 'react';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-boost';

import AddProduct from '../AddProduct';

const Admin = ({client, onAdd}) => (
    <React.Fragment>
        <h2>Admin</h2>
        <hr/>
        <AddProduct onAdd={onAdd} client={client}/>
    </React.Fragment>
);

Admin.propTypes = {
    client: PropTypes.instanceOf(ApolloClient),
    onAdd: PropTypes.func
};

export default Admin;
