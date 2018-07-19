const { GraphQLList, GraphQLInt, GraphQLInputObjectType, GraphQLString, GraphQLEnumType } = require('graphql');
const Film = require('./Film');
const knex = require('../../knex');

const SortEnum = new GraphQLEnumType({
  name:'SortEnum',
  values: { ASC: {value:'asc'}, DESC: {value:'desc'} }
});

const IntFilter = new GraphQLInputObjectType({
  name:'IntFilter',
  fields:()=>({
    eq: { type: GraphQLInt },
    neq: { type: GraphQLInt },
    gt: { type: GraphQLInt },
    gte: { type: GraphQLInt },
    lt: { type: GraphQLInt },
    lte: { type: GraphQLInt },
    in: { type: new GraphQLList(GraphQLInt) },
    nin: { type: new GraphQLList(GraphQLInt) }
  })
});

const StringFilter = new GraphQLInputObjectType({
  name:'StringFilter',
  fields:()=>({
    eq: { type: GraphQLString },
    beginsWith: { type: GraphQLString }
  })
});

const FilmListFilter = new GraphQLInputObjectType({
  name:'FilmListFilter',
  fields:()=>({
    film_id:{ type: IntFilter },
    title: { type: StringFilter }
  })
});

const FilmListOrders = new GraphQLInputObjectType({
  name: 'FilmListOrders',
  fields:()=>({
    film_id: { type: SortEnum },
    length: { type: SortEnum }
  })
});

const FilmListArgs = {
   filter: { type: FilmListFilter },
   orderBy: { type: FilmListOrders },
   limit: { type: GraphQLInt }
};

const FilmListField = {
  type: new GraphQLList(Film),
  description: 'A list containing movies',
  args: FilmListArgs,
  resolve: (obj, args, context, info) => {
    const { limit, filter, orderBy } = args;
    //console.log(context.baseUrl);
    console.log(args);
    // context is defined in graphQLHTTP middleware in our case, most often its the request object from express
    // info is mostly used only for checking which fields were requested
    let baseQuery = knex('film').select();
    if(limit){
      baseQuery.limit(limit);
    }
    if(filter){
      baseQuery.where(builder => tokenizeFilter(builder, filter));
    }
    if(orderBy){
      const sortKey = Object.keys(orderBy)[0];
      baseQuery.orderBy(sortKey,orderBy[sortKey])
    }
    return baseQuery;
  }
};

module.exports = FilmListField;

const operatorRules = {
  eq: (builder, filterKey, value) => builder.where(filterKey, '=', value),
  neq: (builder, filterKey, value) => builder.where(filterKey, '!=', value),
  gt: (builder, filterKey, value) => builder.where(filterKey, '>', value),
  gte: (builder, filterKey, value) => builder.where(filterKey, '>=', value),
  lt: (builder, filterKey, value) => builder.where(filterKey, '<', value),
  lte: (builder, filterKey, value) => builder.where(filterKey, '<=', value),
  in: (builder, filterKey, value) => builder.whereIn(filterKey, value),
  nin: (builder, filterKey, value) => builder.whereNotIn(filterKey, value),
  beginsWith: (builder, filterKey, value) => builder.where(filterKey, 'ILIKE', value+'%')
};

function tokenizeFilter(builder,filterObject){
  const filterKeys = Object.keys(filterObject);
  filterKeys.forEach(filterKey => {
    const filterKeyObject = filterObject[filterKey];
    Object.keys(filterKeyObject).forEach(operator =>{
      operatorRules[operator](builder, filterKey, filterKeyObject[operator]);
    });
  });
  return builder;
}
