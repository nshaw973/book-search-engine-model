const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    user(user: _id): User
}

type Book {
    _id: ID!
    authors: [String]
    description: string!
    image: String
    link: String
    title: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: String!
    user: User
}

type Mutation {
    login:
    addUser:
    saveBook:
    removeBook:
}
`

module.exports = typeDefs