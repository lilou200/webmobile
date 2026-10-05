import vine from '@vinejs/vine';

const availabilityPagenbSchema = vine.object({
    pagenb: vine.number()
});

/**
 * @swagger
 * components:
 *  schemas:
 *      availabilityToAddOrUpdate:
 *          type: object
 *          properties:
 *              veterinarian_id:
 *                  type: integer
 *              oncall_id:
 *                  type: integer
 *              remark:
 *                  type: string
 *          required:
 *              - veterinarian_id
 *              - oncall_id
 */
const availabilitySchema = vine.object({
    veterinarian_id: vine.number(),
    oncall_id: vine.number(),
    remark: vine.string().maxLength(500).optional()
});

const availabilityDeleteSchema = vine.object({
    idvete: vine.number(),
    idoncall: vine.number()
});

const availabilityByVeteSchema = vine.object({
    idvete: vine.number()
});

const availabilityByDateSchema = vine.object({
    date: vine.date({
        formats: 'YYYY-MM-DD'
    })
});

export const 
    searchedAllAvailability = vine.compile(availabilityPagenbSchema),
    availabilityToAdd = vine.compile(availabilitySchema),
    availabilityToUpdate = vine.compile(availabilitySchema),
    availabilityToDelete = vine.compile(availabilityDeleteSchema),
    searchedAvailabilityByVete = vine.compile(availabilityByVeteSchema),
    searchedAvailabilityByDate = vine.compile(availabilityByDateSchema);