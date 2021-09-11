// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');
const models = require('./models');

const DB_HOST = process.env.DB_HOST;
const port = process.env.PORT || 4000;

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const getUser = token => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      new Error('Session invalid');
    }
  }
};

const app = express();

db.connect(DB_HOST);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    console.log(user);
    return { models, user };
  }
});

server.applyMiddleware({ app, path: '/api' });
app.get('/', (req, res) => res.send('Hello, World!'));
app.listen({ port }, () => console.log(`Listening on port ${port}!`));

//9
