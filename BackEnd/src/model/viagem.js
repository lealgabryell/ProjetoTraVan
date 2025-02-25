const mongoose = require("mongoose");

const Schema = new mognoose.Schema({
  viagem_id: {type: String, required: true},
  origem: { type: String, required: true },
  destino: { type: String, required: true },
  data_partida: { type: Date, required: true },
  data_chegada: { type: Date, required: true },
  passageiro_id: [{ type: String, ref: "Passageiro" }],
  motorista_id: { type: String, ref: "Motorista" },
  status_viagem: { type: String, required: true },
  preco: { type: Number, required: true },
  vagas: { type: Number }
});

module.exports = mongoose.model("Viagem", Schema)