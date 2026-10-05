import vine from '@vinejs/vine';


/**
 * @swagger
 * components:
 *  schemas:
 *      loginUser:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *          required:
 *              - email
 *              - password
 */
const loginSchema = vine.object({
    email: vine.string().email().maxLength(255),
    password: vine.string().maxLength(255)
});

const userPagenbSchema = vine.object({
    pagenb: vine.number()
});

const userDeleteSchema = vine.object({
    email: vine.string().email().maxLength(255)
});

/**
 * @swagger
 * components:
 *  schemas:
 *      userToAdd:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *              isadmin:
 *                  type: boolean
 *          required:
 *              - email
 *              - username
 *              - password
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      userToAddByNoadmin:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *          required:
 *              - email
 *              - username
 *              - password
 */
const userAddSchema = vine.object({
    email: vine.string().email().maxLength(255),
    username: vine.string().maxLength(255),
    password: vine.string().maxLength(255).minLength(8),
    isadmin: vine.boolean().optional()//isadmin est mis par defaut a false dans la DB
});

/**
 * @swagger
 * components:
 *  schemas:
 *      userToUpdate:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *              isadmin:
 *                  type: boolean
 *          required:
 *              - email
 */
const userUpdateSchema = vine.object({
    email: vine.string().email().maxLength(255),
    username: vine.string().maxLength(255).optional(),
    password: vine.string().maxLength(255).optional(),
    isadmin: vine.boolean().optional()
});

/**
 * @swagger
 * components:
 *  schemas:
 *      userToUpdateByNoadmin:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 */
const userUpdateNotAdminSchema = vine.object({
    username: vine.string().maxLength(255).optional(),
    password: vine.string().maxLength(255).optional()
});

const userUsernameSchema = vine.object({
    username: vine.string().maxLength(255)
});

const ueserAdminSchema = vine.object({
    isadmin: vine.boolean()
});

export const 
    login = vine.compile(loginSchema),
    searchedAllUser = vine.compile(userPagenbSchema),
    userToDelete = vine.compile(userDeleteSchema),
    userToAdd = vine.compile(userAddSchema),
    userToUpdate = vine.compile(userUpdateSchema),
    userToUpdateByNoAdmin = vine.compile(userUpdateNotAdminSchema),
    searchedUserByUsername = vine.compile(userUsernameSchema),
    searchedUserByIsadmin = vine.compile(ueserAdminSchema);