const express = require("express");
const {
  insertOne,
  login,
  findAll,
  findOne
} = require("../controller/usuarioController.js");
const router = express.Router();

router.route("/").post((req, res) => { insertOne(req, res) }).get(findAll);
router.route("/:id").get(findOne);
router.route("/login").post(login);

module.exports = router;