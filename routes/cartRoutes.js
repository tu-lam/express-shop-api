const express = require("express");

const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 *  @swagger
 *  tags:
 *    name: Cart
 *    description: The cart managing API
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Item:
 *        type: object
 *        required:
 *          - product
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the item
 *          product:
 *            type: string
 *            description: The product id
 *          quantity:
 *            type: number
 *            description: The product quantity
 *          option:
 *            type: string
 *            description: The product option
 *        example:
 *          id: 628265da16c4207d5daba194
 *          product: 5424265da16c4207d5dad9r79
 *          quantity: 1
 *          option: XL
 */

/**
 *  @swagger
 *  /cart/items:
 *    get:
 *      summary: Return the list of all the items in cart
 *      tags: [Cart]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      responses:
 *        200:
 *          description: The list items in cart
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
 *                      cart:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Item'
 */

router.get("/items", authController.protect, cartController.getAllItemsInCart);

/**
 *  @swagger
 *  /cart/items:
 *    post:
 *      summary: Create a new item in cart
 *      tags: [Cart]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                product:
 *                  type: string
 *                  description: The product id
 *                  example: 5424265da16c4207d5dad9r79
 *                quantity:
 *                  type: string
 *                  description: The item quantity
 *                  example: 1
 *                option:
 *                  type: string
 *                  description: The item option
 *                  example: XL
 *      responses:
 *        201:
 *          description: The item was successfully created
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
 *                      item:
 *                        $ref: '#/components/schemas/Item'
 *        401:
 *          description: Unauthorized
 */
router.post("/items", authController.protect, cartController.createItemInCart);

/**
 *  @swagger
 *  /cart/items/{id}:
 *    patch:
 *      summary: Update a item in cart
 *      tags: [Cart]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The item id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                quantity:
 *                  type: string
 *                  description: The item quantity
 *                  example: 1
 *      responses:
 *        200:
 *          description: The item was deleted successfully
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
 *                      item:
 *                        $ref: '#/components/schemas/Item'
 *        401:
 *          description: Unauthorized
 */
router.patch(
  "/items/:id",
  authController.protect,
  cartController.updateItemInCart
);

/**
 *  @swagger
 *  /cart/items/{id}:
 *    delete:
 *      summary: Delete a item in cart
 *      tags: [Cart]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The item id
 *      responses:
 *        200:
 *          description: The item was deleted successfully
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
 *        401:
 *          description: Unauthorized
 */
router.delete(
  "/items/:id",
  authController.protect,
  cartController.deleteItemInCart
);

module.exports = router;
