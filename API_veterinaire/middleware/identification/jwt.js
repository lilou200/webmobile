import { verify } from "../../util/jwt.js";

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  responses:
 *     UnauthorizedError:
 *        description: JWT is missing or invalid
 *        content:
 *           text/plain:
 *              schema:
 *                 type: string
 */
export const checkJWT = async (req, res, next) => {
    const authorize = req.get('authorization');//récupére le header authorization
    //vérifie que le header est correcte:
    if(authorize?.includes('Bearer')){
        const jwtEncoded = authorize.split(' ')[1];
        try {
            req.session = verify(jwtEncoded);
            next();
        } catch (e){
            res.status(401).send(e.message);
        }
    } else {
        res.status(401).send('No jwt');
    }
};