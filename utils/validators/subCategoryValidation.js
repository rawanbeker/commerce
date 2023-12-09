import { check } from "express-validator";
import ValidatorMiddleware from "../../middleware/validatorMiddleware.js"
//  rules to vailedation error
export const ruleSubValidator = [check('id').isMongoId().withMessage('invalid category id'), ValidatorMiddleware];

export const ruleCreateSubCategory = [
    check('name').notEmpty().withMessage("cheack name").isLength({ min: 3 })
    .withMessage("too short").isLength({ max: 10 }).withMessage("too long")
    , check("category").notEmpty().withMessage("must have a data")
    .isMongoId().withMessage("invalid category id")
    , ValidatorMiddleware
]

export const ruleDeleteSubCategory =
    [check('id').isMongoId().withMessage('invalid category id'), ValidatorMiddleware];

export const ruleUpdateSubCategory =
    [check('id').isMongoId().withMessage('invalid category id'), ValidatorMiddleware];


