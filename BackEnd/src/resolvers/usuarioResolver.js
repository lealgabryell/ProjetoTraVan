const { getAllMotoristas, getAllPassageiros, getAllUsuarios } = require("../controller/usuarioController.js");

const resolvers = {
  Query: {
    motoristas: async () => await getAllMotoristas(),
    passageiros: async () => await getAllPassageiros(),
    usuarios: async () => await getAllUsuarios()
  }
};

module.exports = resolvers;