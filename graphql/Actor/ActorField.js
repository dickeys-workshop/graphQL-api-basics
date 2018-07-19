const { GraphQLInt, GraphQLNonNull } = require('graphql');
const Actor = require('./Actor');

const knex = require('../../knex');

const ActorField = {
  type: Actor,
  args: {
    actor_id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: (obj, args) => knex('actor').select().where({actor_id: args.actor_id}).then(res => res[0])
};

module.exports = ActorField;