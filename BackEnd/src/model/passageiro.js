const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  passageiro_id: {type: String, required: true},
  usuario_id: { type: String, ref: "Usuario" },
  viagem_id: [{ type: String, ref: "Viagem" }],
  avaliacoes: [{ type: String, ref: "Avaliacao" }]
});

module.exports = mongoose.model("Passageiro", Schema);