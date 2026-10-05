import Router from "express-promise-router";
import { admin } from "../middleware/authorization/mustBe.js";
import {animalCategoryValidatorMiddleware as AVM} from "../middleware/validation.js";
import { checkJWT } from "../middleware/identification/jwt.js";
import { getAllAnimalCategory, 
    addAnimalCategory, 
    deleteAnimalCategory, 
    updateAnimalCategory, 
    getAnimalCategoryByLabelfr, 
    getCountAnimalCategory, 
    getAnimalCategoryByLabelEn } from "../controler/animalCategoryORM.js";

const router = Router();

/**
 * @swagger
 * /animalcategory/label-en/{label}:
 *  get:
 *      summary: get animal's category by its label_en
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - AnimalCategory
 *      parameters:
 *         - in: path
 *           name: label
 *           schema:
 *             type: string
 *           required: true
 *           description: label_en of animal's category to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllAnimalCategory'
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
router.get("/label-en/:label", checkJWT, AVM.searchedAnimalCategoryByLabelEn, getAnimalCategoryByLabelEn);

/**
 * @swagger
 * /animalcategory/count:
 *  get:
 *      summary: count the number of animal's category
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - AnimalCategory
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getCountAnimalCategory'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: count not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get("/count", checkJWT, getCountAnimalCategory);

/**
 * @swagger
 * /animalcategory/all/{pagenb}:
 *  get:
 *      summary: get all animal's category by page
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - AnimalCategory
 *      parameters:
 *          - in: path
 *            name: pagenb
 *            schema:
 *              type: integer
 *            required: true
 *            description: page number of the list of animal's category to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllAnimalCategory'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: animal's category not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get("/all/:pagenb", checkJWT, AVM.searchedAllAnimalCategory, getAllAnimalCategory);

/**
 * @swagger
 * /animalcategory/{id}:
 *  get:
 *      summary: get an animal's category by its label_fr
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - AnimalCategory
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: label_fr of the animal's category to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAnimalCategoryByLabelfr'
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
router.get("/:id", checkJWT, AVM.searchedAnimalCategoryById, getAnimalCategoryByLabelfr);

/**
 * @swagger
 * /animalcategory:
 *  post:
 *      summary: add an animal's category
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - AnimalCategory
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/animalCategoryToAdd'
 *      responses:
 *          201:
 *              description: animal's category added
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Error server
 */
router.post("/", checkJWT, admin, AVM.animalCategoryToAdd, addAnimalCategory);

/**
 * @swagger
 * /animalcategory/{id}:
 *  delete:
 *      summary: delete an animal's category
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - AnimalCategory
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: label_fr of the animal's category to delete
 *      responses:
 *          204:
 *              description: animal's category deleted
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Error server
 */
router.delete("/:id", checkJWT, admin, AVM.animalCategoryToDelete, deleteAnimalCategory);

/**
 * @swagger
 * /animalcategory:
 *  patch:
 *      summary: update an animal's category
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - AnimalCategory
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/animalCategoryToUpdate'
 *      responses:
 *          204:
 *              description: animal's category updated
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          500:
 *              description: Error server
 */
router.patch("/", checkJWT, admin, AVM.animalCategoryToUpdate, updateAnimalCategory);

export default router;