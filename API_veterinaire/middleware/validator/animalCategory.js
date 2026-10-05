import vine from '@vinejs/vine';

const animalCategoryPagenbSchema = vine.object({
    pagenb: vine.number()
});

const animalCategoryIdSchema = vine.object({
    id: vine.string().alpha({allowSpaces: true}).maxLength(30)
});

/**
 * @swagger
 * components:
 *  schemas:
 *      animalCategoryToAdd:
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
 *          required:
 *              - label_fr
 *              - label_en
 *              - description_fr
 *              - description_en
 */
const animalCategoryAddSchema = vine.object({
    label_fr: vine.string().alpha({allowSpaces: true}).maxLength(30),
    label_en: vine.string().alpha({allowSpaces: true}).maxLength(30),
    description_fr: vine.string().maxLength(500),
    description_en: vine.string().maxLength(500)
});

/**
 * @swagger
 * components:
 *  schemas:
 *      animalCategoryToUpdate:
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
 *          required:
 *              - label_fr
 */
const animalCategoryUpdateSchema = vine.object({
    label_fr: vine.string().alpha({allowSpaces: true}).maxLength(30),
    label_en: vine.string().alpha({allowSpaces: true}).maxLength(30).optional(),
    description_fr: vine.string().maxLength(500).optional(),
    description_en: vine.string().maxLength(500).optional()
});

const animalCategoryLabelEnSchema = vine.object({
    label: vine.string().alpha({allowSpaces: true}).maxLength(30)
});

export const 
    searchedAllAnimalCategory = vine.compile(animalCategoryPagenbSchema),
    searchedAnimalCategoryById = vine.compile(animalCategoryIdSchema),
    animalCategoryToAdd = vine.compile(animalCategoryAddSchema),
    animalCategoryToDelete = vine.compile(animalCategoryIdSchema),
    animalCategoryToUpdate = vine.compile(animalCategoryUpdateSchema),
    searchedAnimalCategoryByLabelEn = vine.compile(animalCategoryLabelEnSchema);