const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

/**
 *  @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - passwordConfirm
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the user
 *          name:
 *            type: string
 *            description: The user name
 *          email:
 *            type: string
 *            description: The user email
 *          photo:
 *            type: string
 *            description: The user photo
 *          role:
 *            type: string
 *            description: The user role
 *          cart:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Item'
 *          password:
 *            type: string
 *            description: The user password
 *          passwordConfirm:
 *            type: string
 *            description: Confirm password
 *        example:
 *          id: 628265da16c4207d5daba194
 *          name: john
 *          email: john@email.com
 *          photo: default.jpg
 *          role: user
 */

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: The authentication managing API
 */

/**
 *  @swagger
 *  tags:
 *    name: Users
 *    description: The users managing API
 */

/**
 *  @swagger
 *  /users/signup:
 *    post:
 *      summary: Sign Up
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: name
 *                  example: Jonas
 *                email:
 *                  type: string
 *                  description: email
 *                  example: user@gmail.com
 *                password:
 *                  type: string
 *                  format: password
 *                  description: password
 *                  example: 123123
 *                confirmPassword:
 *                  type: string
 *                  format: password
 *                  description: confirm password
 *                  example: 123123
 *      responses:
 *        200:
 *          description: Sign up successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: status response
 *                    example: success
 *                  token:
 *                    type: string
 *                    description: jsonwebtoken
 *                    example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTNkYzc2OWY1ZTMzYjRiNWRkMzYyZCIsImlhdCI6MTY1NDkwNTk3NSwiZXhwIjoxNjU0OTkyMzc1fQ.S8UbzvEY_5LlF2TAFLLd5i-ZEISXR3Q8awHeR9gSEhdhayaGCYqMsZnSUsCDmF8p42WryOI6wuIFEh_wIgS4bvSMu7wkdgdneCZwDuibfFwSx4GmV5iCkOT8CbCtiawsJZrug66Ql6rHEYE4soh7x00llMFCG-juas0CkgZ8Hc9zw8d4Lx-E0KXdemf9yV7NCV8XwdljJtAP3n2QGlT_Ai0NKxaCw5SwFTABT9KLi58kyqMU8I6Q5B1hbccOf95qk2dmTgbHZL0aAdrF5eahLa1F_WbJES9MCzhb8ChIKIXB8SnYnNHdvopNL_hvFkxp5waRCd1Q88OX-X1b8R-UFAjuZvIRAzp8CaRvOC-22K4YV1cDBGGd4j4ttUgCueZhlIB_zzjzw3WZBPAWasvsqI_voF8MfSSHqLSbhNHRVYvs9Te7grLwpafvSIPv9XwWxFJ_C0Lh7Ck9igUQefL54yfcWwCK2B2ZkGuF9mPfolZwBiiqTWS9kpW5qtEgXbka35hBR3_h5z_6dEzOC6_ouX_sptqn3O_d3hgiIS94Do3kKpEn7gY10iDDME-ZbKsX_9qdDComnp0HuVcCb_O8OOpOUbplzUWAxNUrWLxpW_FuOfDp6VLQOny2fu5H_WtZKqmirFfvlMpqsA1KClyA70DXWNz-ro3xwGTMGzfl9ZE
 *                  data:
 *                    type: object
 *                    properties:
 *                      user:
 *                        $ref: '#/components/schemas/User'
 *        400:
 *          description: Bad request
 */
router.post("/signup", authController.signUp);

/**
 *  @swagger
 *  /users/signin:
 *    post:
 *      summary: Sign In
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: email
 *                  example: user@gmail.com
 *                password:
 *                  type: string
 *                  description: password
 *                  format: password
 *                  example: 123123
 *      responses:
 *        200:
 *          description: Sign in successful
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: status response
 *                    example: success
 *                  token:
 *                    type: string
 *                    description: jsonwebtoken
 *                    example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTNkYzc2OWY1ZTMzYjRiNWRkMzYyZCIsImlhdCI6MTY1NDkwNTk3NSwiZXhwIjoxNjU0OTkyMzc1fQ.S8UbzvEY_5LlF2TAFLLd5i-ZEISXR3Q8awHeR9gSEhdhayaGCYqMsZnSUsCDmF8p42WryOI6wuIFEh_wIgS4bvSMu7wkdgdneCZwDuibfFwSx4GmV5iCkOT8CbCtiawsJZrug66Ql6rHEYE4soh7x00llMFCG-juas0CkgZ8Hc9zw8d4Lx-E0KXdemf9yV7NCV8XwdljJtAP3n2QGlT_Ai0NKxaCw5SwFTABT9KLi58kyqMU8I6Q5B1hbccOf95qk2dmTgbHZL0aAdrF5eahLa1F_WbJES9MCzhb8ChIKIXB8SnYnNHdvopNL_hvFkxp5waRCd1Q88OX-X1b8R-UFAjuZvIRAzp8CaRvOC-22K4YV1cDBGGd4j4ttUgCueZhlIB_zzjzw3WZBPAWasvsqI_voF8MfSSHqLSbhNHRVYvs9Te7grLwpafvSIPv9XwWxFJ_C0Lh7Ck9igUQefL54yfcWwCK2B2ZkGuF9mPfolZwBiiqTWS9kpW5qtEgXbka35hBR3_h5z_6dEzOC6_ouX_sptqn3O_d3hgiIS94Do3kKpEn7gY10iDDME-ZbKsX_9qdDComnp0HuVcCb_O8OOpOUbplzUWAxNUrWLxpW_FuOfDp6VLQOny2fu5H_WtZKqmirFfvlMpqsA1KClyA70DXWNz-ro3xwGTMGzfl9ZE
 *                  data:
 *                    type: object
 *                    properties:
 *                      user:
 *                        $ref: '#/components/schemas/User'
 *        404:
 *          description: Incorrect username or password
 */
router.post("/signin", authController.signIn);

/**
 *  @swagger
 *  /users/logout:
 *    get:
 *      summary: Logout
 *      tags: [Auth]
 *      responses:
 *        200:
 *          description: Sign in successful
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: status response
 *                    example: success
 */
router.get("/logout", authController.logout);

/**
 *  @swagger
 *  /users/forgot-password:
 *    post:
 *      summary: Forgot password
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: email
 *                  example: user@gmail.com
 *      responses:
 *        200:
 *          description: Token sent to email
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: status response
 *                    example: success
 *                  message:
 *                    type: string
 *                    description: message
 *                    example: Token sent to email!
 */
router.post("/forgot-password", authController.forgotPassword);

/**
 *  @swagger
 *  /users/reset-password/{token}:
 *    patch:
 *      summary: Reset password
 *      tags: [Auth]
 *      parameters:
 *        - in: path
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *          description: token for reset password
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *                  format: password
 *                  description: password
 *                  example: 123123
 *                passwordConfirm:
 *                  type: string
 *                  format: password
 *                  description: confirm password
 *                  example: 123123
 *      responses:
 *        200:
 *          description: Change password successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: status response
 *                    example: success
 *                  token:
 *                    type: string
 *                    description: jsonwebtoken
 *                    example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTNkYzc2OWY1ZTMzYjRiNWRkMzYyZCIsImlhdCI6MTY1NDkwNTk3NSwiZXhwIjoxNjU0OTkyMzc1fQ.S8UbzvEY_5LlF2TAFLLd5i-ZEISXR3Q8awHeR9gSEhdhayaGCYqMsZnSUsCDmF8p42WryOI6wuIFEh_wIgS4bvSMu7wkdgdneCZwDuibfFwSx4GmV5iCkOT8CbCtiawsJZrug66Ql6rHEYE4soh7x00llMFCG-juas0CkgZ8Hc9zw8d4Lx-E0KXdemf9yV7NCV8XwdljJtAP3n2QGlT_Ai0NKxaCw5SwFTABT9KLi58kyqMU8I6Q5B1hbccOf95qk2dmTgbHZL0aAdrF5eahLa1F_WbJES9MCzhb8ChIKIXB8SnYnNHdvopNL_hvFkxp5waRCd1Q88OX-X1b8R-UFAjuZvIRAzp8CaRvOC-22K4YV1cDBGGd4j4ttUgCueZhlIB_zzjzw3WZBPAWasvsqI_voF8MfSSHqLSbhNHRVYvs9Te7grLwpafvSIPv9XwWxFJ_C0Lh7Ck9igUQefL54yfcWwCK2B2ZkGuF9mPfolZwBiiqTWS9kpW5qtEgXbka35hBR3_h5z_6dEzOC6_ouX_sptqn3O_d3hgiIS94Do3kKpEn7gY10iDDME-ZbKsX_9qdDComnp0HuVcCb_O8OOpOUbplzUWAxNUrWLxpW_FuOfDp6VLQOny2fu5H_WtZKqmirFfvlMpqsA1KClyA70DXWNz-ro3xwGTMGzfl9ZE
 *                  data:
 *                    type: object
 *                    properties:
 *                      user:
 *                        $ref: '#/components/schemas/User'
 */
router.patch("/reset-password/:token", authController.resetPassword);

/**
 *  @swagger
 *  /users/update-my-password:
 *    patch:
 *      summary: Update current user password
 *      tags: [Auth]
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
 *                currentPassword:
 *                  type: string
 *                  format: password
 *                  description: current password
 *                  example: 123123123
 *                password:
 *                  type: string
 *                  format: password
 *                  description: password
 *                  example: 123123
 *                confirmPassword:
 *                  type: string
 *                  format: password
 *                  description: confirm password
 *                  example: 123123
 *      responses:
 *        200:
 *          description: Change password successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: status response
 *                    example: success
 *                  token:
 *                    type: string
 *                    description: jsonwebtoken
 *                    example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTNkYzc2OWY1ZTMzYjRiNWRkMzYyZCIsImlhdCI6MTY1NDkwNTk3NSwiZXhwIjoxNjU0OTkyMzc1fQ.S8UbzvEY_5LlF2TAFLLd5i-ZEISXR3Q8awHeR9gSEhdhayaGCYqMsZnSUsCDmF8p42WryOI6wuIFEh_wIgS4bvSMu7wkdgdneCZwDuibfFwSx4GmV5iCkOT8CbCtiawsJZrug66Ql6rHEYE4soh7x00llMFCG-juas0CkgZ8Hc9zw8d4Lx-E0KXdemf9yV7NCV8XwdljJtAP3n2QGlT_Ai0NKxaCw5SwFTABT9KLi58kyqMU8I6Q5B1hbccOf95qk2dmTgbHZL0aAdrF5eahLa1F_WbJES9MCzhb8ChIKIXB8SnYnNHdvopNL_hvFkxp5waRCd1Q88OX-X1b8R-UFAjuZvIRAzp8CaRvOC-22K4YV1cDBGGd4j4ttUgCueZhlIB_zzjzw3WZBPAWasvsqI_voF8MfSSHqLSbhNHRVYvs9Te7grLwpafvSIPv9XwWxFJ_C0Lh7Ck9igUQefL54yfcWwCK2B2ZkGuF9mPfolZwBiiqTWS9kpW5qtEgXbka35hBR3_h5z_6dEzOC6_ouX_sptqn3O_d3hgiIS94Do3kKpEn7gY10iDDME-ZbKsX_9qdDComnp0HuVcCb_O8OOpOUbplzUWAxNUrWLxpW_FuOfDp6VLQOny2fu5H_WtZKqmirFfvlMpqsA1KClyA70DXWNz-ro3xwGTMGzfl9ZE
 *                  data:
 *                    type: object
 *                    properties:
 *                      user:
 *                        $ref: '#/components/schemas/User'
 */
router.patch(
  "/update-my-password",
  authController.protect,
  authController.updatePassword
);

/**
 *  @swagger
 *  /users/me:
 *    get:
 *      summary: Get current user data
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      responses:
 *        200:
 *          description: The data of current user
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
 *                      user:
 *                        $ref: '#/components/schemas/User'
 */
router.get("/me", authController.protect, userController.getMe);

/**
 *  @swagger
 *  /users/update-me:
 *    patch:
 *      summary: Update current user password
 *      tags: [Auth]
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
 *                  description: user name
 *                  example: 123123123
 *                photo:
 *                  type: string
 *                  format: binary
 *      responses:
 *        200:
 *          description: Update data successfully
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
 *                      user:
 *                        $ref: '#/components/schemas/User'
 */
router.patch(
  "/update-me",
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

/**
 *  @swagger
 *  /users/delete-me:
 *    delete:
 *      summary: Delete current user
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *        - cookieAuth: []
 *      responses:
 *        204:
 *          description: The user was successfully deleted
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
router.delete("/delete-me", authController.protect, userController.deleteMe);

/**
 *  @swagger
 *  /users:
 *    get:
 *      summary: Return the list of all the users
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: The list of the users
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
 *                      users:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/User'
 */

router.get(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  userController.getAllUsers
);

module.exports = router;
