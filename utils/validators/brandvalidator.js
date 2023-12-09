import { check } from "express-validator";
import ValidatorMiddleware from "../../middleware/validatorMiddleware.js"
//  rules to vailedation error
export const ruleValidatorBrand = [check('id').isMongoId().withMessage('invalid brand id'), ValidatorMiddleware];

export const  ruleCreateBrand =[
    check('name').notEmpty().withMessage("cheack name").isLength({ min: 3 }).withMessage("too short").isLength({ max: 10 }).withMessage("too long"), ValidatorMiddleware
]

export const ruleDeleteBrand = 
    [check('id').isMongoId().withMessage('invalid brand id'), ValidatorMiddleware];

export const ruleUpdateBrand =
    [check('id').isMongoId().withMessage('invalid brand id'), ValidatorMiddleware];


