const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Review:
 *        type: object
 *        required:
 *          - review
 *          - product
 *          - user
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the review
 *          review:
 *            type: string
 *            description: The review of the user
 *          rating:
 *            type: number
 *            format: integer
 *            description: The user rating
 *          createdAt:
 *            type: string
 *            format: date
 *            description: Review creation time
 *          product:
 *            type: string
 *            description: The product id
 *          user:
 *            type: string
 *            description: The user id
 *        example:
 *          id: 628265da16c4207d5daba194
 *          review: Amazing!!!
 *          createdAt: 22-07-2022
 *          product: xj82g5da16c4207d5daduse8
 *          user: m8s2g5da16c4207d5dc72nd5
 */

/**
 *  @swagger
 *  tags:
 *    name: Reviews
 *    description: The reviews managing API
 */

/**
 *  @swagger
 *  /products/{productId}/reviews:
 *    get:
 *      summary: Return the list of all the products
 *      tags: [Reviews]
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: The product id
 *      responses:
 *        200:
 *          description: The list of the reviews
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
 *                          $ref: '#/components/schemas/Review'
 *
 *    post:
 *      summary: Create a new review
 *      tags: [Reviews]
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: The product id
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
 *                review:
 *                  type: string
 *                rating:
 *                  type: number
 *                  format: integer
 *      responses:
 *        201:
 *          description: The review was created successfully
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
 *                      review:
 *                        $ref: '#/components/schemas/Review'
 *
 *        401:
 *          description: Unauthorized
 */

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview
  );

/**
 *  @swagger
 *  /products/{productId}/reviews/{reviewId}:
 *    get:
 *      summary: Get the review by id
 *      tags: [Reviews]
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: The product id
 *        - in: path
 *          name: reviewId
 *          schema:
 *            type: string
 *          required: true
 *          description: The review id
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
 *                      review:
 *                        $ref: '#/components/schemas/Review'
 *        404:
 *          description: The review was not found
 *    patch:
 *      summary: Update the review by id
 *      tags: [Reviews]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: The product id
 *        - in: path
 *          name: reviewId
 *          schema:
 *            type: string
 *          required: true
 *          description: The review id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                review:
 *                  type: string
 *                rating:
 *                  type: number
 *                  format: integer
 *      responses:
 *        200:
 *          description: The review was updated successfully
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
 *        401:
 *          description: Unauthorized
 *    delete:
 *      summary: Delete the review by id
 *      tags: [Reviews]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: The product id
 *        - in: path
 *          name: reviewId
 *          schema:
 *            type: string
 *          required: true
 *          description: The review id
 *      responses:
 *        204:
 *          description: The product was successfully deleted
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
 */
router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    reviewController.deleteReview
  );

module.exports = router;
