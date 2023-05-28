const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Book {
    _id: ID!
    authors: [String]
    description: String!
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
    token: ID!
    user: User!
  }

  type Mutation {
    login(email: String!, password: String!): Auth!
    addUser(username: String!, email: String!, password: String!): Auth!
    saveBook(input: BookInput!): User
    removeBooks(bookId: String!): User
  }

  input BookInput {
    author: [String!]!
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
  }
`;

module.exports = typeDefs;
