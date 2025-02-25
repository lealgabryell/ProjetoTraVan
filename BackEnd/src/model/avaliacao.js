const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  usuario_id: { type: String, ref: "Usuario", required: true },
  avaliado_id: { type: String, ref: "Usuario", required: true },
  nota: { type: Number, required: true },
  comentario: { type: String, default: "Sem comentarios..." }
});

module.exports = mongoose.model("Avaliacao", Schema);