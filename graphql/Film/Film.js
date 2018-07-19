const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLEnumType } = require('graphql');

const TimeUnitsEnum = new GraphQLEnumType({
  name:'TimeUnitsEnum',
  values: {
    MIN: { value: 'min' },
    HR: { value: 'hr' },
    SEC: { value: 'sec' }
  }
});

const Film = new GraphQLObjectType({
  name:'Film',
  description:'moving pictures',
  fields:()=>({
    film_id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    releaseYear: { type: GraphQLInt, resolve: film => film.release_year },
    rental_duration: { type: GraphQLInt },
    rental_rate: { type: GraphQLFloat },
    length: {
      type: GraphQLInt,
      args:{
        returnUnit: { type: TimeUnitsEnum }
      },
      resolve:(Film, args) => args.returnUnit === 'hr' ? (Film.length / 60).toFixed(0) : Film.length
    },
    replacement_cost: { type: GraphQLFloat },
    rating: { type: GraphQLString },
    last_update: { type: GraphQLString },
    special_features: { type: new GraphQLList(GraphQLString) },
  })
});

module.exports = Film;