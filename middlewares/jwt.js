
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Se necesita un token JWT. Colocarlo del header llamado 'x-access-token'"
    });
  }

  jwt.verify(token, config.secretJWT, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
        if (user.rol === "admin") {
          next();
          return;
        }

        else {
            res.status(403).send({
                message: "¡No estás autorizado! Solo los administradores pueden realizar esta acción"
              });

        }
      return;
  });
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin
};
module.exports = authJwt;