const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');

const app = express();

app.use('/graphql', graphqlHTTP((req,res)=>({
  schema,
  context: req,
  graphiql: true
  }
)));

app.get('/',(req,res) => {
  res.send('hello world')
});

app.listen(8080, ()=> console.log('API listening at 8080'));