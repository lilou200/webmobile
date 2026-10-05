import * as veterinarianValidator from './validator/veterinarian.js';
import * as careValidator from './validator/care.js';
import * as availabilityValidator from './validator/availability.js';
import * as animalCategoryValidator from './validator/animalCategory.js';
import * as userValidator from './validator/user.js';
import * as oncallValidator from './validator/oncall.js';

/**
 * @swagger
 * components:
 *  responses:
 *      ValidationError:
 *          description: the error(s) described
 *          content:
 *              text/plain:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              rule:
 *                                  type: string
 *                              field:
 *                                  type: string
 */
export const veterinarianValidatorMiddleware = {
    searchedAllVeterinarian : async (req, res, next) => {
        try {
            req.val  = await veterinarianValidator.searchedAllVeterinarian.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedVeterinarianByLastname : async (req, res, next) => {
        try {
            req.val  = await veterinarianValidator.searchedVeterinarianByLastname.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedVeterinarianByLocality : async (req, res, next) => {
        try {
            req.val  = await veterinarianValidator.searchedVeterinarianByLocality.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    veterinarianToAdd : async (req, res, next) => {
        try {
            req.val  = await veterinarianValidator.veterinarianToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    veterinarianToDelete : async (req, res, next) => {
        try {
            req.val  = await veterinarianValidator.veterinarianToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    veterinarianToUpdate : async (req, res, next) => {
        try {
            req.val  = await veterinarianValidator.veterinarianToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    veterinarianWithavailabilityToAdd : async (req, res, next) => {
        try {
            req.val  = await veterinarianValidator.veterinarianWithAvailabilityToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedVeterinarianByAnimalCategory : async (req, res, next) => {
        try {
            req.val  = await veterinarianValidator.searchedVeterinarianByAnimalCategory.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedVeterinarianById: async (req, res, next) => {
        try {
            req.val  = await veterinarianValidator.searchedVeterinarianById.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const careValidatorMiddleware = {
    searchedAllCare : async (req, res, next) => {
        try {
            req.val  = await careValidator.searchedAllCare.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedCareByAnimalcategory : async (req, res, next) => {
        try {
            req.val  = await careValidator.searchedCareByAnimalcategory.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedCareByVeterinarian : async (req, res, next) => {
        try {
            req.val  = await careValidator.searchedCareByVeterinarian.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    careToAdd : async (req, res, next) => {
        try {
            req.val  = await careValidator.careToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    careToDelete : async (req, res, next) => {
        try {
            req.val  = await careValidator.careToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    careToUpdate : async (req, res, next) => {
        try {
            req.val  = await careValidator.careToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const availabilityValidatorMiddleware = {
    searchedAllAvailability : async (req, res, next) => {
        try {
            req.val  = await availabilityValidator.searchedAllAvailability.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    availabilityToAdd : async (req, res, next) => {
        try {
            req.val  = await availabilityValidator.availabilityToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    availabilityToUpdate : async (req, res, next) => {
        try {
            req.val  = await availabilityValidator.availabilityToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    availabilityToDelete : async (req, res, next) => {
        try {
            req.val  = await availabilityValidator.availabilityToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedAvailabilityByVete : async (req, res, next) => {
        try {
            req.val  = await availabilityValidator.searchedAvailabilityByVete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedAvailabilityByDate : async (req, res, next) => {
        try {
            req.val  = await availabilityValidator.searchedAvailabilityByDate.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const animalCategoryValidatorMiddleware = {
    searchedAllAnimalCategory : async (req, res, next) => {
        try {
            req.val  = await animalCategoryValidator.searchedAllAnimalCategory.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedAnimalCategoryById : async (req, res, next) => {
        try {
            req.val  = await animalCategoryValidator.searchedAnimalCategoryById.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    animalCategoryToAdd : async (req, res, next) => {
        try {
            req.val  = await animalCategoryValidator.animalCategoryToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    animalCategoryToDelete : async (req, res, next) => {
        try {
            req.val  = await animalCategoryValidator.animalCategoryToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    animalCategoryToUpdate : async (req, res, next) => {
        try {
            req.val  = await animalCategoryValidator.animalCategoryToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedAnimalCategoryByLabelEn : async (req, res, next) => {
        try {
            req.val  = await animalCategoryValidator.searchedAnimalCategoryByLabelEn.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const userValidatorMiddleware = {
    login: async (req, res, next) => {
        try {
            req.val = await userValidator.login.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedAllUser: async (req, res, next) => {
        try {
            req.val = await userValidator.searchedAllUser.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    userToDelete: async (req, res, next) => {
        try {
            req.val = await userValidator.userToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    userToAdd: async (req, res, next) => {
        try {
            req.val = await userValidator.userToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    userToUpdate: async (req, res, next) => {
        try {
            req.val = await userValidator.userToUpdate.validate(req.body);
            console.log(req.session.id);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedUserByIsadmin: async (req, res, next) => {
        try {
            req.val = await userValidator.searchedUserByIsadmin.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedUserByUsername: async (req, res, next) => {
        try {
            req.val = await userValidator.searchedUserByUsername.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    userToUpdateByNoAdmin: async (req, res, next) => {
        try {
            req.val = await userValidator.userToUpdateByNoAdmin.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const oncallValidatorMiddleware = {
    searchedAllOncall: async (req, res, next) => {
        try {
            req.val = await oncallValidator.searchedAllOncall.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    searchedOncallByDate: async (req, res, next) => {
        try {
            req.val = await oncallValidator.searchedOncallByDate.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    oncallToAdd: async (req, res, next) => {
        try {
            req.val = await oncallValidator.oncallToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};