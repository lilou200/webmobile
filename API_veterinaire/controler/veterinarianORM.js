import prisma from "../database/databaseORM.js";
/**
 * @swagger
 * components:
 *  schemas:
 *      veterinarian:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *              lastname:
 *                  type: string
 *              firstname:
 *                  type: string
 *              makehomevisits:
 *                  type: boolean
 *              gsm:
 *                  type: string
 *              streetclinic:
 *                  type: string
 *              numberclinic:
 *                  type: string
 *              localityclinic:
 *                  type: string
 *              gpscoordinate:
 *                  type: string
 *              schedule_fr:
 *                  type: string
 *              schedule_en:
 *                  type: string
 *              website:
 *                  type: string
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      veterinarianAddress:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *              lastname:
 *                  type: string
 *              firstname:
 *                  type: string
 *              streetclinic:
 *                  type: string
 *              numberclinic:
 *                  type: string
 *              localityclinic:
 *                  type: string
 *              gpscoordinate:
 *                  type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *      getCountVeterinarian:
 *          description: the number of veterinarian
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          count:
 *                              type: integer
 */
export const getCountVeterinarian = async (req, res) => {
    try {
        const count = await prisma.veterinarian.count();
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

/**
 * @swagger
 * components:
 *  responses:
 *      getAllVeterinarian:
 *          description: a list of veterinarian
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/veterinarian'
 */
export const getAllVeterinarian = async (req, res) => {
    try {
        const skipNb = 5 * (parseInt(req.params.pagenb) - 1);
        const veterinarians = await prisma.veterinarian.findMany({
            skip: skipNb,
            take: 5,
            orderBy: [{
                lastname: 'asc'
            },
            {
                firstname: 'asc'
            }]
        });
        if(veterinarians){
            res.send(veterinarians);
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
 *      getVeterinarianGpsCoordinate:
 *          description: a list of veterinarian
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/veterinarianAddress'
 */
export const getVeterinariansGpsCoordinate = async (req, res) => {
    try {
        const veterinarians = await prisma.veterinarian.findMany({
            orderBy: {
                gpscoordinate: 'asc'
            },
            select: {
                id: true,
                lastname: true,
                firstname: true,
                numberclinic: true,
                streetclinic: true,
                localityclinic: true,
                gpscoordinate: true
            }
        });
        if(veterinarians){
            res.send(veterinarians);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getVeterinarianByName = async (req, res) => {
    try {
        const veterinarians = await prisma.veterinarian.findMany({
            where: {
                lastname: req.params.lastname
            },
            orderBy: {
                firstname: 'asc'
            }
        });
        if(veterinarians){
            res.send(veterinarians);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getVeterinarianByLocality = async (req, res) => {
    try {
        const veterinarians = await prisma.veterinarian.findMany({
            where: {
                localityclinic: req.params.localityclinic
            },
            orderBy: [{
                lastname: 'asc'
            },
            {
                firstname: 'asc'
            }]
        });
        if(veterinarians){
            res.send(veterinarians);
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
 *  schemas:
 *      veterinarianWithcare:
 *          type: object
 *          properties:
 *              veterinarian:
 *                  type: object
 *                  properties:
 *                      lastname:
 *                          type: string
 *                      firstname:
 *                          type: string
 *                      makehomevisits:
 *                          type: boolean
 *                      gsm:
 *                          type: string
 *                      streetclinic:
 *                          type: string
 *                      numberclinic:
 *                          type: string
 *                      localityclinic:
 *                          type: string
 *                      gpscoordinate:
 *                          type: string
 *                      schedule_fr:
 *                          type: string
 *                      schedule_en:
 *                          type: string
 *                      website:
 *                          type: string
 *              care:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          animalcategory:
 *                              type: string
 *                          veterinarian_id:
 *                              type: integer
 *                          remark:
 *                              type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *      getVeterinarianByIdWithCare:
 *          description: the number of animal's category
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/veterinarianWithcare'
 */
export const getVeterinarianByIdWithCare = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const veterinarian = await prisma.veterinarian.findUnique({
            where: {
                id
            },
            include: {
                care: true
            }
        });
        if(veterinarian){
            res.send(veterinarian);
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
 *      getVeterinarianByAnimalCategory:
 *          description: a list of veterinarian
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/veterinarianAddress'
 */
export const getVeterinarianByAnimalCategory = async (req, res) => {
    try {
        const animalcategory = req.params.animalcategory
        const veterinarians = await prisma.veterinarian.findMany({
            where: {
                care: {
                    some: {
                        animalcategory
                    }
                }
            },
            orderBy: [{
                lastname: 'asc'
            },
            {
                firstname: 'asc'
            }],
            select: {
                id: true,
                lastname: true,
                firstname: true,
                numberclinic: true,
                streetclinic: true,
                localityclinic: true,
                gpscoordinate: true
            }
        });
        if(veterinarians){
            res.send(veterinarians);
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
 *  schemas:
 *      veterinarianOncall:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *              lastname:
 *                  type: string
 *              firstname:
 *                  type: string
 *              gsm:
 *                  type: string
 *              streetclinic:
 *                  type: string
 *              numberclinic:
 *                  type: string
 *              localityclinic:
 *                  type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *      getVeterinarianByOncallLocality:
 *          description: a list of veterinarian oncall
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/veterinarianOncall'
 */
export const getVeterinarianByOncallLocality = async (req, res) => {
    try {
        const date = new Date();
        const localityclinic = req.params.localityclinic
        const veterinarians = await prisma.veterinarian.findMany({
            where: {
                availability: {
                    some: {
                        oncall: {
                            date
                        }
                    }
                },
                localityclinic
            },
            orderBy: [{
                lastname: 'asc'
            },
            {
                firstname: 'asc'
            }],
            select: {
                id: true,
                lastname: true,
                firstname: true,
                gsm: true,
                numberclinic: true,
                streetclinic: true,
                localityclinic: true
            }
        });
        if(veterinarians){
            res.send(veterinarians);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const addVeterinarian = async (req, res) => {
    try {
        const {lastname, firstname,
             makehomevisits, gsm, 
             streetclinic, numberclinic, 
             localityclinic, gpscoordinate, 
             schedule_fr, schedule_en, website} = req.body;
        await prisma.veterinarian.create({
            data: {
                lastname, 
                firstname,
                makehomevisits, 
                gsm, 
                streetclinic, 
                numberclinic, 
                localityclinic, 
                gpscoordinate, 
                schedule_fr, 
                schedule_en, 
                website
            }
        });
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const deleteVeterinarian = async (req, res) => {
    try {
        await prisma.veterinarian.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const updateVeterinarian = async (req, res) => {
    try {
        const {id, lastname, firstname,
             makehomevisits, gsm, 
             streetclinic, numberclinic, 
             localityclinic, gpscoordinate, 
             schedule_fr, schedule_en, website} = req.body;
        await prisma.veterinarian.update({
            data: {
                lastname, 
                firstname,
                makehomevisits, 
                gsm, 
                streetclinic, 
                numberclinic, 
                localityclinic, 
                gpscoordinate, 
                schedule_fr, 
                schedule_en, 
                website
            },
            where: {
                id
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

//----Transaction-----

export const addVeterinarianWithAvailability = async (req, res) => {
    try {
        const availabilities = req.body.availabilities;
        const {lastname, firstname,
            makehomevisits, gsm, 
            streetclinic, numberclinic, 
            localityclinic, gpscoordinate, 
            schedule_fr, schedule_en, website} = req.body.veterinarian;
        await prisma.veterinarian.create({
            data: {
                lastname, 
                firstname,
                makehomevisits, 
                gsm, 
                streetclinic, 
                numberclinic, 
                localityclinic, 
                gpscoordinate, 
                schedule_fr, 
                schedule_en, 
                website,
                availability: {
                    create: availabilities
                }
            }
        });
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};