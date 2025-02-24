const mongoose = require("mongoose");

const Schema = new mognoose.Schema({
  origem: { type: String, required: true },
  destino: { type: String, required: true },
  data_partida: { type: Date, required: true },
  data_chegada: { type: Date, required: true },
  passageiros: [{ type: mongoose.Schema.Types.ObjectId, ref: "Passageiro" }],
  motorista: { type: mongoose.Schema.Types.ObjectId, ref: "Motorista" },
  status: { type: String, required: true },
  preco: { type: Number, required: true },
  vagas: { type: Number }
});

module.exports = mongoose.model("Viagem", Schema)