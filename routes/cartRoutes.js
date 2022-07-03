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
 *  /cart:
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

router.get("/", authController.protect, cartController.getCart);

module.exports = router;
