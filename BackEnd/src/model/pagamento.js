const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  status: { type: Boolean, default: false },
  passageiro_id: { type: String, ref: "Passageiro", required: true },
  viagem_id: { type: String, ref: "Viagem", required: true }
});

module.exports = mongoose.model("Pagamento", Schema);