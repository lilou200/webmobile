import Router from "express-promise-router";
import { admin } from "../middleware/authorization/mustBe.js";
import { oncallValidatorMiddleware as OVM } from "../middleware/validation.js";
import { checkJWT } from "../middleware/identification/jwt.js";
import { getAllOncall, getOncallByDate, addOncall, getCountOncall } from "../controler/oncallORM.js";

const router = Router();

/**
 * @swagger
 * /oncall/count:
 *  get:
 *      summary: count the number of oncall
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Oncall
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getCountOncall'
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
router.get("/count", checkJWT, admin, getCountOncall);

/**
 * @swagger
 * /oncall/all/{pagenb}:
 *  get:
 *      summary: get all oncall by page
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Oncall
 *      parameters:
 *          - in: path
 *            name: pagenb
 *            schema:
 *              type: integer
 *            required: true
 *            description: page number of the list of oncall to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getOncall'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: oncall not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get("/all/:pagenb", checkJWT, admin, OVM.searchedAllOncall, getAllOncall);

/**
 * @swagger
 * /oncall/date/{date}:
 *  get:
 *      summary: get oncall by date
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Oncall
 *      parameters:
 *          - in: path
 *            name: date
 *            schema:
 *              type: string
 *            required: true
 *            description: date format 'YYYY-MM-DD' of the list of oncall to get
 *      responses:
 *          200:
 *              $ref: '#/components/responses/getOncall'
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: oncall not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get("/date/:date", checkJWT, OVM.searchedOncallByDate, getOncallByDate);

/**
 * @swagger
 * /oncall:
 *  post:
 *      summary: add an oncall
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Oncall
 *      requestBody:
 *          description: a JSON object containing a date in form 'yyyy-mm-dd' and a nightoncall boolean
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/oncallToAdd'
 *      responses:
 *          201:
 *              description: oncall added
 *          400:
 *              $ref: '#/components/responses/ValidationError'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Error server
 */
router.post("/", checkJWT, admin, OVM.oncallToAdd, addOncall);

export default router;