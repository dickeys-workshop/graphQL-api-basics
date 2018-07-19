const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const Address = new GraphQLObjectType({
  name:'Address',
  description: 'This is the description of an address',
  fields:()=>({
    address_id: { type: GraphQLInt },
    address: { type: GraphQLString },
    address2: { type: GraphQLString },
    district: { type: GraphQLString },
    postal_code: { type: GraphQLString },
    phone: { type: GraphQLString },
    last_update: { type: GraphQLString }
  })
});

module.exports = Address;