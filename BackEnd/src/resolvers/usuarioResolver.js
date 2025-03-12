const {
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
    deleteOneUsuario: async (_, { usuario_id }) => {
      return await deleteOne(usuario_id);
    },
  },
};

module.exports = resolvers;
