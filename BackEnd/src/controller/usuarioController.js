const Usuario = require("../model/usuario.js");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid")
const jwtService = require("jsonwebtoken")
//cria uuid
let generateUserId = () => {
  return `user_${uuidv4()}`;
}

module.exports = {

  insertOne: async (req, res) => {
    try {
      const usuario = req.body

      usuario.usuario_id = generateUserId();
      usuario.senha = await bcrypt.hash(usuario.senha, Number(process.env.ROUNDS));

      const usuarioSenhaCriptografada = await Usuario.create(usuario);
      const { usuario_id, nome, email } = usuarioSenhaCriptografada;
      res.status(201).json({ usuario: { usuario_id, nome, email }, message: "Usuario criado com sucesso" })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  },

  login: async (req, res) => {
    try {
      const userResult = await Usuario.findOne({ email: req.body.email });
      if (!userResult) throw new Error("Credenciais Inválidas!");

      const { __v, _id, ...user } = userResult.toObject();
      const senhaIsValid = await bcrypt.compare(req.body.senha, user.senha);
      if (!senhaIsValid) throw new Error("Credenciais Inválidas!");
      const token = jwtService.sign(user, process.env.SECRET);
      const { nome, email, tipo } = user;
      res.status(200).json({
        message: "Usuário autorizado com sucesso!",
        token: token,
        content: { usuario: { nome, email, tipo } },
      });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}