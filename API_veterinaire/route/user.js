import Router from "express-promise-router";
import { login, 
    getAllUser, 
    deleteUser, 
    addUserByAdmin, 
    updateUserByAdmin, 
    addUserByNotAdmin, 
    updateUserByNotAdmin, 
    getCountUser, 
    getUserFilterAdmin, 
    getUserByUsername, 
    deleteUserByNoAdmin, 
    getUserByNoAdmin } from "../controler/userORM.js";
import { userValidatorMiddleware as UVM } from "../middleware/validation.js";
import { checkJWT } from "../middleware/identification/jwt.js";
import { admin } from "../middleware/authorization/mustBe.js";

const router = Router();

/**
 * @swagger
 * /user/account:
 *  get:
 *      summary: get the user account of a connected user
 *      description: take the id (email) of the user in the jwt token
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getUser'
 *          404:
 *              description: user not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Error server
 */
router.get('/account', checkJWT, getUserByNoAdmin);

/**
 * @swagger
 * /user/filteradmin/{isadmin}:
 *  get:
 *      summary: get users admin or users no-admin
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      parameters:
 *          - in: path
 *            name: isadmin
 *            schema:
 *              type: boolean
 *            required: true
 *            description: isadmin (true or false) of users to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllUser'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          404:
 *              description: user not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Error server
 */
router.get("/filteradmin/:isadmin", checkJWT, admin, UVM.searchedUserByIsadmin, getUserFilterAdmin);

/**
 * @swagger
 * /user/username/{username}:
 *  get:
 *      summary: get user by username (by an admin)
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      parameters:
 *          - in: path
 *            name: username
 *            schema:
 *              type: string
 *            required: true
 *            description: username of user to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllUser'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          404:
 *              description: user not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Error server
 */
router.get("/username/:username", checkJWT, admin, UVM.searchedUserByUsername, getUserByUsername);

/**
 * @swagger
 * /user/count:
 *  get:
 *      summary: count the number of users
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getCountUser'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: count not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get('/count', checkJWT, admin, getCountUser);

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: to login
 *      tags:
 *          - User
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/loginUser'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/Login'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          404:
 *              description: incorrect email or password
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.post('/login', UVM.login, login);

/**
 * @swagger
 * /user/all/{pagenb}:
 *  get:
 *      summary: get all user by page by an admin
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      parameters:
 *          - in: path
 *            name: pagenb
 *            schema:
 *              type: integer
 *            required: true
 *            description: page number of the list of user to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllUser'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: user not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get('/all/:pagenb', checkJWT, admin, UVM.searchedAllUser, getAllUser);

/**
 * @swagger
 * /user/{email}:
 *  delete:
 *      summary: to delete a user by an admin
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      parameters:
 *         - in: path
 *           name: email
 *           schema:
 *             type: string
 *           required: true
 *           description: email of the user to delete
 *      responses:
 *          204:
 *              description: user deleted
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Error server
 */
router.delete('/:email', checkJWT, admin, UVM.userToDelete, deleteUser);

/**
 * @swagger
 * /user:
 *  delete:
 *      summary: to delete the user account of a connected user
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      description: take the id (email) of the user in the jwt token
 *      responses:
 *          204:
 *              description: user deleted
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Error server
 */
router.delete('/', checkJWT, deleteUserByNoAdmin);

/**
 * @swagger
 * /user:
 *  post:
 *      summary: creation of user account by a connected admin
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userToAdd'
 *      responses:
 *          201:
 *              description: user added
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Error server
 */
router.post('/', checkJWT, admin, UVM.userToAdd, addUserByAdmin);

/**
 * @swagger
 * /user/notadmin:
 *  post:
 *      summary: creation of user account by a non-connected user
 *      description: create a no-admin user   
 *      tags:
 *          - User
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userToAddByNoadmin'
 *      responses:
 *          201:
 *              description: user added
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          500:
 *              description: Error server
 */
router.post('/notadmin', UVM.userToAdd, addUserByNotAdmin);

/**
 * @swagger
 * /user:
 *  patch:
 *      summary: update of user account by a connected admin
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userToUpdate'
 *      responses:
 *          204:
 *              description: user updated
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          500:
 *              description: Error server
 */
router.patch('/', checkJWT, admin, UVM.userToUpdate, updateUserByAdmin);

/**
 * @swagger
 * /user/notadmin:
 *  patch:
 *      summary: update of the user account of a connected user
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      description: take the id (email) of the user in the jwt token
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userToUpdateByNoadmin'
 *      responses:
 *          204:
 *              description: user updated
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          500:
 *              description: Error server
 */
router.patch('/notadmin', checkJWT, UVM.userToUpdateByNoAdmin, updateUserByNotAdmin);

export default router;