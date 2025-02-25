const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  usuario_id: { type: String, ref: "Usuario", required: true, unique: true},
  viagem_id: [{ type: String, ref: "Viagem" }],
  avaliacoes: [{ type: String, ref: "Avaliacao" }]
});

module.exports = mongoose.model("Passageiro", Schema);