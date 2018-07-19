const { GraphQLList } = require('graphql');
const Actor = require('./Actor');
const knex = require('../../knex');

const ActorListField = {
  type: new GraphQLList(Actor),
  resolve: () => knex('actor').select()
};

module.exports = ActorListField;