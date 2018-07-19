const { GraphQLInt, GraphQLNonNull } = require('graphql');
const Address = require('./Address');

const knex = require('../../knex');

const AddressField = {
  type: Address,
  args: {
    address_id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: (obj, args) => knex('address').select().where({address_id: args.address_id}).then(res => res[0])
};

module.exports = AddressField;