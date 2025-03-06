const Usuario = require("../model/usuario.js");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwtService = require("jsonwebtoken");
const Passageiro = require("../model/passageiro.js");
const Motorista = require("../model/motorista.js");
//cria uuid
let generateUserId = () => {
  return `user_${uuidv4()}`;
};

module.exports = {
  insertOne: async (nome1, email1, tipo, telefone, senha) => {
    try {
      const usuario = { nome: nome1, email: email1, tipo, telefone, senha };

      usuario.usuario_id = generateUserId();

      usuario.senha = await bcrypt.hash(
        usuario.senha,
        Number(process.env.ROUNDS)
      );

      const usuarioSenhaCriptografada = await Usuario.create(usuario);
      const { usuario_id, nome, email } = usuarioSenhaCriptografada;

      if (usuario.tipo == "passageiro") {
        await Passageiro.create({ usuario_id });
      } else if (usuario.tipo == "motorista") {
        await Motorista.create({ usuario_id });
      }
      return usuarioSenhaCriptografada;
    } catch (e) {
      return { message: e.message };
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
  },

  findOne: async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        const { usuario_id, nome, email, telefone } = await Usuario.findById(
          id
        );
        res
          .status(200)
          .json({ usuarioEncontrado: { usuario_id, nome, email, telefone } });
      } else {
        throw new Error("Informacao invalida... Revise o ID");
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const usuariosEncontrados = await Usuario.find();
      res.status(200).json({
        usuarios: usuariosEncontrados.map(
          ({ usuario_id, nome, email, tipo, telefone }) => ({
            usuario_id,
            nome,
            email,
            tipo,
            telefone,
          })
        ),
      });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getAllPassageiros: async () => {
    try {
      const usuarios = await Usuario.find();
      const usuariosFiltrados = usuarios.filter(
        (usuario) => usuario.tipo === "passageiro"
      );
      return usuariosFiltrados;
    } catch (e) {
      return { messsage: e.message };
    }
  },
  getAllMotoristas: async () => {
    try {
      const usuarios = await Usuario.find();
      const usuariosFiltrados = usuarios.filter(
        (usuario) => usuario.tipo === "motorista"
      );
      return usuariosFiltrados;
    } catch (e) {
      return { message: e.message };
    }
  },

  getAllUsuarios: async () => {
    try {
      return await Usuario.find();
    } catch (e) {
      return { message: e.message };
    }
  },
};
