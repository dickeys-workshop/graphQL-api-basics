const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const ActorListField = require('./Actor/ActorListField');
const ActorField = require('./Actor/ActorField');
const AddressListField = require('./Address/AddressListField');
const AddressField = require('./Address/AddressField');
const CategoryListField = require('./Category/CategoryListField');
const CategoryField = require('./Category/CategoryField');
const FilmField = require('./Film/FilmField');
const FilmListField = require('./Film/FilmListField');
const createActor = require('./Actor/createActor');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
      /*hello: { type: GraphQLString, resolve: () => 'Hello GraphQL' },
      yes: { type: GraphQLBoolean, resolve:() => 'sdfa'},
      developers: { type: new GraphQLList(Person) , resolve:() => [
          { first_name: "Mirko", last_name: "Blbla" },
          { first_name: "Ivan", last_name: "Ron" }
      ]}*/
      actor: ActorField,
      actorList: ActorListField,
      address: AddressField,
      addressList: AddressListField,
      category: CategoryField,
      categoryList: CategoryListField,
      film: FilmField,
      filmList: FilmListField
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutation',
    fields: ()=> ({
      createActor
    })
  })
});

module.exports = schema;