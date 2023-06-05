const express = require("express");

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Product:
 *        type: object
 *        required:
 *          - name
 *          - price
 *          - image
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the product
 *          name:
 *            type: string
 *            description: The product name
 *          description:
 *            type: string
 *            description: The product description
 *          price:
 *            type: number
 *            format: float
 *            description: The product price
 *          image:
 *            type: string
 *            description: The product image cover
 *            format: binary
 *          ratingsAverage:
 *            type: number
 *            format: float
 *            description: The product ratings average
 *          ratingsQuantity:
 *            type: integer
 *            description: The product ratings quantity
 *        example:
 *          id: 628265da16c4207d5daba194
 *          name: Unisex Jersey T-Shirt
 *          price: 32
 *          option: XL
 *          image: product-628265da16c4207d5daba194-32414214214
 *          ratingsAverage: 4
 *          ratingsQuantity: 2
 */

/**
 *  @swagger
 *  tags:
 *    name: Products
 *    description: The products managing API
 */

/**
 *  @swagger
 *  /products:
 *    get:
 *      summary: Return the list of all the products
 *      tags: [Products]
 *      responses:
 *        200:
 *          description: The list of the products
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: status response
 *                    example: success
 *                  results:
 *                    type: integer
 *                    description: length of results
 *                    example: 1
 *                  data:
 *                    type: object
 *                    properties:
 *                      products:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Product'
 *
 *    post:
 *      summary: Create a new product
 *      tags: [Products]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                price:
 *                  type: number
 *                image:
 *                  type: string
 *                  format: binary
 *      responses:
 *        201:
 *          description: The product was successfully created
 *          content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: status response
 *                    example: success
 *                  data:
 *                    type: object
 *                    properties:
 *                      product:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Product'
 *        401:
 *          description: Unauthorized
 *        403:
 *          description: Forbidden
 *        500:
 *          description: Server error
 */

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    productController.uploadProductImage,
    productController.createProduct
  );

/**
 *  @swagger
 *  /products/{id}:
 *    get:
 *      summary: Get the product by id
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The product id
 *      responses:
 *        200:
 *          description: The product description by id
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: status response
 *                    example: success
 *                  data:
 *                    type: object
 *                    properties:
 *                      product:
 *                        $ref: '#/components/schemas/Product'
 *        404:
 *          description: The product was not found
 *    patch:
 *      summary: Update the product by id
 *      tags: [Products]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The product id
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                price:
 *                  type: number
 *                image:
 *                  type: string
 *                  format: binary
 *      responses:
 *        200:
 *          description: The product was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: status response
 *                    example: success
 *                  data:
 *                    type: object
 *                    properties:
 *                      products:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Product'
 *        401:
 *          description: Unauthorized
 *        403:
 *          description: Forbidden
 *        500:
 *          description: Server error
 *    delete:
 *      summary: Delete the product by id
 *      tags: [Products]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The product id
 *      responses:
 *        204:
 *          description: The product was deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: status response
 *                    example: success
 *                  data:
 *                    type: null
 *                    example: null
 *        404:
 *          description: The product was not found
 */
router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    productController.uploadProductImage,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    productController.deleteProduct
  );

module.exports = router;
