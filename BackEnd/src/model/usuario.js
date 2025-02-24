const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  tipo: { type: String, required: true },
  telefone: { type: String, required: true },
  viagens: [{ type: mongoose.Schema.Types.ObjectId, ref: "Viagem" }],
  senha: { type: String, required: true }
});

module.exports = mongoose.model("Usuario", Schema);