const mongoose = require("mongoose");

const veiculoSchema = new mongoose.Schema({
  modelo: { type: String, required: true },
  capacidade: { type: Number, required: true },
  placa: { type: String, required: true }
});

const Schema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  veiculo: [veiculoSchema]
});

module.exports = mongoose.model("Motorista", Schema);