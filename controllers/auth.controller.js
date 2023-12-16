const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config/auth.config.js");


exports.signin = (req, res) => { 
    

     // Validaciones
    if(!req.body.email) {
      return res.status(404).send({ message: "Email vacio" });
    }

    if(!req.body.password) {
      return res.status(404).send({ message: "Es necesaria la contrasea" });
    } 

    // Busqueda

    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "Usuario no encontrado" });
        }
         
        console.log(user.pass)
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        console.log(passwordIsValid)
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Contraseña invalida"
          });
        }
        
        // Generar JWT
        var token = jwt.sign({ id: user.id }, config.secretJWT, {
          expiresIn: 86400 // 24 horas
        });
  
        var authorities = [];  

        if(user.rol == 'admin' || user.rol == 'user') { 
            authorities.push("ROLE_" + user.rol.toUpperCase());
        }

        res.status(200).send({
            id: user.id,
            email: user.email,
            roles: authorities,
            jwt: token
        });


      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };