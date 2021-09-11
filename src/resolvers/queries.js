module.exports = {
  hello: () => 'Hello world!',
  notes: async (parents, args, { models }) => {
    return await models.Note.find();
  },

  note: async (parents, args, { models }) => {
    return await models.Note.findById(args.id);
  },
  user: async (parents, { username }, { models }) => {
    return await models.User.findOne({ username });
  },
  users: async (parents, args, { models }) => {
    return await models.User.find({});
  },
  me: async (parent, args, { models, user }) => {
    console.log(user);
    return await models.User.findById(user._id);
  }
};
