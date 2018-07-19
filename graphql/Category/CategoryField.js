const { GraphQLInt, GraphQLNonNull } = require('graphql');
const Category = require('./Category');

const knex = require('../../knex');

const CategoryField = {
  type: Category,
  args: {
    category_id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: (obj, args) => knex('category').select().where({category_id: args.category_id}).then(res => res[0])
};

module.exports = CategoryField;