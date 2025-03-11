const {
  insertOne,
  getAllMotoristas,
  getAllPassageiros,
  getAllUsuarios,
  deleteOne,
} = require("../controller/usuarioController.js");

const resolvers = {
  Query: {
    motoristas: async () => await getAllMotoristas(),
    passageiros: async () => await getAllPassageiros(),
    usuarios: async () => await getAllUsuarios(),
  },
  Mutation: {
    createUsuario: async (_, { nome, email, tipo, telefone, senha }) => {
      return await insertOne(nome, email, tipo, telefone, senha);
    },
    deleteOne: async (_, { usuario_id }) => {
      return await deleteOne(usuario_id);
    },
  },
};

module.exports = resolvers;
