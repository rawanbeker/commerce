import {  validationResult } from "express-validator";
//  middleware which catch error 
const ValidatorMiddleware = (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
export default ValidatorMiddleware