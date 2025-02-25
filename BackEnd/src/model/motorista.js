const mongoose = require("mongoose");

const veiculoSchema = new mongoose.Schema({
  modelo: { type: String, required: true },
  capacidade: { type: Number, required: true },
  placa: { type: String, required: true }
});

const Schema = new mongoose.Schema({
  motorista_id: {type: String, required: true},
  usuario_id: { type: String, ref: "Usuario" },
  documento_validado: {type: Boolean, default: false},
  veiculo: [veiculoSchema]
});

module.exports = mongoose.model("Motorista", Schema);