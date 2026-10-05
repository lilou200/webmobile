import vine from '@vinejs/vine';

const veterinarianPagenbSchema = vine.object({
    pagenb: vine.number()
});

const veterinarianLastnameSchema = vine.object({
    lastname: vine.string().maxLength(255)
});

const veterinarianLocalitySchema = vine.object({
    localityclinic: vine.string().maxLength(255)
});

/**
 * @swagger
 * components:
 *  schemas:
 *      veterinarianToAdd:
 *          type: object
 *          properties:
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
 *          required:
 *              - lastname
 *              - firstname
 *              - makehomevisits
 *              - gsm
 *              - streetclinic
 *              - numberclinic
 *              - localityclinic
 *              - gpscoordinate
 *              - schedule_fr
 *              - schedule_en
 */
const veterinarianAddSchema = vine.object({
    lastname: vine.string().maxLength(255),
    firstname: vine.string().maxLength(255),
    makehomevisits: vine.boolean(),
    gsm: vine.string().mobile(), 
    streetclinic: vine.string().maxLength(255),
    numberclinic: vine.string().maxLength(10), 
    localityclinic: vine.string().maxLength(255),
    gpscoordinate: vine.string().maxLength(255), 
    schedule_fr: vine.string().maxLength(500),
    schedule_en: vine.string().maxLength(500),
    website: vine.string().url().maxLength(255).optional()
});

/**
 * @swagger
 * components:
 *  schemas:
 *      veterinarianWithAvailabilityToAdd:
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
 *              availabilities:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          oncall_id:
 *                              type: integer
 *                          remark:
 *                              type: string
 *          required:
 *              - lastname
 *              - firstname
 *              - makehomevisits
 *              - gsm
 *              - streetclinic
 *              - numberclinic
 *              - localityclinic
 *              - gpscoordinate
 *              - schedule_fr
 *              - schedule_en
 */
const veterinarianWithAvailabilityAddSchema = vine.object({
    veterinarian: vine.object({
        lastname: vine.string().maxLength(255),
        firstname: vine.string().maxLength(255),
        makehomevisits: vine.boolean(),
        gsm: vine.string().mobile(), 
        streetclinic: vine.string().maxLength(255),
        numberclinic: vine.string().maxLength(10), 
        localityclinic: vine.string().maxLength(255),
        gpscoordinate: vine.string().maxLength(255), 
        schedule_fr: vine.string().maxLength(500),
        schedule_en: vine.string().maxLength(500),
        website: vine.string().url().maxLength(255).optional()
    }),
    availabilities: vine.array(
        vine.object({
            oncall_id: vine.number(),
            remark: vine.string().maxLength(500).optional()
        })
    )
});

const veterinarianIdSchema = vine.object({
    id: vine.number()
});

/**
 * @swagger
 * components:
 *  schemas:
 *      veterinarianToUpdate:
 *          type: object
 *          properties:
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
 *          required:
 *              - id
 */
const veterinarianUpdateSchema = vine.object({
    id: vine.number(),
    lastname: vine.string().maxLength(255).optional(),
    firstname: vine.string().maxLength(255).optional(),
    makehomevisits: vine.boolean().optional(),
    gsm: vine.string().mobile().maxLength(20).optional(), 
    streetclinic: vine.string().maxLength(255).optional(),
    numberclinic: vine.string().maxLength(10).optional(), 
    localityclinic: vine.string().maxLength(255).optional(),
    gpscoordinate: vine.string().maxLength(255).optional(), 
    schedule_fr: vine.string().maxLength(500).optional(),
    schedule_en: vine.string().maxLength(500).optional(),
    website: vine.string().url().maxLength(255).optional()
});

const veterinarianAnimalCategorySchema = vine.object({
    animalcategory: vine.string().maxLength(30)
});

export const 
    searchedAllVeterinarian = vine.compile(veterinarianPagenbSchema),
    searchedVeterinarianByLastname = vine.compile(veterinarianLastnameSchema),
    searchedVeterinarianByLocality = vine.compile(veterinarianLocalitySchema),
    veterinarianToAdd = vine.compile(veterinarianAddSchema),
    veterinarianToDelete = vine.compile(veterinarianIdSchema),
    veterinarianToUpdate = vine.compile(veterinarianUpdateSchema),
    veterinarianWithAvailabilityToAdd = vine.compile(veterinarianWithAvailabilityAddSchema),
    searchedVeterinarianByAnimalCategory = vine.compile(veterinarianAnimalCategorySchema),
    searchedVeterinarianById = vine.compile(veterinarianIdSchema);