/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - categoryId
 *       properties:
 *         id:
 *           type: integer
 *           description: Un id autogenerado del producto
 *         name:
 *           type: string
 *           description: El nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: float
 *           description: Precio del producto
 *         categoryId:
 *           type: string
 *           description: Categoria  id asociada al producto 
 * 
 *       example:
 *         name: Mochila
 *         description: Mi producto tiene estas caracteristcas
 *         price: 10.00
 *         categoryId: 1
 * 
 * tags:
 *   name: Productos
 *   description: Gestion de los productos
 * /api/products:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Productos]
 *     security: 
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: La lista de los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Algo ocurrio con el servidor
 * /api/products/{id}:
 *   get:
 *     summary: Obtener producto por Id
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del producto
 *     responses:
 *       200:
 *         description: La respuesta del producto por ID
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: El producto no fue encontrado
 *   put:
 *    summary: Actualizar producto por id
 *    tags: [Productos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: El id del producto
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: El producto fue actualizado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: El producto no fue encontrado
 *      500:
 *        description: Algo ocurrio con el servidor
 *   delete:
 *     summary: Eliminar un producto por id
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del producto
 *
 *     responses:
 *       200:
 *         description: El producto fue eliminado
 *       404:
 *         description: El producto no fue encontrado
 */

const { authJwt } = require("../middlewares");

const products = require("../controllers/products.controller");

module.exports = function(app) {
     app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      app.get("/api/products/", [authJwt.verifyToken], products.findAll);
      app.post("/api/products/", [authJwt.verifyToken, authJwt.isAdmin], products.create);
      app.get("/api/products/:id", [authJwt.verifyToken], products.findOne);
      app.put("/api/products/:id", [authJwt.verifyToken, authJwt.isAdmin], products.update);
      app.delete("/api/products/:id", [authJwt.verifyToken, authJwt.isAdmin], products.delete);
      app.delete("/api/products/", [authJwt.verifyToken, authJwt.isAdmin], products.deleteAll); 

      // Subida masiva via csv 
      //app.post("/api/products/bulk", [authJwt.verifyToken, authJwt.isAdmin], products.uploadByCsv);
};