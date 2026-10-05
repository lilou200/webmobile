import { readUser } from "../../model/user.js";
/*
export const authBasic = async (req, res, next) => {
    const authorize = req.get('authorization');//récupére le header authorization
    //vérifie que le header est correcte:
    if(authorize?.includes('Basic')){
        //décode le header:
        const basicEncoded = authorize.split(' ')[1];
        const authString = Buffer.from(basicEncoded, 'base64').toString('utf-8');
        const [email, password] = authString.split(':');
        const user = await readUser({email, password});
        //vérifie qu'il y a correspondance dans la DB:
        if(user.id){
            req.session = user;
            next();
        } else {
            res.sendStatus(404);
        }
    } else {
        res.status(401).send('No basic authorization given');
    }
};
*/