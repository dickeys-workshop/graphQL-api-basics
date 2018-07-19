const { GraphQLList } = require('graphql');
const Category = require('./Category');
const knex = require('../../knex');

const CategoryListField = {
  type: new GraphQLList(Category),
  description: 'A list containing movie genres',
  resolve: () => knex('category').select()
};

module.exports = CategoryListField;