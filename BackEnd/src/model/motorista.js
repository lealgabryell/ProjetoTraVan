const mongoose = require("mongoose");

const veiculoSchema = new mongoose.Schema({
  modelo: { type: String, default: `` },
  capacidade: { type: Number, default: `` },
  placa: { type: String, default: `` },
});

const veiculoDefault = {
  modelo: null,
  capacidade: null,
  placa: null,
}

const Schema = new mongoose.Schema({
  usuario_id: { type: String, ref: "Usuario", required: true },
  documento_validado: { type: Boolean, default: false },
  veiculo: {
    type: veiculoSchema, default: veiculoDefault
  },
  avaliacao: { type: String, default: null },
});

module.exports = mongoose.model("Motorista", Schema);
