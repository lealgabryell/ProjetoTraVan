const mongoose = require("mongoose");

const veiculoSchema = new mongoose.Schema({
  modelo: { type: String, required: true },
  capacidade: { type: Number, required: true },
  placa: { type: String, required: true },
});

const Schema = new mongoose.Schema({
  usuario_id: { type: String, ref: "Usuario", required: true},
  documento_validado: { type: Boolean, default: false },
  veiculo: [veiculoSchema],
  avaliacao: { type: String }
});

module.exports = mongoose.model("Motorista", Schema);
