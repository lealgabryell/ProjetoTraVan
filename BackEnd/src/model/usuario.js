const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  usuario_id: { type: String, required: true },
  nome: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  tipo: { type: String, enum: ["passageiro", "motorista"], required: true },
  telefone: { type: String, required: true },
  senha: { type: String, required: true }
});

module.exports = mongoose.model("Usuario", Schema);