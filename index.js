const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express(); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.js');

const swaggerJsdoc = require("swagger-jsdoc");


const specs = swaggerJsdoc(swaggerDocument);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

var corsOptions = {
  origin: "http://localhost:8081"
}; 


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./models");
db.sequelize.sync(); 
initialValues();


// Ruta principal
app.get("/", (req, res) => {
  res.json({ message: "MarketLogic API esta lista" });
});

// Rutas anexas
require('./routes/auth.routes')(app);
require('./routes/products.routes')(app); 


// Puerto
const PORT = process.env.PORT || 3000; 


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 



/**
 * DATA DE PRUEBA (SOLO EN TEST)
 */
function initialValues() {
  db.User.create({
    firstName: "Brayan", 
    lastName: "Cruces", 
    email: "admin@gmail.com",
    password: '123456789',
    rol: 'admin'
  });

  db.User.create({
    firstName: "Juan", 
    lastName: "Cruces", 
    email: "usuario@gmail.com",
    password: '123456789',
    rol: 'user'
  });


  db.Category.create({
    //id:1,
    name: 'Tecnologia', 
  });

  db.Category.create({
    //id:2,
    name: 'Escolar', 
  });

  db.Category.create({
    //id:3,
    name: 'Belleza', 
  });

} 

