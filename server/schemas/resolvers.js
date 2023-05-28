const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('Login Required!');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      const correctPW = await user.isCorrectPassword(password);
      if (!user || !correctPW) {
        throw new AuthenticationError('Invalid Credentials');
      }
      const token = signToken(user);

      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { input }, context) => {
      const { author, description, title, bookId, image, link } = input;

      return User.findByIdAndUpdate(
        { _id: context.user._id },
        {
          $push: {
            books: {
              author,
              description,
              title,
              bookId,
              image,
              link,
            },
          },
        },
        { new: true }
      );
    },

    removeBooks: async (parent, { bookId }, context) => {
      return User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: bookId } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
