import vine from '@vinejs/vine';

const carePagenbSchema = vine.object({
    pagenb: vine.number()
});

const careAnimalcategorySchema = vine.object({
    animalcategory: vine.string().maxLength(30),
    pagenb: vine.number()
});

const careVeterinarianSchema = vine.object({
    veterinarian: vine.number()
});

/**
 * @swagger
 * components:
 *  schemas:
 *      careToAddOrUpdate:
 *          type: object
 *          properties:
 *              animalcategory:
 *                  type: string
 *              veterinarian_id:
 *                  type: integer
 *              remark:
 *                  type: string
 *          required:
 *              - animalcategory
 *              - veterinarian_id
 */
const careSchema = vine.object({
    animalcategory: vine.string().maxLength(30),
    veterinarian_id: vine.number(),
    remark: vine.string().maxLength(500).optional()
});

const careDeleteSchema = vine.object({
    idvete: vine.number(),
    animalcategory: vine.string().maxLength(30)
});

export const 
    searchedAllCare = vine.compile(carePagenbSchema),
    searchedCareByAnimalcategory = vine.compile(careAnimalcategorySchema),
    searchedCareByVeterinarian = vine.compile(careVeterinarianSchema),
    careToAdd = vine.compile(careSchema),
    careToDelete = vine.compile(careDeleteSchema),
    careToUpdate = vine.compile(careSchema);