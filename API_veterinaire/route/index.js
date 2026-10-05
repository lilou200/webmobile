import {Router} from 'express';
import {default as animalCategoryRouter} from "./animalCategory.js";
import {default as veterinarianRouter} from "./veterinarian.js";
import {default as availabilityRouter} from "./availability.js";
import {default as careRouter} from "./care.js";
import {default as userRouter} from "./user.js";
import {default as oncallRouter} from "./oncall.js";

const router = Router();

router.use("/animalcategory", animalCategoryRouter);
router.use("/veterinarian", veterinarianRouter);
router.use("/availability", availabilityRouter);
router.use("/care", careRouter);
router.use("/user", userRouter);
router.use("/oncall", oncallRouter);

export default router;