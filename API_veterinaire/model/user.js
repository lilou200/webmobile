import prisma from "../database/databaseORM.js";
import { compare } from "../util/index.js";

export const readUser = async ({email, password}) => {
    const response = await prisma.user.findUnique({
        where: {
            email
        }
    });
    //vérifie si email a une correspondance dans la DB:
    if(response) {
        const statutUser = (response.isadmin ? "admin" : "nonadmin");
        //vérifie la correspondance du password dans la DB et renvoie id et statut:
        return await compare(password, response.password) ? {id: response.email, status: statutUser} : {id: null, status: null};
    } else {
        return {id: null, status: null};
    }
};