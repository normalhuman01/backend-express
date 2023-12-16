const db = require("../models");
const Product = db.Product;
const Category = db.Category;
const Op = db.Sequelize.Op;

// Crear un nuevo producto
exports.create = (req, res) => { 

  if (!req.body.name) {
    res.status(400).send({
      message: "El nombre no puede estar vacio"
    });
    return;
  }

  if (!req.body.price || req.body.price <= 0) {
    res.status(400).send({
      message: "El precio no puede estar vacio y debe ser mayor a 0"
    });
    return;
  } 

  // Validar Categoria 
  
  if (!req.body.categoryId) {
    res.status(400).send({
      message: "La categoria no debe estar vacia"
    });
    return;
  }  

  
  else {
    Category.findByPk(req.body.categoryId)
    .then(data => {
       
      // Guardar producto 
      const product = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        CategoryId: req.body.CategoryId
      };

      Product.create(product)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Ocurrió un error al guardar el producto"
          });
    });

    })
    .catch(err => {
      res.status(500).send({
        message: "La categoria ingresada no existe"
      });
    });
  }



};

exports.findAll = (req, res) => {
  Product.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Ocurrio un error al solititar producto con id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Se actualizo el producto."
        });
      } else {
        res.send({
          message: `Ocurrio un error`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ocurrio un error al editar producto con id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Producto eliminado correctamente"
        });
      } else {
        res.send({
          message: `No se puede eliminar el producto con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se puede eliminar el producto con id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Productos eliminados correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio algun error al eliminar todos los productos"
      });
    });
};
