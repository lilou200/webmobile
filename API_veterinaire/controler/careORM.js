import prisma from "../database/databaseORM.js";

/**
 * @swagger
 * components:
 *  schemas:
 *      care:
 *          type: object
 *          properties:
 *              animalcategory:
 *                  type: string
 *              veterinarian_id:
 *                  type: integer
 *              remark:
 *                  type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *      getAllCare:
 *          description: a list of care
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/care'
 */
export const getAllCare = async (req, res) => {
    try {
        const skipNb = 5 * (parseInt(req.params.pagenb) - 1);
        const cares = await prisma.care.findMany({
            skip: skipNb,
            take: 5,
            orderBy: [{
                animalcategory: 'asc'
            },{
                veterinarian_id: 'asc'
            }]
        });
        if(cares){
            res.send(cares);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getCareByAnimalCategory = async (req, res) => {
    try {
        const skipNb = 5 * (parseInt(req.params.pagenb) - 1);
        const cares = await prisma.care.findMany({
            skip: skipNb,
            take: 5,
            where: {
                animalcategory: req.params.animalcategory
            }
        });
        if(cares){
            res.send(cares);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getCareByVeterinarian = async (req, res) => {
    try {
        const cares = await prisma.care.findMany({
            where: {
                veterinarian_id: parseInt(req.params.veterinarian)
            }
        });
        if(cares){
            res.send(cares);
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
 *      getCountCare:
 *          description: the number of care
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          count:
 *                              type: integer
 */
export const getCountCare = async (req, res) => {
    try {
        const count = await prisma.care.count();
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

export const addCare = async (req, res) => {
    try {
        const {animalcategory, veterinarian_id, remark} = req.body;
        await prisma.care.create({
            data: {
                animalcategory,
                veterinarian_id,
                remark
            }
        });
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const deleteCare = async (req, res) => {
    try {
        await prisma.care.delete({
            where: {
                animalcategory_veterinarian_id: {
                    animalcategory: req.params.animalcategory,
                    veterinarian_id: parseInt(req.params.idvete)
                }
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const updateCare = async (req, res) => {
    try {
        const {animalcategory, veterinarian_id,  remark} = req.body;
        await prisma.care.update({
            data: {
                remark
            },
            where: {
                animalcategory_veterinarian_id: {
                    veterinarian_id,
                    animalcategory
                }
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};