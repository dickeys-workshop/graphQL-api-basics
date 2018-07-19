const { GraphQLList } = require('graphql');
const Address = require('./Address');
const knex = require('../../knex');

const AddressListField = {
  type: new GraphQLList(Address),
  resolve: () => knex('address').select()
};

module.exports = AddressListField;