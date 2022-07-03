const express = require("express");
const authController = require("../controllers/authController");
const itemController = require("../controllers/itemController");

const router = express.Router();

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
 *  /items:
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
router.post("/", authController.protect, itemController.createItem);

/**
 *  @swagger
 *  /items:
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
router.patch("/:id", authController.protect, itemController.updateItem);

/**
 *  @swagger
 *  /items:
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
router.delete("/:id", authController.protect, itemController.deleteItem);

module.exports = router;
