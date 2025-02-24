const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  viagens: [{ type: mongoose.Schema.Types.ObjectId, ref: "Viagem" }],
  avaliacoes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Avaliacao" }]
});

module.exports = mongoose.model("Passageiro", Schema);