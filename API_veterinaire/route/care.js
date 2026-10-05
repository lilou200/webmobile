import Router from "express-promise-router";
import { admin } from "../middleware/authorization/mustBe.js";
import { careValidatorMiddleware as CVM } from "../middleware/validation.js";
import { checkJWT } from "../middleware/identification/jwt.js";
import { getAllCare, 
    addCare, 
    deleteCare, 
    updateCare, 
    getCareByAnimalCategory, 
    getCareByVeterinarian, 
    getCountCare } from "../controler/careORM.js";

const router = Router();

/**
 * @swagger
 * /care/count:
 *  get:
 *      summary: count the number of care
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Care
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getCountCare'
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
router.get("/count", checkJWT, admin, getCountCare);

/**
 * @swagger
 * /care/all/{pagenb}:
 *  get:
 *      summary: get all care by page
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Care
 *      parameters:
 *          - in: path
 *            name: pagenb
 *            schema:
 *              type: integer
 *            required: true
 *            description: page number of the list of care to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllCare'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: care not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get("/all/:pagenb", checkJWT, CVM.searchedAllCare, getAllCare);

/**
 * @swagger
 * /care/animalcategory/{animalcategory}/{pagenb}:
 *  get:
 *      summary: get care by animalcategory by page
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Care
 *      parameters:
 *          - in: path
 *            name: pagenb
 *            schema:
 *              type: integer
 *            required: true
 *            description: page number of the list of care to get
 *          - in: path
 *            name: animalcategory
 *            schema:
 *              type: string
 *            required: true
 *            description: animal's category of the list of care to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllCare'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: care not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get("/animalcategory/:animalcategory/:pagenb", checkJWT, CVM.searchedCareByAnimalcategory, getCareByAnimalCategory);

/**
 * @swagger
 * /care/veterinarian/{veterinarian}:
 *  get:
 *      summary: get care by veterinarian
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Care
 *      parameters:
 *          - in: path
 *            name: veterinarian
 *            schema:
 *              type: integer
 *            required: true
 *            description: id of the vaterinarian of the list of care to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllCare'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: care not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get("/veterinarian/:veterinarian", checkJWT, CVM.searchedCareByVeterinarian, getCareByVeterinarian);

/**
 * @swagger
 * /care:
 *  post:
 *      summary: add a care
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Care
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/careToAddOrUpdate'
 *      responses:
 *          201:
 *              description: care added
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Error server
 */
router.post("/", checkJWT, admin, CVM.careToAdd, addCare);

/**
 * @swagger
 * /care/{idvete}/{animalcategory}:
 *  delete:
 *      summary: delete an animal's category
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Care
 *      parameters:
 *         - in: path
 *           name: idvete
 *           schema:
 *             type: integer
 *           required: true
 *           description: veterinarian id of the care to delete
 *         - in: path
 *           name: animalcategory
 *           schema:
 *             type: string
 *           required: true
 *           description: animal's category of the care to delete
 *      responses:
 *          204:
 *              description: care deleted
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Error server
 */
router.delete("/:idvete/:animalcategory", checkJWT, admin, CVM.careToDelete, deleteCare);

/**
 * @swagger
 * /care:
 *  patch:
 *      summary: update a care
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Care
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/careToAddOrUpdate'
 *      responses:
 *          204:
 *              description: care updated
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          500:
 *              description: Error server
 */
router.patch("/", checkJWT, admin, CVM.careToUpdate, updateCare);

export default router;