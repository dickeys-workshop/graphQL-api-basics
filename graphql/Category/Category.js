const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const Category = new GraphQLObjectType({
  name:'Category',
  description: 'A movie genre',
  fields:()=>({
    category_id:{ type: GraphQLInt },
    name:{ type: GraphQLString },
    last_update: { type: GraphQLString }
  })
});

module.exports = Category;