const Query = require('./queries');
const Mutation = require('./mutations');
const Note = require('./note');
const User = require('./user');
const { GraphQLDateTime } = require('graphql-iso-date');
module.exports = {
  Query,
  Mutation,
  User,
  Note
};
