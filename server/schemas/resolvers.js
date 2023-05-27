const {User} = require('../models')

const resolvers = {
    Query: {
        getSingleUser: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params)
        }
    },
    Mutations: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user
        }

    }
}

module.exports = resolvers;