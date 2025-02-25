const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usuarioRoute = require("./src/routes/usuarioRoute.js")
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/usuarios", usuarioRoute)


mongoose
  .connect(process.env.CONNECTION_STRING_DB)
  .then(() => {
    console.log("Connect to MongoDB");
    app.emit("ok");
  })
  .catch((error) => {
    console.log("Erro na conexao", error);
  });

app.on("ok", () => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor conectado na porta ${process.env.PORT}!`);
  });
});