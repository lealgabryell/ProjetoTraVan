const express = require("express");
const {
  insertOne,
  login,
  getAll,
  getOne,
  transformarEmMotorista
} = require("../controller/usuarioController.js");
const router = express.Router();

router.route("/").get(getAll).post((req, res) => { insertOne(req, res) });
router.route("/:id").get(getOne).post((req, res) => { transformarEmMotorista(req, res) });;
router.route("/login").post(login);

module.exports = router;