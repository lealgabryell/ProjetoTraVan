const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usuarioRoute = require("./src/routes/usuarioRoute.js");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./src/schemas/usuarioSchema.js");
const resolvers = require("./src/resolvers/usuarioResolver.js");
const middlewareAuth = require("./src/auth/middlewareAuth.js");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(middlewareAuth);
app.use("/api/usuarios", usuarioRoute);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(process.env.CONNECTION_STRING_DB)
  .then(() => {
    console.log("Connect to MongoDB - DATABASE");
    app.emit("ok");
  })
  .catch((error) => {
    console.log("Erro na conexao", error);
  });

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  console.log("Start server iniciado!");
};

app.on("ok", () => {
  startServer(); //inicia servidor apollo (graphql)
  app.listen(process.env.PORT, () => {
    console.log(`Servidor conectado na porta ${process.env.PORT}!`);
  });
});
