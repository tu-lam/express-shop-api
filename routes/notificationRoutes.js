const express = require("express");
const notificationController = require("../controllers/notificationController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Notification:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the category
 *          title:
 *            type: string
 *            description: The title of the notification
 *          content:
 *            type: string
 *            description: The content of the notification
 *        example:
 *          id: 628265da16c4207d5daba194
 *          title: Thong bao 1
 *          content: Noi dung thong bao 1
 */

/**
 *  @swagger
 *  tags:
 *    name: Notifications
 *    description: The notifications managing API
 */

/**
 *  @swagger
 *  /notifications:
 *    get:
 *      summary: Return the list of all the notifications
 *      tags: [Notifications]
 *      responses:
 *        200:
 *          description: The list of the notifications
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
 *                      notifications:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Notification'
 *
 *    post:
 *      summary: Create a new notification
 *      tags: [Notifications]
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
 *                description:
 *                  type: string
 *      responses:
 *        201:
 *          description: The notification was created successfully
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
 *                      notification:
 *                        $ref: '#/components/schemas/Notification'
 *
 *        401:
 *          description: Unauthorized
 */

router
  .route("/")
  .get(notificationController.getAllNotifications)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    notificationController.createNotification
  );

/**
 *  @swagger
 *  /notifications/{notificationId}:
 *    get:
 *      summary: Get the notification by id
 *      tags: [Notifications]
 *      parameters:
 *        - in: path
 *          name: notificationId
 *          schema:
 *            type: string
 *          required: true
 *          description: The notification id
 *      responses:
 *        200:
 *          description: The notification by id
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
 *                      notification:
 *                        $ref: '#/components/schemas/Notification'
 *        404:
 *          description: The notification was not found
 *    patch:
 *      summary: Update the notification by id
 *      tags: [Notifications]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: notificationId
 *          schema:
 *            type: string
 *          required: true
 *          description: The notification id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *      responses:
 *        200:
 *          description: The notification was updated successfully
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
 *                      notification:
 *                        $ref: '#/components/schemas/Notification'
 *        401:
 *          description: Unauthorized
 *    delete:
 *      summary: Delete the notification by id
 *      tags: [Notifications]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      parameters:
 *        - in: path
 *          name: notificationId
 *          schema:
 *            type: string
 *          required: true
 *          description: The notification id
 *      responses:
 *        204:
 *          description: The notification was successfully deleted
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
  .get(notificationController.getAllNotifications)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    notificationController.getNotification
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    notificationController.deleteNotification
  );

module.exports = router;
