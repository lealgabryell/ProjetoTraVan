const jwtService = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const path = req.path;
  const method = req.method;
  let token = req.headers.authorization;
  const nonSecurePaths = ["/api/usuarios/login"];

  if (
    (path.includes(nonSecurePaths) && method === "POST") ||
    (path.includes("/graphql") && method === "GET")
  ) {
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
