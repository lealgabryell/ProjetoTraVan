const { insertOne, getAllMotoristas, getAllPassageiros, getAllUsuarios } = require("../controller/usuarioController.js");

const resolvers = {
  Query: {
    motoristas: async () => await getAllMotoristas(),
    passageiros: async () => await getAllPassageiros(),
    usuarios: async () => await getAllUsuarios()
  },
  Mutation: {
    createUsuario: async (_, { nome, email, tipo, telefone, senha }) => { return await insertOne(nome, email, tipo, telefone, senha) }
  }
};

module.exports = resolvers;