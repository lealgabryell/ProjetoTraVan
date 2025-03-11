const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Usuario {
    usuario_id: String!
    nome: String!
    email: String!
    tipo: String!
    telefone: String!
  }

  type Query {
    usuarios: [Usuario]
    passageiros: [Usuario]
    motoristas: [Usuario]
  }

  type Mutation {
    createUsuario(nome: String!, email: String!, tipo: String!, telefone: String!, senha: String!): Usuario
    deleteOne(usuario_id: String!): Usuario
  }
`;

module.exports = { typeDefs };