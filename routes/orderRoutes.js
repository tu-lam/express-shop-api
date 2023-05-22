const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Order:
 *        type: object
 *        required:
 *          - user
 *          - address
 *          - phone
 *        properties:
 *          id:
 *            type: string
 *            description: The order id
 *          user:
 *            type: string
 *            description: The user id
 *          address:
 *            type: string
 *            description: The user address
 *          phone:
 *            type: number
 *            description: The user phone
 *          createdAt:
 *            type: string
 *            format: date
 *            description: Order creation time
 *          total:
 *            type: number
 *            description: Total price
 *          status:
 *            type: string
 *            description: The status of the order
 *          items:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Item'
 */

/**
 *  @swagger
 *  tags:
 *    name: Orders
 *    description: The order managing API
 */

// router.get(
//   "/checkout-session/:orderId",
//   authController.protect,
//   orderController.getCheckoutSession
// );

/**
 *  @swagger
 *  /orders:
 *    get:
 *      summary: Return the list of all the orders
 *      tags: [Orders]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      responses:
 *        200:
 *          description: The list of the orders
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
 *                    type: number
 *                    description: length of results
 *                    example: 1
 *                  data:
 *                    type: object
 *                    properties:
 *                      products:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Order'
 *
 *    post:
 *      summary: Create a new order
 *      tags: [Orders]
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
 *                address:
 *                  type: string
 *                  description: The address for delivery
 *                phone:
 *                  type: string
 *                  description: The phone for delivery
 *      responses:
 *        201:
 *          description: The order was created successfully
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
 *                      products:
 *                        type: array
 *                        order:
 *                          $ref: '#/components/schemas/Order'
 *        401:
 *          description: Unauthorized
 */

router
  .route("/")
  .get(authController.protect, orderController.getAllOrders)
  .post(authController.protect, orderController.createOrder);

/**
 *  @swagger
 *  /orders/{id}:
 *    get:
 *      summary: Get the order by id
 *      tags: [Orders]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The order id
 *      responses:
 *        200:
 *          description: The order by id
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
 *                      order:
 *                        $ref: '#/components/schemas/Order'
 *        404:
 *          description: The order was not found
 */
router
  .route("/:id")
  .get(authController.protect, orderController.getOrder)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    orderController.updateOrder
  );

module.exports = router;
