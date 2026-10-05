import prisma from "../database/databaseORM.js";

/**
 * @swagger
 * components:
 *  schemas:
 *      oncall:
 *          type: object
 *          properties:
 *              gard_id:
 *                  type: integer
 *              date:
 *                  type: object
 *              isnightoncall:
 *                  type: boolean
 */
/**
 * @swagger
 * components:
 *  responses:
 *      getOncall:
 *          description: a list of oncall
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/oncall'
 */
export const getAllOncall = async (req, res) => {
    try {
        const skipNb = 5 * (parseInt(req.params.pagenb) - 1);
        const oncalls = await prisma.oncall.findMany({
            skip: skipNb,
            take: 5,
            orderBy: {
                date: 'desc'
            }
        });
        if(oncalls){
            res.send(oncalls);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      getCountOncall:
 *          description: the number of oncall
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          count:
 *                              type: integer
 */
export const getCountOncall = async (req, res) => {
    try {
        const count = await prisma.oncall.count();
        if(count){
            res.send({count});
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getOncallByDate = async (req, res) => {
    try {
        const date = Date.parse(req.params.date);
        const dateOncall = new Date(date);
        const oncalls = await prisma.oncall.findMany({
            where: {
                date: dateOncall
            }
        });
        if(oncalls){
            res.send(oncalls);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const addOncall = async (req, res) => {
    try {
        const dateOncall = Date.parse(req.body.date);
        const date = new Date(dateOncall);
        const isnightoncall = req.body.isnightoncall;
        await prisma.oncall.create({
            data: {
                date,
                isnightoncall
            }
        });
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};