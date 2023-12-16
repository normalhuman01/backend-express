/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 * 
 *       example:
 *         email: admin@gmail.com
 *         password: 123456789
 *     LoginResponse:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del usuario
 *         email:
 *           type: string
 *           description: Email
 *         roles:
 *           type: array
 *           description: Contraseña del usuario
 *         jwt:
 *           type: string
 *           description: Hash o token para autenticacion
 * 
 *       example:
 *         email: admin@gmail.com
 *         roles: [	"ROLE_ADMIN" ]
 *         jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc4OTk5MDc4LCJleHAiOjE2NzkwODU0Nzh9.BM2dL5XotYCJZR6X480sz3PlPAvCP1rjD-cV3b_L_QE
 *  
 *      
 * tags:
 *   name: Login
 *   description: Permite obtener un token de inicio de sesion JWT
 * /auth/login:
 *   post:
 *     summary: Logeo de usuario 
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *                $ref: '#/components/schemas/Login'
 *           
 *     responses:
 *       200:
 *         description: Token JWT generado.
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/LoginResponse'
 *       500:
 *         description: Some server error
 */
const controller = require("../controllers/auth.controller"); 

module.exports = function(app) {
app.use(function(req, res, next) {
res.header(
"Access-Control-Allow-Headers",
"x-access-token, Origin, Content-Type, Accept");
next();
});


app.post("/api/login", controller.signin);
};