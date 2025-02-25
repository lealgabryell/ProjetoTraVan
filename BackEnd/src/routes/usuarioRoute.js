const express = require("express");
const {
  insertOne,
  login
} = require("../controller/usuarioController.js");
const router = express.Router();

router.route("/").post((req, res) => {insertOne(req, res)});
router.route("/login").post(login);

module.exports = router;