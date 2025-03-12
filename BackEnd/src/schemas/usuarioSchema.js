const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Usuario {
    usuario_id: String!
    nome: String!
    email: String!
    tipo: String!
    telefone: String!
  }
  type UsuarioReduzido {
    usuario_id: String!
    nome: String!
    email: String!
  }
  type Query {
    usuarios: [Usuario]
    passageiros: [Usuario]
    motoristas: [Usuario]
  }

  type Mutation {
    deleteOneUsuario(usuario_id: String!): Usuario
  }
`;

module.exports = { typeDefs };