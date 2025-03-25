/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for a category
 *         name:
 *           type: string
 *           description: The name of the category
 *         imgUrl:
 *           type: string
 *           description: url of the image
 *       required:
 *         - id
 *         - name
 *       example:
 *         id: 1
 *         name: "Accesorios"
 *         imgUrl: 1742759208236_z10.jpg
 * 
 */
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Manejo de las categorías de productos
 */
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de todas las categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error al obtener las categorías
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Agrega una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error al agregar la categoría
 */

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: Actualiza una categoría existente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error al actualizar la categoría
 */