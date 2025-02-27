const { findByTipo, getAllUsuarios } = require("../controller/usuarioController.js");

const resolvers = {
  Query: {
    usuario: async (_, { tipo }) => await findByTipo(tipo)
  },

  Query: {
    usuarios: async () => await getAllUsuarios()
  }
};

module.exports = resolvers;