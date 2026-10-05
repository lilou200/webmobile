import prisma from "../database/databaseORM.js";
import { sign } from "../util/jwt.js";
import { hash } from "../util/index.js";
import { readUser } from "../model/user.js";


/**
 * @swagger
 * components:
 *  schemas:
 *      user:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              username:
 *                  type: string
 *              isadmin:
 *                  type: boolean
 */
/**
 * @swagger
 * components:
 *  responses:
 *      Login:
 *          description: a token jwt
 */
export const login = async (req, res) => {
    try {
        const rep = await readUser(req.val);
        if(rep.id) {
            const jwt = sign(rep, {
                expiresIn: '8h'
            });
            res.status(201).send(jwt);
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
 *      getUser:
 *          description: a user email and username
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          username:
 *                              type: string
 */
export const getUserByNoAdmin = async (req, res) => {
    try {
        const email = req.session.id;
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                email: true,
                username: true,
            }
        });
        if(user){
            res.send(user);
        } else{
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getUserByUsername = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                username: req.params.username
            },
            select: {
                password: false,
                email: true,
                username: true,
                isadmin: true
            }
        });
        if(users){
            res.send(users);
        } else{
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getUserFilterAdmin = async (req, res) => {
    try{
        const admin = req.params.isadmin
        const boolAdmin = (admin === 'true');
        const users = await prisma.user.findMany({
            where: {
                isadmin: boolAdmin
            },
            orderBy: {
                email: 'asc'
            },
            select: {
                password: false,
                email: true,
                username: true,
                isadmin: true
            }
        });
        if(users){
            res.send(users);
        } else{
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
 *      getAllUser:
 *          description: a list of user
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/user'
 */
export const getAllUser = async (req, res) => {
    try{
        const skipNb = 5 * (parseInt(req.params.pagenb) - 1);
        const users = await prisma.user.findMany({
            skip: skipNb,
            take: 5,
            orderBy: {
                email: 'asc'
            },
            select: {
                password: false,
                email: true,
                username: true,
                isadmin: true
            }
        });
        if(users){
            res.send(users);
        } else{
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
 *      getCountUser:
 *          description: the number of users
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          count:
 *                              type: integer
 */
export const getCountUser = async (req, res) => {
    try {
        const count = await prisma.user.count();
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

export const deleteUser = async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                email: req.params.email
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const deleteUserByNoAdmin = async (req, res) => {
    try {
        const email = req.session.id;
        await prisma.user.delete({
            where: {
                email
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const addUserByAdmin = async (req, res) => {
    try {
        const password = await hash(req.body.password);
        const {email, username, isadmin} = req.body;
        await prisma.user.create({
            data: {
                email,
                username,
                password,
                isadmin
            }
        });
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const addUserByNotAdmin = async (req, res) => {
    try {
        const password = await hash(req.body.password);
        const {email, username} = req.body;
        await prisma.user.create({
            data: {
                email,
                username,
                password
            }
        });
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const updateUserByAdmin = async (req, res) => {
    try {
        let {email, username, password, isadmin} = req.body;
        if(password){
            password = await hash(password);
        }
        await prisma.user.update({
            data: {
                username,
                password,
                isadmin
            },
            where: {
                email
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const updateUserByNotAdmin = async (req, res) => {
    try {
        const email = req.session.id;
        let {username, password} = req.body;
        if(password){
            password = await hash(password);
        }
        await prisma.user.update({
            data: {
                username,
                password
            },
            where: {
                email
            }
        });
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};