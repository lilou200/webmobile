import Router from "express-promise-router";
import { admin } from "../middleware/authorization/mustBe.js";
import { availabilityValidatorMiddleware as AVM } from "../middleware/validation.js";
import { checkJWT } from "../middleware/identification/jwt.js";
import { getAllAvailability, 
    addAvailability, 
    deleteAvailability, 
    updateAvailability, 
    getCountAvailability, 
    getAvailabilityByVeterinarian, 
    getAvailabilityByDate } from "../controler/availabilityORM.js";

const router = Router();

/**
 * @swagger
 * /availability/count:
 *  get:
 *      summary: count the number of availability
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Availability
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getCountAvailability'
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
router.get("/count", checkJWT, admin, getCountAvailability);

/**
 * @swagger
 * /availability/byveterinarian/{idvete}:
 *  get:
 *      summary: get availabilities by their veterinarian_id
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Availability
 *      parameters:
 *         - in: path
 *           name: idvete
 *           schema:
 *             type: integer
 *           required: true
 *           description: veterinarian_id of availabilities to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAvailability'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: product not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get("/byveterinarian/:idvete", checkJWT, AVM.searchedAvailabilityByVete, getAvailabilityByVeterinarian);

/**
 * @swagger
 * /availability/bydate/{date}:
 *  get:
 *      summary: get availabilities by their oncall's date
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Availability
 *      parameters:
 *         - in: path
 *           name: date
 *           schema:
 *             type: string
 *           required: true
 *           description: date (form yyyy-mm-dd) of availabilities to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAvailability'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: product not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get("/bydate/:date", checkJWT, AVM.searchedAvailabilityByDate, getAvailabilityByDate);

/**
 * @swagger
 * /availability/all/{pagenb}:
 *  get:
 *      summary: get all availabilities by page
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Availability
 *      parameters:
 *          - in: path
 *            name: pagenb
 *            schema:
 *              type: integer
 *            required: true
 *            description: page number of the list of availability to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAvailability'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: availability not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get("/all/:pagenb", checkJWT, AVM.searchedAllAvailability, getAllAvailability);

/**
 * @swagger
 * /availability:
 *  post:
 *      summary: add an availability
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Availability
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/availabilityToAddOrUpdate'
 *      responses:
 *          201:
 *              description: availability added
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Error server
 */
router.post("/", checkJWT, admin, AVM.availabilityToAdd, addAvailability);

/**
 * @swagger
 * /availability/{idvete}/{idoncall}:
 *  delete:
 *      summary: delete an availability
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Availability
 *      parameters:
 *         - in: path
 *           name: idvete
 *           schema:
 *             type: integer
 *           required: true
 *           description: veterinarian_id of the availability to delete
 *         - in: path
 *           name: idoncall
 *           schema:
 *             type: integer
 *           required: true
 *           description: oncall_id of the availability to delete
 *      responses:
 *          204:
 *              description: availability deleted
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Error server
 */
router.delete("/:idvete/:idoncall", checkJWT, admin, AVM.availabilityToDelete, deleteAvailability);

/**
 * @swagger
 * /availability:
 *  patch:
 *      summary: update an availability
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Availability
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/availabilityToAddOrUpdate'
 *      responses:
 *          204:
 *              description: availability updated
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          500:
 *              description: Error server
 */
router.patch("/", checkJWT, admin, AVM.availabilityToUpdate, updateAvailability);

export default router;