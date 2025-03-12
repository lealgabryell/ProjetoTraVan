const Usuario = require("../model/usuario.js");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwtService = require("jsonwebtoken");
const Motorista = require("../model/motorista.js");
//cria uuid
let generateUserId = () => {
  return `user-${uuidv4()}`;
};

module.exports = {
  insertOne: async (req, res) => {
    try {
      const usuario = req.body;
      if (!usuario) {
        throw new Error("Informações inválidas! Revise os dados inseridos.");
      } else {
        usuario.usuario_id = generateUserId();
        usuario.senha = await bcrypt.hash(
          usuario.senha,
          Number(process.env.ROUNDS)
        );

        const usuarioSenhaCriptografada = await Usuario.create(usuario);
        const { usuario_id, nome, email } = usuarioSenhaCriptografada;

        if (usuario.tipo == "motorista") {
          const motorista = await Motorista.create({ usuario_id });
        }
        res.status(201).json({ message: "Usuario criado com sucesso!", content: { usuario_id, nome, email } });
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  login: async (req, res) => {
    try {
      console.log("cheguei no try");
      const userResult = await Usuario.findOne({ email: req.body.email });
      if (!userResult) throw new Error("Credenciais Inválidas!");

      const { __v, _id, ...user } = userResult.toObject();
      console.log(user);
      const senhaIsValid = await bcrypt.compare(req.body.senha, user.senha);
      if (!senhaIsValid) throw new Error("Credenciais Inválidas!");

      const token = jwtService.sign(user, process.env.SECRET, { expiresIn: "30s" });

      const { nome, email, tipo } = user;

      res.status(200).json({
        message: "Usuário autorizado com sucesso!",
        token: token,
        content: { usuario: { nome, email, tipo } },
      });
    } catch (error) {
      console.log("cai no catch");
      res.status(401).json({ message: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        throw new Error("Informacao invalida... Revise o ID");
      } else {
        const { usuario_id, nome, email, telefone, tipo } = await Usuario.findOne(
          { usuario_id: id }
        );
        res
          .status(200)
          .json({ usuarioEncontrado: { usuario_id, nome, email, telefone, tipo } });
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getAll: async (req, res) => {
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

  deleteOne: async (usuario_id) => {
    try {
      const usuario = await Usuario.findOne({ usuario_id });
      if (!usuario) {
        throw new Error("Usuario não encontrado!");
      } else {
        await Usuario.findOneAndDelete({ usuario_id });
        if (usuario.tipo == "motorista") {
          await Motorista.findOneAndDelete({ usuario_id });
        }
        return usuario;
      }
    } catch (e) {
      return { message: e.message };
    }
  },

  transformarEmMotorista: async (req, res) => {
    try {
      const id = req.params.id;
      const { usuario_id, nome, email, telefone, tipo } = await Usuario.findOne({ usuario_id: id });
      if (!id) {
        throw new Error("Usuario não encontrado!");
      } else if (tipo == "motorista") {
        throw new Error("Usuario já é motorista!");
      } else {
        await Usuario.findOneAndUpdate({ usuario_id }, { tipo: "motorista" });
        await Motorista.create({ usuario_id });
        res.status(201).json({ message: "Usuario transformado em motorista com sucesso!" });
      }
    } catch (e) {
      if (e.message === "Usuario já é motorista!") {
        res.status(200).json({ message: e.message });
      } else {
        res.status(400).json({ message: e.message });
      }
    }
  }
}
