import Router from "express-promise-router";
import { admin } from "../middleware/authorization/mustBe.js";
import { checkJWT } from "../middleware/identification/jwt.js";
import { getAllVeterinarian,
    getVeterinarianByName, 
    addVeterinarian, 
    deleteVeterinarian, 
    updateVeterinarian, 
    getVeterinarianByLocality, 
    getCountVeterinarian, 
    addVeterinarianWithAvailability, 
    getVeterinarianByAnimalCategory, 
    getVeterinarianByOncallLocality, 
    getVeterinarianByIdWithCare, 
    getVeterinariansGpsCoordinate
 } from "../controler/veterinarianORM.js";
 import { veterinarianValidatorMiddleware as VVM} from "../middleware/validation.js";

 const router = Router();

 /**
 * @swagger
 * /veterinarian/count:
 *  get:
 *      summary: count the number of veterinarian
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Veterinarian
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getCountVeterinarian'
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
 router.get("/count", checkJWT, admin, getCountVeterinarian);

 /**
 * @swagger
 * /veterinarian/all/{pagenb}:
 *  get:
 *      summary: get all veterinarian by page
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Veterinarian
 *      parameters:
 *          - in: path
 *            name: pagenb
 *            schema:
 *              type: integer
 *            required: true
 *            description: page number of the list of veterinarian to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllVeterinarian'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: veterinarian not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
 router.get("/all/:pagenb", checkJWT, VVM.searchedAllVeterinarian, getAllVeterinarian);

  /**
 * @swagger
 * /veterinarian/coordinate:
 *  get:
 *      summary: get all address and gps coordinate of veterinarians
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Veterinarian
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getVeterinarianGpsCoordinate'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: veterinarian not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
 router.get("/coordinate", checkJWT, getVeterinariansGpsCoordinate);

  /**
 * @swagger
 * /veterinarian/lastname/{lastname}:
 *  get:
 *      summary: get veterinarian by lastname
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Veterinarian
 *      parameters:
 *          - in: path
 *            name: lastname
 *            schema:
 *              type: string
 *            required: true
 *            description: lastname of veterinarian(s) to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllVeterinarian'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: veterinarian not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
 router.get("/lastname/:lastname", checkJWT, VVM.searchedVeterinarianByLastname, getVeterinarianByName);

   /**
 * @swagger
 * /veterinarian/locality/{localityclinic}:
 *  get:
 *      summary: get veterinarian by locality
 *      tags:
 *          - Veterinarian
 *      parameters:
 *          - in: path
 *            name: localityclinic
 *            schema:
 *              type: string
 *            required: true
 *            description: locality of veterinarian(s) to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getAllVeterinarian'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          404:
 *              description: veterinarian not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
 router.get("/locality/:localityclinic", VVM.searchedVeterinarianByLocality, getVeterinarianByLocality);

/**
 * @swagger
 * /veterinarian/withcare/{id}:
 *  get:
 *      summary: get a veterinarian by his id
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Veterinarian
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            required: true
 *            description: id of the veterinarian to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getVeterinarianByIdWithCare'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: veterinarian not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
 router.get("/withcare/:id", checkJWT, VVM.searchedVeterinarianById, getVeterinarianByIdWithCare);

 /**
 * @swagger
 * /veterinarian/animalcategory/{animalcategory}:
 *  get:
 *      summary: get veterinarians by the animal's category they care
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Veterinarian
 *      parameters:
 *          - in: path
 *            name: animalcategory
 *            schema:
 *              type: string
 *            required: true
 *            description: the animal's category of the care of veterinarians to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getVeterinarianByAnimalCategory'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: veterinarian not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
 router.get("/animalcategory/:animalcategory", checkJWT, VVM.searchedVeterinarianByAnimalCategory, getVeterinarianByAnimalCategory);

  /**
 * @swagger
 * /veterinarian/oncall/{localityclinic}:
 *  get:
 *      summary: get veterinarian oncall of the day by locality
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Veterinarian
 *      parameters:
 *          - in: path
 *            name: localityclinic
 *            schema:
 *              type: string
 *            required: true
 *            description: the locality of veterinarians oncall to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getVeterinarianByOncallLocality'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: veterinarian not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
 router.get("/oncall/:localityclinic", checkJWT, VVM.searchedVeterinarianByLocality, getVeterinarianByOncallLocality);

 /**
 * @swagger
 * /veterinarian:
 *  post:
 *      summary: add a veterinarian
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Veterinarian
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/veterinarianToAdd'
 *      responses:
 *          201:
 *              description: veterinarian added
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Error server
 */
 router.post("/", checkJWT, admin, VVM.veterinarianToAdd, addVeterinarian);

 /**
 * @swagger
 * /veterinarian/withavailability:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Veterinarian
 *      summary: add a veterinarian with his availabilities
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/veterinarianWithAvailabilityToAdd'
 *      responses:
 *          201:
 *              description: veterinarian and his availabilities added
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Error server
 */
 router.post("/withavailability", checkJWT, admin, VVM.veterinarianWithavailabilityToAdd, addVeterinarianWithAvailability);

 /**
 * @swagger
 * /veterinarian/{id}:
 *  delete:
 *      summary: delete a veterinarian
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Veterinarian
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: id of the veterinarian to delete
 *      responses:
 *          204:
 *              description: veterinarian deleted
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Error server
 */
 router.delete("/:id", checkJWT, admin, VVM.veterinarianToDelete, deleteVeterinarian);

 /**
 * @swagger
 * /veterinarian:
 *  patch:
 *      summary: update a veterinarian
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Veterinarian
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/veterinarianToUpdate'
 *      responses:
 *          204:
 *              description: veterinarian updated
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          500:
 *              description: Error server
 */
 router.patch("/", checkJWT, admin, VVM.veterinarianToUpdate, updateVeterinarian);

 export default router;