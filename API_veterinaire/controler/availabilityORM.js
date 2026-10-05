import prisma from "../database/databaseORM.js";

/**
 * @swagger
 * components:
 *  schemas:
 *      availability:
 *          type: object
 *          properties:
 *              veterinarian_id:
 *                  type: integer
 *              oncall_id:
 *                  type: integer
 *              remark:
 *                  type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *      getAvailability:
 *          description: a list of availability
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/availability'
 */
export const getAllAvailability = async (req, res) => {
    try {
        const skipNb = 5 * (parseInt(req.params.pagenb) - 1);
        const availabilities = await prisma.availability.findMany({
            skip: skipNb,
            take: 5,
            orderBy: {
                veterinarian_id: 'asc'
            }
        });
        if(availabilities){
            res.send(availabilities);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getAvailabilityByVeterinarian = async (req, res) => {
    try {
        const availabilities = await prisma.availability.findMany({
            where: {
                veterinarian_id: parseInt(req.params.idvete)
            }
        });
        if(availabilities){
            res.send(availabilities);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getAvailabilityByDate = async (req, res) => {
    try {
        const date = Date.parse(req.params.date);
        const dateOncall = new Date(date);
        const availabilities = await prisma.availability.findMany({
            where: {
                oncall: {
                    date: dateOncall
                }
            }
        });
        if(availabilities){
            res.send(availabilities);
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
 *      getCountAvailability:
 *          description: the number of availability
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          count:
 *                              type: integer
 */
export const getCountAvailability = async (req, res) => {
    try {
        const count = await prisma.availability.count();
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

export const addAvailability = async (req, res) => {
    try {
        const {veterinarian_id, oncall_id, remark} = req.body;
        await prisma.availability.create({
            data: {
                veterinarian_id,
                oncall_id,
                remark
            }
        });
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const deleteAvailability = async (req, res) => {
    try {
        await prisma.availability.delete({
            where: {
                veterinarian_id_oncall_id: {
                    veterinarian_id: parseInt(req.params.idvete),
                    oncall_id: parseInt(req.params.idoncall)
                }
                
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const updateAvailability = async (req, res) => {
    try {
        const {veterinarian_id, oncall_id, remark} = req.body;
        await prisma.availability.update({
            data: {
                remark
            },
            where: {
                veterinarian_id_oncall_id: {
                    veterinarian_id,
                    oncall_id
                }
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};