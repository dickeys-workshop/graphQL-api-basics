const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const Actor = new GraphQLObjectType({
  name: "Actor",
  fields:()=>({
     actor_id: { type: GraphQLInt },
     first_name: { type: GraphQLString },
     last_name: { type: GraphQLString },
     last_update: { type: GraphQLString }
  })
});

module.exports = Actor;