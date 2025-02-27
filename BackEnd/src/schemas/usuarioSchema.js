const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Usuario {
  usuario_id: String!
  nome: String!
  email: String!
  tipo: String!
  telefone: String!
}

type Query{
  usuarios: [Usuario]
  usuario(tipo: String!) : [Usuario]
}
`;

module.exports = { typeDefs }