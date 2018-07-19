const { GraphQLInt, GraphQLNonNull } = require('graphql');
const Film = require('./Film');

const knex = require('../../knex');

const FilmField = {
  type: Film,
  args: {
    film_id: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: (obj, args) => knex('film').select().where({film_id: args.film_id}).then(res => res[0])
};

module.exports = FilmField;