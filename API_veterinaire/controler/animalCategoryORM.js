import prisma from "../database/databaseORM.js";

/**
 * @swagger
 * components:
 *  schemas:
 *      animalCategory:
 *          type: object
 *          properties:
 *              label_fr:
 *                  type: string
 *              label_en:
 *                  type: string
 *              description_fr:
 *                  type: string
 *              description_en:
 *                  type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *      getAllAnimalCategory:
 *          description: a list of animal's category
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/animalCategory'
 */
export const getAllAnimalCategory = async (req, res) => {
    try {
        const skipNb = 5 * (parseInt(req.params.pagenb) - 1);
        const animalCategories = await prisma.animalcategory.findMany({
            skip: skipNb,
            take: 5,
            orderBy: {
                label_fr: 'asc'
            }
        });
        if(animalCategories){
            res.send(animalCategories);
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
 *      getAnimalCategoryByLabelfr:
 *          description: an animal's category
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/animalCategory'
 */
export const getAnimalCategoryByLabelfr = async (req, res) => {
    try {
        const animalCategory = await prisma.animalcategory.findUnique({
            where: {
                label_fr: req.params.id
            }
        });
        if(animalCategory){
            res.send(animalCategory);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getAnimalCategoryByLabelEn = async (req, res) => {
    try {
        const animalCategories = await prisma.animalcategory.findMany({
            where: {
                label_en: req.params.label
            }
        });
        if(animalCategories){
            res.send(animalCategories);
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
 *      getCountAnimalCategory:
 *          description: the number of animal's category
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          count:
 *                              type: integer
 */
export const getCountAnimalCategory = async (req, res) => {
    try {
        const count= await prisma.animalcategory.count();
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

export const addAnimalCategory = async (req, res) => {
    try {
        const {label_fr, label_en, description_fr, description_en} = req.body;
        await prisma.animalcategory.create({
            data: {
                label_fr,
                label_en,
                description_fr,
                description_en
            }
        });
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const deleteAnimalCategory = async (req, res) => {
    try {
        await prisma.animalcategory.delete({
            where: {
                label_fr: req.params.id
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const updateAnimalCategory = async (req, res) => {
    try {
        const {label_fr ,label_en, description_fr, description_en} = req.body;
        await prisma.animalcategory.update({
            data: {
                label_en,
                description_fr,
                description_en
            },
            where: {
                label_fr
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};