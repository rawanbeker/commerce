import { check } from "express-validator";
import ValidatorMiddleware from "../../middleware/validatorMiddleware.js"
//  rules to vailedation error
export const ruleValidator = [check('id').isMongoId().withMessage('invalid category id'), ValidatorMiddleware];

export const  ruleCreateCategory =[
    check('name').notEmpty().withMessage("cheack name").isLength({ min: 3 }).withMessage("too short").isLength({ max: 10 }).withMessage("too long"), ValidatorMiddleware
]

export const ruleDeleteCategory = 
    [check('id').isMongoId().withMessage('invalid category id'), ValidatorMiddleware];

export const ruleUpdateCategory =
    [check('id').isMongoId().withMessage('invalid category id'), ValidatorMiddleware];


