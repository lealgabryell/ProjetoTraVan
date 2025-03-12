const jwtService = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const path = req.originalUrl;
  const method = req.method;
  let token = req.headers.authorization;
  const nonSecurePaths = ["/api/usuarios/login"];

  console.log("cheguei no middleware");

  if (
    (path.includes(nonSecurePaths[0]) && method === "POST") ||
    (path.includes("/graphql") && method === "GET")
  ) {
    console.log("passei por aqui");

    return next();
  }
  if (!token) {
    return res.status(401).json({ message: "Token não informado!" });
  } else {
    token = token.split(" ")[1];
  }
  try {
    const decoded = jwtService.verify(token, process.env.SECRET);
    req.usuario = decoded;
    if (decoded) {
      return next();
    }
  } catch (e) {
    res.status(401).json({ message: e.message, content: e });
  }
};
