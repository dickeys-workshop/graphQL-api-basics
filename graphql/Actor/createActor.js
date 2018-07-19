const { GraphQLInt, GraphQLString, GraphQLInputObjectType } = require('graphql');

const Actor = require('./Actor');
const knex = require('../../knex');

//Reading the process is expensive, it should always be cached in a variable
const NODE_ENV = process.env.NODE_ENV;

const ActorPayload = new GraphQLInputObjectType({
  name:'ActorPayload',
  fields:()=>({
    first_name: { type:GraphQLString },
    last_name: { type:GraphQLString }
  })
});

const createActor = {
  type: GraphQLInt,
  name: 'createActor',
  description: 'creates an actor',
  args: {
    payload:{ type: ActorPayload }
  },
  resolve:(obj, args)=>{

    return knex.transaction(async trx => {

      try {

        const rows = await trx('actor').insert(args.payload).returning('actor_id');
        const actorId = rows[0];
        //return actorId;
        return rows[0].blabla.blabla

      } catch (e) {
        //can we handle the error?
        if(NODE_ENV === 'development'){
          throw e
        } else {
          //log the error somewhere and throw a non dev err
          //logger.log(e);
          throwUserError(e);
          // not handling the error inside here rolls back the transaction
        }
      }

  })
  }
};

module.exports = createActor;

function throwUserError(e){
  /*
  switch(e.message){
    case 'too long':
  }
  */
  //inspect the error and try returning something better than a generic error;
  throw Error('Something went wrong');
}

// initializing connection to DB gives us a pool of connections

