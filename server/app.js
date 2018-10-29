const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

app.use(cors());

mongoose.connect('mongodb://admin:111122a@ds145053.mlab.com:45053/gql-challenge');
mongoose.connection.once('open', () => {
    console.log('connected to db')
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('server on port 4000')
});