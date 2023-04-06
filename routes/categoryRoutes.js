const express = require("express");
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Category:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the category
 *          name:
 *            type: string
 *            description: The name of the category
 *        example:
 *          id: 628265da16c4207d5daba194
 *          review: Trà sữa
 */

/**
 *  @swagger
 *  tags:
 *    name: Categories
 *    description: The categories managing API
 */

/**
 *  @swagger
 *  /categories:
 *    get:
 *      summary: Return the list of all the categories
 *      tags: [Categories]
 *      responses:
 *        200:
 *          description: The list of the categories
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
 *                      categories:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Category'
 *
 *    post:
 *      summary: Create a new category
 *      tags: [Categories]
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
 *                name:
 *                  type: string
 *      responses:
 *        201:
 *          description: The category was created successfully
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
 *                      category:
 *                        $ref: '#/components/schemas/Category'
 *
 *        401:
 *          description: Unauthorized
 */

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.createCategory
  );

/**
 *  @swagger
 *  /categories/{categoryId}:
 *    get:
 *      summary: Get the review by id
 *      tags: [Categories]
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          schema:
 *            type: string
 *          required: true
 *          description: The category id
 *      responses:
 *        200:
 *          description: The category description by id
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
 *                      category:
 *                        $ref: '#/components/schemas/Category'
 *        404:
 *          description: The category was not found
 *    patch:
 *      summary: Update the category by id
 *      tags: [Categories]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          schema:
 *            type: string
 *          required: true
 *          description: The category id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *      responses:
 *        200:
 *          description: The category was updated successfully
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
 *                      category:
 *                        $ref: '#/components/schemas/Category'
 *        401:
 *          description: Unauthorized
 *    delete:
 *      summary: Delete the category by id
 *      tags: [Categories]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          schema:
 *            type: string
 *          required: true
 *          description: The category id
 *      responses:
 *        204:
 *          description: The category was successfully deleted
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
  .get(categoryController.getCategory)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.deleteCategory
  );

module.exports = router;
